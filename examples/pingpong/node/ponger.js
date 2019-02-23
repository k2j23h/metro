const _ = require('lodash')

const accept = require('./template/accept.js')

module.exports = accept(1, async (station, msg, from) => {
  let pong = (dst) => {
    station.log('pong')
    setTimeout(() => {
      station.signal('ponged').to(dst).catch(_.noop)
    }, 1000)
  }

  station.grab(from).signal((msg, from) => {
    station.log(`${msg} from ${from.name}`)
    pong(from)
  })

  station.grab(from).blocked((msg, from) => {
    station.close()
  })
})
