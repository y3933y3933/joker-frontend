import type { Player } from "@/integrations/axios/games/game.schema";
import { create } from "zustand";

type PlayWithoutGameID = Omit<Player, "gameID">;

interface GameStore {
  players: PlayWithoutGameID[];
  actions: GameActions;
}

interface GameActions {
  setPlayers: (players: Player[]) => void;
  addPlayer: (player: PlayWithoutGameID) => void;
  removePlayer: (id: number) => void;
  setHost: (id: number) => void;
  setPlayerOffline: (id: number) => void;
  reset: () => void;
}

const useGameStore = create<GameStore>((set) => ({
  players: [],
  actions: {
    setPlayers: (players: Player[]) => {
      set({ players });
    },
    addPlayer: (player: PlayWithoutGameID) => {
      set((state) => ({
        players: [...state.players, player],
      }));
    },
    removePlayer: (id) =>
      set((state) => ({
        players: state.players.filter((p) => p.id !== id),
      })),
    setHost: (id: number) => {
      set((state) => ({
        players: state.players.map((p) => ({
          ...p,
          isHost: p.id === id,
        })),
      }));
    },
    setPlayerOffline: (id: number) => {
      set((state) => ({
        players: state.players.map((p) => ({
          ...p,
          status: p.id === id ? "disconnected" : "online",
        })),
      }));
    },
    reset: () => {
      set({ players: [] });
    },
  },
}));

export const useGamePlayers = () => useGameStore((state) => state.players);

export const useGameActions = () => useGameStore((state) => state.actions);
