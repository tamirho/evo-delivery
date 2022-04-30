import pytest
from ea_server.api import create_app


@pytest.fixture()
def app():
    app = create_app()
    app.config.update({
        "TESTING": True,
    })

    # other setup can go here

    yield app

    # clean up / reset resources here


@pytest.fixture()
def client(app):
    return app.test_client()


@pytest.fixture()
def api_version():
    return 'v1'


@pytest.fixture()
def ea_url(api_version):
    return f'/api/{api_version}/evaluate'


@pytest.fixture()
def test_data():
    return {
        "model": {
            "drivers": [
                {
                    "id": "11",
                    "max_capacity": 5,
                    "max_distance": 2
                },
                {
                    "id": "12",
                    "max_capacity": 6,
                    "max_distance": 8
                },
                {
                    "id": "13",
                    "max_capacity": 6,
                    "max_distance": 8
                }
            ],
            "orders": [
                {
                    "id": "1",
                    "weight": 5
                },
                {
                    "id": "2",
                    "weight": 5
                },
                {
                    "id": "3",
                    "weight": 5
                },
                {
                    "id": "4",
                    "weight": 5
                },
                {
                    "id": "5",
                    "weight": 5
                },
                {
                    "id": "6",
                    "weight": 5
                }
            ],
            "distances": {
                "0": {
                    "0": 0,
                    "1": 99,
                    "2": 99,
                    "3": 1,
                    "4": 1,
                    "5": 1,
                    "6": 33
                },
                "1": {
                    "0": 1,
                    "1": 99,
                    "2": 99,
                    "3": 99,
                    "4": 99,
                    "5": 99,
                    "6": 99
                },
                "2": {
                    "0": 1,
                    "1": 99,
                    "2": 0,
                    "3": 99,
                    "4": 99,
                    "5": 99,
                    "6": 99
                },
                "3": {
                    "0": 99,
                    "1": 99,
                    "2": 1,
                    "3": 0,
                    "4": 99,
                    "5": 99,
                    "6": 99
                },
                "4": {
                    "0": 99,
                    "1": 1,
                    "2": 99,
                    "3": 99,
                    "4": 0,
                    "5": 99,
                    "6": 99
                },
                "5": {
                    "0": 99,
                    "1": 99,
                    "2": 99,
                    "3": 99,
                    "4": 99,
                    "5": 0,
                    "6": 1
                },
                "6": {
                    "0": 1,
                    "1": 99,
                    "2": 99,
                    "3": 99,
                    "4": 99,
                    "5": 99,
                    "6": 99
                }
            }
        },
        "kwargs": {}
    }
