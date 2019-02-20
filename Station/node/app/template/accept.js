const _ = require('lodash')

const noop = require('./noop')

module.exports = (what, f) => {
  if (!_.isFunction(f)) return noop
  if (!_.isNumber(what)) return noop
  return numberAcceptor(what, f)
}

function stationAcceptor (station, f) {
  // todo
}

function numberAcceptor (num, f) {
  return async (station) => {
    let count = num
    let listener

    const acceptor = async (msg, from) => {
      if (--count === 0) listener = _.noop
      f(station, msg, from)
    }

    listener = acceptor

    station.on('linked', (msg, from) => {
      listener(msg, from)
    })
  }
}
