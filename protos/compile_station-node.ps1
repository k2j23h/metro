$PROTOC_GEN_TS_PATH = Get-Command protoc-gen-ts.cmd `
    | Where-Object {$_.CommandType -match "Application"} `
    | Select-Object -First 1 -ExpandProperty Source 

$GRPC_NODE_PLUGIN_PATH = Get-Command grpc_tools_node_protoc_plugin.cmd `
| Where-Object {$_.CommandType -match "Application"} `
| Select-Object -First 1 -ExpandProperty Source 

$GPRG_OUT_DIR = "../station/node/pb/"
$JS_OUT_DIR = "../station/node/pb/"
$TS_OUT_DIR = "../station/node/pb/"

protoc.exe `
    --grpc_out="$GPRG_OUT_DIR" `
    --js_out="import_style=commonjs,binary:$JS_OUT_DIR" `
    --ts_out="$TS_OUT_DIR" `
    --plugin="protoc-gen-grpc=$GRPC_NODE_PLUGIN_PATH" `
    --plugin="protoc-gen-ts=$PROTOC_GEN_TS_PATH" `
    ./loco.proto `
    ./Router.proto