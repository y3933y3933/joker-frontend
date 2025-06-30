import type { Level, RoundStatus } from "@/types";
import { create } from "zustand";

interface RoundStore {
  id: number | null;
  question: {
    content: string;
    level: Level;
  } | null;
  questionPlayerID: number | null;
  answerPlayerID: number | null;
  answer: string | null;
  status: RoundStatus;
  actions: RoundActions;
}

interface RoundActions {
  setRoundID: (id: number) => void;
  setQuestion: (question: { level: Level; content: string }) => void;
  setQuestionPlayerID: (id: number) => void;
  setAnswerPlayerID: (id: number) => void;
  setAnswer: (answer: string) => void;
  setRoundStatus: (status: RoundStatus) => void;
  reset: () => void;
}

const useRoundStore = create<RoundStore>((set) => ({
  id: null,
  question: null,
  questionPlayerID: null,
  answerPlayerID: null,
  answer: null,
  status: "waiting_for_question",
  actions: {
    setRoundID: (id: number) => {
      set({ id });
    },
    setQuestion: (question: { level: Level; content: string }) => {
      set({ question });
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
    setRoundStatus: (status: RoundStatus) => {
      set({ status });
    },
    reset: () => {
      set({
        id: null,
        question: null,
        questionPlayerID: null,
        answerPlayerID: null,
        answer: null,
        status: "waiting_for_question",
      });
    },
  },
}));

export const useRoundID = () => useRoundStore((state) => state.id);
export const useRoundQuestion = () => useRoundStore((state) => state.question);
export const useRoundQuestionPlayerID = () =>
  useRoundStore((state) => state.questionPlayerID);
export const useRoundAnswerPlayerID = () =>
  useRoundStore((state) => state.answerPlayerID);
export const useRoundAnswer = () => useRoundStore((state) => state.answer);
export const useRoundStatus = () => useRoundStore((state) => state.status);

export const useRoundActions = () => useRoundStore((state) => state.actions);
