export type Level = "easy" | "normal" | "spicy";

export type Player = {
  id: number;
  nickname: string;
  isHost: boolean;
};

export type PlayerWithAvatar = Player & { avatar: string };
