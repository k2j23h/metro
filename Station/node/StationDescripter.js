const _ = require('lodash')

module.exports = class StationDescripter {
  constructor ({
    name, image, msg
  }) {
    this.name = name
    this.image = image
    this.msg = msg
  }

  toSerial () {
    return this.image + _.isString(this.name) ? '~' + this.name : ''
  }
}
