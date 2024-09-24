import { Button, Group, Modal, Stack, TextInput } from '@mantine/core';
import React, { useState } from 'react';
import { API_URL } from '../constants';

interface AddScoreModalProps {
  gameId: number;
  currentHomeScore: number;
  currentAwayScore: number;
  opened: boolean;
  onClose: () => void;
  onScoreAdded: () => void;  // Callback to refresh score history after submission
}

const AddScoreModal: React.FC<AddScoreModalProps> = ({ gameId, currentHomeScore, currentAwayScore, opened, onClose, onScoreAdded }) => {
  const [homeScore, setHomeScore] = useState(currentHomeScore);
  const [awayScore, setAwayScore] = useState(currentAwayScore);

  const handleAddScore = async () => {
    await fetch(`${API_URL}/games/${gameId}/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ homeScore, awayScore }),
    });

    onScoreAdded();  // Call callback to refresh score history
    onClose();
  };

  // Handle score input change to prevent NaN issues
  const handleHomeScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHomeScore(value === '' ? 0 : parseInt(value, 10));  // Set to 0 if empty, otherwise parseInt
  };

  const handleAwayScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAwayScore(value === '' ? 0 : parseInt(value, 10));  // Set to 0 if empty, otherwise parseInt
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add a new scoring update">
      <Stack>
      <TextInput
          label="Home Team Score"
          value={homeScore}
          onChange={handleHomeScoreChange}
        />
        <TextInput
          label="Away Team Score"
          value={awayScore}
          onChange={handleAwayScoreChange}
        />
        <Group align='right'>
          <Button onClick={handleAddScore}>Save</Button>
        </Group>
      </Stack>
    </Modal>
  );
};

export default AddScoreModal;
