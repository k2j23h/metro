const _ = require('lodash')

module.exports = async (station) => {
  const greeter = {
    name: 'greeter',
    image: 'greeter-server:latest'
  }

  station.link().to(greeter).catch(_.noop)
  rst = await station.hold(greeter)

  station.log(rst)
  station.close()
}