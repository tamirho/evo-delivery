from flask import Blueprint
from ea_server.engine.components.crossover.cx import Crossover
from ea_server.engine.components.fitness.fit import Fitness
from ea_server.engine.components.mutates.mut import Mutate
from ea_server.engine.components.selection.sel import Selection

components_blueprint = Blueprint('components_blueprint', import_name=__name__)


@components_blueprint.route('/<component>/types', methods=['GET'])
def get_component_types(component):
    types = {}
    if component == 'selection':
        types = Selection.get_details()
    elif component == 'fitness':
        types = Fitness.get_details()
    elif component == 'mutate':
        types = Mutate.get_details()
    elif component == 'crossover':
        types = Crossover.get_details()

    return {"types": types}
