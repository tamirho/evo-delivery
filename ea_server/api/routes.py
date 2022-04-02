import functools
from flask import Blueprint, jsonify, request
from ea_server.api.utils import transform
from ea_server.engine.ea import EA
from utils.ea_builder import EABuilder
from ea_server.engine.cx import Crossovers
from ea_server.engine.mut import Mutates
from ea_server.engine.sel import Selection
from werkzeug.datastructures import MultiDict

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
    object_result = transform(best_individual,data)
    print('best individual: ', object_result)

    return object_result
