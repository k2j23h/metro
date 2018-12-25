FROM node:8-alpine

WORKDIR /usr/src/app

# Station/js will be provided by npm
# perhaps...
COPY ./temp/. .

RUN ls && npm install

CMD [ "node", "main.js" ]