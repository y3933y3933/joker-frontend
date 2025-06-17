import { create } from "zustand";
import type { Level, Player, PlayerWithAvatar } from "../types";
import { generateAvatar } from "@/lib/avatar";

interface Round {
  roundID: number;
  playerID: number;
}

interface GameState {
  gameCode: string | null;
  level: Level | null;
  players: PlayerWithAvatar[];
  actions: GameActions;
}

interface GameActions {
  setGameCode: (gameCode: string | null) => void;
  setLevel: (level: Level | null) => void;
  updatePlayersWithAvatar: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  reset: () => void;
}

const useGameStore = create<GameState>()((set) => ({
  gameCode: null,
  level: null,
  players: [],
  actions: {
    setGameCode: (gameCode) => set({ gameCode }),
    setLevel: (level) => set({ level }),
    updatePlayersWithAvatar: (players) => {
      const newPlayers = players.map((player) => {
        return {
          ...player,
          avatar: generateAvatar(),
        };
      });
      set({ players: newPlayers });
    },
    addPlayer: (player) =>
      set((state) => ({
        players: [
          ...state.players,
          {
            ...player,
            avatar: generateAvatar(),
          },
        ],
      })),
    removePlayer: (id) =>
      set((state) => ({
        players: state.players.filter((p) => p.id !== id),
      })),
    reset: () => set({ gameCode: null, level: null, players: [] }),
  },
}));

export const useGameCode = () => useGameStore((state) => state.gameCode);
export const useGameLevel = () => useGameStore((state) => state.level);
export const useGamePlayers = () => useGameStore((state) => state.players);

export const useGameActions = () => useGameStore((state) => state.actions);
