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

export type GetGameResponse = {
  id: number;
  code: string;
  level: "easy" | "normal" | "spicy";
  status: "waiting" | "playing" | "ended";
  createdAt: string;
};
