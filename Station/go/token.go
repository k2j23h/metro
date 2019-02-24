package main

import (
	"bufio"
	"io/ioutil"
	"strings"

	"github.com/lesomnus/metro/station/go/metro"
)

var (
	token *metro.Token
)

func init() {
	dat, _ := ioutil.ReadFile("/proc/self/cgroup")

	cgroup := bufio.NewScanner(strings.NewReader(string(dat)))
	for cgroup.Scan() {
		line := cgroup.Text()
		if strings.Contains(line, "docker") {
			token = &metro.Token{
				Id: strings.Split(line, "docker/")[1],
			}
			break
		}
	}

	if token != nil {
		return
	}

	token = &metro.Token{
		Id: "zzawer",
	}
}
