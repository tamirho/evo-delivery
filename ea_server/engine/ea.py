import random
from deap import algorithms, base, creator, tools

from ea_server.model.ea_request_model import EaData
from ea_server.engine.components.crossover.cx import Crossover
from ea_server.engine.components.fitness.fit import Fitness
from ea_server.engine.components.mutates.mut import Mutate
from ea_server.engine.components.selection.sel import Selection

from ea_server.model.ea_request_model import EaConfigModel, ComponentConfig

creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)


class EA:
    @staticmethod
    def get_best_individual(result, top=1):
        return tools.selBest(result, top)[0]

    def __init__(self, data: EaData, conf: EaConfigModel) -> None:
        self.conf = conf
        self.data = data
        self.num_drivers = len(data.drivers)
        self.num_orders = len(data.orders)

        self.__pop = None
        self.result = None
        self.pop_size = None
        self.cxpb = None
        self.num_generations = None
        self.mutpd = None

        self.mutate_func = None
        self.mutate_kwargs = None
        self.selection_kwargs = None
        self.selection_func = None
        self.fitness_kwargs = None
        self.fitness_func = None
        self.crossover_kwargs = None
        self.crossover_func = None

    def prepare(self):
        self.set_selection(self.conf.selection)
        self.set_fitness(self.conf.fitness)
        self.set_mutate(self.conf.mutate)
        self.set_crossover(self.conf.crossover)

        self.set_cxpb(self.conf.crossover_prob)
        self.set_pop_size(self.conf.pop_size)
        self.set_num_generations(self.conf.num_generations)
        self.set_mutpd(self.conf.mutate_prob)

        self.__toolbox = base.Toolbox()
        self.__toolbox.register("indices", random.uniform, 0, self.num_drivers)
        self.__toolbox.register("individual", tools.initRepeat,
                                creator.Individual, self.__toolbox.indices, n=self.num_orders)
        self.__toolbox.register("population", tools.initRepeat, list, self.__toolbox.individual)
        self.__toolbox.register("evaluate", self._evaluation)
        self.__toolbox.register("mate", self.crossover_func, **self.crossover_kwargs)
        self.__toolbox.register("mutate", self.mutate_func, **self.mutate_kwargs)
        self.__toolbox.register("select", self.selection_func, **self.selection_kwargs)
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

    def set_pop_size(self, pop_size: int):
        self.pop_size = pop_size
        return self

    def set_cxpb(self, cxpb: float):
        self.cxpb = cxpb
        return self

    def set_mutpd(self, mutpd: float):
        self.mutpd = mutpd
        return self

    def set_num_generations(self, num_generations: int):
        self.num_generations = num_generations
        return self

    def evaluate(self):
        self.prepare()
        self.result = algorithms.eaSimple(self.__pop, self.__toolbox,
                                          cxpb=self.cxpb, mutpb=self.mutpd,
                                          ngen=self.num_generations, verbose=False)
        return self.result

    def _evaluation(self, individual):
        fitness = self.fitness_func(self.data, individual, **self.fitness_kwargs)
        return (fitness,)
