const _ = require('lodash')

const MetroMessage = require('./pb/Metro_pb')
const MetroClient = require('./MetroClient')
const token = require('./token')

module.exports = class Station {
  constructor ({
    flowID, name
  }, emitter) {
    this._emitter = emitter
    this._station = (() => {
      let st = new MetroMessage.Station()
      st.setId(flowID)
      st.setName(name)
      return st
    })()
  }

  /**
  * @summary towards notifies future reachable station to the Metro server.
  * @description
  * If the Metro Server receives this notifying, it starts corresponding container.
  * If corresponding container is already exists, the Metro server ignore it.
  * The Metro server distinguish stations using its name.
  * If the name field empty, the Metro server (actually docker deamon) will give random name.
  * @param {...Station} dsts
  */
  async towards (...dsts) {
    let reqs = []
    for (const {
      name, image
    } of dsts) {
      let dst = new MetroMessage.Station()
      dst.setName(name)
      dst.setImage(image)

      let req = new MetroMessage.LinkRequest()
      req.setToken(token)
      req.setSrc(this._station)
      req.setDst(dst)

      reqs.push(MetroClient.link().sendMessage(req))
    }

    let reses = []
    try {
      reses = await Promise.all(reqs)
    } catch (e) {
      throw e
    }

    for (let [i, res] of reses) {
      const code = res.getCode()
      switch (code) {
        case 200: break
        case 404:
          throw new Error('Image not exists: ' + dsts[i])
        default:
          throw new Error('Responded unknown error: ' + code)
      }
    }
  }

  /**
   * @summary Signal write message to other Station.
   * @description
   * It just writing message but not send it yet.
   * You can send it by specifying the destenated station using returned "to" method.
   * @param {string} msg
   */
  signal (msg) {
    /**
     * @summary Send writed message to other Station through Metro Server
     * @param {...Station} dsts to send the message.
     */
    const to = async (...dsts) => {
      let reqs = []
      for (const {
        name, image
      } of dsts) {
        let dst = new MetroMessage.Station()
        dst.setName(name)
        dst.setImage(image)

        let req = new MetroMessage.TransmitRequest()
        req.setToken(token)
        req.setSrc(this._station)
        req.setDst(dst)
        req.setMessage(msg)

        reqs.push(MetroClient.transmit().sendMessage(req))
      }

      let reses = []
      try {
        reses = await Promise.all(reqs)
      } catch (e) {
        throw e
      }

      for (let [i, res] of reses) {
        const code = res.getCode()
        switch (code) {
          case 200: break
          case 404:
            throw new Error('Image not exists: ' + dsts[i])
          default:
            throw new Error('Responded unknown error: ' + code)
        }
      }
    }

    return { to }
  }

  on (type, listener) {
    return this._emitter.on(type, listener)
  }

  close () {

  }
}
