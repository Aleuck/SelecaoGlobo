##### Docker Network #####

create-network: .network
.network:
	# Create paredao-bbb network
	sudo docker network create --subnet 172.44.0.0/16 --ip-range 172.44.0.0/24 paredao-bbb
	touch .network

rm-network:
	# Remove paredao-bbb network
	sudo docker network rm paredao-bbb
	rm .network


##### Docker Images #####

create-img-db: .img-db
.img-db:
	# Create databse docker image
	sudo docker build -t paredao-db:v1 ./db
	touch .img-db

create-img-be: .img-be
.img-be:
	# Create back-end docker image
	sudo docker build -t paredao-be:v1 ./be
	touch .img-be

create-img-fe: .img-fe
.img-fe:
	# Create front-end docker image
	sudo docker build -t paredao-fe:v1 ./fe
	touch .img-fe


rm-img-db:
# Remove database docker image
	sudo docker image rm paredao-db:v1
	rm .img-db

rm-img-be:
# Remove back-end docker image
	sudo docker image rm paredao-be:v1
	rm .img-be

rm-img-fe:
# Remove front-end docker image
	sudo docker image rm paredao-fe:v1
	rm .img-fe


##### Docker Containers #####

create-container-db: .container-db
.container-db: .img-db .network
	# Create databse container
	sudo docker create --name aleuck-bbb-db -ti paredao-db:v1
	# Add database container to paredao-bbb network
	sudo docker network connect --ip 172.44.0.22 paredao-bbb aleuck-bbb-db
	touch .container-db

create-container-be: .container-be
.container-be: .img-be .network
	# Create backend container
	sudo docker create --name aleuck-bbb-be -ti paredao-be:v1
	# Add back-end container to paredao-bbb network
	sudo docker network connect --ip 172.44.0.11 paredao-bbb aleuck-bbb-be
	touch .container-be

create-container-fe: .container-fe
.container-fe: .img-fe .network
	# Create frontend container
	sudo docker create --name aleuck-bbb-fe -ti -p 3000:3000 paredao-fe:v1
	# Add front-end container to paredao-bbb network
	sudo docker network connect --ip 172.44.0.3 paredao-bbb aleuck-bbb-fe
	touch .container-fe


rm-container-db:
	# Remove database container
	sudo docker rm aleuck-bbb-db
	rm .container-db

rm-container-be:
	# Remove back-end container
	sudo docker rm aleuck-bbb-be
	rm .container-be

rm-container-fe:
	# Remove front-end container
	sudo docker rm aleuck-bbb-fe
	rm .container-fe


##### Docker Commands #####

start-db: .container-db wait-for-it
	# Starting existing database container
	sudo docker start aleuck-bbb-db
	# Waiting for database to startup...
	./wait-for-it.sh 172.44.0.22 3306

start-be: .container-be
	# Starting existing back-end container
	sudo docker start aleuck-bbb-be

start-fe: .container-fe
	# Starting existing front-end container
	sudo docker start aleuck-bbb-fe


stop-db:
	# Stop database container
	sudo docker stop aleuck-bbb-db

stop-be:
	# Stop back-end container
	sudo docker stop aleuck-bbb-be

stop-fe:
	# Stop front-end container
	sudo docker stop aleuck-bbb-fe


##### Helpers #####

wait-for-it:
	git clone https://github.com/vishnubob/wait-for-it.git


##### General Commands #####

# Creates all docker images
create-imgs: .img-db .img-be .img-fe

# Remove all docker images
rm-imgs: rm-img-db rm-img-be rm-img-fe

# Create all containers
create-containers: .container-db .container-be .container-fe

# Remove all containers
rm-containers: rm-container-db rm-container-be rm-container-fe

# Remove specific container and respective image
rm-db: rm-container-db rm-img-db
rm-be: rm-container-be rm-img-be
rm-fe: rm-container-fe rm-img-fe

# Start all containers
start-containers: start-db start-be start-fe

# Stop all containers
stop-containers: stop-fe stop-be stop-db

# Common commands
run: create-imgs create-containers start-containers
stop: stop-containers
rm-all: rm-containers rm-imgs rm-network
