import { useState, useEffect } from 'react';
import { Button, MantineProvider } from '@mantine/core';
import GameList from './components/GameList';
import AddGameModal from './components/AddGameModal';
import { Game } from './models/Game';
import { fetchGames } from './services/GameService';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

function App() {
  const [games, setGames] = useState<Game[]>([]);
  const [opened, setOpened] = useState(false);

  // Fetch games when the component mounts
  useEffect(() => {
    fetchGames()
      .then(setGames)
      .catch((error) => console.error('Error fetching games:', error));
  }, []);

  // Update the game list when a new game is added
  const handleGameAdded = (newGame: Game) => {
    setGames((prevGames) => [...prevGames, newGame]);
  };

  return (
    <MantineProvider>
      <div>
        <GameList games={games} />
        <Button onClick={() => setOpened(true)}>Add Game</Button>

        <AddGameModal 
          opened={opened} 
          onClose={() => setOpened(false)} 
          onGameAdded={handleGameAdded} 
        />
      </div>
    </MantineProvider>
  );
}

export default App;
