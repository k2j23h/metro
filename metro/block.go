package metro

import (
	"context"
	code "net/http"

	log "github.com/sirupsen/logrus"
)

// Block prevent transmiting signal to src from dst
func (h *ServerHandle) Block(ctx context.Context, in *BlockRequest) (*Status, error) {
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

	logger.Info("Block is requested")

	dstDesc.transmit(Signal{
		Src:     srcSt,
		Dst:     dstSt,
		Control: Signal_BLOCKED,
		Message: msg,
	})

	logger.Info("blocked")

	return status, nil
}
