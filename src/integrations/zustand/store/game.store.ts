import type { Level } from "@/types";
import { create } from "zustand";

interface GameStore {
  level: Level;
  actions: GameActions;
}

interface GameActions {
  setGameLevel: (level: Level) => void;
  reset: () => void;
}

const useGameStore = create<GameStore>((set) => ({
  level: "easy",
  actions: {
    setGameLevel: (level: Level) => {
      set({ level });
    },
    reset: () => {
      set({ level: "easy" });
    },
  },
}));

export const useGameLevel = () => useGameStore((state) => state.level);

export const useGameActions = () => useGameStore((state) => state.actions);
