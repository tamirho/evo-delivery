from deap import tools

class Selection():
    TOURNAMENT = tools.selTournament

    @classmethod
    def get_default(cls):
        return cls.TOURNAMENT, {"tournsize": 3}