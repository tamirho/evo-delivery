import json
from dacite import from_dict

from ea_server.data.ea_request_model import EaRequestModel


def get_json_body_from_request(request_obj):
    content_type = request_obj.headers.get('Content-Type')
    if content_type == 'application/json':
        json_request_body = request_obj.get_json()
    else:
        json_request_body = json.loads(request_obj.data)

    return json_request_body


def request_to_model(raw_request) -> EaRequestModel:
    return from_dict(data_class=EaRequestModel, data=raw_request)
