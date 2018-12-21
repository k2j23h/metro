$GO_OUT_DIR = "../metro/"

protoc.exe `
    --go_out="plugins=grpc:$GO_OUT_DIR" `
    ./Metro.proto