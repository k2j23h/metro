package main

import (
	"errors"

	"locomotes/station/go/metro"
	"locomotes/station/go/types"
)

// LinkMsg holds message to be sent
type LinkMsg struct {
	sender *Station
	msg    string
}

// To resolve LinkMsg
func (m LinkMsg) To(s types.StationDesc) error {
	var (
		src = &metro.Station{
			Id:    m.sender.flowID,
			Name:  m.sender.name,
			Image: m.sender.image,
		}
		dst = &metro.Station{
			Name:  s.Name,
			Image: s.Image,
		}
		req = &metro.LinkRequest{
			Token:   token,
			Src:     src,
			Dst:     dst,
			Message: m.msg,
		}
	)

	res, err := routerCli.Link(m.sender.context, req)
	if err != nil {
		return err
	}

	code := res.GetCode()
	switch code {
	default:
		return errors.New("unknown error from router")
	case 200:
		return nil
	case 404:
		return &types.NExistErr{What: s.Image}
	}
}
