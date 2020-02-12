sudo apt-get update
sudo apt-get install -y wget curl

# install nodejs
echo "Installing nodejs"
curl -sL https://deb.nodesource.com/setup_13.x | sudo bash -
sudo apt-get install -y nodejs

# install yarn
echo "Installing yarn"
curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -
echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list
sudo apt update && sudo apt install -y yarn

# installing npm dependencies
echo "Installing npm dependencies"
yarn

# building app
echo "Building app"
yarn build
