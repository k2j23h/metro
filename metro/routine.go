package metro

import (
	log "github.com/sirupsen/logrus"
)

type stationBody struct {
	rKey       routineKey
	descriptor *StationDescriptor
	transmit   chan string
}

type routineKey = string
type stationKey = string

var routines = make(map[routineKey]map[stationKey]bool)
var stationBodies = make(map[stationKey]*stationBody)

// register registers station to routine.
func register(token TokenDescriptor, station *StationDescriptor) {
	sKey := station.containerID
	rKey := token

	sBody, ok := stationBodies[sKey]
	// requested station is not entry station
	if ok {
		rKey = sBody.rKey
	}

	_, ok = routines[rKey][sKey]
	if !ok {
		routines[rKey][sKey] = true
	} else {
		log.WithFields(log.Fields{
			"caller": shortToken(token),
		}).Warn("Already registered station")
		return
	}

	stationBodies[sKey] = &stationBody{
		rKey:       rKey,
		descriptor: station,
		transmit:   make(chan string, 10),
	}

	log.WithField("token", shortToken(token)).Info("New station registered")
}

// get retuen StationDescripor corresponding to the token.
func get(token TokenDescriptor) *StationDescriptor {
	sKey := token

	if sBody, ok := stationBodies[sKey]; ok {
		return sBody.descriptor
	}

	return nil
}
