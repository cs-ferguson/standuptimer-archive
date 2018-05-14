STACK=standuptimer
DOCKER_REPO=chrisferg
APP_REPO=standuptimerapp
SERVER_REPO=standuptimerserver

dev:
	docker-compose up

start-local:
	docker swarm init; \
	docker secret create MYSQLUSER_PW ./secrets/MYSQLUSER_PW; \
	docker stack deploy -c docker-stack-local.yml $(STACK)

stop-local:
	docker stack rm $(STACK)
	docker swarm leave --force

remove-stack:
	docker stack rm $(STACK)

build-all:
	cd app;	npm run build; \
	docker build -t $(DOCKER_REPO)/$(APP_REPO):latest .; \
	docker push $(DOCKER_REPO)/$(APP_REPO):latest; \
	cd ../server; \
	docker build -t $(DOCKER_REPO)/$(SERVER_REPO):latest .; \
	docker push $(DOCKER_REPO)/$(APP_REPO):latest

app-build:
	cd app;	npm run build; \
	docker build -t $(DOCKER_REPO)/$(APP_REPO):latest .; \
	docker push $(DOCKER_REPO)/$(APP_REPO):latest

app-build-tag:
	@read -p "Enter version tag:" version; \
	cd app;	npm run build; \
	docker build -t $(DOCKER_REPO)/$(APP_REPO):$$version .; \
	docker push $(DOCKER_REPO)/$(APP_REPO):$$version

server-build:
	cd server; \
	docker build -t $(DOCKER_REPO)/$(SERVER_REPO):latest .; \
	docker push $(DOCKER_REPO)/$(APP_REPO):latest

server-build-tag:
	@read -p "Enter version tag:" version; \
	cd server; \
	docker build -t $(DOCKER_REPO)/$(SERVER_REPO):$$version .; \
	docker push $(DOCKER_REPO)/$(SERVER_REPO):$$version

rm-all:
	docker stop $$(docker ps -aq); docker rm $$(docker ps -aq)
