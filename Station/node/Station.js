const fs = require('fs')
const EventEmitter = require('events')
const _ = require('lodash')
const grpc = require('grpc')

/**
 * @typedef {import('./commonTypes').Station} Station
 */

const MetroMessage = require('./pb/Metro_pb')
const MetroClient = require('./MetroClient')
const StationMsg = require('./MessageBuilder/Station')

let isClosed = false

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
    rst = _.chain(cgroup).split('\n').find(_.includes, 'docker').value().split('docker/')[1]
    if (rst.length !== 64) throw Error('Failed to parsing')
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
  msg.setId(token)
  return msg
})(token)

let listenStream = null
const streamEventEmitter = new EventEmitter();

(() => {
  listenStream = MetroClient.listen(tokenMsg)

  listenStream.on('data',
    /** @param {import('./pb/Metro_pb').Signal} res */
    res => streamEventEmitter.emit('signal', {
      name: res.getStation().getName(),
      image: res.getStation().getImage()
    }, res.getMessage())
  )

  listenStream.on('error', err => {
    if (err && err.code === grpc.status.CANCELLED) return
    throw err
  })

  listenStream.on('end', () => {
    close()
  })
})()

/**
 * @summary Towards notifies future reachable station to the Metro server.
 * @description
 * If the Metro Server receives this notifying, it starts corresponding container.
 * If corresponding container is already exists, the Metro server ignore it.
 * The Metro server distinguish stations using its name.
 * If the name field empty, the Metro server (actually docker deamon) will give random name.
 * @param {...Station} destinations
 */
module.exports.towards = async (...destinations) => {
  let requests = []
  for (const destination of destinations) {
    let station = StationMsg.make(destination)

    let req = new MetroMessage.LinkRequest()
    req.setToken(tokenMsg)
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
      case 409: continue // already created
      default:
        msg = 'Responded unknown error: ' + code
        throw new Error(msg)
    }
  }

  if (notFounds.length > 0) throw new Error('No such image: ' + notFounds)
}

/**
 * @summary Signal write message to other Station.
 * @description
 * It just writing message but not send it yet.
 * You can send it by specifying the destenated station using returned "to" method.
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

/**
 * @summary Close stops listening signals from Metro server.
 * @description
 * CAUTION: The Metro server will trying to stop container
 */
let close = module.exports.close = () => {
  if (isClosed) return
  isClosed = true

  listenStream.cancel()
}

module.exports.on = (...args) => {
  streamEventEmitter.on(...args)
}
