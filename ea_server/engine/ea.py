from functools import partial
import math
import random
from deap import algorithms, base, creator, tools
from operator import itemgetter
from ea_server.engine.cx import Crossover
from ea_server.engine.mut import Mutate
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
        self.crossover_type, self.crossover_kwargs = Crossover.default()
        self.mutate_type, self.mutate_kwargs = Mutate.default()
        self.selection_type, self.selection_kwargs = Selection.default()

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
        self.__toolbox.register("mate", self.crossover_type , **self.crossover_kwargs)
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

        fitness = self.fitness_strategy(drivers_total_distance, drivers_total_weight)

        return (fitness,)

    def penalty_strategy_one(self, drivers_total_distance, drivers_total_weight):
        infeas_num_weight, overweight = self.weight_penalty(drivers_total_weight)
        infeas_num_distance, overdistnace = self.distance_penalty(drivers_total_distance)

        return (100000 - sum(drivers_total_distance)) / 100000 \
                  + overweight * infeas_num_weight \
                  + overdistnace * infeas_num_distance

    def penalty_strategy_two(self, drivers_total_distance, drivers_total_weight):
        infeas_num_weight, overweight = self.weight_penalty(drivers_total_weight)
        infeas_num_distance, overdistnace = self.distance_penalty(drivers_total_distance)

        return sum(drivers_total_distance) + \
               (pow(overweight, 2) + pow(overdistnace, 2)) * (infeas_num_distance + infeas_num_weight)

    def weight_penalty(self, drivers_total_weight):
        infeas_num = 0
        overweight = 0
        for index, total_weight in enumerate(drivers_total_weight):
            max_capacity = self.data["drivers"][index]["max_capacity"]
            if total_weight > max_capacity:
                infeas_num += 1
                overweight += total_weight - max_capacity

        return infeas_num, overweight

    def distance_penalty(self, drivers_total_distance):
        infeas_num = 0
        overdistnace = 0
        for index, total_distance in enumerate(drivers_total_distance):
            max_distance = self.data["drivers"][index]["max_distance"]
            if total_distance > max_distance:
                infeas_num += 1
                overdistnace += total_distance - max_distance

        return infeas_num, overdistnace