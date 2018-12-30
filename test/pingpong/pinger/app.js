/**
 * @param {import('../../../station/js/CurrentStation')} station
 */
module.exports = async (station)=>{
    const ponger = {
        name: 'ponger',
        image: 'ponger:latest'
    }
    station.towards(ponger)

    station.on('signal', (station)=>{
        if(station != ponger) return;
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