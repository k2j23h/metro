const fs = require('fs')

const MetroService = require('./pb/Metro_grpc_pb')
const MetroMessage = require('./pb/Metro_pb')
const MetroClient = require('./MetroClient')

/**
 * The token required to request to the Metro Server
 * Token is actually container id of the current container
 * If proccess isn't in the container (such reason of debugging), it starts with 'zz'
 * @type {string}
 */
module.exports.token = (() => {
  let rst; try {
    rst = fs.readFileSync('/proc/self/cgroup', 'utf-8')
  } catch (e) {
    rst = null
  }

  rst = rst || 'zz' + require('crypto').randomBytes(31).toString('hex')

  console.info(`token is ${rst}`)

  return rst
})()

/**
 * Notify future reachable Station to Metro Server
 * If Metro Server receives this notifying, it starts corresponding container
 */
module.exports.towrads = (...destinations) => {
  for (let destination of destinations) {
    let station = new MetroMessage.Station()
    station.setName(destination.name || 'asdf')
    station.setImage(destination.image || 'image')

    let req = new MetroMessage.LinkRequest()
    req.setToken((new MetroMessage.Token()).setId('tokenid' + Date.now()))
    req.setStation(station)

    MetroClient.link(req, () => {
      console.log('LinkRequest ersponded')
    })
  }
}
