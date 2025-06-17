export type CreateGameResponse = {
  id: number;
  code: string;
  level: string;
  createdAt: string;
};

export type PlayerResponse = {
  id: number;
  nickname: string;
  isHost: boolean;
};
