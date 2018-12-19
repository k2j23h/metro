const DirectorService = require('./pb/Director_grpc_pb')
const Director = require('./pb/Director_pb')

class CurrentStation {
  /**
   *
   * @param {DirectorService.DirectorClient} director
   */
  constructor (director) {
    this.director = director
  }

  towards (...destinations) {
    let req = new Director.LinkRequest()
    for (let destination of destinations) {
      let station = new Director.Station()
      station.setId(destination.id)
      station.setImage(destination.image)

      req.addStations(station)
    }

    this.director.link(req, (err, res) => {
      if (err) throw err
      console.log('responsed:', res.getState())
    })
  }
}

module.exports = CurrentStation
