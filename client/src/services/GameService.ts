import axios from 'axios';
import { AddGameRequest, Game } from '../models/Game';
import { Sport } from '../models/Sport';
import { API_URL } from '../constants';

// Fetch all sports from the backend
export const fetchSports = async (): Promise<Sport[]> => {
  const response = await axios.get<Sport[]>(`${API_URL}/sports`);
  return response.data;
};

// Fetch all games from the API
export const fetchGames = async (): Promise<Game[]> => {
  const response = await axios.get<Game[]>(`${API_URL}/games`);
  return response.data;
};

// Add a new game via the API
export const addGame = async (newGame: AddGameRequest): Promise<Game> => {
  const response = await axios.post<Game>(`${API_URL}/games`, newGame);
  return response.data;
};
