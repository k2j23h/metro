const grpc = require('grpc')

const MetroService = require('./pb/Metro_grpc_pb')
const promisify = require('grpc-promise').promisify

let cli = new MetroService.MetroClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
)
// require('grpc-promise').promisifyAll(cli)
promisify(cli, [
  'link',
  'transmit'
])

module.exports = cli
