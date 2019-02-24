#!/usr/bin/env bash

docker run -it --rm --network=metro \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --publish 50051:50051 \
    --name metro \
    lesomnus/metro-server:latest serve