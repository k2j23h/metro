const grpc = require('grpc')

const MetroService = require('./pb/Metro_grpc_pb')

module.exports = new MetroService.MetroClient(
  'localhost:50051',
  grpc.credentials.createInsecure()
)
