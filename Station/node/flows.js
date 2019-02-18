const EventEmitter = require('events')
const _ = require('lodash')

const Station = require('./Station')

/**
 * @typedef {{emitter: EventEmitter, station: Station}} StationBody
 * @type {Map<string, Map<string, StationBody>>}
 */
let flows = new Map()

function createStationBody (flowID, name) {
  let emitter = new EventEmitter()
  let station = new Station({
    flowID, name, emitter
  })

  station.on('closed', () => {
    del(flowID, name)
  })

  return { station, emitter }
}

/**
 * @summary Creates new named `Station` in the specified flow ID if it does not exist.
 * @param {String} flowID
 * @param {String} name
 *
 * @returns {StationBody}
 *  It returns newly created `Station` and its `EventEmitter` if the name is not taken
 *  or returns `undefined` if the name is already taken.
 */
module.exports.create = function create (flowID, name) {
  if (!flows.has(flowID)) {
    let stations = new Map()
    const body = createStationBody(flowID, name)
    stations.set(name, body)
    flows.set(flowID, stations)
    return body
  }

  let stations = flows.get(flowID)
  if (stations.has(name)) {
    return undefined
  }

  const body = createStationBody(flowID, name)
  stations.set(name, body)
  return body
}

module.exports.have = function have (flowID, name) {
  if (!flows.has(flowID)) return false

  const stations = flows.get(flowID)
  return stations.has(name)
}

/**
 * @summary Retrieves named `Station` in the specified flow ID.
 * @param {String} flowID
 * @param {String} name
 *
 * @returns {StationBody}
 *  It returns stored `Station` and its `EventEmitter` if the name exists
 *  in the specified flow ID or returns `undefined` if the name does not exist.
 */
module.exports.get = function get (flowID, name) {
  if (!flows.has(flowID)) return undefined

  const stations = flows.get(flowID)
  if (!stations.has(name)) return undefined

  return stations.get(name)
}

/**
 * @summary Delete named `Station` in the specified flow ID.
 * @param {String} flowID
 * @param {String} name
 * @description \
 *  Note that the Station which call `Station.close()` is deleted automatically.
 *  It means that, you can call `Station.close()` instead of this function.
 */
const del = module.exports.del = function del (flowID, name) {
  if (!flows.has(flowID)) return false

  const stations = flows.get(flowID)
  if (!stations.has(name)) return false

  stations.delete(name)

  if (stations.size === 0) {
    flows.delete(flowID)
  }

  return true
}
