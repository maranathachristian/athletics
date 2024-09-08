package models

/*
 * Height stored in inches
 * Weight stored in pounds
*/
// ? Not sure if we need a serializer and deserializer
type PlayerInfo struct {
	Height uint8 `json:"height"`
	Weight float32 `json:"weight"`
}