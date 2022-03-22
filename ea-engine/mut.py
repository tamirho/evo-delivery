from deap import tools

class Mutates():
    SHUFFLE = tools.mutShuffleIndexes

    @classmethod
    def get_default(cls):
        return cls.SHUFFLE, {"indpb": 0.05}