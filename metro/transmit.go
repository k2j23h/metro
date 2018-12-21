package metro

import (
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
)

// Transmit messages to other server or Metro through Metro server steram
func (h *ServerHandle) Transmit(ctx context.Context, in *TransmitRequest) (*Status, error) {

	log.WithFields(log.Fields{
		"caller": in.GetToken().GetId(),
		"image":  in.GetStation(),
	}).Info("Transmit is requested")

	return &Status{Code: StatusCode_OK}, nil
}
