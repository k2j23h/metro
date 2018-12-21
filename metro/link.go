package metro

import (
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
)

// Link two stations between caller and requested station
func (h *ServerHandle) Link(ctx context.Context, in *LinkRequest) (*Status, error) {

	log.WithFields(log.Fields{
		"caller": in.GetToken().GetId(),
		"image":  in.GetStation().GetImage(),
	}).Info("Link is requested")

	// DockerAPI.ContainerCreate(ctx, &container.Config{
	// 	Image: in.Station.Image,
	// }, nil, nil, "")

	return &Status{Code: StatusCode_OK}, nil
}
