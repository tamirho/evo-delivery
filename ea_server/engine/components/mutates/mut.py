from enum import Enum
from ea_server.api.utils.constants import SHUFFLE, FLIP_BIT

from ea_server.engine.components.ea_component import EaComponent
from ea_server.engine.components.mutates.functions import shuffle, flip_bit


class MutatesTypes(Enum):
    Shuffle = SHUFFLE
    FlipBit = FLIP_BIT


class Mutate(EaComponent):
    functions = {
        MutatesTypes.Shuffle: shuffle,
        MutatesTypes.FlipBit: flip_bit
    }

    type_enum = MutatesTypes
