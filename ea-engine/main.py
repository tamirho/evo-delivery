from functools import partial
import math
import random
from deap import algorithms, base, creator, tools
import numpy as nn
from operator import itemgetter

FLOATING_POINT = 2

data = {
    "drivers": [
        {"id": 11, "max_capacity": 5, "max_len": 2},
        {"id": 12, "max_capacity": 6, "max_len": 8},
        {"id": 13, "max_capacity": 6, "max_len": 8},
    ],
    "orders": [
        {"id": 1, "capacity": 5},
        {"id": 2, "capacity": 5},
        {"id": 3, "capacity": 5},
        {"id": 4, "capacity": 5},
        {"id": 5, "capacity": 5},
        {"id": 6, "capacity": 5},
    ],
    "distances": {
        0: {0: 0, 1: 99, 2: 99, 3: 1, 4: 1, 5: 1, 6: 33},
        1: {0: 1, 1: 99, 2: 99, 3: 99, 4: 99, 5: 99, 6: 99},
        2: {0: 1, 1: 99, 2: 0, 3: 99, 4: 99, 5: 99, 6: 99},
        3: {0: 99, 1: 99, 2: 1, 3: 0, 4: 99, 5: 99, 6: 99},
        4: {0: 99, 1: 1, 2: 99, 3: 99, 4: 0, 5: 99, 6: 99},
        5: {0: 99, 1: 99, 2: 99, 3: 99, 4: 99, 5: 0, 6: 1},
        6: {0: 1, 1: 99, 2: 99, 3: 99, 4: 99, 5: 99, 6: 99},
    }
}

# 0->3->2
# 0->4->1
# 0->5->6

creator.create("FitnessMin", base.Fitness, weights=(-1.0,))
creator.create("Individual", list, fitness=creator.FitnessMin)

toolbox = base.Toolbox()

toolbox.register("indices", random.uniform, 0, len(data["drivers"]))
toolbox.register("individual", tools.initRepeat,
                 creator.Individual, toolbox.indices, n=len(data["orders"]))
toolbox.register("population", tools.initRepeat, list,
                 toolbox.individual)


toolbox.register("mate", tools.cxOnePoint)
toolbox.register("mutate", tools.mutShuffleIndexes, indpb=0.05)


def get_distance(from_order_id, to_order_id):
    return data["distances"][from_order_id][to_order_id]


def evaluation(individual):
    '''Evaluates an individual by converting it into
    a list of cities and passing that list to total_distance'''
    indexed_individual = list(enumerate(individual))
    # [(0, 0.32), (2, 0.43), (1, 1.45)]
    sorted_orders = sorted(indexed_individual, key=itemgetter(1))

    drivers_total_length = [0 for i in range(len(data["drivers"]))]
    drivers_total_capcity = [0 for i in range(len(data["drivers"]))]
    prev_order_per_driver = [0 for i in range(len(data["drivers"]))]

    for order_index, val in sorted_orders:
        driver_index = math.floor(val)
        driver_id = data["drivers"][driver_index]["id"]

        order_capacity = data["orders"][order_index]["capacity"]
        order_id = data["orders"][order_index]["id"]

        drivers_total_capcity[driver_index] += order_capacity
        drivers_total_length[driver_index] += get_distance(
            prev_order_per_driver[driver_index], order_id)
        prev_order_per_driver[driver_index] = order_id

    sum_lengths = sum(drivers_total_length)
    return (sum_lengths,)


toolbox.register("evaluate", evaluation)

toolbox.register("select", tools.selTournament, tournsize=3)

pop = toolbox.population(n=100)
print(pop)

result, log = algorithms.eaSimple(pop, toolbox,
                                  cxpb=0.8, mutpb=0.2,
                                  ngen=400, verbose=False)


best_individual = tools.selBest(result, k=1)[0]
print('best individual: ', best_individual)
