FROM golang:1.11

COPY . /go/src/.

RUN go build -ldflags "-linkmode external -extldflags -static" -a \
    /go/src/github.com/lesomnus/metro/cmd/metro-server/main.go

FROM scratch
COPY --from=0 /go/main /loco-metro
ENTRYPOINT [ "/loco-metro" ]