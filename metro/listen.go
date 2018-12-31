package metro

import (
	log "github.com/sirupsen/logrus"
)

// Listen messages come from other stations or Metro through Metro server stream
func (h *ServerHandle) Listen(token *Token, stream Metro_ListenServer) error {

	log.WithFields(log.Fields{
		"token": token.toShort(),
	}).Info("Listen is requested")

	station, err := token.getStBody()
	if err != nil {
		log.WithFields(log.Fields{
			"token": token.toShort(),
		}).Warn(err)

		return nil
	}

	go func() {
		for {
			select {
			case <-stream.Context().Done():
				log.WithFields(log.Fields{
					"token": token.toShort(),
				}).Info("stops listening")
				return
			case sig := <-station.transmit:
				stream.Send(&sig)
			}
		}
	}()

	// for i := 1; i < 5; i++ {
	// 	stream.Send(&Signal{
	// 		Station: &Station{
	// 			Name:  "zxvc",
	// 			Image: "qwer",
	// 		},
	// 		Message: strconv.Itoa(i),
	// 	})
	// }

	<-stream.Context().Done()
	return nil
}
