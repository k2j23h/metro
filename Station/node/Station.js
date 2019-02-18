const EventEmitter = require('events')
const _ = require('lodash')

const MetroMessage = require('./pb/Metro_pb')
const MetroClient = require('./MetroClient')
const token = require('./token')

/** @typedef {{ name:string, image:string }} StationDescriptor */

module.exports = class Station {
  /** @param {{ flowID:String, name:String, emitter:EventEmitter }} */
  constructor ({
    flowID, name, emitter
  }) {
    this._isClosed = false
    this._flowID = flowID
    this._fID = flowID.slice(0, 12)
    this._emitter = emitter
    this._station = (() => {
      let st = new MetroMessage.Station()
      st.setId(flowID)
      st.setName(name)
      return st
    })()
  }

  /**
  * @summary Notifies future reachable `Station` to the `Metro`.
  * @description \
  * - This notification is forwarded to the destination `Station`
  *   and the `Station` receives `linked` event.
  * - The destination `Station` will be created if it does not exist.
  * - The `Metro` distinguishes `Stations` using its `name`.
  * @param {...StationDescriptor} dsts the destinations
  */
  async link (...dsts) {
    let reqs = []
    for (const {
      name, image, msg
    } of dsts) {
      let dst = new MetroMessage.Station()
      dst.setName(name)
      dst.setImage(image)

      let req = new MetroMessage.LinkRequest()
      req.setToken(token)
      req.setSrc(this._station)
      req.setDst(dst)
      req.setMessage(msg)

      reqs.push(MetroClient.link().sendMessage(req).catch(_.noop))
    }

    for (let [i, res] of await Promise.all(reqs).catch(_.noop)) {
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

  async block (...dsts) {
    let reqs = []
    for (const {
      name, image, msg
    } of dsts) {
      let dst = new MetroMessage.Station()
      dst.setName(name)
      dst.setImage(image)

      let req = new MetroMessage.BlockRequest()
      req.setToken(token)
      req.setSrc(this._station)
      req.setDst(dst)
      req.setMessage(msg)

      reqs.push(MetroClient.link().sendMessage(req).catch(_.noop))
    }

    for (let [i, res] of await Promise.all(reqs).catch(_.noop)) {
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
   * @summary Writes message to be sent to other `Station`.
   * @param {string} msg
   *
   * @example
   * Station.signal("Hi John").to({
   *  name: "John",
   *  image: "person:latest"
   * })
   *
   * @description
   * It just writing message but not send it yet.
   * You can send it by specifying the destination `Station` using returned `to` method.
   */
  signal (msg) {
    /**
     * @summary Send message what you wrote to other `Station` through `Metro`.
     * @param {...StationDescriptor} dsts the destinations.
     *
     * @description \
     * - The signal will be ignored if the the destination `Station` is not exists.
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

        reqs.push(MetroClient.transmit().sendMessage(req).catch(_.noop))
      }

      for (let [i, res] of await Promise.all(reqs).catch(_.noop)) {
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
    this._emitter.on(type, listener)
    return this
  }

  /**
   * @summary Close the `Station`
   * @description Close the `Station` and emits `closed` event. If you want to listen, obviously,
   * should subscribe listener before close.
   */
  close () {
    this._isClosed = true
    this._emitter.emit('closed')
  }

  get isClosed () {
    return this._isClosed
  }

  log (message) {
    console.log(`${this._fID} ${message}`)
  }
}
