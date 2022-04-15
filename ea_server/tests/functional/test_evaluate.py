import json


def test_evaluate_response(client, ea_url, test_data):
    """
    GIVEN a Flask application
    WHEN the '/api/v1/ea' route is requested (POST)
    THEN check that the response is valid
    """

    with client:
        response = client.post(ea_url, json=test_data)
        res = json.loads(response.data.decode('utf-8'))

        res_drivers = res.keys()
        data_drivers = [driver['id'] for driver in test_data['drivers']]

        assert set(res_drivers) == set(data_drivers)
        assert len(res_drivers) == len(data_drivers)

        res_orders = [order for orderlist in res.values()
                      for order in orderlist]
        data_orders = [order['id'] for order in test_data['orders']]
        assert set(res_orders) == set(data_orders)
        assert len(res_orders) == len(data_orders)

        for path in [['5', '6'], ['3', '2'], ['4', '1']]:
            assert path in res.values()


def test_evaluate_when_content_type_is_json(client, ea_url, test_data):
    with client:
        response = client.post(ea_url, json=test_data)

        assert response.status_code == 200


def test_evaluate_when_content_type_is_data(client, ea_url, test_data):
    with client:
        response = client.post(ea_url, data=json.dumps(test_data))

        assert response.status_code == 200
