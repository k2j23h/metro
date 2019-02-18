package metro

import (
	"context"
	code "net/http"

	log "github.com/sirupsen/logrus"
)

// Link connects two stations between caller and requested station
func (h *ServerHandle) Link(ctx context.Context, in *LinkRequest) (*Status, error) {
	var (
		status = &Status{Code: code.StatusOK}
		token  = in.GetToken()
		srcSt  = in.GetSrc()
		dstSt  = in.GetDst()
		msg    = in.GetMessage()
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

	logger.Info("Link is requested")

	err := newInstance(dstDesc, &Signal{
		Src:     srcSt,
		Dst:     dstSt,
		Control: Signal_LINKED,
		Message: msg,
	})

	switch err {
	default:
		status.Code = code.StatusInternalServerError
		logger.Warn(err)
		return status, nil
	case errExists:
	case nil:
		logger.Info("new instance is created")
	}

	// dstDesc.transmit(Signal{
	// 	Src:     srcSt,
	// 	Dst:     dstSt,
	// 	Control: Signal_LINKED,
	// 	Message: msg,
	// })

	logger.Info("linked")

	return status, nil
}
