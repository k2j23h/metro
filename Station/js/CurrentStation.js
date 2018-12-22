/// <reference path="./commonTypes.d.ts" />
const fs = require('fs')

const MetroMessage = require('./pb/Metro_pb')
const MetroClient = require('./MetroClient')
const StationMsg = require('./MessageBuilder/Station')

/**
 * @summary The token required to request to the Metro Server.
 * @description
 * Token is actually container id of the current container.
 * If proccess isn't in the container (such reason of debugging), it starts with 'zz'.
 * @type {string}
 */
const token = module.exports.token = (() => {
  let rst; try {
    rst = fs.readFileSync('/proc/self/cgroup', 'utf-8')
    // TODO: parsing
  } catch (e) {
    rst = null
  }

  rst = rst || 'zz' + require('crypto').randomBytes(31).toString('hex')

  console.info(`token is ${rst}`)

  return rst
})()

/**
 * @type {import('./pb/Metro_pb').Token}
 */
const tokenMsg = ((token) => {
  let msg = new MetroMessage.Token()
  msg.setId = token
  return msg
})(token)

/**
 * Notify future reachable Station to Metro Server
 * If Metro Server receives this notifying, it starts corresponding container
 * @param {...Station} destinations
 */
module.exports.towrads = (...destinations) => {
  for (let destination of destinations) {
    let station = StationMsg.make(destination)

    let req = new MetroMessage.LinkRequest()
    req.setToken((new MetroMessage.Token()).setId('tokenid' + Date.now()))
    req.setStation(station)

    MetroClient.link(req, () => {
      console.log('LinkRequest ersponded')
    })
  }
}

/**
 * @summary Write message to other Station.
 * @description
 * It just writing message but not send it yet.
 * If you want to send it, specify destenated station using returned "to" method.
 * @param {string} message
 */
module.exports.signal = (message) => {
  let req = new MetroMessage.TransmitRequest()
  req.setMessage(message)
  req.setToken(tokenMsg)

  return {
    /**
     * Send writed message to other Station through Metro Server
     * @param {...Station} destinations
     */
    to: (...destinations) => {
      for (let destination of destinations) {
        // TODO: Transmit
      }
    }
  }
}
