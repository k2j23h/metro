const util = require('util')

const _ = require('lodash')

const accept = require('./accept')

module.exports = (less) => {
  return accept(1, async (station, msg, from) => {
    let rst

    if (less instanceof Promise) {
      rst = await less(msg, from)
    } else rst = less(msg, from)

    if (!_.isString(rst)) {
      rst = JSON.stringify(rst)
    }

    station.block(rst).from(from).catch(_.noop)
    station.close()
  })
}
