import pygad
import numpy as nn
import math
from operator import itemgetter

# Distance between each pair of cities
w0 = [999, 50, 50, 50, 50, 999]
w1 = [50, 999, 1, 999, 999, 999]
w2 = [50, 999, 999, 999, 999, 999]
w3 = [50, 999, 999, 999, 999, 1]
w4 = [50, 999, 999, 999, 999, 999]
w5 = [999, 999, 999, 999, 1, 999]

distances = {0: w0, 1: w1, 2: w2, 3: w3, 4: w4, 5: w5}

drivers = [0, 1]

counter = 0
# ----------------------------------------------------------------


def calculate_length(route):
    length = 0
    for previous, current in zip(route, route[1:]):
        length += distances[previous[0]][current[0]]
    length += distances[0][route[0][0]] + distances[route[len(route) - 1][0]][0]
    return length


def chromosome2routes(route):
    indexed = [(i + 1, math.floor(r), r - math.floor(r)) for i, r in enumerate(route)]
    s_arr = sorted(indexed, key=itemgetter(2))
    return s_arr


def group_by_driver(route):
    values = set(map(lambda x: x[1], route))
    return [[y for y in route if y[1] == x] for x in values]


def fitness_func(solution, solution_idx):
    routes = chromosome2routes(solution)
    drivers_routes = group_by_driver(routes)
    print(f"solution {drivers_routes}")
    sum_of = 0
    for route in drivers_routes:
        route_len = calculate_length(route)
        print(f"route_len {route_len}")
        sum_of += route_len

    print(f"sumof {sum_of}")
    return 1 / (sum_of + 0.0000001) * 100


def on_start(ga_instance):
    print("on_start()")


def on_generation(ga_instance):
    print("on_generation()")


def on_stop(ga_instance, last_population_fitness):
    print("on_stop()")

fitness_function = fitness_func

ga_instance = pygad.GA(num_generations=80,
                       num_parents_mating=4,
                       fitness_func=fitness_function,
                       allow_duplicate_genes=False,
                       gene_space=nn.arange(0, len(drivers), 0.01),
                       num_genes=len(distances) - 1,
                       sol_per_pop=8,
                       gene_type=float,
                       on_start=on_start,
                       on_generation=on_generation,
                       mutation_num_genes=4,
                       crossover_type='single_point'
                       )

ga_instance.run()

ga_instance.plot_fitness()
solution, solution_fitness, solution_idx = ga_instance.best_solution(ga_instance.last_generation_fitness)
print("Parameters of the best solution : {solution}".format(solution=solution))
print("Fitness value of the best solution = {solution_fitness}".format(solution_fitness=solution_fitness))
print("Index of the best solution : {solution_idx}".format(solution_idx=solution_idx))

if ga_instance.best_solution_generation != -1:
    print("Best fitness value reached after {best_solution_generation} generations.".format(best_solution_generation=ga_instance.best_solution_generation))



