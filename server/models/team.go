package models

// TODO : change Sport to Sport type
// TODO : I don't think that Year should just be an int but maybe an actual type
type Team struct {
	ID      uint     `json:"id" gorm:"primaryKey"`
	Sport   string   `json:"sport" gorm:"not null;uniqueIndex:idx_sport_year"`
	Year    uint     `json:"year" gorm:"not null;uniqueIndex:idx_sport_year"`
	Players []Player `json:"players" gorm:"many2many:team_players"`
}
