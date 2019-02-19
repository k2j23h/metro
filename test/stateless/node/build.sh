#!/usr/bin/env bash

base_path=$(dirname $0)

metro create -n greeter-server $base_path/greeter-server.js
metro create -n greeter-client $base_path/greeter-client.js

wait