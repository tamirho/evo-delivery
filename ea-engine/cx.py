from deap import tools

class Crossovers():
    SINGLE_POINT = tools.cxOnePoint

    @classmethod
    def get_default(cls):
        return cls.SINGLE_POINT