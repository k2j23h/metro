go_path=$(go env | grep -m1 GOPATH= | cut -d "\"" -f 2)
loco_station_path=$go_path/src/locomotes/station/js/.
rsync -av --progress $loco_station_path ./ \
     --exclude **/node_modules \
     --exclude *lock.json
docker build \
     -t pinger:latest . \
     --build-arg loco_station_path=$loco_station_path
     