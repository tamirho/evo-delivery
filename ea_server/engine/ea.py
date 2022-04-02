from functools import partial
import math
import random
from deap import algorithms, base, creator, tools
from operator import itemgetter
from ea_server.engine.cx import Crossovers
from ea_server.engine.mut import Mutates
from ea_server.engine.sel import Selection


class EA:
    REQUIRED_DATA_KEYS = ['drivers', 'orders']

    @staticmethod
    def get_best_individual(result, top=1):
        return tools.selBest(result, top)[0]

    def __init__(self, data) -> None:
        self.data = data
        self.pop_size = 100
        self.cxpb = 0.8
        self.num_generations = 400
        self.mutpd = 0.2
        self.num_drivers = len(data["drivers"])
        self.num_orders = len(data["orders"])
        self.crossover_type = Crossovers.get_default()
        self.mutate_type, self.mutate_kwargs = Mutates.get_default()
        self.selection_type, self.selection_kwargs = Selection.get_default()

    def build(self):
        creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
        creator.create("Individual", list, fitness=creator.FitnessMin)
        self.__toolbox = base.Toolbox()
        self.__toolbox.register("indices", random.uniform, 0, self.num_drivers)
        self.__toolbox.register("individual", tools.initRepeat,
                                creator.Individual, self.__toolbox.indices, n=self.num_orders)
        self.__toolbox.register(
            "population", tools.initRepeat, list, self.__toolbox.individual)
        self.__toolbox.register("evaluate", self.__evaluation)
        self.__toolbox.register("mate", self.crossover_type)
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

    def set_crossover(self, crossover_name: str):
        self.crossover_type = Crossovers.get(crossover_name)
        return self

    def set_mutate(self, mutate_name: str, **kwargs):
        self.mutate_type = Mutates.get(mutate_name)
        self.mutate_kwargs = kwargs
        return self

    def set_selection(self, selection_name: str, **kwargs):
        self.selection_type = Selection.get(selection_name)
        self.selection_kwargs = kwargs
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

    def __get_distance(self, from_order_id, to_order_id):
        return self.data["distances"][from_order_id][to_order_id]

    def __get_driver_id(self, driver_index):
        return self.data["drivers"][driver_index]["id"]

    def __evaluation(self, individual):
        # [(0, 0.32), (1, 0.43), (2, 1.45)]
        indexed_individual = list(enumerate(individual))
        sorted_individual = sorted(indexed_individual, key=itemgetter(1))

        drivers_total_distance = [0] * self.num_drivers
        drivers_total_weight = [0] * self.num_drivers
        prev_order_per_driver = ["0"] * self.num_drivers

        for index, gen in sorted_individual:
            driver_index = math.floor(gen)
            # driver_id = self.data["drivers"][driver_index]["id"]
            order_weight = self.data["orders"][index]["weight"]
            order_id = self.data["orders"][index]["id"]

            drivers_total_weight[driver_index] += order_weight
            drivers_total_distance[driver_index] += self.__get_distance(
                prev_order_per_driver[driver_index], order_id)

            prev_order_per_driver[driver_index] = order_id

        # calculate the distance from the last order to the initial spot
        for index, prev_order in enumerate(prev_order_per_driver):
            drivers_total_distance[index] += self.__get_distance(
                prev_order, "0")

        # need to think on the penalty weight
        fitness = sum(drivers_total_distance) \
            + self.weight_penalty(drivers_total_weight) \
            + self.distance_penalty(drivers_total_distance)

        return (fitness,)

    def weight_penalty(self, drivers_total_weight):
        penalty = 0
        for index, total_weight in enumerate(drivers_total_weight):
            if total_weight > self.data["drivers"][index]["max_capacity"]:
                penalty += 1

        return penalty

    def distance_penalty(self, drivers_total_distance):
        penalty = 0
        for index, total_distance in enumerate(drivers_total_distance):
            if total_distance > self.data["drivers"][index]["max_distance"]:
                penalty += 1

        return penalty
