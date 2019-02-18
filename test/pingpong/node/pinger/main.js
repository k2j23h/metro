const _ = require('lodash')

/**
 * @param {import('../../../station/js/CurrentStation')} station
 */
module.exports = async (station)=>{
    const ponger = {
        name: 'ponger',
        image: 'ponger:latest'
    }

    let cnt = 0;

    station.on('signal', (msg, from)=>{
        station.log(`${msg} from ${from.name}`)
        if(++cnt == 3){
            station.close()
            return
        } 
        ping()
    }).link(ponger).catch(_.noop)

    let ping = ()=>{
        station.log('ping')
        setTimeout(() => {
            station.signal('pinged').to(ponger).catch(_.noop)
        }, 1000);
    }

    ping()
}