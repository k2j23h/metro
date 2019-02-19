const util = require('util')

const _ = require('lodash')

module.exports = (less) => {
  return async (station) => {
    let listener

    const invoke = async (msg, from) => {
      station.log('invoking..')
      listener = _.noop
      let rst

      if (less instanceof Promise) {
        rst = await less(msg, from)
      } else rst = less(msg, from)

      if (!_.isString(rst)) {
        rst = JSON.stringify(rst)
      }

      station.block(rst).from(from).catch(_.noop)
      station.close()
    }

    listener = invoke

    station.on('linked', (msg, from) => {
      listener(msg, from)
    })
  }
}
