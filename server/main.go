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

func seedAdminUser() {
	var admin models.User
	database.DB.Where("email = ?", "admin").First(&admin)
	if admin.ID == 0 {
		admin = models.User{
			Name:  "Admin",
			Email: "admin",
			Role:  "ADMIN",
		}
		admin.HashPassword("admin")
		database.DB.Create(&admin)
	}
}

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
	if err := database.DB.AutoMigrate(&models.User{}, &models.Sport{}, &models.Game{}, &models.Player{}, &models.Team{}, &models.PlayerInfo{}); err != nil {
		log.Fatal("Failed to migrate database:", err)
	}

	// Seed the admin user
	seedAdminUser()

	// Create a new Fiber app
	app := fiber.New()

	// Cores settings for the app
	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:8081",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// Set up routes
	app.Get("/status", routes.GetStatus)
	app.Get("/games", routes.GetGames)
	app.Post("/games", routes.CreateGame)
	app.Get("/sports", routes.GetSports) // Route to fetch all sports
	app.Post("/login", routes.Login)
	app.Post("/register", routes.Register)

	// Start the server
	log.Fatal(app.Listen(":8080"))
}
