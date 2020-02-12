echo "1 - Upating repository information"
sudo apt update

echo "2 - Installing docker prerequisites"
sudo apt-get install  curl apt-transport-https ca-certificates software-properties-common

echo "3 - Adding docker repositories"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update

echo "4 - Installing docker"
sudo apt install docker-ce

sleep 2

echo "5 - Creating docker images"

echo "5.1 - Creating front-end image"
sudo docker build -t paredao-fe:v1 ./fe

echo "5.2 - Creating back-end image"
sudo docker build -t paredao-be:v1 ./be

echo "5.3 - Creating database image"
sudo docker build -t paredao-db:v1 ./db
