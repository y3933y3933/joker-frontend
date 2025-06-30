import type { Player } from "@/integrations/axios/games/game.schema";
import { create } from "zustand";

interface GameStore {
  players: Player[];
  actions: GameActions;
}

interface GameActions {
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  reset: () => void;
}

const useGameStore = create<GameStore>((set) => ({
  players: [],
  actions: {
    setPlayers: (players: Player[]) => {
      set({ players });
    },
    addPlayer: (player: Player) => {
      set((state) => ({
        players: [...state.players, player],
      }));
    },
    removePlayer: (id) =>
      set((state) => ({
        players: state.players.filter((p) => p.id !== id),
      })),

    reset: () => {
      set({ players: [] });
    },
  },
}));

export const useGamePlayers = () => useGameStore((state) => state.players);

export const useGameActions = () => useGameStore((state) => state.actions);
