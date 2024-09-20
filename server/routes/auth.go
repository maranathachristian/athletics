package routes

import (
	"github/com/maranathachristian/athletics/database"
	"github/com/maranathachristian/athletics/helpers"
	"github/com/maranathachristian/athletics/models"

	"github.com/gofiber/fiber/v2"
	"golang.org/x/crypto/bcrypt"
)

func Register(c *fiber.Ctx) error {
	data := new(struct {
		Name     string `json:"name"`
		Email    string `json:"email"`
		Password string `json:"password"`
		Confirm  string `json:"confirm_password"`
	})

	if err := c.BodyParser(data); err != nil {
		return c.Status(400).SendString("Invalid input")
	}

	if data.Password != data.Confirm {
		return c.Status(400).SendString("Passwords do not match")
	}

	var existingUser models.User
	database.DB.Where("email = ?", data.Email).First(&existingUser)
	if existingUser.ID != 0 {
		return c.Status(400).SendString("User with this email already exists")
	}

	user := models.User{
		Name:  data.Name,
		Email: data.Email,
		Role:  "USER", // Default to "USER"
	}

	if err := user.HashPassword(data.Password); err != nil {
		return c.Status(500).SendString("Could not hash password")
	}

	database.DB.Create(&user)

	return c.SendString("User registered successfully")
}

func Login(c *fiber.Ctx) error {
	data := new(struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	})

	if err := c.BodyParser(data); err != nil {
		return c.Status(400).SendString("Invalid input")
	}

	var user models.User
	database.DB.Where("email = ?", data.Email).First(&user)
	if user.ID == 0 {
		return c.Status(400).SendString("Invalid email or password")
	}

	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data.Password)); err != nil {
		return c.Status(400).SendString("Invalid email or password")
	}

	token, err := helpers.GenerateJWT(user.ID, user.Role)
	if err != nil {
		return c.Status(500).SendString("Error generating token")
	}

	return c.JSON(fiber.Map{
		"token": token,
		"name":  user.Name,
		"email": user.Email,
		"role":  user.Role,
	})
}
