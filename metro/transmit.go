package metro

import (
	code "net/http"

	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
)

// Transmit messages to other server or Metro through Metro server steram
func (h *ServerHandle) Transmit(ctx context.Context, in *TransmitRequest) (*Status, error) {
	status := &Status{Code: code.StatusOK}
	token := in.GetToken()
	station := in.GetStation()

	log.WithFields(log.Fields{
		"token": token.toShort(),
		"image": station.GetImage(),
	}).Info("Transmit is requested")

	dest, err := getStBody(token)
	if err != nil {
		log.WithField("token", token.toShort())
		status.Code = code.StatusNotFound
		return status, nil
	}

	dest.transmit <- in.GetMessage()

	return status, nil
}
