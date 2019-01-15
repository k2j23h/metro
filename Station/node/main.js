const EventEmitter = require('events')
const _ = require('lodash')
const grpc = require('grpc')

const MetroMessage = require('./pb/Metro_pb')
const MetroClient = require('./MetroClient')
const Station = require('./Station')
const token = require('./token')
const app = require('./app')

function createStation (flowID, name) {
  let emitter = new EventEmitter()
  let station = new Station({
    flowID, name
  }, emitter)
  return { station, emitter }
}

function main () {
  let stations = new Map()
  let listenStream = MetroClient.listen(token)

  listenStream.on('data',
    /** @param {import('./pb/Metro_pb').Signal} res */
    res => {
      const srcSt = res.getSrc()
      const dstSt = res.getDst()
      const flowID = dstSt.getId()
      const dstName = dstSt.getName()
      const dstKey = `${flowID}:${dstName}`
      let emitter = stations.get(dstKey)

      if (_.isNil(emitter)) {
        let station;
        ({ station, emitter } = createStation(flowID, dstName))
        app(station).catch(_.noop)
        console.info('app started')
        stations.set(dstKey, emitter)
      }

      const ctrl = res.getControl()
      switch (ctrl) {
        default:
          console.warn('unmanaged control flag: ' + ctrl)
          break
        case MetroMessage.Signal.Control.START:
          break
        case MetroMessage.Signal.Control.TERMINATE:
          break
        case MetroMessage.Signal.Control.FORWARDED:
          console.info('on forwarded')
          emitter.emit('forwarded', {
            id: srcSt.getId(),
            name: srcSt.getName(),
            image: srcSt.getImage()
          })
          break
        case MetroMessage.Signal.Control.MESSAGE:
          console.info('on siganl')
          emitter.emit('signal', res.getMessage(), {
            id: srcSt.getId(),
            name: srcSt.getName(),
            image: srcSt.getImage()
          })
          break
        case MetroMessage.Signal.Control.BLOCKED:
          console.info('on blocked')
          emitter.emit('blocked', res.getMessage(), {
            id: srcSt.getId(),
            name: srcSt.getName(),
            image: srcSt.getImage()
          })
          break
      }
    }
  )

  listenStream.on('error', err => {
    if (err && err.code === grpc.status.CANCELLED) return
    throw err
  })

  listenStream.on('end', () => {
    throw new Error('Unexpected end of stream')
  })
}

main()
