import random
import threading
import time
from deap import algorithms, base, creator, tools


from ..api.utils.constants import BOUND, DEFAULT_FITNESS_BOUND, DEFAULT_GENERATIONS_BOUND, DEFAULT_TIME_BOUND, FITNESS, GENERATIONS, TIME

from ea_server.model.ea_request_model import EaData
from ea_server.engine.components.crossover.cx import Crossover
from ea_server.engine.components.fitness.fit import Fitness
from ea_server.engine.components.mutates.mut import Mutate
from ea_server.engine.components.selection.sel import Selection
from ea_server.engine.components.stop_condition.stop_condition import StopCondition, StopConditionType
from ea_server.model.ea_request_model import EaConfigModel, ComponentConfig
from ea_server.api.utils.parser import parse_result
from flask_pymongo import PyMongo, ObjectId
from flask import current_app

creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)


class EA:
    @staticmethod
    def get_best_individual(result, top=1):
        return tools.selBest(result, top)[0]

    def __init__(self, data: EaData, conf: EaConfigModel, run_id:str) -> None:
        self.running = True
        self.t = threading.Thread(target=self.evaluate)
        self.run_id = run_id
        self.mongo = PyMongo(current_app)
        self.conf = conf
        self.data = data
        self.num_drivers = len(data.drivers)
        self.num_orders = len(data.orders)

        self.__pop = None
        self.result = None
        self.pop_size = None
        self.cxpb = None
        self.mutpd = None

        self.mutate_func = None
        self.mutate_kwargs = None
        self.selection_kwargs = None
        self.selection_func = None
        self.fitness_kwargs = None
        self.fitness_func = None
        self.crossover_kwargs = None
        self.crossover_func = None
        self.stop_condition_func = None
        self.stop_condition_kwargs = None
        self.stop_condition_type = None

    def terminate(self):
        self.running = False

    def run(self):
        self.t.start()

    def prepare(self):
        self.set_selection(self.conf.selection)
        self.set_fitness(self.conf.fitness)
        self.set_mutate(self.conf.mutate)
        self.set_crossover(self.conf.crossover)
        self.set_stop_condition(self.conf.stop_condition)

        self.set_cxpb(self.conf.crossover_prob)
        self.set_pop_size(self.conf.pop_size)
        self.set_mutpd(self.conf.mutate_prob)

        self.__toolbox = base.Toolbox()
        self.__toolbox.register("indices", random.uniform, 0, self.num_drivers)
        self.__toolbox.register("individual", tools.initRepeat,
                                creator.Individual, self.__toolbox.indices, n=self.num_orders)
        self.__toolbox.register(
            "population", tools.initRepeat, list, self.__toolbox.individual)
        self.__toolbox.register("evaluate", self._evaluation)
        self.__toolbox.register(
            "mate", self.crossover_func, **self.crossover_kwargs)
        self.__toolbox.register(
            "mutate", self.mutate_func, **self.mutate_kwargs)
        self.__toolbox.register(
            "select", self.selection_func, **self.selection_kwargs)
        self.__pop = self.__toolbox.population(n=self.pop_size)

    def set_num_orders(self, num_orders: int):
        self.num_orders = num_orders
        return self

    def set_num_drivers(self, num_drivers: int):
        self.num_drivers = num_drivers
        return self

    def set_crossover(self, conf: ComponentConfig):
        self.crossover_func = Crossover.get(conf.name).function
        self.crossover_kwargs = conf.args
        return self

    def set_mutate(self, conf: ComponentConfig):
        self.mutate_func = Mutate.get(conf.name).function
        self.mutate_kwargs = conf.args
        return self

    def set_selection(self, conf: ComponentConfig):
        self.selection_func = Selection.get(conf.name).function
        self.selection_kwargs = conf.args
        return self

    def set_fitness(self, conf: ComponentConfig):
        self.fitness_func = Fitness.get(conf.name).function
        self.fitness_kwargs = conf.args
        return self

    def set_stop_condition(self, conf: ComponentConfig):
        self.stop_condition_func = StopCondition.get(conf.name).function
        self.stop_condition_kwargs = conf.args
        self.stop_condition_type = conf.name
        return self

    def set_pop_size(self, pop_size: int):
        self.pop_size = pop_size
        return self

    def set_cxpb(self, cxpb: float):
        self.cxpb = cxpb
        return self

    def set_mutpd(self, mutpd: float):
        self.mutpd = mutpd
        return self

    def evoEvaluate(self, population, toolbox, cxpb, mutpb, stats=None,
                    halloffame=None, verbose=__debug__):

        logbook = tools.Logbook()
        logbook.header = ['gen', 'nevals', 'best'] + \
            (stats.fields if stats else [])

        # Evaluate the individuals with an invalid fitness
        invalid_ind = [ind for ind in population if not ind.fitness.valid]
        fitnesses = toolbox.map(toolbox.evaluate, invalid_ind)
        for ind, fit in zip(invalid_ind, fitnesses):
            ind.fitness.values = fit

        if halloffame is not None:
            halloffame.update(population)

        record = stats.compile(population) if stats else {}
        logbook.record(gen=0, nevals=len(invalid_ind), **record)
        if verbose:
            print(logbook.stream)

        start_time = time.time()
        generation: int = 1
        min_fitness = 1000000

        # Begin the generational process
        while not self.should_finish(generation, min_fitness, time.time() - start_time):
            # Select the next generation individuals
            offspring = toolbox.select(population, len(population))

            # Vary the pool of individuals
            offspring = algorithms.varAnd(offspring, toolbox, cxpb, mutpb)

            # Evaluate the individuals with an invalid fitness
            invalid_ind = [ind for ind in offspring if not ind.fitness.valid]
            fitnesses = toolbox.map(toolbox.evaluate, invalid_ind)
            for ind, fit in zip(invalid_ind, fitnesses):
                ind.fitness.values = fit
                if fit[0] < min_fitness:
                    min_fitness = fit[0]

            # Update the hall of fame with the generated individuals
            if halloffame is not None:
                halloffame.update(offspring)

            # Replace the current population by the offspring
            population[:] = offspring

            # Append the current generation statistics to the logbook
            record = stats.compile(population) if stats else {}
            logbook.record(gen=generation, nevals=len(invalid_ind),
                           best=self.get_best_individual(population))
            if verbose:
                print(logbook.stream)

            cur_fitness = invalid_ind[0].fitness.values[0]
            best = self.get_best_individual(population)
            if self.run_id!="0":
                result = parse_result(best, self.data)
                self.mongo.db.EvaluateResults.update_one({'_id':ObjectId(self.run_id)},{'$set':{'eaResult':result}})
            generation += 1

        best = self.get_best_individual(population) 
        if self.run_id!="0":  
            result = parse_result(best, self.data)
            self.mongo.db.EvaluateResults.update_one({'_id':ObjectId(self.run_id)},{'$set':{'eaResult':result, 'isDone': True}})

        return best,logbook

    def evaluate(self):
        self.prepare()
        self.result = self.evoEvaluate(self.__pop, self.__toolbox,
                                       cxpb=self.cxpb, mutpb=self.mutpd,
                                       verbose=False)
        return self.result

    def _evaluation(self, individual):
        fitness = self.fitness_func(
            self.data, individual, **self.fitness_kwargs)
        return (fitness,)

    def should_finish(self, generation: int, fitness: float, time: float):
        should_stop = not self.running
        if self.stop_condition_type == StopConditionType.Generations.value:
            bound = generation
        elif self.stop_condition_type == StopConditionType.Fitness.value:
            bound = fitness
        elif self.stop_condition_type == StopConditionType.Time.value:
            bound = time

        return should_stop or self.stop_condition_func(bound, **self.stop_condition_kwargs)
