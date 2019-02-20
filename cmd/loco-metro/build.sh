#!/usr/bin/env bash

graper='github\.\|google\.\|golang\.\|gopkg\.'
go_path=$(go env | grep -m1 GOPATH= | cut -d "\"" -f 2)
loco_metro_src_path=$go_path/src/locomotes/metro/

deps=$(go list -f '{{ join .Deps "\n" }}' $loco_metro_src_path | grep $graper)
deps+=" "$(go list -f '{{ join .Deps "\n" }}' ./cmd/ | grep $graper)
deps=$(echo $deps | sed 's/ /,/g')

IFS=',' read -r -a deps <<< "$deps"
for element in "${deps[@]}"
do
    mkdir -p ./temp/$element/
    rsync -a $go_path/src/$element/ ./temp/$element/
    echo $element" done"
done

mkdir -p ./temp/locomotes/metro
rsync -a $loco_metro_src_path/ ./temp/locomotes/metro

docker build \
    -t loco-metro:latest .

rm -rf ./temp/