from flask import Blueprint, request
from ea_server.api.utils.parser import parse_result
from ea_server.engine.ea import EA
from ea_server.api.utils.ea_builder import EABuilder

api_v1_blueprint = Blueprint('api', __name__, url_prefix='/api/v1')


@api_v1_blueprint.route('/ea', methods=['GET'])
def evaluate():
    data = request.get_json()
    args = request.args

    ea = EABuilder() \
        .with_data(data) \
        .with_args(args) \
        .build()

    result, log = ea.eval_model()
    best_individual = EA.get_best_individual(result)
    object_result = parse_result(best_individual, data)
    print('best individual: ', object_result)

    return object_result
