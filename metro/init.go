package metro

import (
	"github.com/docker/docker/client"
	log "github.com/sirupsen/logrus"
)

// DockerAPI is docker client
var DockerAPI *client.Client

// Init initiates Metro
func Init() {
	cli, err := client.NewClientWithOpts(client.WithVersion("1.39"))
	if err != nil {
		panic(err)
	}
	DockerAPI = cli
	log.Info("Docker client created.")

	_ = DockerAPI
}
