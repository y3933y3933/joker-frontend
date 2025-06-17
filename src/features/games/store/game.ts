import { create } from "zustand";
import type { Level, Player } from "../types";

interface GameState {
  gameCode: string | null;
  level: Level | null;
  players: Player[];
  actions: GameActions;
}

interface GameActions {
  setGameCode: (gameCode: string | null) => void;
  setLevel: (level: Level | null) => void;
  setPlayers: (players: Player[]) => void;
}

const useGameStore = create<GameState>()((set) => ({
  gameCode: null,
  level: null,
  players: [],
  actions: {
    setGameCode: (gameCode) => set({ gameCode }),
    setLevel: (level) => set({ level }),
    setPlayers: (players) => set({ players }),
  },
}));

export const useGameCode = () => useGameStore((state) => state.gameCode);
export const useGameLevel = () => useGameStore((state) => state.level);
export const useGamePlayers = () => useGameStore((state) => state.players);

export const useGameActions = () => useGameStore((state) => state.actions);
