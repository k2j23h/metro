package metro

import (
	"errors"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/filters"
	log "github.com/sirupsen/logrus"
	context "golang.org/x/net/context"
)

type routineKey = string
type stationKey = string

type stationBody struct {
	rKey       routineKey
	descriptor *StationDescriptor
	transmit   chan Signal
}

var routines = make(map[routineKey]map[stationKey]bool)
var stationBodies = make(map[stationKey]*stationBody)
var stationNames = make(map[string]*stationBody)

// register registers station to routine.
// a stopped container wiil automatically unregister.
func register(station *StationDescriptor) {
	var (
		token = station.containerID
		sKey  = token
		rKey  = token
	)

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

// autoUnregister unregisters and destroys stopped metor container
func autoUnregister() {
	filters := filters.NewArgs()
	filters.Add("event", "die")
	msgCh, errCh := DckrCli.Events(context.Background(), types.EventsOptions{
		Filters: filters,
	})

	for {
		select {
		case msg := <-msgCh:
			token := msg.ID
			name := msg.Actor.Attributes["name"]
			unregister(token, name)
			DckrCli.ContainerRemove(context.Background(), token, types.ContainerRemoveOptions{})

			log.WithFields(log.Fields{
				"token": shortToken(token),
				"name":  name,
			}).Info("a station destroyed")
		case err := <-errCh:
			log.Warn(err)
			return
		}
	}
}

func unregister(key string, name string) {
	var rKey string

	// name are resolved earier when creating container.
	// but docker daemon also provide a name, i use that.
	// if you want to resolve a name standalone, add name field to statinBody struct.
	if _, ok := stationBodies[key]; !ok {
		return
	}
	delete(stationBodies, key)

	if sBody, ok := stationNames[name]; ok {
		rKey = sBody.rKey
	} else {
		return
	}
	delete(stationNames, name)

	if stations, ok := routines[rKey]; !ok {
		panic("wtf")
	} else if _, ok := stations[key]; !ok {
		panic("wtf")
	} else {
		delete(stations, key)
	}

	log.WithFields(log.Fields{
		"token": shortToken(key),
		"name":  name,
	}).Info("a station unregistered")

	if len(routines[rKey]) != 0 {
		return
	}

	delete(routines, rKey)

	log.WithFields(log.Fields{
		"key": shortToken(rKey),
	}).Info("a routine deleted")
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
