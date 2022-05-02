from enum import Enum
from deap import tools

from ea_server.api.utils.constans import INDPB, DEFAULT_INDPB, SHUFFLE, GAUSSIAN, FLIP_BIT

from ea_server.engine.components.ea_component import EaComponent
from ea_server.engine.components.mutates.functions import shuffle, flip_bit


class MutatesTypes(Enum):
    Shuffle = SHUFFLE
    Gaussian = GAUSSIAN
    FlipBit = FLIP_BIT


class Mutate(EaComponent):
    functions = {
        MutatesTypes.Shuffle: shuffle,
        MutatesTypes.Gaussian: flip_bit
    }

    type_enum = MutatesTypes

    @classmethod
    def default(cls):
        return cls.functions[MutatesTypes.Shuffle].function, {INDPB: DEFAULT_INDPB}
