import { Game } from '../models/Game';
import Sport from './Sport';
import dayjs from 'dayjs';

interface GameListProps {
  games: Game[];
}

const GameList: React.FC<GameListProps> = ({ games }) => {
  return (
    <div>
      <h1>Game List</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>
            {/* Check if the sport is correctly populated */}
            {game.sport && game.sport.name ? (
              <Sport name={game.sport.name} season={game.sport.season} level={game.sport.level} />
            ) : (
              <span>No sport info available</span>
            )} 
            vs. {game.opponent} at {game.location} on {dayjs(game.gametime).format('MM-DD-YYYY hh:mm a')}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;
