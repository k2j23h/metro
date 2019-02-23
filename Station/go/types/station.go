package types

// EventName represents the name of the event.
type EventName int

const (
	_ EventName = iota
	// Closed is the event that a current `Station` closed
	Closed
	// Linked is the event that a `Station` made a `LINK` request to this `Station`.
	Linked
	// Blocked is the event that a `Station` made a `BLOCK` request to this `Station`.
	Blocked
	// Signal is an event that a `Station` sent a `SIGNAL` to this `Station`.
	Signal
)

// StationDesc holds description of Station
type StationDesc struct {
	Name  string
	Image string
}

// Handle is callback for receiving messages
type Handle = func(string, StationDesc)

// MsgTo resolves messages
type MsgTo interface{ To(StationDesc) error }

// MsgFrom resolves messages
type MsgFrom interface{ From(StationDesc) error }

// type msgFrom interface{ From }

// Station is adfs
type Station interface {
	Name() string
	Image() string

	On(EventName, Handle)
	Signal(string) MsgTo
	Link(string) MsgTo
	Block(string) MsgFrom
	Close()
	Log(string)
}
