import math
from operator import itemgetter

from ea_server.api.utils.constants import DISTANCE, BOUND, POWER, MULTIPLIER
from ea_server.model.ea_function_model import EaFunctionModel, KwargModel
from ea_server.model.ea_request_model import EaData


def __bounded_distance_strategy(data: EaData, individual, distance, **kwargs):
    drivers_total_distance, drivers_total_weight = \
        __calculate_routes_distance_and_weight_from_individual(data, individual)

    infeas_num_weight, over_weight = __weight_penalty(data.drivers, drivers_total_weight)
    infeas_num_distance, over_distance = __distance_penalty(data.drivers, drivers_total_distance)

    return (distance - sum(drivers_total_distance)) / distance + \
           (over_weight * infeas_num_weight + over_distance * infeas_num_distance)


def __power_strategy(data: EaData, individual, power, **kwargs):
    if power < 0:
        raise ValueError("Power can't be negative value")
    drivers_total_distance, drivers_total_weight = \
        __calculate_routes_distance_and_weight_from_individual(data, individual)

    infeas_num_weight, over_weight = __weight_penalty(data.drivers, drivers_total_weight)
    infeas_num_distance, over_distance = __distance_penalty(data.drivers, drivers_total_distance)

    return sum(drivers_total_distance) + (
            pow(over_weight, power) + pow(over_distance, power)) * (infeas_num_distance + infeas_num_weight)


def __multiply_strategy(data: EaData, individual, multiplier, **kwargs):
    if multiplier < 0:
        raise ValueError("multiplier can't be negative value")

    drivers_total_distance, drivers_total_weight = \
        __calculate_routes_distance_and_weight_from_individual(data, individual)

    infeas_num_weight, over_weight = __weight_penalty(data.drivers, drivers_total_weight)
    infeas_num_distance, over_distance = __distance_penalty(data.drivers, drivers_total_distance)

    return sum(drivers_total_distance) * (infeas_num_distance + infeas_num_weight) * multiplier + (
            multiplier * (over_weight + over_distance)) / sum(drivers_total_distance)


def __weight_penalty(drivers_data, drivers_total_weight):
    infeas_num = 0
    over_weight = 0
    for driver_index, total_weight in enumerate(drivers_total_weight):
        max_capacity = drivers_data[driver_index].max_capacity
        if total_weight > max_capacity:
            infeas_num += 1
            over_weight += total_weight - max_capacity

    return infeas_num, over_weight


def __distance_penalty(drivers_data, drivers_total_distance):
    infeas_num = 0
    over_distance = 0
    for driver_index, total_distance in enumerate(drivers_total_distance):
        max_distance = drivers_data[driver_index].max_distance
        if total_distance > max_distance:
            infeas_num += 1
            over_distance += total_distance - max_distance

    return infeas_num, over_distance


def __calculate_routes_distance_and_weight_from_individual(data: EaData, individual):
    indexed_individual = list(enumerate(individual))
    sorted_individual = sorted(indexed_individual, key=itemgetter(1))

    num_drivers = len(data.drivers)
    drivers_total_distance = [0] * num_drivers
    drivers_total_weight = [0] * num_drivers
    prev_order_per_driver = [data.root_id] * num_drivers

    for order_index, gen in sorted_individual:
        driver_index = math.floor(gen)
        order_weight = data.orders[order_index].weight
        order_id = data.orders[order_index].id

        drivers_total_weight[driver_index] += order_weight
        drivers_total_distance[driver_index] += data.get_distance(
            from_order_id=prev_order_per_driver[driver_index], to_order_id=order_id)
        prev_order_per_driver[driver_index] = order_id

    # calculate the distance from the last order to the initial spot
    for index, prev_order in enumerate(prev_order_per_driver):
        drivers_total_distance[index] += data.get_distance(prev_order, data.root_id)

    return drivers_total_distance, drivers_total_weight


bound = EaFunctionModel(function=__bounded_distance_strategy,
                        description="""Choose this fitness strategy when the total travel distance can be estimated""",
                        kwargs=[KwargModel(name=DISTANCE,
                                           description="The maximum travel distance that all the drivers will do "
                                                       "together",
                                           type="int")])

power = EaFunctionModel(function=__power_strategy,
                        description="""Fitness strategy that penalized the invalid solutions based on the input power 
                        - the greater the power, the less possibility that the invalid solution will be picked""",
                        kwargs=[KwargModel(name=POWER,
                                           description="The power parameter that will be injected to the formula",
                                           type="int")])

multiply = EaFunctionModel(function=__multiply_strategy,
                           description="""Fitness strategy that penalized the invalid solutions based on the input 
                           multiplier - the greater the power, multiplier less possibility that the invalid solution 
                           will be picked""",
                           kwargs=[KwargModel(name=MULTIPLIER,
                                              description="The multiplier parameter that will be injected to the "
                                                          "formula",
                                              type="int")])
