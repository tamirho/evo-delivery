target: start-engine start-app

start-engine:
	cd ea_server && \
	source virtualenv/bin/activate && \
	pip3 install -r requirements.txt  && \
	export FLASK_APP=api && \
	export FLASK_ENV=development && \
	flask run

start-backend:
	cd evo-delivery-app/evo-delivery-backend && \
	npm install && \
	npm start

start-frontend:
	cd evo-delivery-app/evo-delivery-frontend && \
	npm install && \
	npm start

start-app:
	cd evo-delivery-app && \
	npm run start:debug
