$GO_OUT_DIR = "../Locolet/director"

protoc.exe `
    --go_out="plugins=grpc:$GO_OUT_DIR" `
    ./Director.proto