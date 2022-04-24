import inspect
from enum import Enum
from click import MissingParameter
from deap import tools

from ea_server.api.utils.constans import TOURNAMENT, TOUR_SIZE, DEFAULT_TOUR_SIZE, ROULETTE, RANDOM, BEST, WORST


class SelectionTypes(Enum):
    Tournament = TOURNAMENT
    Roulette = ROULETTE
    Random = RANDOM
    Best = BEST
    Worst = WORST


class Selection:

    FUNCTIONS = {
        SelectionTypes.Tournament: tools.selTournament,
        SelectionTypes.Roulette: tools.selRoulette,
        SelectionTypes.Random: tools.selRandom,
        SelectionTypes.Best: tools.selBest,
        SelectionTypes.Worst: tools.selWorst
    }

    @classmethod
    def default(cls):
        return cls.FUNCTIONS[SelectionTypes.Tournament], {TOUR_SIZE: DEFAULT_TOUR_SIZE}

    @classmethod
    def get(cls, type: str):
        return cls.FUNCTIONS[SelectionTypes(type)]

    @classmethod
    def get_default_kwargs_names(cls, type: str):
        func = cls.FUNCTIONS[SelectionTypes(type)]
        args = inspect.getfullargspec(func).args[2:-1]
        return args

    @classmethod
    def get_types(cls):
        return [e.value for e in SelectionTypes]

    @classmethod
    def validate(cls, type: str, **kwargs):
        args = cls.get_default_kwargs_names(type)
        missing = [arg for arg in args if arg not in kwargs]
        if len(missing) > 0:
            raise MissingParameter(f'Missing keys {missing} for {type} (in {cls.__name__})')

        return True
