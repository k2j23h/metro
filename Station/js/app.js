const CurrentStation = require('./CurrentStation')

/**
 * @param {CurrentStation} station
 */
module.exports = (station) => {
  station.towards({
    'image': 'a1',
    'name': 'qwer'
  }, {
    'image': 'b1',
    'name': 'asfd'
  }, {
    'image': 'c1',
    'name': 'zxcv'
  })
  console.log('noop')
}
