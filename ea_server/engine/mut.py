from enum import Enum
from click import MissingParameter
from deap import tools


class MutatesTypes(Enum):
    SHUFFLE = 'shuffle'


class Mutate():

    FUNCTIONS = {
        MutatesTypes.SHUFFLE: tools.mutShuffleIndexes
    }

    KWARGS = {
        MutatesTypes.SHUFFLE: ['indpb']
    }

    @classmethod
    def default(cls):
        return cls.FUNCTIONS[MutatesTypes.SHUFFLE], {"indpb": 0.05}

    @classmethod
    def get(cls, type: str):
        return cls.FUNCTIONS[MutatesTypes(type)]

    @classmethod
    def get_kwargs(cls, type: str):
        return cls.KWARGS[MutatesTypes(type)]

    @classmethod
    def get_types(cls):
        return [e.value for e in MutatesTypes]

    @classmethod
    def validate(cls, type: str, **kwargs):
        if keys := cls.get_kwargs(type):
            missing = [key for key in keys if key not in kwargs]
            if len(missing) > 0:
                raise MissingParameter(
                    f'Missing keys {missing} for {type} (in {cls.__name__})')

        return True
