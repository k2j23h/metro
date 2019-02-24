package main

import (
	"github.com/lesomnus/metro/cmd/metro/cmd"

	log "github.com/sirupsen/logrus"
)

func main() {

	log.SetFormatter(&log.TextFormatter{
		ForceColors: true,
	})

	cmd.Execute()
}
