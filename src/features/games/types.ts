export type Level = "easy" | "normal" | "spicy";
export type LevelOption = {
  value: Level;
  label: string;
  description: string;
};

export type Player = {
  id: number;
  nickname: string;
  isHost: boolean;
};

export type PlayerWithAvatar = Player & { avatar: string };

export type RoundStatus = "pending" | "revealed" | "done";
