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
var serveOpts ServeOptions

// ServeOptions holds parameters to serving a Metro server
type ServeOptions struct {
	Host string
	Port uint16
}

// Serve starts Metro server
func Serve(opt *ServeOptions) {
	serveOpts = *opt
	addr := serveOpts.getServerAddress()
	version := "1.39"

	cli, err := client.NewClientWithOpts(client.WithVersion(version))
	if err != nil {
		panic(err)
	}
	DckrCli = cli
	log.WithFields(log.Fields{
		"version": cli.ClientVersion(),
	}).Info("the Docker client created")

	updateInfo()
	serveOptsFields := log.Fields{
		"ID":   shortToken(metroContID),
		"Name": metroContName,
	}

	log.WithFields(serveOptsFields).Info("the Metro server inspected")

	lis, err := net.Listen("tcp", addr)
	if err != nil {
		log.WithFields(serveOptsFields).Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	RegisterMetroServer(s, &ServerHandle{})

	reflection.Register(s)
	log.WithFields(serveOptsFields).Info("starting the GRPC server")
	if err := s.Serve(lis); err != nil {
		log.WithFields(serveOptsFields).Fatalf("failed to serve: %v", err)
	}
}

func (opts *ServeOptions) getServerAddress() string {
	return opts.Host + ":" + strconv.Itoa(int(opts.Port))
}
