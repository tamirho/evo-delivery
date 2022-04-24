from click import MissingParameter
from flask import Blueprint, request
from werkzeug.exceptions import BadRequest, InternalServerError

from ea_server.api.utils.http_utils import get_json_body_from_request, request_to_model
from ea_server.api.utils.parser import parse_result
from ea_server.engine.cx import Crossover
from ea_server.engine.ea import EA
from ea_server.api.utils.ea_builder import EABuilder, EaBuilderError
from dacite import MissingValueError

from ea_server.engine.fit import Fitness
from ea_server.engine.mut import Mutate
from ea_server.engine.sel import Selection

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
    except (MissingValueError, EaBuilderError, MissingParameter) as e:
        raise BadRequest(e.__str__())
    except Exception as e:
        raise InternalServerError(e.__str__())

    try:
        result, log = ea.eval_model()
        best_individual = EA.get_best_individual(result)
        object_result = parse_result(best_individual, ea_request_model.data)
        print('best individual: ', object_result)
        return object_result
    except ValueError as e:
        raise BadRequest(e.__str__())
    except Exception as e:
        raise InternalServerError(e.__str__())


# todo routes move to inner folder
# todo maybe return types and kwargs in one response object
@api_v1_blueprint.route('/ea/sel/<type>/kwargs', methods=['GET'])
def get_selection_kwargs_by_type(type):
    return {"kwargs": Selection.get_default_kwargs_names(type)}


@api_v1_blueprint.route('/ea/fit/<type>/kwargs', methods=['GET'])
def get_fitness_kwargs_by_type(type):
    return {"kwargs": Fitness.get_default_kwargs_names(type)}


@api_v1_blueprint.route('/ea/cx/<type>/kwargs', methods=['GET'])
def get_crossover_kwargs_by_type(type):
    return {"kwargs": Crossover.get_default_kwargs_names(type)}


@api_v1_blueprint.route('/ea/mut/<type>/kwargs', methods=['GET'])
def get_mutate_kwargs_by_type(type):
    return {"kwargs": Mutate.get_default_kwargs_names(type)}


@api_v1_blueprint.route('/ea/sel/types', methods=['GET'])
def get_selection_types():
    return {"types": Selection.get_types()}


@api_v1_blueprint.route('/ea/fit/types', methods=['GET'])
def get_fitness_types():
    return {"types": Fitness.get_types()}


@api_v1_blueprint.route('/ea/cx/types', methods=['GET'])
def get_crossover_types():
    return {"types": Crossover.get_types()}


@api_v1_blueprint.route('/ea/mut/types', methods=['GET'])
def get_mutate_types():
    return {"types": Mutate.get_types()}
