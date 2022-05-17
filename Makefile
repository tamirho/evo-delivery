target: start-engine start-backend

start-engine:
	cd ea_server && \
	source virtualenv/bin/activate && \
	export FLASK_APP=api && \
	export FLASK_ENV=development && \
	flask run

start-backend:
	cd evo-delivery-app/evo-delivery-backend && \
	npm start

