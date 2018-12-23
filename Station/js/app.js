/**
 * @param {import('./CurrentStation')} station
 */
module.exports = async (station) => {
  const something = {
    name: 'something',
    image: 'hello:0.1'
  }

  try {
    await station.towards(something)
  } catch (e) {
    console.log(e)
  }
  console.log('noop')

  setTimeout(() => {
    station.signal().to(something)
  }, 1000)
}
