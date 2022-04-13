from ea_server.engine.ea import EA
from werkzeug.datastructures import MultiDict


class EABuilder:
    def __init__(self):
        self.data = {}
        self.args = MultiDict[str, str]()
        self.ea = None
        pass

    def with_data(self, data):
        self.data = data
        return self

    def with_args(self, args: MultiDict[str, str]):
        self.args = args
        return self

    def build(self):
        self.validate_data()
        self.ea = EA(self.data)
        self.set_args()
        return self.ea

    def set_args(self):
        if num_orders := self.args.get('num_orders', type=int):
            self.ea.set_num_orders(num_orders)

        if num_drivers := self.args.get('num_drivers', type=int):
            self.ea.set_num_drivers(num_drivers)

        if crossover := self.args.get('crossover'):
            kwargs = self.data.get('crossover_kwargs', {})
            self.ea.set_crossover(crossover, **kwargs)

        if mutate := self.args.get('mutate'):
            kwargs = self.data.get('mutate_kwargs', {})
            self.ea.set_mutate(mutate, **kwargs)

        if selection := self.args.get('selection'):
            kwargs = self.data.get('selection_kwargs', {})
            self.ea.set_selection(selection, **kwargs)

        if pop_size := self.args.get('pop_size', type=int):
            self.ea.set_pop_size(pop_size)

        if cxpb := self.args.get('cxpb', type=float):
            self.ea.set_cxpb(cxpb)

        if mutpd := self.args.get('mutpd', type=float):
            self.ea.set_mutpd(mutpd)

        if num_generations := self.args.get('num_generations', type=int):
            self.ea.set_num_generations(num_generations)

    def validate_data(self):
        for key in EA.REQUIRED_DATA_KEYS:
            if self.data.get(key) is None:
                raise ValueError(f'Missing {key} in data')
