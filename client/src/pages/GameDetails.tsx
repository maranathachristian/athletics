import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AppShell, Burger, Button, Group, MantineProvider } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import dayjs from 'dayjs';
import Dashboard from '../components/Dashboard';
import AddScoreModal from '../components/AddScoreModal';
import { API_URL } from '../constants';
import { ScoreHistory } from '../models/Score';

interface GameDetailsProps {
  id: number;
  homeTeam: string;
  awayTeam: string;
  location: string;
  gametime: string;
  score: { homeScore: number; awayScore: number };
  scoreHistory: ScoreHistory[];
  rosters: { home: string[]; away: string[] };
  playByPlay: string[];
}

const GameDetails: React.FC = () => {
  const { gameId } = useParams<{ gameId: string }>();
  const [gameDetails, setGameDetails] = useState<GameDetailsProps | null>(null);
  const [refreshScores, setRefreshScores] = useState(false);  // To refresh score history after adding a score
  const [burgerOpened, { toggle }] = useDisclosure();
  const [opened, setOpened] = useState(false);

  const isAdmin = (): boolean => {
    return (localStorage.getItem('role') == "ADMIN");
  };
    
  useEffect(() => {
    const fetchGameDetails = async () => {
      const response = await fetch(`${API_URL}/games/${gameId}`);
      const data = await response.json();
      setGameDetails(data);
    };

    fetchGameDetails();

    // Establish WebSocket connection to receive live score updates
    const socket = new WebSocket('ws://localhost:8080/ws');
    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.gameId === parseInt(gameId || '0')) {
        setGameDetails((prev) => prev && ({
          ...prev,
          score: {
            homeScore: message.homeScore,
            awayScore: message.awayScore,
          },
          scoreHistory: message.scoreHistory  // Update with new score history
        }));
      }
    };

    return () => {
      if (socket.readyState === 1) {
        socket.close();
      }
    };
  }, [gameId, refreshScores]);  // Refresh when score is added

  const handleScoreAdded = () => {
    setRefreshScores(!refreshScores);  // Toggle to refresh the score history
  };

  if (!gameDetails) {
    return <div>Loading...</div>;
  }

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
          <div>
            <h1>Game Details</h1>
            <p><strong>Home Team:</strong> {gameDetails.homeTeam}</p>
            <p><strong>Away Team:</strong> {gameDetails.awayTeam}</p>
            <p><strong>Location:</strong> {gameDetails.location}</p>
            <p><strong>Game Time:</strong> {dayjs(gameDetails.gametime).format('MM-DD-YYYY hh:mm a')}</p>
            <p><strong>Score:</strong> Home {gameDetails.score.homeScore} - Away {gameDetails.score.awayScore}</p>

            <h2>Score History</h2>
            <ul>
              {gameDetails.scoreHistory?.length > 0 ? (
                gameDetails.scoreHistory.map((score, index) => (
                  <li key={index}>
                    Home {score.homeScore} - Away {score.awayScore} (at {new Date(score.timestamp).toLocaleString()})
                  </li>
                ))
              ) : (
                <li>No score updates available</li>
              )}
            </ul>

            {isAdmin() && (
              <Button onClick={() => setOpened(true)}>Add Scoring Update</Button>
            )}

            <AddScoreModal 
              gameId={parseInt(gameId || '0')}
              currentHomeScore={gameDetails.score.homeScore}
              currentAwayScore={gameDetails.score.awayScore}
              opened={opened} 
              onClose={() => setOpened(false)} 
              onScoreAdded={handleScoreAdded} 
            />

            <h2>Rosters</h2>
            <h3>Home Team</h3>
            <ul>
              {/* Use optional chaining (?.) and provide a fallback of an empty array */}
              {gameDetails.rosters?.home?.length > 0 ? (
                gameDetails.rosters.home.map((player, index) => (
                  <li key={index}>{player}</li>
                ))
              ) : (
                <li>No home team roster available</li>
              )}
            </ul>
            <h3>Away Team</h3>
            <ul>
              {gameDetails.rosters?.away?.length > 0 ? (
                gameDetails.rosters.away.map((player, index) => (
                  <li key={index}>{player}</li>
                ))
              ) : (
                <li>No away team roster available</li>
              )}
            </ul>

            <h2>Play-by-Play</h2>
            <ul>
              {gameDetails.playByPlay?.length > 0 ? (
                gameDetails.playByPlay.map((play, index) => (
                  <li key={index}>{play}</li>
                ))
              ) : (
                <li>No play-by-play data available</li>
              )}
            </ul>
          </div>

        </AppShell.Main>

        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
};

export default GameDetails;