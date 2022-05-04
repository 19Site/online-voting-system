#! /bin/sh

# this path
CURRENT_PATH=$(cd $(dirname ${0}) ; pwd -P)

# parent path
CURRENT_PARENT_PATH=$(dirname ${CURRENT_PATH})

# check docker command
if [ "$(command -v docker)" = "" ]; then

	# get docker install script
	curl -fsSL https://get.docker.com -o get-docker.sh

	# install docker
	sudo sh get-docker.sh

	# remove install script
	rm get-docker.sh
fi

# remove docker subnet
docker network rm ovs-net

# create docker subnet
docker network create -d bridge --subnet 172.11.0.0/16 ovs-net

# remove existing docker image container
docker rm -f ovs-mysql-container

# create data folder
mkdir -p ${CURRENT_PATH}/data

# build mysql config file
bash -c "/bin/cat > ${CURRENT_PATH}/data/mysqld.cnf" <<EOM 
[mysqld]
pid-file=/var/run/mysqld/mysqld.pid
socket=/var/run/mysqld/mysqld.sock
datadir=/var/lib/mysql
log-error=/var/log/mysql/error.log
bind-address=0.0.0.0
symbolic-links=0
EOM

# deploy mysql docker
docker run \
	--log-opt max-size=10m \
	--log-opt max-file=5 \
	--name ovs-mysql-container \
	--restart always \
	--net ovs-net \
	--ip 172.11.0.2 \
	-itd \
	-v ${CURRENT_PATH}/data/mysql/data:/var/lib/mysql \
	-v ${CURRENT_PATH}/data/mysql/log:/var/log/mysql \
	-v ${CURRENT_PATH}/data:/etc/mysql/mysql.conf.d/mysqld.cnf \
	-e MYSQL_ROOT_PASSWORD=password \
	mysql:8.0.27

# udpate docker mysql root password
while ! docker exec ovs-mysql-container mysql --user=root --password=password -e 'select 1'; do

	echo "Waiting for database connection..."
	
	sleep 2
done

# update password
docker exec -it ovs-mysql-container mysql -ppassword -e "alter user 'root'@'%' identified with mysql_native_password by 'password';"

# flush privileges
docker exec -it ovs-mysql-container mysql -ppassword -e "flush privileges;"

# create database
docker exec -it ovs-mysql-container mysql -ppassword -e "create database if not exists online_voting_system;"

# remove docker container
docker rm -f node-app

# build docker container
docker run --net ovs-net -itd --ip 172.11.0.3 -p 53080:53080 --name node-app -v $CURRENT_PARENT_PATH:$CURRENT_PARENT_PATH node:16-bullseye

# start backend install
docker exec -it -w $CURRENT_PARENT_PATH/backend node-app npm install

# start backend build
docker exec -it -w $CURRENT_PARENT_PATH/backend node-app npm run build

# start backend run
docker exec -itd -w $CURRENT_PARENT_PATH/backend node-app npm run start:prod

# start frontend install
docker exec -it -w $CURRENT_PARENT_PATH/frontend node-app npm install

# start frontend build
docker exec -it -w $CURRENT_PARENT_PATH/frontend node-app npm run build

# start frontend run
docker exec -it -w $CURRENT_PARENT_PATH/frontend node-app npm run start