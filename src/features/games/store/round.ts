// features/games/store/round.ts
import { create } from "zustand";

export type DrawResult = "joker" | "safe" | null;

interface Round {
  roundId: number;
  currentPlayerId: number;
  // 可依需求擴充
}

interface RoundState {
  round: Round | null;
  drawResult: DrawResult;
  question: string | null;

  actions: {
    setRound: (round: Round) => void;
    setDrawResult: (result: DrawResult) => void;
    setQuestion: (question: string | null) => void;
    resetRound: () => void;
  };
}

const useRoundStore = create<RoundState>()((set) => ({
  round: null,
  drawResult: null,
  question: null,
  actions: {
    setRound: (round) => set({ round }),
    setDrawResult: (result) => set({ drawResult: result }),
    setQuestion: (question) => set({ question }),
    resetRound: () => set({ round: null, drawResult: null, question: null }),
  },
}));

export const useRound = () => useRoundStore((s) => s.round);
export const useDrawResult = () => useRoundStore((s) => s.drawResult);
export const useRoundQuestion = () => useRoundStore((s) => s.question);
export const useRoundActions = () => useRoundStore((s) => s.actions);
