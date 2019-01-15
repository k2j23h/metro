package metro

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"io"
)

func generateID() string {
	b := make([]byte, 32)

	if _, err := io.ReadFull(rand.Reader, b); err != nil {
		panic(err)
	}
	id := hex.EncodeToString(b)

	return id
}

func truncateID(id string) string {
	if len(id) < 12 {
		return ""
	}
	return id[0:12]
}

func (token *Token) toShort() string {
	return truncateID(token.GetId())
}

func (station *Station) toShort() string {
	return truncateID(station.GetId())
}

func (station *Station) toString() string {
	return fmt.Sprint(station.GetImage(), "~", station.GetName())
}
