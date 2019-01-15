#!/usr/bin/env bash

base_path=$(dirname $0)

docker build \
    -t pinger:latest $base_path/.
     