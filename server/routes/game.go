package routes

import (
	"github/com/maranathachristian/athletics/database"
	"github/com/maranathachristian/athletics/models"
	"time"

	"github.com/gofiber/fiber/v2"
	"gorm.io/gorm"
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
		HomeTeam: tempGame.HomeTeam,
		AwayTeam: tempGame.AwayTeam,
		Location: tempGame.Location,
		GameTime: parsedTime,
	}

	database.DB.Create(&game)
	return c.JSON(game)
}

func GetGameDetails(c *fiber.Ctx) error {
	gameId := c.Params("gameId")
	var game models.Game

	// Fetch the game by ID, preload related data like League if needed
	if err := database.DB.Preload("Sport").Preload("Scores", func(db *gorm.DB) *gorm.DB { return db.Order("timestamp desc") }).First(&game, gameId).Error; err != nil {
		return c.Status(404).SendString("Game not found")
	}

	// Sort the scores by timestamp and retrieve the latest score
	var latestScore models.Score
	if len(game.Scores) > 0 {
		database.DB.Where("game_id = ?", game.ID).Order("timestamp desc").First(&latestScore)
	}

	details := map[string]interface{}{
		"id":           game.ID,
		"homeTeam":     game.HomeTeam,
		"awayTeam":     game.AwayTeam,
		"location":     game.Location,
		"gametime":     game.GameTime,
		"score":        fiber.Map{"homeScore": latestScore.HomeScore, "awayScore": latestScore.AwayScore}, // Latest score
		"scoreHistory": game.Scores,                                                                       // Score history
		"rosters": map[string][]string{
			"home": {"Player 1", "Player 2", "Player 3"}, // Example roster
			"away": {"Player A", "Player B", "Player C"},
		},
		"playByPlay": []string{
			"Kickoff by Home",
			"Goal by Player 1",
			"Goal by Player A",
			"Final whistle",
		}, // Example play-by-play
	}

	return c.JSON(details)
}
