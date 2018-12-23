package metro

import (
	code "net/http"

	"github.com/docker/docker/api/types/container"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
)

// Link connects two stations between caller and requested station
func (h *ServerHandle) Link(ctx context.Context, in *LinkRequest) (*Status, error) {
	token := in.GetToken().GetId()
	station := in.GetStation()
	status := Status{Code: code.StatusOK}

	res, err := DockerAPI.ContainerCreate(context.Background(), &container.Config{
		Image: "qwe",
	}, nil, nil, "station.GetName()")
	if err != nil {
		log.Warn(err)
		status.Code = code.StatusNotFound
	}

	_ = StationDescriptor{
		station.GetName(),
		station.GetImage(),
		res.ID,
		make(chan string),
	}

	log.WithFields(log.Fields{
		"caller": token,
		"image":  station.GetImage(),
	}).Info("Link is requested")

	return &status, nil
}
