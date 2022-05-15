run:
	cd ea_server \
    export FLASK_APP=api \
    export FLASK_ENV=development \
    echo 'Start ea-engine' \
    flask run & \
    cd evo-delivery-app/evo-delivery-backend \
    echo 'Start evo-delivery-backend' \
    npm start
