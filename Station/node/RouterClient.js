const grpc = require('grpc')

const RouterService = require('./pb/Router_grpc_pb')
const promisify = require('grpc-promise').promisify

console.log(`host of metro server is ${process.env.LOCO_METRO_SERVER_HOST}`)
console.log(`port of metro server is ${process.env.LOCO_METRO_SERVER_PORT}`)

let cli = new RouterService.RouterClient(
  `${process.env.LOCO_METRO_SERVER_HOST}:${process.env.LOCO_METRO_SERVER_PORT}`,
  grpc.credentials.createInsecure()
)
// require('grpc-promise').promisifyAll(cli)
promisify(cli, [
  'block',
  'link',
  'transmit'
])

module.exports = cli
