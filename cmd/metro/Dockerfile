FROM golang:1.11

RUN mkdir -p /go/src/locomotes/cmd/metro \
 && mkdir -p /go/src/locomotes/metro

WORKDIR /go/src/locomotes/cmd/metro

# metro loco-metro will provided by github
# perhaps...
COPY ./temp/. /go/src/.
COPY ./main.go ./main.go
COPY ./cmd ./cmd

RUN go build -ldflags "-linkmode external -extldflags -static" -a main.go

FROM scratch
COPY --from=0 /go/src/locomotes/cmd/metro/main /metro
ENTRYPOINT [ "/metro" ]