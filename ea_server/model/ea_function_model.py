from dataclasses import dataclass
from typing import Callable, List


# class representation of possible kwarg of a Deap function
@dataclass
class KwargModel:
    name: str
    type: str
    description: str


# class representation of possible EA functions to choose
@dataclass
class EaFunctionModel:
    function: Callable
    description: str
    kwargs: List[KwargModel]
