export type WSMessage = {
  type: "player_joined";
  data: {
    id: number;
    nickname: string;
    isHost: boolean;
  };
};
