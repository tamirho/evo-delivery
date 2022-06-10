from dacite import from_dict

from ea_server.model.ea_request_model import EaDraftModel


def to_draft_model(draft_dict) -> EaDraftModel:
    return from_dict(data_class=EaDraftModel, data=draft_dict)
