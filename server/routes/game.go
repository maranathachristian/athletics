package routes

import (
	"github/com/maranathachristian/athletics/database"
	"github/com/maranathachristian/athletics/models"
	"time"

	"github.com/gofiber/fiber/v2"
)

// GetGames handles the GET request to fetch all games
func GetGames(c *fiber.Ctx) error {
	var games []models.Game
	// Preload the Sport association when fetching games
	if err := database.DB.Preload("Sport").Find(&games).Error; err != nil {
		return c.Status(500).SendString("Error fetching games: " + err.Error())
	}

	return c.JSON(games)
}

// CreateGame handles the POST request to add a new game
func CreateGame(c *fiber.Ctx) error {
	tempGame := new(models.TempGame)
	if err := c.BodyParser(tempGame); err != nil {
		return c.Status(400).SendString(err.Error())
	}

	// Find the selected Sport by ID
	var parsedSport models.Sport
	if err := database.DB.First(&parsedSport, tempGame.SportID).Error; err != nil {
		return c.Status(404).SendString("Sport not found")
	}

	// Parse the gametime string into a time.Time object
	parsedTime, err := time.Parse("2006-01-02T15:04:05", tempGame.GameTime)
	if err != nil {
		return c.Status(400).SendString("Invalid gametime format")
	}

	// Convert to UTC to ensure the correct time zone
	parsedTime = parsedTime.UTC()

	game := models.Game{
		Sport:    parsedSport,
		Opponent: tempGame.Opponent,
		Location: tempGame.Location,
		GameTime: parsedTime,
	}

	database.DB.Create(&game)
	return c.JSON(game)
}
