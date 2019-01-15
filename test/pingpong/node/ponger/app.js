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

    station.on('signal', (msg, from)=>{
        console.log(`${msg} from ${from.name}`)
        pong()
        if(++cnt == 3){
            station.close()
            return
        } 
    })

    let pong = ()=>{
        console.log('pong')
        setTimeout(() => {
            station.signal('ponged').to(pinger)
        }, 1000);
    }
}