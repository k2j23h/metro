package metro

import (
	"context"
	code "net/http"

	log "github.com/sirupsen/logrus"
)

// Load creates Station
func (h *CtlHandle) Load(ctx context.Context, in *LoadRequest) (*Status, error) {
	var (
		status  = &Status{Code: code.StatusOK}
		station = in.GetStation()
		desc    = newInstDesc(in.GetUserID(), station.GetImage())
	)

	logger := log.WithFields(log.Fields{
		"userID": desc.userID,
		"image":  desc.image,
		"name":   station.GetName(),
	})

	logger.Info("Load is requested")

	err := newInstance(desc, nil)

	switch err {
	default:
		status.Code = code.StatusInternalServerError
		logger.Warn(err)
		return status, nil
	case errExists:
	case errNExists:
		status.Code = code.StatusNotFound
		logger.Warn(err)
		return status, nil
	case nil:
		logger.Info("new instance is created")
	}

	return status, nil
}
