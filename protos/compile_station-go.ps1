$METRO_OUT_DIR = "../station/go/metro"

protoc.exe `
    --go_out="plugins=grpc:$METRO_OUT_DIR" `
    ./loco.proto `
    ./Router.proto