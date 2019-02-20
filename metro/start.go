package metro

import (
	code "net/http"

	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
)

func (desc *instDesc) start(name string) (string, error) {
	station := &Station{
		Id:   generateID(),
		Name: name,
	}

	if err := desc.transmit(Signal{
		Dst:     station,
		Control: Signal_START,
	}); err != nil {
		return "", err
	}

	return station.GetId(), nil
}

func startHandler(ctx context.Context, in *StartRequest) (*Status, error) {
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

	logger.Info("Start is requested")

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

	flowID, err := desc.start(station.GetName())

	switch err {
	default:
		status.Code = code.StatusInternalServerError
		logger.Warn(err)
		return status, nil
	case errNExists:
		logger.Fatal("it should not be happend")
	case nil:
		logger.WithField(
			"flow", truncateID(flowID),
		).Info("new flow is started")
	}

	return status, nil
}

// Start creates entry point Station
func (h *RouterHandle) Start(ctx context.Context, in *StartRequest) (*Status, error) {
	return startHandler(ctx, in)
}

// Start creates entry point Station
func (h *CtlHandle) Start(ctx context.Context, in *StartRequest) (*Status, error) {
	return startHandler(ctx, in)
}
