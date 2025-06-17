import type { RoundStatus } from "@/features/games/constants";

export type CreateRoundResponse = {
  roundId: number;
  playerId: number;
  question: string;
};

export type CreateRoundRequest = {
  code: string;
  playerId: number;
};

export type GetCurrentRoundRequest = {
  code: string;
  playerId: number;
};

export type GetCurrentRoundResponse = {
  question: string;
  gameId: string;
  isJoker: boolean;
  status: RoundStatus;
  currentPlayerId: number;
  roundId: number;
};
