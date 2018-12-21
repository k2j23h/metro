FROM golang:1.11-stretch

WORKDIR /locomotes

COPY . .

RUN go get github.com/docker/docker/client \
 && go build hello.go

CMD [ "./hello" ]

# -v /var/run/docker.sock:/var/run/docker.sock 
# -v /usr/bin/docker:/usr/bin/docker