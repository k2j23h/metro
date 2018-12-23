package metro

import (
	"github.com/docker/docker/client"
	log "github.com/sirupsen/logrus"
)

// DckrCli is docker client
var DckrCli *client.Client

// Init initiates Metro
func Init() {
	version := "1.39"
	cli, err := client.NewClientWithOpts(client.WithVersion(version))
	if err != nil {
		panic(err)
	}
	DckrCli = cli
	log.Info("Docker client with version " + cli.ClientVersion() + " created")

	_ = DckrCli
}
