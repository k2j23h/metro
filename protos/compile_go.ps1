$GO_OUT_DIR = "../metro/pg"

protoc.exe `
    --go_out="plugins=grpc:$GO_OUT_DIR" `
    ./Metro.proto