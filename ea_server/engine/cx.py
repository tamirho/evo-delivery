from aifc import Error
from nis import match
from unittest import case
from deap import tools

class Crossovers():
    SINGLE_POINT = tools.cxOnePoint

    @classmethod
    def get_default(cls) -> function:
        return cls.SINGLE_POINT

    @classmethod
    def get(cls, type: str) -> function:
        if type == 'single-point':
            return cls.SINGLE_POINT
        
        raise ValueError('Invalid crossover name')