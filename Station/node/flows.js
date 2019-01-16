const EventEmitter = require('events')
const _ = require('lodash')

const Station = require('./Station')

/** @type {Map<string, Map<string, {emitter: EventEmitter, station: Station}>>} */
let flows = new Map()

function createStationBody (flowID, name) {
  let emitter = new EventEmitter()
  let station = new Station({
    flowID, name, emitter
  })

  return { station, emitter }
}

function create (flowID, name) {
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

function have (flowID, name) {
  if (!flows.has(flowID)) return false

  const stations = flows.get(flowID)
  return stations.has(name)
}

function get (flowID, name) {
  if (!flows.has(flowID)) return undefined

  const stations = flows.get(flowID)
  if (!stations.has(name)) return undefined

  return stations.get(name)
}

function del (flowID, name) {
  if (!flowID.has(flowID)) return false

  const stations = flows.get(flowID)
  if (!stations.has(name)) return false

  stations.delete(name)

  if (stations.size() === 0) {
    flows.delete(flowID)
  }

  return true
}

module.exports = { create, have, get, del }
