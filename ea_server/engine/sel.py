from enum import Enum
from click import MissingParameter
from deap import tools


class SelectionTypes(Enum):
    TOURNAMENT = 'tournament'


class Selection():
    FUNCTIONS = {
        SelectionTypes.TOURNAMENT: tools.selTournament
    }

    KWARGS = {
        SelectionTypes.TOURNAMENT: ['tournsize']
    }

    @classmethod
    def default(cls):
        return cls.FUNCTIONS[SelectionTypes.TOURNAMENT], {"tournsize": 3}

    @classmethod
    def get(cls, type: str):
        return cls.FUNCTIONS[SelectionTypes(type)]

    @classmethod
    def get_kwargs(cls, type: str):
        return cls.KWARGS[SelectionTypes(type)]

    @classmethod
    def get_types(cls):
        return [e.value for e in SelectionTypes]

    @classmethod
    def validate(cls, type: str, **kwargs):
        if keys := cls.get_kwargs(type):
            missing = [key for key in keys if key not in kwargs]
            if len(missing) > 0:
                raise MissingParameter(
                    f'Missing keys {missing} for {type} (in {cls.__name__})')

        return True
