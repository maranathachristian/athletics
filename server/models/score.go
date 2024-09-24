package models

import "time"

type Score struct {
	ID        uint      `json:"id" gorm:"primaryKey"`
	GameID    uint      `json:"game_id"` // Foreign key to the Game
	HomeScore int       `json:"homeScore"`
	AwayScore int       `json:"awayScore"`
	Timestamp time.Time `json:"timestamp"` // Track when the score was updated
}

type ScoreUpdate struct {
	HomeScore int `json:"homeScore"`
	AwayScore int `json:"awayScore"`
}
