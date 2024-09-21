package models

/*
 * Height stored in inches
 * Weight stored in pounds
 */
type PlayerInfo struct {
	ID       uint    `json:"id" gorm:"primaryKey"`
	PlayerID uint    `json:"player_id"`
	Height   uint8   `json:"height"`
	Weight   float32 `json:"weight"`
}
