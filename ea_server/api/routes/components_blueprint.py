from flask import Blueprint
from werkzeug.exceptions import BadRequest

from ea_server.engine.components.crossover.cx import Crossover
from ea_server.engine.components.fitness.fit import Fitness
from ea_server.engine.components.mutates.mut import Mutate
from ea_server.engine.components.selection.sel import Selection

components_blueprint = Blueprint('components_blueprint', import_name=__name__)


@components_blueprint.route('/<component>/details', methods=['GET'])
def get_component_details(component):
    if component == 'selection':
        types = Selection.get_details()
    elif component == 'fitness':
        types = Fitness.get_details()
    elif component == 'mutate':
        types = Mutate.get_details()
    elif component == 'crossover':
        types = Crossover.get_details()
    else:
        raise BadRequest("Invalid component name")

    return {"types": types}
