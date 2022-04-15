from enum import Enum
from ea_server.engine.fit_helper import bounded_distance_strategy, power_strategy


class FitnessType(Enum):
    BoundedDistance = 'bounded_distance'
    Power = 'power'


class FitnessStrategy:

    #
    # KWARGS = {
    #     CrossoverTypes.SINGLE_POINT: []
    # }
    #
    @classmethod
    def get(cls, type: str):
        return cls.FUNCTIONS[FitnessType(type)]

    # todo: pass the numbers for the fitness function args
    # @classmethod
    # def get_kwargs(cls, type: str):
    #     return cls.KWARGS[CrossoverTypes(type)]

    @classmethod
    def default(cls):
        return cls.FUNCTIONS[FitnessType.BoundedDistance]

    @classmethod
    def get_types(cls):
        return [e.value for e in FitnessType]

    FUNCTIONS = {
        FitnessType.BoundedDistance: bounded_distance_strategy,
        FitnessType.Power: power_strategy
    }