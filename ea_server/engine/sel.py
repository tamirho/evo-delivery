from deap import tools


class Selection():
    TOURNAMENT = tools.selTournament

    @classmethod
    def get_default(cls):
        return cls.TOURNAMENT, {"tournsize": 3}

    @classmethod
    def get(cls, type: str):
        if type == 'tournament':
            return cls.TOURNAMENT

        raise ValueError('Invalid selection name')
