package metro

import (
	code "net/http"

	"github.com/docker/docker/api/types/container"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
)

// Start creates entry point Station
func (h *ServerHandle) Start(ctx context.Context, in *StartRequest) (*Status, error) {
	station := in.GetStation()
	status := Status{Code: code.StatusOK}

	log.WithFields(log.Fields{
		"name":  station.GetName(),
		"image": station.GetImage(),
	}).Info("Start is requested")

	res, err := DckrCli.ContainerCreate(ctx, &container.Config{
		Image: station.Image,
	}, nil, nil, station.GetName())
	if err != nil {
		log.Warn(err)
		status.Code = code.StatusNotFound
	}

	register(res.ID, &StationDescriptor{
		station.GetName(),
		station.GetImage(),
		res.ID,
	})

	return &status, nil
}
