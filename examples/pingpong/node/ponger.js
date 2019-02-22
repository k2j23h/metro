const _ = require('lodash')

module.exports = async (station) => {
  const pinger = {
    name: 'pinger',
    image: 'pinger:latest'
  }

  let pong = () => {
    station.log('pong')
    setTimeout(() => {
      station.signal('ponged').to(pinger).catch(_.noop)
    }, 1000)
  }

  station.grab(pinger).signal((msg, from) => {
    station.log(`${msg} from ${from.name}`)
    pong()
  })

  station.grab(pinger).blocked((msg, from) => {
    station.close()
  })
}
