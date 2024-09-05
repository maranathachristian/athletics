package models

import "gorm.io/gorm"

type Games struct {
	ID       uint    `gorm:"primary key; autoIncrement" json:"id"`
	Sport    *string `json:"sport"`
	Opponent *string `json:"opponent"`
	Location *string `json:"location"`
}

func MigrateGames(db *gorm.DB) error {
	err := db.AutoMigrate(&Games{})
	return err
}
