const _ = require('lodash')
const grpc = require('grpc')

const SigCtrl = require('./pb/Router_pb').Signal.Control
const RouterClient = require('./RouterClient')
const token = require('./token')
const flows = require('./flows')
const app = require('./app/main')

/** @param {import('./pb/Metro_pb').Signal} res */
function signalHandler (res) {
  const srcSt = res.getSrc()
  const dstSt = res.getDst()

  const flowID = dstSt.getId()
  const dstName = dstSt.getName()

  const isExists = flows.have(flowID, dstName)
  const fetch = _.partial(flows.get, flowID, dstName)
  const create = _.partial(flows.create, flowID, dstName)
  const start = () => {
    let body = create()
    body.station.log('new station is open')

    let msg = res.getMessage()
    if (msg) {
      try {
        msg = JSON.parse(msg)
      } catch (e) {}
    }

    app(body.station, msg || []).catch(_.nopp)
    return body
  }

  const toDesc = (st) => ({
    id: st.getId(),
    name: st.getName(),
    image: st.getImage()
  })

  const ctrl = res.getControl()
  switch (ctrl) {
    default:
      console.log('unmanaged control flag: ' + ctrl)
      break

    case SigCtrl.START: (() => {
      if (isExists) {
        fetch().station.log('already opened station')
        return
      }

      start()
    })(); break

    case SigCtrl.TERMINATE: (() => {
      if (!isExists) {
        console.warn(Date.now(), 'TERM: not found', flowID)
        return
      }
      flows.del(flowID, dstName)
    })(); break

    case SigCtrl.LINKED: (() => {
      let emitter = isExists ? fetch().emitter : start().emitter
      emitter.emit('linked', res.getMessage(), toDesc(srcSt))
      console.log(Date.now(), 'linked', flowID)
    })(); break

    case SigCtrl.MESSAGE: (() => {
      if (!isExists) {
        console.warn(Date.now(), 'MSG: not found', flowID)
        return
      }
      fetch().emitter.emit('signal', res.getMessage(), toDesc(srcSt))
    })(); break

    case SigCtrl.BLOCKED: (() => {
      if (!isExists) {
        console.warn(Date.now(), 'BLCK: not found', flowID)
        return
      }
      fetch().emitter.emit('blocked', res.getMessage(), toDesc(srcSt))
    })(); break
  }
}

function main () {
  let sigStream = RouterClient.listen(token)

  sigStream.on('data', signalHandler)

  sigStream.on('error', err => {
    if (err && err.code === grpc.status.CANCELLED) return
    throw err
  })

  sigStream.on('end', () => {
    throw new Error('Unexpected end of stream')
  })
}

main()
