import type { Level, LevelOption } from "./types";

export const APP = {
  NAME: "Joker",
  DESCRIPTION:
    "回合制爆料遊戲，每回合只有一人知道題目，按下抽牌後才知道命運！抽到鬼牌就得公開題目。",
  MAX_PLAYER_NUM: 8,
  MIN_PLAYER_NUM: 3,
} as const;

export const LevelStyle: Record<
  Level,
  { border: string; bg: string; text: string }
> = {
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

export const LevelOptions: LevelOption[] = [
  {
    value: "normal",
    description: "Balanced mix of topics",
    style: LevelStyle["normal"],
  },
  {
    value: "spicy",
    description: "Bold & revealing questions",
    style: LevelStyle["spicy"],
  },
];
