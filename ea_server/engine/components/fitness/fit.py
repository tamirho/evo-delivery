from enum import Enum

from ea_server.api.utils.constans import DEFAULT_BOUNDED_DISTANCE, BOUND, BOUNDED_DISTANCE, POWER
from ea_server.engine.components.ea_component import EaComponent
from ea_server.engine.components.fitness.functions import bound, power


class FitnessType(Enum):
    BoundedDistance = BOUNDED_DISTANCE
    Power = POWER


class Fitness(EaComponent):
    functions = {
        FitnessType.BoundedDistance: bound,
        FitnessType.Power: power
    }

    type_enum = FitnessType
