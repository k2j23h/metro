package metro

import (
	"strconv"

	log "github.com/sirupsen/logrus"
)

// Listen messages come from other stations or Metro through Metro server stream
func (h *ServerHandle) Listen(token *Token, stream Metro_ListenServer) error {

	log.WithFields(log.Fields{
		"token": token.toShort(),
	}).Info("Listen is requested")

	for i := 1; i < 5; i++ {
		stream.Send(&Signal{
			Station: &Station{
				Name:  "zxvc",
				Image: "qwer",
			},
			Message: strconv.Itoa(i),
		})
	}

	return nil
}
