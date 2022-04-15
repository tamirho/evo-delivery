from flask import Blueprint, json, request
from werkzeug.exceptions import abort

from ea_server.api.utils.parser import parse_result
from ea_server.engine.ea import EA
from ea_server.api.utils.ea_builder import EABuilder, EaBuilderError

api_v1_blueprint = Blueprint('api', __name__, url_prefix='/api/v1')


@api_v1_blueprint.route('/ea', methods=['POST'])
def evaluate():
    content_type = request.headers.get('Content-Type')
    if content_type == 'application/json':
        data = request.get_json()
    else:
        data = json.loads(request.data)

    args = request.args

    try:
        ea = EABuilder() \
            .with_data(data) \
            .with_args(args) \
            .build()
    except EaBuilderError as exp:
        raise abort(400, exp.args)

    result, log = ea.eval_model()
    best_individual = EA.get_best_individual(result)
    object_result = parse_result(best_individual, data)
    print('best individual: ', object_result)

    return object_result
