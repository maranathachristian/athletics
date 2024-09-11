import useSWR from "swr";

import { Game } from "../types/game";

export const ENDPOINT = 'http://localhost:8080/api'

const fetcher = (url: string) => fetch(`${ENDPOINT}/${url}`).then((r) => r.json())

export function useGames() {
    return useSWR<Game[]>("games", fetcher)
}
