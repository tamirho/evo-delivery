from enum import Enum

from ea_server.api.utils.constants import SINGLE_POINT, TWO_POINTS, UNIFORM, PARTIAL_MATCHED, BLEND
from ea_server.engine.components.crossover.functions import single_point, blend, partial_matched, uniform, \
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
