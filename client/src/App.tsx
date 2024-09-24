import React from 'react';
import { AppShell, Burger, Group, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';
import Dashboard from './components/Dashboard';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';

const App: React.FC = () => {
  const [burgerOpened, { toggle }] = useDisclosure();

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

          <Link to="/games">Games</Link>

        </AppShell.Main>
        <AppShell.Footer p="md">Footer</AppShell.Footer>
      </AppShell>
    </MantineProvider>
  );
}

export default App;
