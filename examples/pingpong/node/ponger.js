const _ = require('lodash')

const accept = require('./template/accept.js')

// allow only one station to link
module.exports = accept(1, async (station, msg, from) => {
  let pong = (dst) => {
    station.log('pong')
    setTimeout(() => {
      // send signal to `dst` with message "ponged"
      station.signal('ponged').to(dst).catch(_.noop)
    }, 1000)
  }

  // listen signal from linked station
  station.grab(from).signal((msg, from) => {
    station.log(`${msg} from ${from.name}`)
    pong(from)
  })

  // listen block message from linked station
  station.grab(from).blocked((msg, from) => {
    // the `ponger` can not send messages to the linked Station anymore,
    // so there is nothing to do.

    // stop this activity
    station.close()
  })
})
