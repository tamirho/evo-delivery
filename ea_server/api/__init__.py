import json

import werkzeug
from flask import Flask
from werkzeug.exceptions import HTTPException

from ea_server.api.config import Config


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Import Blueprints
    from ea_server.api import routes

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
    app.register_blueprint(routes.api_v1_blueprint)
    app.register_error_handler(400, handle_exception)

    return app
