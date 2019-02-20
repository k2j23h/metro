$METRO_OUT_DIR = "../cmd/metro/metro"

protoc.exe `
    --go_out="plugins=grpc:$METRO_OUT_DIR" `
    ./loco.proto `
    ./Ctl.proto