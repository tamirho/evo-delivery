from ea_server.engine.ea import EA
from werkzeug.datastructures import MultiDict


class EABuilder:
    def __init__(self):
        self.data = {}
        self.kwargs = {}
        self.args = MultiDict[str, str]()
        self.ea = None
        pass

    def with_data(self, data):
        self.data = data
        return self

    def with_args(self, args: MultiDict[str, str]):
        self.args = args
        return self

    def with_kwargs(self, kwargs):
        self.kwargs = kwargs
        return self

    def build(self):
        self.ea = EA(self.data)
        self._build_args()
        return self.ea

    def _build_args(self):
        try:
            if crossover := self.args.get('crossover'):
                kwargs = self.kwargs.get('crossover_kwargs', {})
                self.ea.set_crossover(crossover, **kwargs)

            if mutate := self.args.get('mutate'):
                kwargs = self.kwargs.get('mutate_kwargs', {})
                self.ea.set_mutate(mutate, **kwargs)

            if selection := self.args.get('selection'):
                kwargs = self.kwargs.get('selection_kwargs', {})
                self.ea.set_selection(selection, **kwargs)

            if fitness := self.args.get('fitness'):
                kwargs = self.kwargs.get('fitness_kwargs', {})
                self.ea.set_fitness(fitness, **kwargs)

            if pop_size := self.args.get('pop_size', type=int):
                self.ea.set_pop_size(pop_size)

            if cxpb := self.args.get('cxpb', type=float):
                self.ea.set_cxpb(cxpb)

            if mutpd := self.args.get('mutpd', type=float):
                self.ea.set_mutpd(mutpd)

            if num_generations := self.args.get('num_generations', type=int):
                self.ea.set_num_generations(num_generations)

        except ValueError as err:
            print(f"Invalid parameter entered")
            raise EaBuilderError(err.args)


class EaBuilderError(Exception):
    pass
