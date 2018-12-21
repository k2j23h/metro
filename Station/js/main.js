const MetroMessage = require('./pb/Metro_pb')

const Station = require('./CurrentStation')
const app = require('./app')

function main () {
  let metroClient = require('./MetroClient')
  let station = new Station(metroClient)
  console.log(station.token)

  app(station)

  let token = new MetroMessage.Token()
  token.setId('lkjh')

  let stream = metroClient.listen(token,
    /**
     * @typedef {import('./pb/Metro_pb').Signal} Signal
     * @param {Signal} msg
     */
    (err, msg) => {
      if (err) throw err
      console.log('asdf')
      console.log(msg.getMessage())
    })

  stream.on('data', (msg) => {
    console.log(msg.getMessage())
  })
  stream.on('end', () => {
    console.log('ended')
  })
}

main()
