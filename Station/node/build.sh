#!/usr/bin/env bash

base_path=$(dirname $0)

docker build \
    -t loco-station-node8:latest $base_path/.