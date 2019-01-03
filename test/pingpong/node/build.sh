#!/usr/bin/env bash

./pinger/build.sh >> pinger.log &
./ponger/build.sh >> ponger.log &

wait