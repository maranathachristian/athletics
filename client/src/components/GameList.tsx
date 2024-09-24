import { Game } from '../models/Game';
import { Link } from 'react-router-dom';
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
            <br/>
            <Link to={`/games/${game.id}`}>
              {game.hometeam} vs {game.awayteam} at {game.location} on {dayjs(game.gametime).format('MM-DD-YYYY hh:mm a')}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GameList;