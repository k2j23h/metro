#!/usr/bin/env bash

#
# USER DEFINE VARIABLES
#
myPkgRootName='github.com/lesomnus/metro'
myPkgPath=$myPkgRootName'/station/go'
imageRef='loco-station-go1.11:latest'
graper=$myPkgRootName'\|github\.\|google\.\|golang\.\|gopkg\.'

#
# DO NOT TOUCH
#
go_path=$(go env | grep -m1 GOPATH= | cut -d "\"" -f 2)
src_path=$go_path'/src/'$myPkgPath
dckf_path=$src_path'/Dockerfile'

if [ ! -f  "$dckf_path" ]; then
    echo "Dockerfile not provided: $dckf_path"
    exit 1
fi

tmp_path=$(mktemp -d)

deps=$(go list -f '{{ join .Deps "\n" }}' $src_path | grep $graper)
deps=$(echo $deps | sed 's/ /,/g')

IFS=',' read -r -a deps <<< "$deps"
for element in "${deps[@]}"
do
    mkdir -p $tmp_path/$element/
    rsync -a $go_path/src/$element/ $tmp_path/$element/
    echo $element" done"
done

mkdir -p $tmp_path/app
cp $go_path/src/app/main.go $tmp_path/app/main.go

mkdir -p $tmp_path/$myPkgPath
rsync -a $src_path/* $tmp_path/$myPkgPath

cp $dckf_path $tmp_path/Dockerfile

docker build \
    -t $imageRef \
    $tmp_path

rm -rf $tmp_path