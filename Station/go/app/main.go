package app

import (
	"fmt"

	"locomotes/station/go/types"
)

var ponger = types.StationDesc{
	Name:  "ponger",
	Image: "ponger:latest",
}

// Open returns definition of Station
func Open(s types.Station, msg string) {

	s.On(types.Signal, func(msg string, from types.StationDesc) {
		s.Log(fmt.Sprintf("%s from %s", msg, from.Name))
		s.Block("").From(ponger)
		s.Close()
	})

	s.Link("").To(ponger)

	s.Signal("pinged").To(ponger)
}
