import { Sport } from './Sport';

export interface Game {
  id: number;
  sport: Sport;
  hometeam: string;
  awayteam: string;
  location: string;
  gametime: string;
}

export interface AddGameRequest {
  sportId: number;  // The sport ID is sent from the frontend
  hometeam: string;
  awayteam: string;
  location: string;
  gametime: string;
}