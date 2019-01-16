const EventEmitter = require('events')
const _ = require('lodash')
const grpc = require('grpc')

const SigCtrl = require('./pb/Metro_pb').Signal.Control
const MetroClient = require('./MetroClient')
const Station = require('./Station')
const token = require('./token')
const flows = require('./flows')
const app = require('./app')

/** @param {import('./pb/Metro_pb').Signal} res */
function signalHandler (res) {
  const srcSt = res.getSrc()
  const dstSt = res.getDst()
  const flowID = dstSt.getId()
  const dstName = dstSt.getName()

  const isExists = flows.have(flowID, dstName)
  const fetch = _.partial(flows.get, flowID, dstName)
  const create = _.partial(flows.create, flowID, dstName)

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

    case SigCtrl.START:
      if (isExists) {
        fetch().station.log('already opened station')
        break
      }
      create().station.log('new station is open')
      break

    case SigCtrl.TERMINATE:
      break

    case SigCtrl.FORWARDED:
      let { station, emitter } = isExists ? fetch() : create()
      emitter.emit('forwarded', toDesc(srcSt))
      break

    case SigCtrl.MESSAGE:
      if (!isExists) {
        console.warn('not found')
        break
      }
      emitter.emit('signal', res.getMessage(), toDesc(srcSt))
      break

    case SigCtrl.BLOCKED:
      if (!isExists) {
        console.warn('not found')
        break
      }
      emitter.emit('blocked', res.getMessage(), toDesc(srcSt))
      break
  }
}

function main () {
  let listenStream = MetroClient.listen(token)

  listenStream.on('data', signalHandler)

  listenStream.on('error', err => {
    if (err && err.code === grpc.status.CANCELLED) return
    throw err
  })

  listenStream.on('end', () => {
    throw new Error('Unexpected end of stream')
  })
}

main()
