package models

import (
	"time"

	"gorm.io/gorm"
)

type Game struct {
	ID       uint      `json:"id" gorm:"primaryKey"`
	SportID  uint      `json:"sport_id"` // Foreign key reference to Sport
	Sport    Sport     `json:"sport" gorm:"foreignKey:SportID"`
	HomeTeam string    `json:"hometeam"`
	AwayTeam string    `json:"awayteam"`
	Location string    `json:"location"`
	GameTime time.Time `json:"gametime"`
	Scores   []Score   `json:"scores" gorm:"foreignKey:GameID"`
}

// Temporary struct to hold the incoming JSON data
type TempGame struct {
	SportID  uint   `json:"sportId"`
	HomeTeam string `json:"hometeam"`
	AwayTeam string `json:"awayteam"`
	Location string `json:"location"`
	GameTime string `json:"gametime"` // Temporary string field for parsing
}

func MigrateGames(db *gorm.DB) error {
	err := db.AutoMigrate(&Game{})
	return err
}
