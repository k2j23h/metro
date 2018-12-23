package metro

// StationDescriptor describe station
type StationDescriptor struct {
	name        string
	image       string
	containerID string
	sigStream   chan string
}
