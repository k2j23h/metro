/**
 * @param {import('../../../station/js/CurrentStation')} station
 */
module.exports = async (station)=>{
    const pinger = {
        name: 'pinger',
        image: 'pinger:latest'
    }
    station.towards(pinger)

    let cnt = 0;

    station.on('signal', (from, msg)=>{
        console.log(`${msg} from ${from.name}`)
        if(++cnt == 3){
            station.close()
            return
        } 
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