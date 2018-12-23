/**
 * @param {import('../../../station/js/CurrentStation')} station
 */
module.exports = async (station)=>{
    const ponger = {
        name: 'ponger',
        image: 'lesomnus/ponger:latest'
    }
    station.towards(ponger)

    station.on('signal', (station)=>{
        if(station != ponger) return;
        ping()
    })

    ping()
}

function ping(){
    console.log('ping')
    setTimeout(() => {
        station.signal('pinged').to(ponger)
    }, 1000);
}