from urllib import request
from click import MissingParameter
from dacite import MissingValueError
from flask import Blueprint
from werkzeug.exceptions import BadRequest, InternalServerError
from ea_server.api import create_app
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

@evaluate_blueprint.route('/evaluate', methods=['POST'])
def evaluate():
    try:
        json_body=get_json_body_from_request(request)
        draftModel: EaDraftModel = to_draft_model(json_body)
        print(draftModel)
        ea = EABuilder() \
            .with_data(draftModel.data) \
            .with_conf(draftModel.config, draftModel.run_id) \
            .build()
        ea.run()
        EaDict[draftModel.run_id] = ea

        return "Ea algorithm is running"
    except (MissingValueError, EaBuilderError, MissingParameter) as e:
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
        EaDict[run_id].terminate()

        return "Ea run id= %d terminated"(run_id)
    except (MissingValueError, EaBuilderError, MissingParameter) as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise BadRequest(e.__str__())
    except Exception as e:
        LOG.error("Error in evaluate: %s", e.__str__())
        traceback.print_exc()
        raise InternalServerError(e.__str__())