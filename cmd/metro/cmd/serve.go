// Copyright © 2018 NAME HERE <EMAIL ADDRESS>
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package cmd

import (
	"net"
	"strconv"

	"locomotes/metro"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

var (
	serverIP   net.IP
	serverPort uint16
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Serving Metro server",
	Run: func(cmd *cobra.Command, args []string) {
		metro.Init()

		serverAddress := serverIP.String() + ":" + strconv.Itoa(int(serverPort))

		lis, err := net.Listen("tcp", serverAddress)

		if err != nil {
			log.Fatalf("failed to listen: %v", err)
		}

		s := grpc.NewServer()
		metro.RegisterMetroServer(s, &metro.ServerHandle{})

		reflection.Register(s)
		log.Info("Starting GRPC server on " + serverAddress)
		if err := s.Serve(lis); err != nil {
			log.Fatalf("failed to serve: %v", err)
		}
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)

	serveCmd.Flags().IPVarP(&serverIP, "address", "a", net.IPv4(0, 0, 0, 0), "IP address that the Metro server serving")
	serveCmd.Flags().Uint16VarP(&serverPort, "port", "p", 50051, "Port number that the Metro server exposing")
}
