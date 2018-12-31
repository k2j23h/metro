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

	if dest, err := station.getStBody(); err == nil {
		orgn, _ := token.getStBody()

		dest.transmit <- Signal{
			Station: orgn.descriptor.toStation(),
			Message: in.GetMessage(),
		}

		log.WithFields(log.Fields{
			"token": token.toShort(),
			"dest":  dest.descriptor.name,
			"msg":   in.GetMessage(),
		}).Info("signal transmited")
	} else {
		log.WithFields(log.Fields{
			"name": station.GetName(),
		}).Warn(err)
		status.Code = code.StatusNotFound
		return status, nil
	}

	return status, nil
}
