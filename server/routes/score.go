package routes

import (
	"github/com/maranathachristian/athletics/database"
	"github/com/maranathachristian/athletics/models"
	"github/com/maranathachristian/athletics/websocket"
	"time"

	"github.com/gofiber/fiber/v2"
)

func AddScore(c *fiber.Ctx) error {
	// Get the game ID from the URL parameter
	gameId := c.Params("gameId")

	// Parse the request body to get the home and away scores
	scoreUpdate := new(models.ScoreUpdate)
	if err := c.BodyParser(scoreUpdate); err != nil {
		return c.Status(400).SendString("Invalid input")
	}

	// Find the game by ID
	var game models.Game
	if err := database.DB.First(&game, gameId).Error; err != nil {
		return c.Status(404).SendString("Game not found")
	}

	// Create a new score entry
	score := models.Score{
		GameID:    game.ID,
		HomeScore: scoreUpdate.HomeScore,
		AwayScore: scoreUpdate.AwayScore,
		Timestamp: time.Now(),
	}

	// Save the new score to the database
	if err := database.DB.Create(&score).Error; err != nil {
		return c.Status(500).SendString("Failed to add score")
	}

	// Fetch the updated score history for the game
	var scores []models.Score
	database.DB.Where("game_id = ?", game.ID).Order("timestamp desc").Find(&scores)

	// Prepare the score history for broadcasting
	var scoreHistory []websocket.ScoreHistory
	for _, s := range scores {
		scoreHistory = append(scoreHistory, websocket.ScoreHistory{
			HomeScore: s.HomeScore,
			AwayScore: s.AwayScore,
			Timestamp: s.Timestamp.Format(time.RFC3339),
		})
	}

	// Broadcast the score update to all connected WebSocket clients
	msg := websocket.Message{
		GameID:       game.ID,
		HomeScore:    scoreUpdate.HomeScore,
		AwayScore:    scoreUpdate.AwayScore,
		ScoreHistory: scoreHistory, // Include the score history
	}
	websocket.Broadcast <- msg

	// Return the updated score history and aggregate score
	return c.JSON(fiber.Map{
		"message": "Score updated and broadcasted",
		"scores":  scoreHistory,
	})
}
