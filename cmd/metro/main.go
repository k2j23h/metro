package main

import (
	"net"

	"locomotes/metro"

	log "github.com/sirupsen/logrus"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

const (
	port = ":50051"
)

func main() {
	log.SetFormatter(&log.TextFormatter{
		ForceColors: true,
	})
	metro.Init()

	lis, err := net.Listen("tcp", port)

	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	s := grpc.NewServer()
	metro.RegisterMetroServer(s, &metro.ServerHandle{})

	reflection.Register(s)
	log.Info("Starting GRPC server")
	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
