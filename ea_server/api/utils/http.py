from dacite import from_dict
import json
from ea_server.model.ea_request_model import EaDraftModel


def to_draft_model(draft_dict) -> EaDraftModel:
    return from_dict(data_class=EaDraftModel, data=draft_dict)

def get_json_body_from_request(request_obj):
    content_type = request_obj.headers.get('Content-Type')
    if content_type == 'application/json':
        json_request_body = request_obj.get_json()
    else:
        json_request_body = json.loads(request_obj.data)

    return json_request_body
