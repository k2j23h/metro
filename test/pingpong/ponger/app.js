/**
 * @param {import('../../../station/js/CurrentStation')} station
 */
module.exports = async (station)=>{
    const pinger = {
        name: 'pinger',
        image: 'pinger:latest'
    }
    station.towards(pinger)

    station.on('signal', (station)=>{
        if(station != pinger) return;
        pong()
    })

    let pong = ()=>{
        console.log('pong')
        setTimeout(() => {
            station.signal('ponged').to(pinger)
        }, 1000);
    }

    pong()
}