import abc
from typing import List

from ea_server.model.ea_function_model import EaFunctionModel
from abc import ABC


class EaComponent(ABC):
    functions = {}
    type_enum = None

    @classmethod
    def get(cls, type: str) -> EaFunctionModel:
        return cls.functions[cls.type_enum(type)]

    @classmethod
    def get(cls) -> List[EaFunctionModel]:
        return [cls.get(type) for type in cls.type_enum]

    @classmethod
    def get_details(cls):
        return [{
            "name": type.value,
            "description": cls.functions[type].description,
            "kwargs": [k.__dict__ for k in cls.functions[type].kwargs]
        } for type in cls.type_enum]

    @classmethod
    @abc.abstractmethod
    def default(cls):
        """return default function"""
        return
