import { create } from "zustand";
import type { Player, PlayerWithAvatar } from "../types";
import { generateAvatar } from "@/lib/avatar";

interface GameState {
  players: PlayerWithAvatar[];
  actions: GameActions;
}

interface GameActions {
  updatePlayersWithAvatar: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  reset: () => void;
}

const useGameStore = create<GameState>()((set) => ({
  players: [],
  actions: {
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
    reset: () => set({ players: [] }),
  },
}));

export const useGamePlayers = () => useGameStore((state) => state.players);

export const useGameActions = () => useGameStore((state) => state.actions);
