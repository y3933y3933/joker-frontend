import type { Level } from "./types";

const levelLabels: Record<Level, string> = {
  easy: "入門新手場",
  normal: "友情試煉場",
  spicy: "禁忌爆料場",
};

export const LevelOptions: {
  value: Level;
  label: string;
}[] = Object.entries(levelLabels).map(([key, label]) => ({
  value: key as Level,
  label,
}));
