package metro

import (
	code "net/http"

	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
)

// Transmit messages to other server or Metro through Metro server steram
func (h *ServerHandle) Transmit(ctx context.Context, in *TransmitRequest) (*Status, error) {
	token := in.GetToken().GetId()
	station := in.GetStation()

	log.WithFields(log.Fields{
		"caller": token,
		"image":  station.GetImage(),
	}).Info("Transmit is requested")

	return &Status{Code: code.StatusOK}, nil
}
