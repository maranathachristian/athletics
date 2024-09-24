import React from 'react';
import { useState, useEffect } from 'react';
import { AppShell, Burger, Button, Group, MantineProvider } from '@mantine/core';
import Dashboard from '../components/Dashboard';
import GameList from '../components/GameList';
import AddGameModal from '../components/AddGameModal';
import { Game } from '../models/Game';
import { fetchGames } from '../services/GameService';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import { useDisclosure } from '@mantine/hooks';

const isAdmin = (): boolean => {
  return (localStorage.getItem('role') == "ADMIN");
};

const Games: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const [opened, setOpened] = useState(false);
  const [burgerOpened, { toggle }] = useDisclosure();

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
      <AppShell
        layout="alt"
        header={{ height: 60 }}
        footer={{ height: 60 }}
        padding="md"
      >
        <AppShell.Header>
          <Group h="100%" px="md">
            <Burger opened={burgerOpened} onClick={toggle} hiddenFrom="sm" size="sm" />
            <Dashboard />
          </Group>
        </AppShell.Header>
        <AppShell.Main>

          <GameList games={games} />

          {isAdmin() && (
            <Button onClick={() => setOpened(true)}>Add Game</Button>
          )}

          <AddGameModal 
            opened={opened} 
            onClose={() => setOpened(false)} 
            onGameAdded={handleGameAdded} 
          />
        </AppShell.Main>

        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

export default Games;