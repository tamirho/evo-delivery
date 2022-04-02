import functools
from flask import Blueprint, jsonify, request
from ea_server.api.utils import transform
from ea_server.engine.ea import EA
from ea_server.engine.cx import Crossovers
from ea_server.engine.mut import Mutates
from ea_server.engine.sel import Selection
import json
api_blueprint = Blueprint('api', __name__, url_prefix='/api/v1')


@api_blueprint.route('/ea', methods=['GET'])
def evaluate():
    data = request.get_json()

    ea = EA(data) \
        .set_pop_size(100) \
        .set_crossover(Crossovers.SINGLE_POINT) \
        .set_mutate(Mutates.SHUFFLE, indpb=0.05) \
        .set_selection(Selection.TOURNAMENT, tournsize=3) \

    result, log = ea.eval_model()
    best_individual = EA.get_best_individual(result)
    object_result = transform(best_individual,data)
    print('best individual: ', object_result)

    return object_result
