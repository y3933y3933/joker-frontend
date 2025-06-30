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

export type RoundStatus = "question" | "answer" | "draw" | "revealed" | "safe";
