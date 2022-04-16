from flask import Blueprint, request
from werkzeug.exceptions import BadRequest, InternalServerError

from ea_server.api.utils.http_utils import get_json_body_from_request, request_to_model
from ea_server.api.utils.parser import parse_result
from ea_server.engine.ea import EA
from ea_server.api.utils.ea_builder import EABuilder, EaBuilderError
from dacite import MissingValueError

api_v1_blueprint = Blueprint('api', __name__, url_prefix='/api/v1')


@api_v1_blueprint.route('/ea', methods=['POST'])
def evaluate():
    try:
        json_request_body = get_json_body_from_request(request)
        ea_request_model = request_to_model(json_request_body)
        request_args = request.args
        ea = EABuilder() \
            .with_data(ea_request_model.data) \
            .with_args(request_args) \
            .with_kwargs(ea_request_model.kwargs) \
            .build()
    except (MissingValueError, Exception) as e:
        raise BadRequest(e.__str__())

    try:
        result, log = ea.eval_model()
        best_individual = EA.get_best_individual(result)
        object_result = parse_result(best_individual, ea_request_model.data)
        print('best individual: ', object_result)
    except Exception as e:
        raise InternalServerError(e.args)

    return object_result
