package models

type Sport struct {
	ID     uint   `json:"id" gorm:"primaryKey"`
	Name   string `json:"name"`
	Season string `json:"season"` // "Fall", "Winter", or "Spring"
	Level  string `json:"level"`  // "Varsity", "JV", or "Junior High"
}
