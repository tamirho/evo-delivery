import inspect
from enum import Enum
from click import MissingParameter
from deap import tools

from ea_server.api.utils.constans import SINGLE_POINT, TWO_POINTS, UNIFORM, PARTIAL_MATCHED, BLEND, INDPB, ALPHA


class CrossoverTypes(Enum):
    SinglePoint = SINGLE_POINT
    TwoPoints = TWO_POINTS
    Uniform = UNIFORM
    PartialMatched = PARTIAL_MATCHED
    Blend = BLEND


class Crossover:

    FUNCTIONS = {
        CrossoverTypes.SinglePoint: tools.cxOnePoint,
        CrossoverTypes.TwoPoints: tools.cxTwoPoints,
        CrossoverTypes.Uniform: tools.cxUniform,
        CrossoverTypes.PartialMatched: tools.cxPartialyMatched,
        CrossoverTypes.Blend: tools.cxBlend
    }

    @classmethod
    def default(cls):
        return cls.FUNCTIONS[CrossoverTypes.SinglePoint], {}

    @classmethod
    def get(cls, type: str):
        return cls.FUNCTIONS[CrossoverTypes(type)]

    @classmethod
    def get_default_kwargs_names(cls, type: str):
        func = cls.FUNCTIONS[CrossoverTypes(type)]
        args = inspect.getfullargspec(func).args[2:]
        return args

    @classmethod
    def get_types(cls):
        return [e.value for e in CrossoverTypes]

    @classmethod
    def validate(cls, type: str, **kwargs):
        if keys := cls.get_default_kwargs_names(type):
            missing = [key for key in keys if key not in kwargs]
            if len(missing) > 0:
                raise MissingParameter(f'Missing keys {missing} for {type} (in {cls.__name__})')

        return True
