package cmd

import (
	"github.com/lesomnus/metro"

	"github.com/spf13/cobra"
)

// serveCmd represents the serve command
var serveCmd = &cobra.Command{
	Use:   "serve",
	Short: "Serving Metro server",
	Run: func(cmd *cobra.Command, args []string) {
		metro.Serve(&metro.ServeOptions{
			Host: serverHost,
			Port: serverPort,
		})
	},
}

func init() {
	rootCmd.AddCommand(serveCmd)
}
