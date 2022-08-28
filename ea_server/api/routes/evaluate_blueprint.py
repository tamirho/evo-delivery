from urllib import request
from click import MissingParameter
from dacite import MissingValueError
from flask import Blueprint
from werkzeug.exceptions import BadRequest, InternalServerError
from flask import request
from ea_server.api.utils.ea_builder import EABuilder, EaBuilderError
from ea_server.api.utils.http import get_json_body_from_request, to_draft_model
from ea_server.api.utils.parser import parse_result
from ea_server.engine.ea import EA

from ea_server.model.ea_request_model import EaDraftModel

import traceback
import logging

evaluate_blueprint = Blueprint('evaluate_blueprint', import_name=__name__)
LOG = logging.getLogger(__name__)
EaDict = {}

@evaluate_blueprint.route('/evaluate_update', methods=['POST'])
def evaluate_update():
    try:
        json_request_body=get_json_body_from_request(request)
        LOG.info("Call evaluate with request: %s'", json_request_body)
        draftModel: EaDraftModel = to_draft_model(json_request_body)
        ea = EABuilder() \
            .with_data(draftModel.data) \
            .with_conf(draftModel.config, draftModel.run_id) \
            .build()
        ea.run()
        EaDict[draftModel.run_id] = ea

        return "Ea algorithm is running , run_id= %d",(draftModel.run_id)
    except (MissingValueError, EaBuilderError, MissingParameter) as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise BadRequest(e.__str__())
    except Exception as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise InternalServerError(e.__str__())
    
@evaluate_blueprint.route('/evaluate_return', methods=['POST'])
def evaluate_return():
    try:
        json_request_body = get_json_body_from_request(request)
        json_request_body['run_id']="0"
        LOG.info("Call evaluate with request: %s'", json_request_body)
        ea_request_model: EaDraftModel = to_draft_model(json_request_body)
        ea = EABuilder() \
            .with_data(ea_request_model.data) \
            .with_conf(ea_request_model.config) \
            .build()
    except (MissingValueError, EaBuilderError, MissingParameter) as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise BadRequest(e.__str__())
    except Exception as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise InternalServerError(e.__str__())

    try:
        result, log = ea.evaluate()
        object_result = parse_result(result, ea_request_model.data)
        LOG.info('Best individual: %s', object_result)
        return object_result
    except ValueError as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise BadRequest(e.__str__())
    except Exception as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise InternalServerError(e.__str__())
        

@evaluate_blueprint.route('/terminate/<run_id>', methods=['POST'])
def terminate(run_id):
    try:
        print("equest.args")
        eaInstance : EA = EaDict.get(run_id, None)
        eaInstance.terminate() if eaInstance else {}
    
        return "Ea run id = %d terminated", (run_id)
    except (MissingValueError, EaBuilderError, MissingParameter) as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise BadRequest(e.__str__())
    except Exception as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise InternalServerError(e.__str__())