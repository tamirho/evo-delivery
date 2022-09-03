from ea_server.engine.ea import EA

from ea_server.model.ea_request_model import EaConfigModel


class EABuilder:
    def __init__(self):
        self.data = None
        self.conf = None
        self.run_id = None
        pass

    def with_conf(self, conf: EaConfigModel, run_id:str="0"):
        self.conf = conf
        self.run_id = run_id
        return self

    def with_data(self, data):
        self.data = data
        return self

    def build(self):
        try:
            return EA(self.data, self.conf, self.run_id)
        except ValueError as err:
            print(f"Invalid parameter entered")
            raise EaBuilderError(err.args)


class EaBuilderError(Exception):
    pass
