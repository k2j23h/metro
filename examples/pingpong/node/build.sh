#!/usr/bin/env bash

base_path=$(dirname $0)

metro create -n pinger $base_path/pinger.js
metro create -n ponger $base_path/ponger.js

wait