#!/usr/bin/env bash

base_path=$(dirname $0)
temp_path=$base_path/temp
go_path=$(go env | grep -m1 GOPATH= | cut -d "\"" -f 2)
loco_station_path=$go_path/src/locomotes/station/node/

rsync -av --progress $loco_station_path $temp_path \
     --exclude **/node_modules \
     --exclude *lock.json
cp $base_path/app.js $temp_path/app.js

docker build \
     -t ponger:latest $base_path/.

rm -r $temp_path
     