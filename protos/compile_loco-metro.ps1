$METRO_OUT_DIR = "../metro"

protoc.exe `
    --go_out="plugins=grpc:$METRO_OUT_DIR" `
    ./loco.proto `
    ./Router.proto `
    ./Ctl.proto