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
	"context"
	"errors"
	"time"

	"locomotes/metro"

	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
	"google.golang.org/grpc"
)

var stationName string

// startCmd represents the start command
var startCmd = &cobra.Command{
	Use:   "start [OPTIONS] IMAGE",
	Short: "Start new workflow entry point",
	Args: func(cmd *cobra.Command, args []string) error {
		if len(args) < 1 {
			return errors.New("requires at least one arg")
		}

		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		image := args[0]

		conn, err := grpc.Dial(getServerAddress(), grpc.WithInsecure())
		if err != nil {
			log.Fatalf("Failed to connect Metro server: %v", err)
		}
		defer conn.Close()
		cli := metro.NewMetroClient(conn)

		ctx, cancel := context.WithTimeout(context.Background(), time.Second)
		defer cancel()
		res, err := cli.Start(ctx, &metro.StartRequest{
			Station: &metro.Station{
				Image: image,
				Name:  stationName,
			},
		})
		if err != nil {
			log.Fatalf("Failed to start: %v", err)
		}

		switch code := res.GetCode(); code {
		case 200:
			log.WithFields(log.Fields{
				"name":  stationName,
				"image": image,
			}).Info("Started new entry point Station")
		case 404:
			log.WithField("image", image).Warn("No such image")
		default:
			log.WithField("code", code).Warn("Reponded unkown error")
		}
	},
}

func init() {
	rootCmd.AddCommand(startCmd)

	startCmd.Flags().StringVarP(&stationName, "name", "n", "", "the name of station")
}