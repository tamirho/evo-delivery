from ctypes import Union
from dataclasses import dataclass, field
from typing import List, Dict

from dacite import MissingValueError

from ea_server.api.utils.constants import DEFAULT_GENERATIONS_BOUND, DEFAULT_TOUR_SIZE, \
    GENERATIONS, GENERATIONS_BOUND, TOUR_SIZE, DEFAULT_INDPB, INDPB, \
    DEFAULT_BOUNDED_DISTANCE, BOUND, SINGLE_POINT, BOUNDED_DISTANCE, TOURNAMENT, SHUFFLE


@dataclass(frozen=True)
class Driver:
    id: str
    max_capacity: int
    max_distance: int


@dataclass(frozen=True)
class Order:
    id: str
    weight: int


@dataclass(frozen=True)
class EaData:
    drivers: List[Driver]
    orders: List[Order]
    distances: Dict
    root_id: str

    def validate_distances(self):
        """
        Validates that distances attr has all relevant distances
        :raise: dacite.exceptions.MissingValueError
        """
        orders_ids = set([order.id for order in self.orders])
        # root place id
        orders_ids.add(self.root_id)

        if orders_ids != self.distances.keys():
            raise MissingValueError(
                f"distances, from order ids: {orders_ids.difference(self.distances.keys())}")

        orders_distance: Dict
        for order_id, orders_distance in self.distances.items():
            if orders_distance.keys() != orders_ids:
                raise MissingValueError(f"distances, from order {order_id} to order ids: "
                                        f"{orders_ids.difference(orders_distance.keys())}")

    def __post_init__(self):
        self.validate_distances()

    def get_distance(self, from_order_id, to_order_id):
        return self.distances[from_order_id][to_order_id]


@dataclass(frozen=True)
class ComponentConfig:
    name: str
    args: Dict = field(default_factory=lambda: {})


@dataclass(frozen=True)
class EaConfigModel:
    pop_size: int = field(default=100)
    crossover_prob: float = field(default=0.5)
    mutate_prob: float = field(default=0.5)
    crossover: ComponentConfig = field(
        default_factory=lambda: ComponentConfig(name=SINGLE_POINT, args={}))
    fitness: ComponentConfig = field(
        default_factory=lambda: ComponentConfig(name=BOUNDED_DISTANCE, args={BOUND: DEFAULT_BOUNDED_DISTANCE}))
    selection: ComponentConfig = field(
        default_factory=lambda: ComponentConfig(name=TOURNAMENT, args={TOUR_SIZE: DEFAULT_TOUR_SIZE}))
    mutate: ComponentConfig = field(
        default_factory=lambda: ComponentConfig(name=SHUFFLE, args={INDPB: DEFAULT_INDPB}))
    stop_condition: ComponentConfig = field(
        default_factory=lambda: ComponentConfig(name=GENERATIONS, args={GENERATIONS_BOUND: DEFAULT_GENERATIONS_BOUND}))

    def __post_init__(self):
        if self.pop_size < 1:
            raise ValueError("pop_size should be greater then 1")


@dataclass(frozen=True)
class EaDraftModel:
    run_id:str
    data: EaData
    config: EaConfigModel
