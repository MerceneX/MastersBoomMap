deploy-dev-from-development:
		git checkout development
		git reset --hard
		git pull
		docker-compose build && docker-compose up -d

build-prod-from-development:
		git checkout development
		git reset --hard
		git pull
		docker-compose -f docker-compose.yml -f docker-compose.production.yml build && docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
		rm -rf ../dockerImages
		mkdir ../dockerImages
		docker save boommap_react > ../dockerImages/boommap_react.tar
		docker save boommap_server > ../dockerImages/boommap_server.tar

deploy-dev-from-master:
		git checkout master
		git reset --hard
		git pull
		docker-compose build && docker-compose up -d

build-prod-from-master:
		git checkout master
		git reset --hard
		git pull
		docker-compose -f docker-compose.yml -f docker-compose.production.yml build && docker-compose -f docker-compose.yml -f docker-compose.production.yml up -d
		rm -rf ../dockerImages
		mkdir ../dockerImages
		docker save boommap_react > ../dockerImages/boommap_react.tar
		docker save boommap_server > ../dockerImages/boommap_server.tar
