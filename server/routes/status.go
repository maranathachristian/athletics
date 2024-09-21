package routes

import (
	"net/http"

	"github/com/maranathachristian/athletics/config"

	"github.com/gofiber/fiber/v2"
)

type Status struct {
	version string
}

func GetStatus(c *fiber.Ctx) error {
	c.Status(http.StatusOK).JSON(Status{
		version: config.Version,
	})
	return nil
}
