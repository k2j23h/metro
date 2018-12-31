#!/usr/bin/env bash

go_path=$(go env | grep -m1 GOPATH= | cut -d "\"" -f 2)
loco_station_path=$go_path/src/locomotes/station/js/

rsync -av --progress $loco_station_path ./temp \
     --exclude **/node_modules \
     --exclude *lock.json
cp app.js ./temp/app.js

docker build \
     -t ponger:latest .

rm -r ./temp
     