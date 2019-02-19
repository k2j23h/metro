const EventEmitter = require('events')
const _ = require('lodash')

const StationDescriptor = require('./StationDescripter')
const MetroMessage = require('./pb/Metro_pb')
const MetroClient = require('./MetroClient')
const token = require('./token')

module.exports = class Station {
  /** @param {{ flowID:String, name:String, emitter:EventEmitter }} */
  constructor ({
    flowID, name, emitter
  }) {
    this._isClosed = false
    this._flowID = flowID
    this._fID = flowID.slice(0, 12)
    this._internal_emitter = emitter
    this._external_emitter = new EventEmitter()
    /** @type {Map<String, Function>} */
    this._grabbed = {
      signal: new Map(),
      linked: new Map(),
      blocked: new Map()
    }
    this._station = (() => {
      let st = new MetroMessage.Station()
      st.setId(flowID)
      st.setName(name)
      return st
    })()

    const emitExternal = (...args) => {
      this._external_emitter.emit(...args)
    }

    const grabber = (type) => {
      return [type, (msg, st) => {
        const stDesc = new StationDescriptor(st)
        const key = stDesc.toSerial()

        if (!this._grabbed[type].has(key)) {
          emitExternal(type, msg, stDesc)
          return
        }

        this._grabbed[type].get(key)(msg, stDesc)
      }]
    }

    emitter
      .on(...grabber('signal'))
      .on(...grabber('linked'))
      .on(...grabber('blocked'))
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

      reqs.push(MetroClient.block().sendMessage(req).catch(_.noop))
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
    this._internal_emitter.on(type, listener)
    return this
  }

  /**
   * @summary Intercept events from other `Station`.
   *
   * @param {StationDescriptor} station
   *
   * @description
   * It just describes which `Station` to Intercept the message from.
   * You can resolve it using returned methods.
   * Note that intercepted can NOT catch via `on` method.
   * If you want to catch messages using `on` method, release it using `loose` method.
   *
   */
  grab (station) {
    const grabber = (type) => {
      return (listener) => {
        if (!_.isFunction(listener)) return
        let stDesc = station instanceof StationDescriptor
          ? station : new StationDescriptor(station)

        this._grabbed[type].set(stDesc.toSerial(), listener)
      }
    }

    return {
      signal: grabber('signal'),
      linked: grabber('linked'),
      blocked: grabber('blocked')
    }
  }

  /**
   * @summary Release intercepted messages from `Station`.
   *
   * @param {StationDescriptor} station
   */
  lose (station) {
    const grabber = (type) => {
      return () => {
        let stDesc = station instanceof StationDescriptor
          ? station : new StationDescriptor(station)

        const key = stDesc.toSerial()
        if (!this._grabbed[type].has(key)) return

        this._grabbed[type].delete(key)
      }
    }

    return {
      signal: grabber('signal'),
      linked: grabber('linked'),
      blocked: grabber('blocked')
    }
  }

  /**
   * @summary Holds all messages include `LINK` until `BLOCK` arrives.
   * @param {StationDescriptor} station
   *
   * @description
   * Note that all messages from specified `Station` are intercepted.
   * When `BLOCK` arrives, it resolves all the messages in order except for `LINKED`.
   */
  async hold (station) {
    return new Promise((resolve, reject) => {
      let msgs = []

      this.grab(station).linked(_.noop)
      this.grab(station).signal((msg, from) => msgs.push(msg))
      this.grab(station).blocked((msg, from) => {
        msgs.push(msg)
        resolve(msgs)
      })
    })
  }

  /**
   * @summary Close the `Station`
   * @description Close the `Station` and emits `closed` event. If you want to listen, obviously,
   * should subscribe listener before close.
   */
  close () {
    this._isClosed = true
    this._internal_emitter.emit('closed')
    this.log('station closed')
  }

  get isClosed () {
    return this._isClosed
  }

  log (message) {
    console.log(`${this._fID} ${message}`)
  }
}
