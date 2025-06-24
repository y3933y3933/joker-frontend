import type { Level } from "@/types";
import { create } from "zustand";

interface RoundStore {
  id: number | null;
  questionID: number | null;
  questionPlayerID: number | null;
  answerPlayerID: number | null;
  answer: string | null;
  actions: RoundActions;
}

interface RoundActions {
  setRoundID: (id: number) => void;
  setQuestionID: (id: number) => void;
  setQuestionPlayerID: (id: number) => void;
  setAnswerPlayerID: (id: number) => void;
  setAnswer: (answer: string) => void;
  reset: () => void;
}

const useRoundStore = create<RoundStore>((set) => ({
  id: null,
  questionID: null,
  questionPlayerID: null,
  answerPlayerID: null,
  answer: null,
  actions: {
    setRoundID: (id: number) => {
      set({ id });
    },
    setQuestionID: (questionID: number) => {
      set({ questionID });
    },
    setQuestionPlayerID: (questionPlayerID: number) => {
      set({ questionPlayerID });
    },
    setAnswerPlayerID: (answerPlayerID: number) => {
      set({ answerPlayerID });
    },
    setAnswer: (answer: string) => {
      set({ answer });
    },
    reset: () => {
      set({
        id: null,
        questionID: null,
        questionPlayerID: null,
        answerPlayerID: null,
        answer: null,
      });
    },
  },
}));

export const useRoundID = () => useRoundStore((state) => state.id);
export const useRoundQuestionID = () =>
  useRoundStore((state) => state.questionID);
export const useRoundQuestionPlayerID = () =>
  useRoundStore((state) => state.questionPlayerID);
export const useRoundAnswerPlayerID = () =>
  useRoundStore((state) => state.answerPlayerID);
export const useRoundAnswer = () => useRoundStore((state) => state.answer);

export const useRoundActions = () => useRoundStore((state) => state.actions);
