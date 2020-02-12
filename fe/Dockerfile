FROM node:13-alpine

LABEL version="1.0"
LABEL description="Votação do BBB - Front-end"

ENV NODE_ENV production

ADD . /app
WORKDIR /app

# installing npm dependencies
RUN echo "Installing npm dependencies"
RUN yarn

# building app
RUN echo "Building app"
RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]
