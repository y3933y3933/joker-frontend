import type { LevelOption } from "./types";

export const APP = {
  NAME: "Joker",
  DESCRIPTION:
    " 回合制爆料遊戲，每回合只有一人知道題目，按下抽牌後才知道命運！抽到鬼牌就得公開說出答案，否則就能偷偷藏住秘密。",
  MAX_PLAYER_NUM: 8,
  MIN_PLAYER_NUM: 2,
} as const;

export const LevelOptions: LevelOption[] = [
  {
    value: "easy",
    description: "Light & fun questions",
    style: {
      border: "border-neon-green",
      bg: "bg-neon-green/10",
      text: "text-neon-green",
    },
  },
  {
    value: "normal",
    description: "Balanced mix of topics",
    style: {
      border: "border-neon-cyan",
      bg: "bg-neon-cyan/10",
      text: "text-neon-cyan",
    },
  },
  {
    value: "spicy",
    description: "Bold & revealing questions",
    style: {
      border: "border-neon-magenta",
      bg: "bg-neon-magenta/10",
      text: "text-neon-magenta",
    },
  },
];
