import functools
from flask import Blueprint, jsonify
from ea_server.engine import main

api_blueprint = Blueprint('api', __name__, url_prefix='/api')


@api_blueprint.route('/ea', methods=['GET'])
def evaluate():
    return jsonify(main.data)
