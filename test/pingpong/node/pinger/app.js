/**
 * @param {import('../../../station/js/CurrentStation')} station
 */
module.exports = async (station)=>{
    const ponger = {
        name: 'ponger',
        image: 'ponger:latest'
    }
    station.towards(ponger)

    let cnt = 0;

    station.on('signal', (msg, from)=>{
        console.log(`${msg} from ${from.name}`)
        if(++cnt == 3){
            station.close()
            return
        } 
        ping()
    })

    let ping = ()=>{
        console.log('ping')
        setTimeout(() => {
            station.signal('pinged').to(ponger)
        }, 1000);
    }

    ping()
}