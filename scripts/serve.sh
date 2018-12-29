docker run -it --rm --network=metro \
    -v /var/run/docker.sock:/var/run/docker.sock \
    --publish 50051:50051 \
    --name metro \
    loco-metro:latest serve