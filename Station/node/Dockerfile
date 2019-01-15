FROM node:8-alpine AS node8-grpc

WORKDIR /usr/src/app

COPY "package.json" "package.json"

RUN npm install

FROM node:8-alpine

COPY --from=node8-grpc /usr/src/app /usr/src/app

WORKDIR /usr/src/app

COPY . .

ENTRYPOINT [ "node", "main" ]