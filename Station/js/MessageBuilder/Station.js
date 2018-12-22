const _ = require('lodash')
const MetroMessage = require('../pb/Metro_pb')

module.exports = class StationMsg {
  /**
   *
   * @param {string} image the image of destinated Station
   */
  constructor (image) {
    if (!_.isString(image) || image.length === 0) {
      throw new Error('image must be specified')
    }

    this.raw = new MetroMessage.Station()
    this.raw.setImage(image)
  }

  with = {
    name: (name) => {
      if (!_.isString(name)) {
        throw new Error('name must be string type')
      }

      this.raw.setName(name)

      return this
    }
  }

  toMessage () {
    return this.raw
  }

  static make ({
    name, image
  }) {
    return (new StationMsg(image)).with(name).toMessage()
  }
}
