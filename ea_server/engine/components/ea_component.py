from enum import Enum
from typing import List

from ea_server.data.deap_function_model import DeapFunctionModel


class EaComponent:

    functions = {}
    type_enum = None

    @classmethod
    def get(cls, type: str) -> DeapFunctionModel:
        return cls.functions[cls.type_enum(type)]

    @classmethod
    def get(cls) -> List[DeapFunctionModel]:
        return [cls.get(type) for type in cls.type_enum]

    @classmethod
    def get_details(cls):
        return [{
            "name": type.value,
            "description": cls.functions[type].description,
            "kwargs": [k.__dict__ for k in cls.functions[type].kwargs]
        } for type in cls.type_enum]

    # @classmethod
    # def validate(cls, type: str, **kwargs):
    #     args = cls.get_default_kwargs_names(type)
    #     missing = [arg for arg in args if arg not in kwargs]
    #     if len(missing) > 0:
    #         raise MissingParameter(f'Missing keys {missing} for {type} (in {cls.__name__})')
    #
    #     return True