from enum import Enum

from ea_server.api.utils.constans import TOURNAMENT, DEFAULT_TOUR_SIZE, ROULETTE, RANDOM, BEST, WORST
from ea_server.engine.components.ea_component import EaComponent
from ea_server.engine.components.selection.deap_functions import *


class SelectionTypes(Enum):
    Tournament = TOURNAMENT
    Roulette = ROULETTE
    Random = RANDOM
    Best = BEST
    Worst = WORST


class Selection(EaComponent):

    functions = {
            SelectionTypes.Tournament: tournament,
            SelectionTypes.Roulette: roulette,
            SelectionTypes.Random: random,
            SelectionTypes.Best: best,
            SelectionTypes.Worst: worst
        }

    type_enum = SelectionTypes

    @classmethod
    def default(cls):
        return cls.functions[SelectionTypes.Tournament].function, {TOUR_SIZE: DEFAULT_TOUR_SIZE}

