export type CreateRoundResponse = {
  roundId: number;
  playerId: number;
  question: string;
};

export type CreateRoundRequest = {
  code: string;
  playerId: number;
};
