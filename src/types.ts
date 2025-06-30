export type Level = "normal" | "spicy";

export type LevelOption = {
  value: Level;
  description: string;
  style: {
    border: string;
    bg: string;
    text: string;
  };
};

export type UserRole = "question" | "answer" | "normal";

export type RoundStatus =
  | "waiting_for_question"
  | "waiting_for_answer"
  | "waiting_for_draw"
  | "revealed"
  | "done";
