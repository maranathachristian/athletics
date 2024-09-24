package websocket

import (
	"github.com/gofiber/websocket/v2"
)

var clients = make(map[*websocket.Conn]bool) // Connected clients
var Broadcast = make(chan Message)           // Broadcast channel

// Message defines the structure of the message to broadcast
type Message struct {
	GameID       uint           `json:"gameId"`
	HomeScore    int            `json:"homeScore"`
	AwayScore    int            `json:"awayScore"`
	ScoreHistory []ScoreHistory `json:"scoreHistory"`
}

// ScoreHistory defines the structure for individual score history
type ScoreHistory struct {
	HomeScore int    `json:"homeScore"`
	AwayScore int    `json:"awayScore"`
	Timestamp string `json:"timestamp"`
}

// HandleConnections handles incoming WebSocket requests from clients
func HandleConnections(c *websocket.Conn) {
	// Register new client
	clients[c] = true

	defer func() {
		// Unregister the client when the connection closes
		delete(clients, c)
		c.Close()
	}()

	// Listen for incoming messages (if needed, although typically only broadcasting here)
	for {
		var msg Message
		err := c.ReadJSON(&msg)
		if err != nil {
			//log.Printf("Error: %v", err)
			delete(clients, c)
			break
		}
		// You can broadcast messages if needed (in our case we broadcast scores)
		Broadcast <- msg
	}
}

// HandleMessages listens on the broadcast channel and sends messages to all clients
func HandleMessages() {
	for {
		// Grab the next message from the broadcast channel
		msg := <-Broadcast

		// Send it out to every client that is currently connected
		for client := range clients {
			err := client.WriteJSON(msg)
			if err != nil {
				//log.Printf("Error: %v", err)
				client.Close()
				delete(clients, client)
			}
		}
	}
}
