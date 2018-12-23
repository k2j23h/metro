/**
 * @param {import('../../../station/js/CurrentStation')} station
 */
module.exports = async (station)=>{
    const pinger = {
        name: 'pinger',
        image: 'lesomnus/pinger:latest'
    }
    station.towards(pinger)

    station.on('signal', (station)=>{
        if(station != pinger) return;
        pong()
    })

    pong()
}

function pong(){
    console.log('pong')
    setTimeout(() => {
        station.signal('ponged').to(ponger)
    }, 1000);
}