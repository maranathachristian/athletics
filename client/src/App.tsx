import { Box, List, MantineProvider } from "@mantine/core";
import './App.css';
import CreateGame from "./components/CreateGame";
import '@mantine/core/styles.css';
import { useGames } from "./services/queries";

function App() {
  const {data, mutate} = useGames();

  console.log(data);

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
