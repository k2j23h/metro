FROM golang:1.11

COPY . /go/src/.

RUN go build -ldflags "-linkmode external -extldflags -static" -a \
    -o /go/main \
    /go/src/locomotes/station/go/

FROM scratch
COPY --from=0 /go/main /main
ENTRYPOINT [ "/main" ]