package metro

import (
	"github.com/docker/docker/client"
)

// DockerAPI is docker client
var DockerAPI client.Client

// Init initiates Metro
func Init() {
	DockerAPI, err := client.NewClientWithOpts(client.WithVersion("1.39"))
	if err != nil {
		panic(err)
	}

	_ = DockerAPI
}
