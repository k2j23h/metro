const fs = require('fs')
const _ = require('lodash')

const RouterMessage = require('./pb/Router_pb')

/**
 * @summary The `token` required to request to the `Metro`.
 * @description
 * The `token` is actually the container id of the current container.
 * If process isn't in the container (such reason of debugging), it starts with 'zz'.
 * @type {string}
 */
module.exports = (() => {
  /** @type {string} */
  let id; try {
    /**
     * it something looks like
     * 12:pids:/docker/a3bc961056f4bc572f64f52d27f90554b4697c2c0a2552215f03deb704ea6665
     * ...
     * 1:name=systemd:/docker/a3bc961056f4bc572f64f52d27f90554b4697c2c0a2552215f03deb704ea6665
     * 0::/system.slice/containerd.service
     */
    const cgroup = fs.readFileSync('/proc/self/cgroup', 'utf-8')
    id = _.chain(cgroup).split('\n').find(_.includes, 'docker').value().split('docker/')[1]
    if (id.length !== 64) throw Error('Failed to parsing')
  } catch (e) {
    id = null
  }

  id = id || 'zz' + require('crypto').randomBytes(31).toString('hex')

  console.info(`token is ${id}`)

  let rst = new RouterMessage.Token()
  rst.setId(id)

  return rst
})()
