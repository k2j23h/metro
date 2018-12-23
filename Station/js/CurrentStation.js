const fs = require('fs')
const EventEmitter = require('events')
const _ = require('lodash')

/**
 * @typedef {import('./commonTypes').Station} Station
 */

const MetroMessage = require('./pb/Metro_pb')
const MetroClient = require('./MetroClient')
const StationMsg = require('./MessageBuilder/Station')

/**
 * @summary The token required to request to the Metro Server.
 * @description
 * The token is actually the container id of the current container.
 * If proccess isn't in the container (such reason of debugging), it starts with 'zz'.
 * @type {string}
 */
const token = module.exports.token = (() => {
  /** @type {string} */
  let rst; try {
    /**
     * it something looks like
     * 12:pids:/docker/a3bc961056f4bc572f64f52d27f90554b4697c2c0a2552215f03deb704ea6665
     * ...
     * 1:name=systemd:/docker/a3bc961056f4bc572f64f52d27f90554b4697c2c0a2552215f03deb704ea6665
     * 0::/system.slice/containerd.service
     */
    const cgroup = fs.readFileSync('/proc/self/cgroup', 'utf-8')

    rst = _.chain(cgroup).find(_.includes, 'docker').value().split('docker/')[1]
    if (rst.length !== 64) throw Error('Failed to parsing')
  } catch (e) { rst = null }

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

const streamEventEmitter = new EventEmitter();
(() => {
  let stream = MetroClient.listen(tokenMsg)
  stream.on('data', res => {
    console.log('ㄱㄷ네ㅐㅜㄴㄷ')
  })
})()

/**
 * Notify future reachable Station to Metro Server
 * If Metro Server receives this notifying, it starts corresponding container
 * @param {...Station} destinations
 */
module.exports.towards = async (...destinations) => {
  let requests = []
  for (const destination of destinations) {
    let station = StationMsg.make(destination)

    let req = new MetroMessage.LinkRequest()
    req.setToken((new MetroMessage.Token()).setId('tokenid' + Date.now()))
    req.setStation(station)
    requests.push(MetroClient.link().sendMessage(req))
  }

  let responses = await Promise.all(requests)
  let notFounds = []
  for (let [index, response] of responses.entries()) {
    let code = response.getCode()
    let msg
    switch (code) {
      case 200: continue
      case 404: notFounds.push(destinations[index].image); break
      default:
        msg = 'Responded unknown error: ' + code
        throw new Error(msg)
    }
  }

  if (notFounds.length !== 0) throw new Error('No such image: ' + notFounds)
}

/**
 * @summary Write message to other Station.
 * @description
 * It just writing message but not send it yet.
 * If you want to send it, specify destenated station using returned "to" method.
 * @param {string} message
 */
module.exports.signal = (message) => {
  return {
    /**
     * @summary Send writed message to other Station through Metro Server
     * @param {...Station} destinations to send the message.
     */
    to: async (...destinations) => {
      let requests = []
      for (let destination of destinations) {
        let req = new MetroMessage.TransmitRequest()
        req.setMessage(message)
        req.setToken(tokenMsg)
        req.setStation(StationMsg.make(destination))

        requests.push(MetroClient.transmit().sendMessage(req))
      }

      let responses = await Promise.all(requests)
      let notFounds = []
      for (let [index, response] of responses.entries()) {
        let code = response.getCode()
        let msg
        switch (code) {
          case 200: continue
          case 404: notFounds.push(destinations[index]); break
          default:
            msg = 'Responded unknown error: ' + code
            throw new Error(msg)
        }
      }

      if (notFounds.length !== 0) throw new Error('No such station: ' + notFounds)
    }
  }
}

module.exports.on = streamEventEmitter.on
