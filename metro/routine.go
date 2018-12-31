package metro

import (
	"errors"

	log "github.com/sirupsen/logrus"
)

type stationBody struct {
	rKey       routineKey
	descriptor *StationDescriptor
	transmit   chan Signal
}

type routineKey = string
type stationKey = string

var routines = make(map[routineKey]map[stationKey]bool)
var stationBodies = make(map[stationKey]*stationBody)
var stationNames = make(map[string]*stationBody)

// register registers station to routine.
func register(token string, station *StationDescriptor) {
	sKey := station.containerID
	rKey := token

	if sBody, ok := stationBodies[sKey]; ok {
		// requested station is not entry station
		rKey = sBody.rKey
	}

	if _, ok := routines[rKey][sKey]; !ok {
		routines[rKey] = make(map[stationKey]bool)
		routines[rKey][sKey] = true
	} else {
		log.WithFields(log.Fields{
			"token": shortToken(token),
		}).Warn("already registered station")
		return
	}

	sBody := stationBody{
		rKey:       rKey,
		descriptor: station,
		transmit:   make(chan Signal, 10),
	}

	if _, ok := stationNames[station.name]; station.name != "" && !ok {
		stationNames[station.name] = &sBody
	} else if ok {
		log.WithFields(log.Fields{
			"token": shortToken(token),
			"name":  station.name,
		}).Warn("already registered name")
		return
	}

	stationBodies[sKey] = &sBody

	log.WithField("token", shortToken(token)).Info("new station registered")
}

// getStBody returns stationBody corresponding to the token.
func (token *Token) getStBody() (*stationBody, error) {
	sKey := token.GetId()

	if sBody, ok := stationBodies[sKey]; ok {
		return sBody, nil
	}

	return nil, errors.New("unavailable token: " + token.toShort())
}

func (station *Station) getStBody() (*stationBody, error) {
	name := station.GetName()

	if sBody, ok := stationNames[name]; ok {
		return sBody, nil
	}

	return nil, errors.New("unavailable name")
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

func (desc *StationDescriptor) toStation() *Station {
	return &Station{
		Name:  desc.name,
		Image: desc.image,
	}
}
