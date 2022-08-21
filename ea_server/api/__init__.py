import json
import logging
import werkzeug
from flask import Flask
from werkzeug.exceptions import HTTPException

from ea_server.api.config import Config

from flask import Flask

import os
import configparser

def create_app():
    app = Flask(__name__)

    config = configparser.ConfigParser()
    config.read(os.path.abspath(os.path.join(".ini")))

    app.config['MONGO_URI'] = config['TEST']['DB_URI']
    app.config['SECRET_KEY'] = config['TEST']['SECRET_KEY']

    logging.basicConfig(level=logging.DEBUG, format=f'%(asctime)s %(levelname)s %(name)s : %(message)s')

    # Import Blueprints
    from ea_server.api.routes import evaluate_blueprint, components_blueprint

    @app.errorhandler(HTTPException)
    def handle_exception(e):
        """Return JSON instead of HTML for HTTP errors."""
        response = e.get_response()
        response.data = json.dumps({
            "code": e.code,
            "name": e.name,
            "description": e.description,
        })
        response.content_type = "application/json"
        return response

    # Register Blueprints
    app.register_blueprint(evaluate_blueprint.evaluate_blueprint, url_prefix='/api/v1')
    app.register_blueprint(components_blueprint.components_blueprint, url_prefix='/api/v1')

    return app
