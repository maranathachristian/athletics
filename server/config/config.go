package config

import (
	"fmt"
)

/*
 * Application Version
 * not that important to update,
 * just important on important commits.
 */
const Version string = "1.0.0"

func LogVersion() {
    fmt.Println("version=", Version)
}