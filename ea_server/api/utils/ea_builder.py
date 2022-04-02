from ea_server.engine.ea import EA
from werkzeug.datastructures import MultiDict


class EABuilder:
    def __init__(self):
        self.data = {}
        self.args = MultiDict[str, str]()
        pass

    def with_data(self, data):
        self.data = data
        return self

    def with_args(self, args: MultiDict[str, str]):
        self.args = args
        return self

    def build(self):
        self.ea = EA(self.data)
        self.set_args()
        return self.ea

    def set_args(self):

        if num_orders := self.args.get('num_orders', type=int):
            self.ea.set_num_orders(num_orders)

        if num_drivers := self.args.get('num_drivers', type=int):
            self.ea.set_num_drivers(num_drivers)

        if crossover := self.args.get('crossover'):
            self.ea.set_crossover(crossover)

        if mutate := self.args.get('mutate'):
            # TODO: deal with selection kwargs and add validation
            self.ea.set_mutate(mutate)

        if selection := self.args.get('selection'):
            # TODO: deal with selection kwargs and add validation
            self.ea.set_selection(selection)

        if pop_size := self.args.get('pop_size', type=int):
            self.ea.set_pop_size(pop_size)

        if cxpb := self.args.get('cxpb', type=float):
            self.ea.set_cxpb(cxpb)

        if mutpd := self.args.get('mutpd', type=float):
            self.ea.set_mutpd(mutpd)

        if num_generations := self.args.get('num_generations', type=int):
            self.ea.set_num_generations(num_generations)
