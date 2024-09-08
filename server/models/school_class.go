package models

type SchoolClass uint8;

const (
	Senior SchoolClass = iota
	Junior
	Sophomore
	Freshman
)