import random
from deap import algorithms, base, creator, tools

from ea_server.data.ea_request_model import EaRequestDataModel
from ea_server.engine.cx import Crossover
from ea_server.engine.fit import FitnessStrategy
from ea_server.engine.mut import Mutate
from ea_server.engine.sel import Selection

creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)


class EA:
    @staticmethod
    def get_best_individual(result, top=1):
        return tools.selBest(result, top)[0]

    def __init__(self, data: EaRequestDataModel) -> None:
        self.data = data
        self.pop_size = 100
        self.cxpb = 0.8
        self.num_generations = 400
        self.mutpd = 0.2
        self.num_drivers = len(data.drivers)
        self.num_orders = len(data.orders)
        self.crossover_type, self.crossover_kwargs = Crossover.default()
        self.mutate_type, self.mutate_kwargs = Mutate.default()
        self.selection_type, self.selection_kwargs = Selection.default()
        self.fitness_strategy = FitnessStrategy.default()
        self.fitness_strategy_kwargs = None  # todo
        self.__pop = None

    def build(self):
        self.__toolbox = base.Toolbox()
        self.__toolbox.register("indices", random.uniform, 0, self.num_drivers)
        self.__toolbox.register("individual", tools.initRepeat,
                                creator.Individual, self.__toolbox.indices, n=self.num_orders)
        self.__toolbox.register(
            "population", tools.initRepeat, list, self.__toolbox.individual)
        self.__toolbox.register("evaluate", self._evaluation)
        self.__toolbox.register(
            "mate", self.crossover_type, **self.crossover_kwargs)
        self.__toolbox.register(
            "mutate", self.mutate_type, **self.mutate_kwargs)
        self.__toolbox.register(
            "select", self.selection_type, **self.selection_kwargs)
        self.__pop = self.__toolbox.population(n=self.pop_size)

    def set_num_orders(self, num_orders: int):
        self.num_orders = num_orders
        return self

    def set_num_drivers(self, num_drivers: int):
        self.num_drivers = num_drivers
        return self

    def set_crossover(self, crossover_name: str, **kwargs):
        self.crossover_type = Crossover.get(crossover_name)
        self.crossover_kwargs = kwargs
        return self

    def set_mutate(self, mutate_name: str, **kwargs):
        self.mutate_type = Mutate.get(mutate_name)
        self.mutate_kwargs = kwargs
        return self

    def set_selection(self, selection_name: str, **kwargs):
        self.selection_type = Selection.get(selection_name)
        self.selection_kwargs = kwargs
        return self

    def set_fitness(self, fitness_name: str, **kwargs):
        self.fitness_strategy = FitnessStrategy.get(fitness_name)
        self.fitness_strategy_kwargs = kwargs
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

    def eval_model(self):
        self.build()
        self.result = algorithms.eaSimple(self.__pop, self.__toolbox,
                                          cxpb=self.cxpb, mutpb=self.mutpd,
                                          ngen=self.num_generations, verbose=False)
        return self.result

    def _evaluation(self, individual):
        # individual example: [(0, 0.32), (1, 0.43), (2, 1.45)]
        fitness = self.fitness_strategy(self.data, individual)

        return (fitness,)
