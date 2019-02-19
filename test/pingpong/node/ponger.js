const _ = require('lodash')

/**
 * @param {import('../../../station/js/CurrentStation')} station
 */
module.exports = async (station) => {
    const pinger = {
        name: 'pinger',
        image: 'pinger:latest'
    }

    let cnt = 0;

    station.grab(pinger).signal((msg, from) => {
        station.log(`${msg} from ${from.name}`)
        pong()
        if(++cnt == 3){
            station.close()
            return
        } 
    })
    
    // station.link(pinger).catch(_.noop)

    let pong = ()=>{
        station.log('pong')
        setTimeout(() => {
            station.signal('ponged').to(pinger).catch(_.noop)
        }, 1000);
    }
}