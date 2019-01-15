#!/usr/bin/env bash

base_path=$(dirname $0)

docker build \
    -t ponger:latest $base_path/.
     