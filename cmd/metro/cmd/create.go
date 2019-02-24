package cmd

import (
	"context"
	"errors"
	"io"
	"io/ioutil"
	"os"
	"path"
	"path/filepath"
	"strings"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/mholt/archiver"
	log "github.com/sirupsen/logrus"
	"github.com/spf13/cobra"
)

var (
	imagename string
	imagetag  string
)

// createCmd represents the create command
var createCmd = &cobra.Command{
	Use:   "create FILE|DIR",
	Short: "Create metro function image",
	Args: func(cmd *cobra.Command, args []string) error {
		if len(args) < 1 {
			return errors.New("requires at least one arg")
		}

		return nil
	},
	Run: func(cmd *cobra.Command, args []string) {
		check := func(err error) {
			if err != nil {
				panic(err)
			}
		}

		srcPath := args[0]

		stat, err := os.Stat(srcPath)
		check(err)

		var (
			src  []string
			repo string
		)

		if stat.IsDir() {
			repo, err = filepath.Abs(srcPath)
			check(err)
			repo = filepath.Base(repo)

			files, err := ioutil.ReadDir(srcPath)
			check(err)
			for _, f := range files {
				src = append(src, path.Join(srcPath, f.Name()))
			}
		} else {
			_, repo = filepath.Split(srcPath)
			repo = strings.TrimSuffix(repo, filepath.Ext(repo))

			temp, err := ioutil.TempDir("", "")
			check(err)
			defer os.RemoveAll(temp)

			trg := path.Join(temp, "main.js")
			in, err := os.Open(srcPath)
			defer in.Close()
			check(err)
			out, err := os.Create(trg)
			defer out.Close()
			check(err)
			_, err = io.Copy(out, in)
			check(err)
			check(out.Sync())
			src = append(src, trg)
		}

		if len(imagename) > 0 {
			repo = imagename
		}
		if len(imagetag) > 0 {
			repo = repo + ":" + imagetag
		}

		tar, err := ioutil.TempFile("", "*.tar")
		check(err)
		defer os.Remove(tar.Name())
		t := archiver.Tar{OverwriteExisting: true}
		err = t.Archive(src, tar.Name())
		check(err)

		ctx := context.Background()
		cli, err := client.NewClientWithOpts(client.WithVersion("1.39"))
		check(err)

		createRes, err := cli.ContainerCreate(ctx, &container.Config{
			Image: "lesomnus/metro-station-node8",
		}, nil, nil, "")
		check(err)
		defer cli.ContainerRemove(ctx, createRes.ID, types.ContainerRemoveOptions{})

		err = cli.CopyToContainer(ctx, createRes.ID, "/usr/src/app/app/", tar, types.CopyToContainerOptions{})
		check(err)

		_, err = cli.ContainerCommit(ctx, createRes.ID, types.ContainerCommitOptions{
			Reference: repo,
		})
		check(err)

		log.WithFields(log.Fields{
			"repo": repo,
		}).Info("New Metro function is created")
	},
}

func init() {
	rootCmd.AddCommand(createCmd)

	createCmd.Flags().StringVarP(&imagename, "name", "n", "", "image name (FILE or DIR name by default)")
	createCmd.Flags().StringVarP(&imagetag, "tag", "t", "", "image tag")
}
