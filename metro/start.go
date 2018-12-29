package metro

import (
	code "net/http"
	"strconv"

	"github.com/docker/docker/api/types"
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
		Env: []string{
			"LOCO_METRO_SERVER_HOST=" + metroContName,
			"LOCO_METRO_SERVER_PORT=" + strconv.Itoa(int(serveOpts.Port)),
		},
	}, &container.HostConfig{
		NetworkMode: "metro",
	}, nil, station.GetName())
	if err != nil {
		log.Warn(err)
		status.Code = code.StatusNotFound
		return &status, nil
	}

	log.WithFields(log.Fields{
		"token": shortToken(res.ID),
		"name":  station.GetName(),
		"image": station.GetImage(),
	}).Info("New station created")

	register(res.ID, &StationDescriptor{
		station.GetName(),
		station.GetImage(),
		res.ID,
	})

	if err := DckrCli.ContainerStart(
		context.Background(), res.ID,
		types.ContainerStartOptions{},
	); err != nil {
		log.Fatal(err)
	}

	return &status, nil
}
