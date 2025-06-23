export type Level = "easy" | "normal" | "spicy";

export type LevelOption = {
  value: Level;
  description: string;
  style: {
    border: string;
    bg: string;
    text: string;
  };
};
