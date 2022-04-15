import math
from operator import itemgetter

from ea_server.api.utils.constans import INIT_ORDER_ID
from ea_server.data.ea_request_model import EaRequestDataModel


def bounded_distance_strategy(data: EaRequestDataModel, individual):
    drivers_total_distance, drivers_total_weight = \
        calculate_routes_distance_and_weight_from_individual(data, individual)

    infeas_num_weight, over_weight = weight_penalty(data.drivers, drivers_total_weight)
    infeas_num_distance, over_distance = distance_penalty(data.drivers, drivers_total_distance)

    # todo make this numbers configurable
    return (100000 - sum(drivers_total_distance)) / 100000 + \
           (over_weight * infeas_num_weight + over_distance * infeas_num_distance)


def power_strategy(data: EaRequestDataModel, individual):
    drivers_total_distance, drivers_total_weight = \
        calculate_routes_distance_and_weight_from_individual(data, individual)

    infeas_num_weight, over_weight = weight_penalty(data.drivers, drivers_total_weight)
    infeas_num_distance, over_distance = distance_penalty(data.drivers, drivers_total_distance)

    # todo make this numbers configurable
    return sum(drivers_total_distance) + (
            pow(over_weight, 2) + pow(over_distance, 2)) * (infeas_num_distance + infeas_num_weight)


def weight_penalty(drivers_data, drivers_total_weight):
    infeas_num = 0
    over_weight = 0
    for driver_index, total_weight in enumerate(drivers_total_weight):
        max_capacity = drivers_data[driver_index].max_capacity
        if total_weight > max_capacity:
            infeas_num += 1
            over_weight += total_weight - max_capacity

    return infeas_num, over_weight

def distance_penalty(drivers_data, drivers_total_distance):
    infeas_num = 0
    over_distance = 0
    for driver_index, total_distance in enumerate(drivers_total_distance):
        max_distance = drivers_data[driver_index].max_distance
        if total_distance > max_distance:
            infeas_num += 1
            over_distance += total_distance - max_distance

    return infeas_num, over_distance


def calculate_routes_distance_and_weight_from_individual(data, individual):
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
