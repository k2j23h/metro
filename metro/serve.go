package metro

import (
	"net"
	"strconv"

	"github.com/docker/docker/client"
	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

// DckrCli is docker client
var DckrCli *client.Client

// ServeOptions holds parameters to serving a Metro server
type ServeOptions struct {
	IP   net.IP
	Port uint16
	asf  uint16
}

// Serve starts Metro server
func Serve(opt *ServeOptions) {
	addr := opt.getServerAddress()
	version := "1.39"

	cli, err := client.NewClientWithOpts(client.WithVersion(version))
	if err != nil {
		panic(err)
	}
	DckrCli = cli
	_ = DckrCli
	log.Info("Docker client with version " + cli.ClientVersion() + " created")

	lis, err := net.Listen("tcp", addr)
	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	RegisterMetroServer(s, &ServerHandle{})

	reflection.Register(s)
	log.Info("Starting GRPC server on " + addr)
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
	log.Info("asdf")
}

func (opts *ServeOptions) getServerAddress() string {
	return opts.IP.String() + ":" + strconv.Itoa(int(opts.Port))
}
