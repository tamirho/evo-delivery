from enum import Enum

from ea_server.api.utils.constants import TIME, GENERATIONS, FITNESS
from ea_server.engine.components.ea_component import EaComponent
from ea_server.engine.components.stop_condition.functions import time, fitness, generations


class StopConditionType(Enum):
    Time = TIME
    Generations = GENERATIONS
    Fitness = FITNESS

class StopCondition(EaComponent):
    functions = {
        StopConditionType.Time: time,
        StopConditionType.Generations: generations,
        StopConditionType.Fitness: fitness
    }

    type_enum = StopConditionType
