FROM node:13-alpine

LABEL version="1.0"
LABEL description="Votação do BBB - Back-end"

ENV NODE_ENV production

ENV HOST 172.44.0.11
ENV PORT 3030
ENV DATABASE_URL "mysql://paredao_bbb:p4r3d40_bbb_aleuck!@172.44.0.22:3306/paredao_bbb"

WORKDIR /usr/src/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install

COPY . .

EXPOSE 3030

CMD ["yarn", "start"]
