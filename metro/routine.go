package metro

import (
	"errors"

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
var stationNames = make(map[string]bool)

// register registers station to routine.
func register(token string, station *StationDescriptor) {
	sKey := station.containerID
	rKey := token

	sBody, ok := stationBodies[sKey]
	// requested station is not entry station
	if ok {
		rKey = sBody.rKey
	}

	_, ok = routines[rKey][sKey]
	if !ok {
		routines[rKey] = make(map[stationKey]bool)
		routines[rKey][sKey] = true
	} else {
		log.WithFields(log.Fields{
			"token": shortToken(token),
		}).Warn("already registered station")
		return
	}

	if _, ok := stationNames[station.name]; station.name != "" && !ok {
		stationNames[station.name] = true
	} else if ok {
		log.WithFields(log.Fields{
			"token": shortToken(token),
			"name":  station.name,
		}).Warn("already registered name")
		return
	}

	stationBodies[sKey] = &stationBody{
		rKey:       rKey,
		descriptor: station,
		transmit:   make(chan string, 10),
	}

	log.WithField("token", shortToken(token)).Info("new station registered")
}

// getStBody returns stationBody corresponding to the token.
func getStBody(token *Token) (*stationBody, error) {
	sKey := token.GetId()

	if sBody, ok := stationBodies[sKey]; ok {
		return sBody, nil
	}

	return nil, errors.New("unavailable token " + token.toShort())
}

func (station *Station) isNameRegistered() bool {
	sName := station.GetName()

	if sName == "" {
		return false
	}

	if _, ok := stationNames[sName]; ok {
		return true
	}

	return false
}
