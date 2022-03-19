from functools import partial
import math
import random
from deap import algorithms, base, creator, tools
import numpy as nn
from operator import itemgetter
from cx import Crossovers
from mut import Mutates
from sel import Selection


class EA:

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

    def set_num_orders(self, num_orders):
        self.num_orders = num_orders
        return self

    def set_num_drivers(self, num_drivers):
        self.num_drivers = num_drivers
        return self

    def set_crossover(self, crossover_type):
        self.crossover_type = crossover_type
        return self

    def set_mutate(self, mutate_type, **kwargs):
        self.mutate_type = mutate_type
        self.mutate_kwargs = kwargs
        return self

    def set_selection(self, selection_type, **kwargs):
        self.selection_type = selection_type
        self.selection_kwargs = kwargs
        return self

    def set_pop_size(self, pop_size):
        self.pop_size = pop_size
        return self

    def set_cxpb(self, cxpb):
        self.cxpb = cxpb
        return self

    def set_mutpd(self, mutpd):
        self.mutpd = mutpd
        return self

    def set_num_generations(self, num_generations):
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
        '''Evaluates an individual by converting it into
        a list of cities and passing that list to total_distance'''
        indexed_individual = list(enumerate(individual))
        # [(0, 0.32), (2, 0.43), (1, 1.45)]
        sorted_orders = sorted(indexed_individual, key=itemgetter(1))

        drivers_total_length = [0] * len(self.data["drivers"])
        drivers_total_capcity = [0] * len(self.data["drivers"])
        prev_order_per_driver = [0] * len(self.data["drivers"])

        for order_index, val in sorted_orders:
            driver_index = math.floor(val)
            driver_id = self.data["drivers"][driver_index]["id"]
            order_capacity = self.data["orders"][order_index]["capacity"]
            order_id = self.data["orders"][order_index]["id"]

            drivers_total_capcity[driver_index] += order_capacity
            drivers_total_length[driver_index] += self.__get_distance(
                prev_order_per_driver[driver_index], order_id)
            prev_order_per_driver[driver_index] = order_id

        # calculate the distance from the last order to the intialiat spot
        for index, prev_order in enumerate(prev_order_per_driver):
            drivers_total_length[index] += self.__get_distance(
                prev_order, 0)

        sum_lengths = sum(drivers_total_length)
        return (sum_lengths,)
