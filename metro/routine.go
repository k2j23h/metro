package metro

var routines = make(map[string]map[string]*StationDescriptor)
var cache = make(map[string]string)

// Regist regists station to routine.
func Regist(token TokenDescriptor, station *StationDescriptor) {
	id := station.containerID

	routineID, ok := cache[token]

	if !ok {
		routineID = id
	}

	routines[routineID][id] = station
	cache[id] = routineID
}

// Get retuen StationDescripor corresponding to the token.
func Get(token TokenDescriptor) *StationDescriptor {
	if routineID, ok := cache[token]; ok {
		return routines[routineID][token]
	}

	return nil
}
