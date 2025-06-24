import type { Player } from "@/integrations/axios/games/game.schema";
import type { Level } from "@/types";
import { create } from "zustand";

interface GameStore {
  level: Level;
  players: Player[];
  actions: GameActions;
}

interface GameActions {
  setGameLevel: (level: Level) => void;
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: Player) => void;
  removePlayer: (id: number) => void;
  reset: () => void;
}

const useGameStore = create<GameStore>((set) => ({
  level: "easy",
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
    setGameLevel: (level: Level) => {
      set({ level });
    },
    reset: () => {
      set({ level: "easy", players: [] });
    },
  },
}));

export const useGameLevel = () => useGameStore((state) => state.level);
export const useGamePlayers = () => useGameStore((state) => state.players);

export const useGameActions = () => useGameStore((state) => state.actions);
