FROM node:13-alpine

LABEL version="1.0"
LABEL description="Votação do BBB - Back-end"

ENV NODE_ENV production

ENV HOST localhost
ENV PORT 3030

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3030

CMD ["yarn", "start"]
