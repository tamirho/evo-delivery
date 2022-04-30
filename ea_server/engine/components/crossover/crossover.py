import inspect
from enum import Enum

from ea_server.api.utils.constans import SINGLE_POINT, TWO_POINTS, UNIFORM, PARTIAL_MATCHED, BLEND
from ea_server.engine.components.crossover.deap_fucntions import single_point, blend, partial_matched, uniform, \
    two_points
from ea_server.engine.components.ea_component import EaComponent


class CrossoverTypes(Enum):
    SinglePoint = SINGLE_POINT
    TwoPoints = TWO_POINTS
    Uniform = UNIFORM
    PartialMatched = PARTIAL_MATCHED
    Blend = BLEND


class Crossover(EaComponent):

    functions = {
        CrossoverTypes.SinglePoint: single_point,
        CrossoverTypes.TwoPoints: two_points,
        CrossoverTypes.Uniform: uniform,
        CrossoverTypes.PartialMatched: partial_matched,
        CrossoverTypes.Blend: blend
    }

    type_enum = CrossoverTypes

    @classmethod
    def default(cls):
        return cls.functions[CrossoverTypes.SinglePoint].function, {}

# @classmethod
# def validate(cls, type: str, **kwargs):
#     if keys := cls.get_default_kwargs_names(type):
#         missing = [key for key in keys if key not in kwargs]
#         if len(missing) > 0:
#             raise MissingParameter(f'Missing keys {missing} for {type} (in {cls.__name__})')
#
#     return True
