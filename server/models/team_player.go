package models

// used for team sports
// ? Not sure if we need a serializer and deserializer
type TeamPlayer struct {
	Player
	Jersey uint8
	Position uint
}