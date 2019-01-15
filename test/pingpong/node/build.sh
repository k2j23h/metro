#!/usr/bin/env bash

base_path=$(dirname $0)

$base_path/pinger/build.sh >> $base_path/pinger.log &
$base_path/ponger/build.sh >> $base_path/ponger.log &

wait