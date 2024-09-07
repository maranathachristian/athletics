import { useDisclosure } from '@mantine/hooks';
import { useForm } from '@mantine/form'
import { Button, Modal, TextInput } from '@mantine/core'
import { KeyedMutator } from 'swr';
import { ENDPOINT, Game } from "../App"
import '@mantine/core/styles.css';

function CreateGame({mutate}: {mutate: KeyedMutator<Game[]>}) {
  const [opened, { open, close }] = useDisclosure(false);

  const form = useForm({
    initialValues: {
      sport: "",
      opponent: "",
      location: "",
    },
  });

  async function createGame(values: {sport: string, opponent: string, location: string}) {
    const updated = await fetch(`${ENDPOINT}/games`, {
      method: "POST",
      headers: {
        "Content-Type":"application/json",
      },
      body: JSON.stringify(values),
    }).then((r) => r.json());

    mutate(updated);
    form.reset();
  }

  return (
    <>
      <Modal opened={opened} onClose={close} withCloseButton={true} size="auto" title="Add Game to the Schedule">
        <form onSubmit={form.onSubmit(createGame)}>
          <TextInput
            required
            mb={12}
            label="Sport:"
            placeholder="Which sport is this for?"
            {...form.getInputProps("sport")}
          />
          <TextInput
            required
            mb={12}
            label="Opponent:"
            placeholder="Who are we playing?"
            {...form.getInputProps("opponent")}
          />
          <TextInput
            required
            mb={12}
            label="Location:"
            placeholder="Where are we playing?"
            {...form.getInputProps("location")}
          />
          <Button type="submit">Create Game</Button>
        </form>
      </Modal>

      <Button onClick={open}>
        ADD GAME
      </Button>
    </>
  );
}

export default CreateGame
