package models

// ? Not sure if we need a serializer and deserializer
type Player struct {
	Name 	string		`json:"name"`
	Class 	SchoolClass	`json:"class"`
	Info 	PlayerInfo	`json:"info"`
	// TODO : need some kind of way to get photo
}