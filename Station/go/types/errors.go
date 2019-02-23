package types

import (
	"fmt"
)

// NExistErr is an error that resource does not exist.
type NExistErr struct {
	What string
}

func (e *NExistErr) Error() string {
	return fmt.Sprintf("resource not exists: %s", e.What)
}
