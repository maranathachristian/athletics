import { Box, List, MantineProvider } from "@mantine/core";
import useSWR from "swr";
import './App.css';
import CreateGame from "./components/CreateGame";
import '@mantine/core/styles.css';

export interface Game {
  id: number;
  sport: string;
  opponent: string;
  location: string;
}

export const ENDPOINT = 'http://localhost:8080/api'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json())

function App() {
  const {data, mutate} = useSWR<Game[]>('games', fetcher)

  console.log(data)

  //TODO: Iterate over the List and show the games
  return (
    <MantineProvider>
      <Box>
        <List spacing="xs" size="sm" mb={12} center>
          {data?.map((game) => {
            return (
              <List.Item key={`game_list__${game.id}`}>
                {game.sport} Maranatha vs {game.opponent} at {game.location}
              </List.Item>
            );
          })}
        </List>
        <CreateGame mutate={mutate}/>
      </Box>
    </MantineProvider>
  );
}

export default App;
