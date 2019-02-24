Logs of Metro Server
====================

## Start of Metro Server

```sh
# The activities of workflow are run in Docker container.
# Therefore, Metro server connect to docker daemon.
INFO[0000] the Docker client created                     version=1.39

# Obtain information from the metro server container to inform the Station later.
INFO[0000] the Metro server inspected                    ID=78b36dbdeac5 Name=metro

# Start Metro server
INFO[0000] starting the Metro server                     Host=0.0.0.0 Port=50051
```

## Start of Workflow

```sh
# `metro start` send Start request to Metro server.
INFO[0006] Start is requested                            image="pinger:latest" name=hello userID=metro

# Metro server create instance(container) of Station if it does not exists.
INFO[0008] new instance is created                       image="pinger:latest" name=hello userID=metro

# Workflow description is created.
INFO[0008] new flow is started                           flow=ac4764b5f4c8 image="pinger:latest" name=hello userID=metro

# The `pinger:latest` Station has been created and ready to receive messages.
# The field `token` represents its container ID.
INFO[0009] Listen is requested                           image="pinger:latest" token=353d49f79f95 user=metro
```

## Start of `pinger`
```sh
# `pinger` send link message to `ponger`.
# This reduces the Cold Start penalty for the `ponger`.
# Note that `pinger` will send message "pinged" to `ponger` after a second.
# If `ponger` initiated in a second, the Cold Start penalty is eliminated.
INFO[0009] Link is requested                             dst="ponger:latest~ponger" flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95

# pinged 1.
# After a second, `pinger` send message "pinged" to `ponger`.
# Unfortunately, `ponger` not initiated yet.
INFO[0010] Transmit is requested                         dst="ponger:latest~ponger" flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95
# However, the message "pinged" is buffered in Metro server.
INFO[0010] message is transmitted                        dst="ponger:latest~ponger" fields.msg=pinged flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95

# The `ponger` was initialized and a buffered message was sent.
INFO[0011] new instance is created                       dst="ponger:latest~ponger" flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95
INFO[0011] linked                                        dst="ponger:latest~ponger" flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95
INFO[0011] Listen is requested                           image="ponger:latest" token=e89703b60fa3 user=metro
```

## Ping-Pong
```sh
# ponged 1.
INFO[0012] Transmit is requested                         dst="pinger:latest~hello" flow=ac4764b5f4c8 src="ponger:latest~ponger" token=e89703b60fa3
INFO[0012] message is transmitted                        dst="pinger:latest~hello" fields.msg=ponged flow=ac4764b5f4c8 src="ponger:latest~ponger" token=e89703b60fa3

# pinged 2.
INFO[0013] Transmit is requested                         dst="ponger:latest~ponger" flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95
INFO[0013] message is transmitted                        dst="ponger:latest~ponger" fields.msg=pinged flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95

# ponged 2.
INFO[0014] Transmit is requested                         dst="pinger:latest~hello" flow=ac4764b5f4c8 src="ponger:latest~ponger" token=e89703b60fa3
INFO[0014] message is transmitted                        dst="pinger:latest~hello" fields.msg=ponged flow=ac4764b5f4c8 src="ponger:latest~ponger" token=e89703b60fa3
```

## End of Workflow
```sh
# `pinger` send Block message to `ponger` after it receives second "ponged".
# `pinger~hello` will terminated.
INFO[0014] Block is requested                            dst="ponger:latest~ponger" flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95

# `ponger` cannot send messages to `pinger`.
# `ponger~hello` will terminated.
INFO[0014] blocked                                       dst="ponger:latest~ponger" flow=ac4764b5f4c8 src="pinger:latest~hello" token=353d49f79f95
```

Logs of `pinger`
================
```sh
# Information of Metro server.
host of metro server is metro
port of metro server is 50051

# The container ID of this Station.
token is 353d49f79f95b0b52bf07e3bc37271597255507908f07fcce2d4aa37900df175

# `ac4764b5f4c8` is workflow ID
ac4764b5f4c8 new station is open
ac4764b5f4c8 ping
ac4764b5f4c8 ponged from ponger
ac4764b5f4c8 ping
ac4764b5f4c8 ponged from ponger
ac4764b5f4c8 station closed
```