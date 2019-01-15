package metro

import (
	"strconv"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	context "golang.org/x/net/context"
)

var (
	// userID:imageName:instBody
	instances = make(map[string]map[string]instBody)

	containers = make(map[string]instDesc)
)

type instDesc struct {
	userID string
	image  string
}

type instBody struct {
	contID   string
	transmit chan Signal
}

func (token *Token) getDesc() (instDesc, bool) {
	desc, ok := containers[token.GetId()]
	return desc, ok
}

func (desc *instDesc) getBody() (instBody, bool) {
	body, ok := instances[desc.userID][desc.image]
	return body, ok
}

func createInst(image string) (string, error) {
	res, err := DckrCli.ContainerCreate(context.Background(), &container.Config{
		Image: image,
		Env: []string{
			"LOCO_METRO_SERVER_HOST=" + metroContName,
			"LOCO_METRO_SERVER_PORT=" + strconv.Itoa(int(serveOpts.Port)),
		},
	}, &container.HostConfig{
		NetworkMode: metroContNetMode,
	}, nil, "")

	if err != nil {
		return "", err
	}

	err = DckrCli.ContainerStart(
		context.Background(), res.ID,
		types.ContainerStartOptions{},
	)

	return res.ID, err
}

func newInstance(desc *instDesc) error {
	pool, ok := instances[desc.userID]
	if !ok {
		inst := make(map[string]instBody)
		instances[desc.userID] = inst
		pool = inst
	}

	if _, ok := pool[desc.image]; ok {
		return errExists
	}

	pool[desc.image] = instBody{transmit: make(chan Signal, 1)}

	go func() {
		contID, err := createInst(desc.image)

		if err != nil {
			delete(pool, desc.image)
			return
		}

		body, _ := pool[desc.image]
		body.contID = contID
		containers[contID] = *desc
	}()

	return nil
}
