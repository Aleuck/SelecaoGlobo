run-db:
	sudo docker run --name aleuck-bbb-db -ti -d -p 3306:3306 paredao-db:v1
	sleep 10

run-be:
	sudo docker run --name aleuck-bbb-be -ti -d -p 3030:3030 paredao-be:v1

run-fe:
	sudo docker run --name aleuck-bbb-fe -ti -d -p 3000:3000 paredao-fe:v1

stop-db:
	sudo docker stop aleuck-bbb-db

stop-be:
	sudo docker stop aleuck-bbb-be

stop-fe:
	sudo docker stop aleuck-bbb-fe

rm-db:
	sudo docker rm aleuck-bbb-db

rm-be:
	sudo docker rm aleuck-bbb-be

rm-fe:
	sudo docker rm aleuck-bbb-fe

run: run-db run-be run-fe

stop: stop-fe stop-be stop-db

rm: rm-db rm-be rm-fe
