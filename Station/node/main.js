const MetroMessage = require('./pb/Metro_pb')

const station = require('./Station')
const app = require('./app')

async function main () {
  await app(station)
}

main()
