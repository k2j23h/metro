const MetroMessage = require('./pb/Metro_pb')

const station = require('./CurrentStation')
const app = require('./app')

function main () {
  app(station)
}

main()
