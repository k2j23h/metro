package metro

import (
	log "github.com/sirupsen/logrus"
)

// Listen messages come from other stations or Metro through Metro server stream
func (h *RouterHandle) Listen(token *Token, stream Router_ListenServer) error {
	desc, ok := token.getDesc()
	if !ok {
		log.Warn(errInvTkn)
		return nil
	}

	logger := log.WithFields(log.Fields{
		"token": token.toShort(),
		"user":  desc.userID,
		"image": desc.image,
	})

	logger.Info("Listen is requested")

	body, ok := desc.getBody()
	if !ok {
		logger.Fatal(errNExists)
	}

	go func() {
		for {
			select {
			case <-stream.Context().Done():
				return
			case sig := <-body.transmit:
				stream.Send(&sig)
			}
		}
	}()

	<-stream.Context().Done()
	logger.Info("stops listening")
	return nil
}
