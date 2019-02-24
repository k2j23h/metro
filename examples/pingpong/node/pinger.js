const _ = require('lodash')

// description of ponger
const ponger = {
  name: 'ponger',
  image: 'ponger:latest'
}

module.exports = async (station, msg) => {
  // this variable sustained during workflow runtime
  let cnt = 3

  if (msg.length > 0) {
    let n = _.toNumber(msg[0])
    if (!_.isNaN(n)) cnt = n
  }

  // listen signal from `ponger`
  station.grab(ponger).signal((msg, from) => {
    station.log(`${msg} from ${from.name}`)
    if (--cnt === 0) {
      // tell ponger to stop playing
      station.block().from(ponger).catch(_.noop)
      // stop this activity
      station.close()
      return
    }
    ping()
  })

  // Preparing the ponger station.
  station.link().to(ponger).catch(_.noop)

  let ping = () => {
    setTimeout(() => {
      station.log('ping')
      // send signal to `ponger` with message "pinged"
      station.signal('pinged').to(ponger).catch(_.noop)
    }, 1000)
  }

  cnt > 0 ? ping() : station.close()
}
