import pytest
from dacite import from_dict, MissingValueError

from ea_server.data.ea_request_model import EaData, Driver, Order


def test_valid_data(valid_data, expected_data_model):
    ea_data = from_dict(data_class=EaData, data=valid_data)
    assert ea_data == expected_data_model


def test_invalid_driver(missing_driver_data):
    with pytest.raises(MissingValueError) as exp:
        from_dict(data_class=EaData, data=missing_driver_data)
    assert "drivers.max_distance" in str(exp.value)


def test_missing_from_order_distances(missing_order_distances_data):
    with pytest.raises(MissingValueError) as exp:
        from_dict(data_class=EaData, data=missing_order_distances_data)
    assert "missing value for field" in str(exp.value)


def test_missing_to_order_distance(missing_to_order_distance):
    with pytest.raises(MissingValueError) as exp:
        from_dict(data_class=EaData, data=missing_to_order_distance)
    assert "missing value for field" in str(exp.value)


@pytest.fixture()
def expected_data_model():
    return EaData(
        drivers=[Driver(id="11", max_capacity=6, max_distance=8),
                 Driver(id="12", max_capacity=6, max_distance=7)],
        orders=[Order(id="1", weight=5)],
        distances={
                "0": {
                    "0": 0,
                    "1": 99,
                },
                "1": {
                    "0": 1,
                    "1": 99
                }
        })


@pytest.fixture()
def valid_data():
    return {
        "drivers": [
            {
                "id": "11",
                "max_capacity": 6,
                "max_distance": 8
            },
            {
                "id": "12",
                "max_capacity": 6,
                "max_distance": 7
            },
        ],
        "orders": [
            {
                "id": "1",
                "weight": 5
            }
        ],
        "distances": {
            "0": {
                "0": 0,
                "1": 99,
            },
            "1": {
                "0": 1,
                "1": 99
            }
        }
    }

@pytest.fixture()
def missing_driver_data():
    return {
        "drivers": [
            {
                "id": "11",
                "max_capacity": 5,
            },
            {
                "id": "12",
                "max_capacity": 6,
                "max_distance": 8
            },
        ],
        "orders": [
            {
                "id": "1",
                "weight": 5
            },
            {
                "id": "2",
                "weight": 5
            }
        ],
        "distances": {
            "0": {
                "0": 0,
                "1": 99,
                "2": 99,
            },
            "1": {
                "0": 1,
                "1": 99,
                "2": 99,
            },
            "2": {
                "0": 1,
                "1": 99,
                "2": 0,
            }
        }
    }

@pytest.fixture()
def missing_order_distances_data():
    return {
        "drivers": [
            {
                "id": "11",
                "max_capacity": 5,
                "max_distance": 8
            },
            {
                "id": "12",
                "max_capacity": 6,
                "max_distance": 8
            },
        ],
        "orders": [
            {
                "id": "1",
                "weight": 5
            },
            {
                "id": "2",
                "weight": 5
            }
        ],
        "distances": {
            "0": {
                "0": 0,
                "1": 99,
                "2": 99,
            },
            "2": {
                "0": 1,
                "1": 99,
                "2": 0,
            }
        }
    }

@pytest.fixture()
def missing_to_order_distance():
    return {
        "drivers": [
            {
                "id": "11",
                "max_capacity": 5,
                "max_distance": 8
            },
            {
                "id": "12",
                "max_capacity": 6,
                "max_distance": 8
            },
        ],
        "orders": [
            {
                "id": "1",
                "weight": 5
            },
            {
                "id": "2",
                "weight": 5
            }
        ],
        "distances": {
            "0": {
                "0": 0,
                "1": 99,
                "2": 99,
            },
            "1": {
                "0": 1,
                "1": 99,
                "2": 99,
            },
            "2": {
                "0": 1,
                "1": 99,
            }
        }
    }