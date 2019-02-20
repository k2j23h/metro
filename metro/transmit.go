package metro

import (
	"context"
	code "net/http"

	log "github.com/sirupsen/logrus"
)

func (desc *instDesc) transmit(signal Signal) error {
	body, ok := desc.getBody()
	if !ok {
		return errNExists
	}

	body.transmit <- signal
	return nil
}

// Transmit deliver messages to other server or Metro through Metro server steram
func (h *RouterHandle) Transmit(ctx context.Context, in *TransmitRequest) (*Status, error) {
	var (
		status = &Status{Code: code.StatusOK}
		token  = in.GetToken()
		srcSt  = in.GetSrc()
		dstSt  = in.GetDst()
	)

	srcDesc, ok := token.getDesc()
	if !ok {
		log.Warn(errInvTkn)
		status.Code = code.StatusUnauthorized
		return status, nil
	}
	srcSt.Image = srcDesc.image
	dstSt.Id = srcSt.GetId()

	dstDesc := &instDesc{
		userID: srcDesc.userID,
		image:  dstSt.GetImage(),
	}

	logger := log.WithFields(log.Fields{
		"token": token.toShort(),
		"flow":  srcSt.toShort(),
		"src":   srcSt.toString(),
		"dst":   dstSt.toString(),
	})

	logger.Info("Transmit is requested")

	dstDesc.transmit(Signal{
		Src:     srcSt,
		Dst:     dstSt,
		Message: in.GetMessage(),
		Control: Signal_MESSAGE,
	})

	logger.WithFields(log.Fields{
		"msg": in.GetMessage(),
	}).Info("message is transmitted")

	return status, nil
}
