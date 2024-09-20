package main

import (
	"fmt"
	"log"
	"os"

	"github/com/maranathachristian/athletics/database"
	"github/com/maranathachristian/athletics/models"
	"github/com/maranathachristian/athletics/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
	"github.com/joho/godotenv"
)

func main() {
	fmt.Print("Maranatha Christian Athletics Application")
	// Initialize the database connection
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal(err)
	}
	config := &database.Config{
		Host:     os.Getenv("DB_HOST"),
		Port:     os.Getenv("DB_PORT"),
		DBName:   os.Getenv("DB_NAME"),
		User:     os.Getenv("DB_USER"),
		Password: os.Getenv("DB_PASS"),
		SSLMode:  os.Getenv("DB_SSLMODE"),
	}
	database.ConnectDB(config)

	// Migrate the models
	if err := database.DB.AutoMigrate(&models.Sport{}, &models.Game{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Create a new Fiber app
	app := fiber.New()

	// Cores settings for the app
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:8081",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Set up routes
	app.Get("/games", routes.GetGames)
	app.Post("/games", routes.CreateGame)
	app.Get("/sports", routes.GetSports) // Route to fetch all sports

	// Start the server
	log.Fatal(app.Listen(":8080"))
}
