const _ = require('lodash')

module.exports = async (station, msg) => {
  const ponger = {
    name: 'ponger',
    image: 'ponger:latest'
  }

  let cnt = 3

  if (msg.length > 0) {
    let n = _.toNumber(msg[0])
    if (!_.isNaN(n)) cnt = n
  }

  station.grab(ponger).signal((msg, from) => {
    station.log(`${msg} from ${from.name}`)
    if (--cnt === 0) {
      station.block().from(ponger).catch(_.noop)
      station.close()
      return
    }
    ping()
  })

  station.link().to(ponger).catch(_.noop)

  let ping = () => {
    station.log('ping')
    setTimeout(() => {
      station.signal('pinged').to(ponger).catch(_.noop)
    }, 1000)
  }

  if (cnt > 0) {
    ping()
  } else {
    station.close()
  }
}
