FROM node:8-alpine

WORKDIR /usr/src/app

ADD . .

RUN ls && npm install

CMD [ "node", "main.js" ]