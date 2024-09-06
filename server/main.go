package main

import (
	"fmt"
	"github/com/maranathachristian/athletics/models"
	"github/com/maranathachristian/athletics/storage"
	"log"
	"net/http"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/joho/godotenv"
	"gorm.io/gorm"
)

type Game struct {
	Sport    string `json:"sport"`
	Opponent string `json:"opponent"`
	Location string `json:"location"`
}

type Repository struct {
	DB *gorm.DB
}

func (r *Repository) CreateGame(context *fiber.Ctx) error {
	game := Game{}

	err := context.BodyParser(&game)
	if err != nil {
		context.Status(http.StatusUnprocessableEntity).JSON(
			&fiber.Map{"message": "Request Failed"})
		return err
	}

	err = r.DB.Create(&game).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "Unable to create game"})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{"message": "Game has been added"})
	return nil
}

func (r *Repository) DeleteGame(context *fiber.Ctx) error {
	gameModel := models.Games{}
	id := context.Params("id")
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(
			&fiber.Map{"message": "Id cannot be empty"})
		return nil
	}

	err := r.DB.Delete(gameModel, id).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "Could not delete game"})
		return err
	}
	context.Status(http.StatusOK).JSON(
		&fiber.Map{"message": "Game deleted successfully"})
	return nil
}

func (r *Repository) GetGameByID(context *fiber.Ctx) error {
	id := context.Params("id")
	gameModel := &models.Games{}
	if id == "" {
		context.Status(http.StatusInternalServerError).JSON(
			&fiber.Map{"message": "id cannot be empty"})
		return nil
	}

	fmt.Println("the ID is: ", id)

	err := r.DB.Where("id = ?", id).First(gameModel).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "Could not get the game"})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "Game id retrieved successfully",
			"data":    gameModel,
		})
	return nil
}

func (r *Repository) GetGames(context *fiber.Ctx) error {
	gameModels := &[]models.Games{}

	err := r.DB.Find(gameModels).Error
	if err != nil {
		context.Status(http.StatusBadRequest).JSON(
			&fiber.Map{"message": "Could not get books"})
		return err
	}

	context.Status(http.StatusOK).JSON(
		&fiber.Map{
			"message": "Games retrieved successfully",
			"data":    gameModels,
		})
	return nil
}

func (r *Repository) SetupRoutes(app *fiber.App) {
	api := app.Group("/api")
	api.Post("/games", r.CreateGame)
	api.Delete("/games/:id", r.DeleteGame)
	api.Get("/games/:id", r.GetGameByID)
	api.Get("/games", r.GetGames)
}

func main() {
	fmt.Print("Maranatha Christian Athletics Application")
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}
	config := &storage.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		DBName:   os.Getenv("DB_NAME"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASS"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
	}

	app := fiber.New()

	app.Get("/healthcheck", func(c *fiber.Ctx) error {
		return c.SendString("OK")
	})

	db, err := storage.NewConnection(config)
	if err != nil {
		log.Fatal("Could not load database")
	}

	err = models.MigrateGames(db)
	if err != nil {
		log.Fatal("Could not migrate database")
	}

	r := Repository{
		DB: db,
	}
	r.SetupRoutes(app)

	log.Fatal(app.Listen(":8080"))
}
