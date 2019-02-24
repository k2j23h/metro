Metro
=====

Deploy workflows without any configuration.
The activity is written in code, and the next steps in the workflow are also represented in code.
Metro exposes the most basic "message transfer" method that has been abstracted from an existing workflow, allowing users to create complex and diverse workflows as they come to mind.

## Motivation

With the advent of serverless computing, the size of microservices has been shrunk to function units, and now we need to combine small functions to form a workflow.
For this, Amazon provides Step Functions, Azure provides Durable Functions, and IBM Cloud provides Composer.
All three offer different workflow programming models, but behind the scenes are actually sending and receiving messages.
Metros exposes the method to send and receive messages to the surface, and the user can model the workflow that the user is aiming for.

At Metro, the activity is more than a function, it has grown up again as a service, a microservice.
Furthermore, of course, activities can also sustain its state during the workflow runtime.

Check out the [ping-pong example](examples/pingpong/node/pinger) written in Node.js v8 and start Metro.

## Getting Started

### Prerequisites

- [Go](https://golang.org/doc/install) > 1.11
- [Docker](https://docs.docker.com/install/linux/docker-ce/ubuntu/) > 1.39
- Tested OSes
  - Ubuntu 18.04.2 LTS (Bionic Beaver)
  - macOS 10.14.2 Mojave

### Installation

```sh
# Download Metro server
docker pull lesomnus/metro-server

# Download Metro client
go get -u github.com/lesomnus/metro/cmd/metro

# Make sure the Metro client is downloaded
# If the `metro --help` doesn't work, you might need to add $GOPATH/bin to your $PATH
metro --help

# Download Station for Node.js v8
docker pull lesomnus/metro-station-node8
```

### Run Metro Server
```sh
# Add docker network for Metro server
docker network create metro

# Run Metro server
docker run -it --rm --network=metro \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --publish 50051:50051 \
    --name metro \
    lesomnus/loco-metro:latest serve
```

### Start Workflow
```sh
# Download ping-pong example
curl -OL https://raw.githubusercontent.com/lesomnus/metro/master/examples/pingpong/node/\{pinger.js,ponger.js\}

# Create `pinger` and `ponger` activity
metro create pinger.js
metro create ponger.js

# Start ping-pong workflow
# The entry point is `pinger:latest` with name `hello`
# The `2` is passed to `pinger:latest~hello` as arguments.
# So it will play ping-pong twice.
metro start pinger:latest~hello 2
```
Each activity runs in a container and is slow to start since it is Cold for the first time.
You can prepare the Station by running the following command:
```sh
metro load pinger:latest
```

After `metro start pinger:latest~hello`, Metro server will show various logs.
A description of each log and `pinger:latest` can be found [here](examples/pingpong/node/DESCRIPTION.md).

Currently, the metro does not turn off the Station, that means containers are not removed automatically.
You should remove containers by running the following command:
```sh
docker rm $(docker ps -a -q)
```
