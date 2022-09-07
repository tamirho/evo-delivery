from ea_server.api.utils.constants import TIME_BOUND, GENERATIONS_BOUND, FITNESS_BOUND
from ea_server.model.ea_function_model import EaFunctionModel, KwargModel


def time_stop_cond_strategy(cur_time, time_bound):
    return time_bound <= cur_time


def fitness_stop_cond_strategy(cur_fitness, fitness_bound):
    return fitness_bound >= cur_fitness


def generations_stop_cond_strategy(cur_generations, generations_bound):
    return generations_bound <= cur_generations


time = EaFunctionModel(function=time_stop_cond_strategy,
                       description="Upon reaching x time, the algorithm will be stopped and the last generation will be returned",
                       kwargs=[KwargModel(name=TIME_BOUND,
                                          description="The maximum time that the algorithm will run (in secondes)",
                                          type="int")])

fitness = EaFunctionModel(function=fitness_stop_cond_strategy,
                          description="When the algorithm reaches x fitness, it will be stopped and return the last generation",
                          kwargs=[KwargModel(name=FITNESS_BOUND,
                                             description="The minimum fitness that the algorithm will seek for (less is better)",
                                             type="float")])

generations = EaFunctionModel(function=generations_stop_cond_strategy,
                          description="When the algorithm reaches x generations, it will be stopped and return the last generation",
                          kwargs=[KwargModel(name=GENERATIONS_BOUND,
                                             description="The number of generations that the algorithm will generate",
                                             type="int")])
