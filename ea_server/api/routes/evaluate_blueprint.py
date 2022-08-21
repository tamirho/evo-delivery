from click import MissingParameter
from dacite import MissingValueError
from flask import Blueprint
from werkzeug.exceptions import BadRequest, InternalServerError

from ea_server.api.utils.ea_builder import EABuilder, EaBuilderError
from ea_server.api.utils.http import to_draft_model
from ea_server.api.utils.parser import parse_result
from ea_server.engine.ea import EA
from ea_server.db import get_draft_by_id
import traceback

from ea_server.model.ea_request_model import EaDraftModel

import traceback
import logging

evaluate_blueprint = Blueprint('evaluate_blueprint', import_name=__name__)
LOG = logging.getLogger(__name__)

@evaluate_blueprint.route('/evaluate/<draft_id>', methods=['POST'])
def evaluate(draft_id):
    try:
        draft = dict(get_draft_by_id(draft_id))
        ea_request_model: EaDraftModel = to_draft_model(draft)

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
        best_individual = EA.get_best_individual(result)
        object_result = parse_result(best_individual, ea_request_model.data)

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
