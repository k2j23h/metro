package metro

import (
	code "net/http"
	"strconv"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	log "github.com/sirupsen/logrus"
	"golang.org/x/net/context"
)

// Link connects two stations between caller and requested station
func (h *ServerHandle) Link(ctx context.Context, in *LinkRequest) (*Status, error) {
	token := in.GetToken()
	station := in.GetStation()
	status := Status{Code: code.StatusOK}

	log.WithFields(log.Fields{
		"token": token.toShort(),
		"image": station.GetImage(),
	}).Info("Link is requested")

	if ok := station.isNameRegistered(); ok {
		status.Code = code.StatusConflict
		return &status, nil
	}

	res, err := DckrCli.ContainerCreate(ctx, &container.Config{
		Image: station.GetImage(),
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
	}

	log.WithFields(log.Fields{
		"token": shortToken(res.ID),
		"name":  station.GetName(),
		"image": station.GetImage(),
	}).Info("new station created")

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

	log.WithFields(log.Fields{
		"token": shortToken(res.ID),
		"name":  station.GetName(),
		"image": station.GetImage(),
	}).Info("new station started")

	return &status, nil
}
