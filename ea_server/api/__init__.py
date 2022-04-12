import os
from flask import Flask
from ea_server.api.config import Config


def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Import Blueprints
    from ea_server.api import routes

    # Register Blueprints
    app.register_blueprint(routes.api_v1_blueprint)

    return app
