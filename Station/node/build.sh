#!/usr/bin/env bash

base_path=$(dirname $0)

docker build \
    -t metro-station-node8:latest $base_path/.