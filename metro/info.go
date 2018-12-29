package metro

import (
	"bufio"
	"crypto/rand"
	"encoding/hex"
	"io"
	"os"
	"strings"

	log "github.com/sirupsen/logrus"
	context "golang.org/x/net/context"
)

var (
	metroContID   string
	isMetroInCont bool
	metroContName string
)

func updateInfo() {
	// resolve Metro container ID
	{
		cgroup, err := os.Open("/proc/self/cgroup")
		defer cgroup.Close()
		if err != nil {
			id := make([]byte, 31)
			if _, err := io.ReadFull(rand.Reader, id); err != nil {
				log.Fatal(err)
			}
			metroContID = "zz" + hex.EncodeToString(id)
			isMetroInCont = false
		} else {
			scanner := bufio.NewScanner(cgroup)
			for scanner.Scan() {
				line := scanner.Text()
				if !strings.Contains(line, "docker") {
					continue
				}
				metroContID = strings.Split(line, "docker/")[1]
				isMetroInCont = true
				break
			}
		}
	}

	// inspect Metro container
	{
		info, err := DckrCli.ContainerInspect(context.Background(), metroContID)
		if err != nil {
			log.Fatalf("Failed to inspect Metro container: %v", err)
		}
		metroContName = info.Name[1:]
	}
}
