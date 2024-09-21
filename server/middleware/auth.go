package middleware

import (
	"github/com/maranathachristian/athletics/helpers"

	"github.com/gofiber/fiber/v2"
)

func Protected() fiber.Handler {
	return func(c *fiber.Ctx) error {
		tokenString := c.Get("Authorization")
		claims, err := helpers.ValidateJWT(tokenString)
		if err != nil {
			return c.Status(401).SendString("Unauthorized")
		}

		c.Locals("user_id", claims.UserID)
		c.Locals("role", claims.Role)
		return c.Next()
	}
}

func AdminOnly() fiber.Handler {
	return func(c *fiber.Ctx) error {
		role := c.Locals("role")
		if role != "ADMIN" {
			return c.Status(403).SendString("Access forbidden")
		}
		return c.Next()
	}
}
