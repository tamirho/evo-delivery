from ea_server.engine.ea import EA

from ea_server.model.ea_request_model import EaConfigModel


class EABuilder:
    def __init__(self):
        self.data = None
        self.conf = None
        pass

    def with_conf(self, conf: EaConfigModel):
        self.conf = conf
        return self

    def with_data(self, data):
        self.data = data
        return self

    def build(self):
        try:
            return EA(self.data, self.conf)
        except ValueError as err:
            print(f"Invalid parameter entered")
            raise EaBuilderError(err.args)


class EaBuilderError(Exception):
    pass
