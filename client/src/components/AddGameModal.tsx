import { useState, useEffect } from 'react';
import { Button, Modal, TextInput, Group, Stack, Select } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';
import { addGame, fetchSports } from '../services/GameService';
import { Game, AddGameRequest } from '../models/Game';
import { Sport } from '../models/Sport';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);

interface AddGameModalProps {
  opened: boolean;
  onClose: () => void;
  onGameAdded: (game: Game) => void;
}

const AddGameModal: React.FC<AddGameModalProps> = ({ opened, onClose, onGameAdded }) => {
  const [newGame, setNewGame] = useState<AddGameRequest>({
    sportId: 0, // Store the selected sport ID here
    opponent: '',
    location: '',
    gametime: new Date().toISOString(),
  });

  const [sportsOptions, setSportsOptions] = useState<Sport[]>([]); // Store the list of sports

  // Fetch sports from the backend when the component mounts
  useEffect(() => {
    const getSports = async () => {
      const sports = await fetchSports();
      setSportsOptions(sports);  // Set the fetched sports to the state
    };
    getSports();
  }, []);

  const handleAddGame = async () => {
    try {
      const formattedGame = {
        ...newGame,
        gametime: dayjs(newGame.gametime).utc().format('YYYY-MM-DDTHH:mm:ss'), // Convert to ISO format
      };

      const game = await addGame(formattedGame);
      onGameAdded(game);
      setNewGame({ sportId: 0, opponent: '', location: '', gametime: new Date().toISOString() });
      onClose();
    } catch (error) {
      console.error('Error adding game:', error);
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add a new game">
      <Stack>
        <Select
          label="Sport"
          placeholder="Select a sport"
          value={newGame.sportId ? String(newGame.sportId) : ''}
          onChange={(value) => setNewGame({ ...newGame, sportId: parseInt(value || '0', 10) })}  // Convert value to integer
          data={sportsOptions.map((sport) => ({
            value: String(sport.id),  // Use sport ID as a string value for the dropdown
            label: `${sport.name} (${sport.season} - ${sport.level})`,  // Create a label from the sport's properties
          }))}
        />
        <TextInput
          label="Opponent"
          value={newGame.opponent}
          onChange={(event) => setNewGame({ ...newGame, opponent: event.currentTarget.value })}
        />
        <TextInput
          label="Location"
          value={newGame.location}
          onChange={(event) => setNewGame({ ...newGame, location: event.currentTarget.value })}
        />
        <DateTimePicker
          label="Game Time"
          value={new Date(newGame.gametime)}
          onChange={(value) => setNewGame({ ...newGame, gametime: value?.toISOString() || '' })}
          valueFormat="MM-DD-YYYY hh:mm a"
          firstDayOfWeek={0}
        />
        <Group align='right'>
          <Button onClick={handleAddGame}>Save</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AddGameModal;
