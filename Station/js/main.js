const grpc = require('grpc')
const DirectorService = require('./pb/Director_grpc_pb')
const DirectorMessage = require('./pb/Director_pb')

const Station = require('./CurrentStation')
const app = require('./app')

function main () {
  let directorClient = new DirectorService.DirectorClient(
    'localhost:50051',
    grpc.credentials.createInsecure()
  )
  let station = new Station(directorClient)

  app()
}

main()
