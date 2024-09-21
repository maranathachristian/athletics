package models

type SchoolClass string

const (
	Senior    SchoolClass = "Senior"
	Junior    SchoolClass = "Junior"
	Sophomore SchoolClass = "Sophomore"
	Freshman  SchoolClass = "Freshman"
)

type Player struct {
	ID           uint        `json:"id" gorm:"primaryKey"`
	PlayerInfoID uint        `json:"player_info_id"`
	Name         string      `json:"name"`
	Class        SchoolClass `json:"class"`
	PlayerInfo   PlayerInfo  `json:"player_info" gorm:"foreignKey:PlayerInfoID"`
	// TODO : need some kind of way to get photo
}
