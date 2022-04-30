from enum import Enum
from click import MissingParameter
from deap import tools

from ea_server.api.utils.constans import INDPB, DEFAULT_INDPB, SHUFFLE, GAUSSIAN, FLIP_BIT
import inspect


class MutatesTypes(Enum):
    Shuffle = SHUFFLE
    Gaussian = GAUSSIAN
    FlipBit = FLIP_BIT


class Mutate:

    FUNCTIONS = {
        MutatesTypes.Shuffle: tools.mutShuffleIndexes,
        MutatesTypes.Gaussian: tools.mutGaussian
    }

    @classmethod
    def default(cls):
        return cls.FUNCTIONS[MutatesTypes.Shuffle], {INDPB: DEFAULT_INDPB}

    @classmethod
    def get(cls, type: str):
        return cls.FUNCTIONS[MutatesTypes(type)]

    @classmethod
    def get_default_kwargs_names(cls, type: str):
        func = cls.get(type)
        args = inspect.getfullargspec(func).args[1:]
        return args

    @classmethod
    def get_types(cls):
        return [e.value for e in MutatesTypes]

    @classmethod
    def validate(cls, type: str, **kwargs):
        args = cls.get_default_kwargs_names(type)
        missing = [arg for arg in args if arg not in kwargs]
        if len(missing) > 0:
            raise MissingParameter(f'Missing keys {missing} for {type} (in {cls.__name__})')

        return True
