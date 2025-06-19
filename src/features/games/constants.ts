import type { Level, LevelOption } from "./types";

export const LevelOptions: LevelOption[] = [
  {
    value: "easy",
    label: "EASY",
    description: "Light & fun questions",
  },
  {
    value: "normal",
    label: "NORMAL",
    description: "Balanced mix of topics",
  },
  {
    value: "spicy",
    label: "SPICY",
    description: "Bold & revealing questions",
  },
];

export const LevelColorClassMap: Record<
  Level,
  { bg: string; text: string; border: string }
> = {
  easy: {
    border: "border-neon-green",
    bg: "bg-neon-green/10",
    text: "text-neon-green",
  },
  normal: {
    border: "border-neon-cyan",
    bg: "bg-neon-cyan/10",
    text: "text-neon-cyan",
  },
  spicy: {
    border: "border-neon-magenta",
    bg: "bg-neon-magenta/10",
    text: "text-neon-magenta",
  },
};
