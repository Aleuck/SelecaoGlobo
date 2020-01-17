FROM ubuntu:18.04

LABEL version="0.1"
LABEL description="Votação do BBB - Front-end"

ENV NODE_ENV=production

ADD . /app
WORKDIR /app

RUN apt-get update
RUN apt-get install -y wget curl

# install nodejs
RUN echo "Installing nodejs"
RUN curl -sL https://deb.nodesource.com/setup_13.x | bash -
RUN apt-get install -y nodejs

# install yarn
RUN echo "Installing yarn"
RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add -
RUN echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt update && apt install -y yarn

# installing npm dependencies
RUN echo "Installing npm dependencies"
RUN yarn

# building app
RUN echo "Building app"
RUN yarn build

EXPOSE 3000/tcp

CMD ["/usr/bin/yarn", "start"]
