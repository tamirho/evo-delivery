import inspect
from enum import Enum

from ea_server.api.utils.constans import DEFAULT_BOUNDED_DISTANCE, BOUND, BOUNDED_DISTANCE, POWER
from ea_server.engine.components.fitness.fit_helper import bounded_distance_strategy, power_strategy


class FitnessType(Enum):
    BoundedDistance = BOUNDED_DISTANCE
    Power = POWER


class Fitness:

    FUNCTIONS = {
        FitnessType.BoundedDistance: bounded_distance_strategy,
        FitnessType.Power: power_strategy
    }

    @classmethod
    def get(cls, type: str):
        return cls.FUNCTIONS[FitnessType(type)]

    @classmethod
    def get_default_kwargs_names(cls, type: str):
        func = cls.get(type)
        args = inspect.getfullargspec(func).args[2:]
        return args

    @classmethod
    def default(cls):
        return cls.FUNCTIONS[FitnessType.BoundedDistance], {BOUND: DEFAULT_BOUNDED_DISTANCE}

    @classmethod
    def get_types(cls):
        return [e.value for e in FitnessType]

