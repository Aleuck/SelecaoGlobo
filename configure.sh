echo " # Upating repository information"
sudo apt update
sudo apt upgrade

echo " # Uninstalling older versions of docker if necessary"
sudo apt-get remove docker docker-engine docker.io containerd runc

echo " # Installing prerequisites"
sudo apt-get install git curl apt-transport-https ca-certificates software-properties-common

echo " # Adding docker repositories"
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt update

echo " # Installing docker"
sudo apt-get install docker-ce docker-ce-cli containerd.io
