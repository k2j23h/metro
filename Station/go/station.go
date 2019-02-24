package main

import (
	"context"
	"fmt"
	"time"

	"github.com/lesomnus/metro/station/go/types"
)

// Station is adfs
type Station struct {
	context context.Context
	flowID  string
	name    string
	image   string

	onSignal  []types.Handle
	onLinked  []types.Handle
	onBlocked []types.Handle
	onClosed  []types.Handle
}

// Name is name of the station
func (s *Station) Name() string { return s.name }

// Image is image of the station
func (s *Station) Image() string { return s.image }

// Link writes a message to be sent to future reachable `Station`
//
// It just writes a message but does not send it yet.
// You can send it by specifying the destination `Station` using returned `To` method.
func (s *Station) Link(msg string) types.MsgTo {
	return LinkMsg{
		sender: s,
		msg:    msg,
	}
}

// Block writes a message to be sent telling `Station` not to send any further messages.
//
// It just writes a message but does not send it yet.
// You can send it by specifying the destination `Station` using returned `From` method.
func (s *Station) Block(msg string) types.MsgFrom {
	return BlockMsg{
		sender: s,
		msg:    msg,
	}
}

// Signal writes a message to be sent to other `Station`.
//
// It just writes a message but does not send it yet.
// You can send it by specifying the destination `Station` using returned `To` method.
func (s *Station) Signal(msg string) types.MsgTo {
	return SignalMsg{
		sender: s,
		msg:    msg,
	}
}

// On register Handler for receiving messages
func (s *Station) On(event types.EventName, handle types.Handle) {
	switch event {
	case types.Linked:
		s.onLinked = append(s.onLinked, handle)
	case types.Blocked:
		s.onBlocked = append(s.onBlocked, handle)
	case types.Signal:
		s.onSignal = append(s.onSignal, handle)
	case types.Closed:
		s.onClosed = append(s.onClosed, handle)
	}
}

// Close the `Station` and emits `closed` event.
//
// If you want to listen, obviously, should subscribe listener before close.
func (s *Station) Close() {

}

// Log prints operand string
func (s *Station) Log(msg string) {
	t := time.Now().UnixNano() / int64(time.Millisecond)
	fmt.Println(fmt.Sprintf("%d %s", t, msg))
}

func (s *Station) emit(event types.EventName, msg string, from types.StationDesc) {
	var hs []types.Handle
	switch event {
	case types.Linked:
		hs = s.onLinked
	case types.Blocked:
		hs = s.onBlocked
	case types.Signal:
		hs = s.onSignal
	case types.Closed:
		hs = s.onClosed
	}

	for _, h := range hs {
		h(msg, from)
	}
}
