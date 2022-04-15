from dataclasses import dataclass
from typing import List, Dict

from dacite import MissingValueError

from ea_server.api.utils.constans import INIT_ORDER_ID


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
class EaRequestDataModel:
    drivers: List[Driver]
    orders: List[Order]
    distances: Dict

    def validate_distances(self):
        """
        Validates that distances attr has all relevant distances
        :raise: dacite.exceptions.MissingValueError
        """
        orders_ids = set([order.id for order in self.orders])
        # root place id
        orders_ids.add(INIT_ORDER_ID)

        if orders_ids != self.distances.keys():
            raise MissingValueError(f"Distances from order ids: {orders_ids.difference(self.distances.keys())}")

        orders_distance: Dict
        for order_id, orders_distance in self.distances.items():
            if orders_distance.keys() != orders_ids:
                raise MissingValueError(f"Distances from {order_id} to order ids: {orders_ids.difference(orders_distance.keys())}")

    def __post_init__(self):
        self.validate_distances()

    def get_distance(self, from_order_id, to_order_id):
        return self.distances[from_order_id][to_order_id]
