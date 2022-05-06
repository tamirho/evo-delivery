import math
from operator import itemgetter

from ea_server.api.utils.constans import INIT_ORDER_ID, BOUND, POWER
from ea_server.model.ea_function_model import EaFunctionModel, KwargModel
from ea_server.model.ea_request_model import EaData


def __bounded_distance_strategy(data: EaData, individual, bound):
    drivers_total_distance, drivers_total_weight = \
        __calculate_routes_distance_and_weight_from_individual(data, individual)

    infeas_num_weight, over_weight = __weight_penalty(data.drivers, drivers_total_weight)
    infeas_num_distance, over_distance = __distance_penalty(data.drivers, drivers_total_distance)

    return (bound - sum(drivers_total_distance)) / bound + \
           (over_weight * infeas_num_weight + over_distance * infeas_num_distance)


def __power_strategy(data: EaData, individual, power):
    if power < 0:
        raise ValueError("Power can't be negative value")
    drivers_total_distance, drivers_total_weight = \
        __calculate_routes_distance_and_weight_from_individual(data, individual)

    infeas_num_weight, over_weight = __weight_penalty(data.drivers, drivers_total_weight)
    infeas_num_distance, over_distance = __distance_penalty(data.drivers, drivers_total_distance)

    return sum(drivers_total_distance) + (
            pow(over_weight, power) + pow(over_distance, power)) * (infeas_num_distance + infeas_num_weight)


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


def __calculate_routes_distance_and_weight_from_individual(data, individual):
    indexed_individual = list(enumerate(individual))
    sorted_individual = sorted(indexed_individual, key=itemgetter(1))

    num_drivers = len(data.drivers)
    drivers_total_distance = [0] * num_drivers
    drivers_total_weight = [0] * num_drivers
    prev_order_per_driver = [INIT_ORDER_ID] * num_drivers

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
        drivers_total_distance[index] += data.get_distance(prev_order, INIT_ORDER_ID)

    return drivers_total_distance, drivers_total_weight


# todo: add description
bound = EaFunctionModel(function=__bounded_distance_strategy,
                        description="",
                        kwargs=[KwargModel(name=BOUND,
                                           description="The maximum travel distance that all the drivers will do togther",
                                           type="int")])

power = EaFunctionModel(function=__power_strategy,
                        description="Need to be added",
                        kwargs=[KwargModel(name=POWER,
                                           description="",
                                           type="int")])
