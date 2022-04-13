from enum import Enum
from click import MissingParameter
from deap import tools


class CrossoverTypes(Enum):
    SINGLE_POINT = 'single_point'


class Crossover():

    FUNCTIONS = {
        CrossoverTypes.SINGLE_POINT: tools.cxOnePoint
    }

    KWARGS = {
        CrossoverTypes.SINGLE_POINT: []
    }

    @classmethod
    def default(cls):
        return (cls.FUNCTIONS[CrossoverTypes.SINGLE_POINT], {})

    @classmethod
    def get(cls, type: str):
        return cls.FUNCTIONS[CrossoverTypes(type)]

    @classmethod
    def get_kwargs(cls, type: str):
        return cls.KWARGS[CrossoverTypes(type)]

    @classmethod
    def get_types(cls):
        return [e.value for e in CrossoverTypes]

    @classmethod
    def validate(cls, type: str, **kwargs):
        if keys := cls.get_kwargs(type):
            missing = [key for key in keys if key not in kwargs]
            if len(missing) > 0:
                raise MissingParameter(
                    f'Missing keys {missing} for {type} (in {cls.__name__})')

        return True
