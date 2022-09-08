from enum import Enum

from ea_server.api.utils.constants import BOUNDED_DISTANCE, POWER, MULTIPLY
from ea_server.engine.components.ea_component import EaComponent
from ea_server.engine.components.fitness.functions import bound, power, multiply


class FitnessType(Enum):
    BoundedDistance = BOUNDED_DISTANCE
    Power = POWER
    Multiply = MULTIPLY


class Fitness(EaComponent):
    functions = {
        FitnessType.BoundedDistance: bound,
        FitnessType.Power: power,
        FitnessType.Multiply: multiply
    }

    type_enum = FitnessType
