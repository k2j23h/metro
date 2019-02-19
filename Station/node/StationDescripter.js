const _ = require('lodash')

module.exports = class StationDescripter {
  constructor ({
    name, image
  }) {
    this.name = name
    this.image = image
  }

  serialize () {
    return this.image + _.isString(this.name) ? '~' + this.name : ''
  }
}
