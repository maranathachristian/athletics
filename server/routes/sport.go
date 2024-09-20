package routes

import (
	"github/com/maranathachristian/athletics/database"
	"github/com/maranathachristian/athletics/models"

	"github.com/gofiber/fiber/v2"
)

func GetSports(c *fiber.Ctx) error {
	var sports []models.Sport
	database.DB.Find(&sports)
	return c.JSON(sports)
}
