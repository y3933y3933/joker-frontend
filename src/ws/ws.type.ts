export type WSMessage =
  | {
      type: "player_joined";
      data: {
        id: number;
        nickname: string;
        isHost: boolean;
      };
    }
  | { type: "player_left"; data: { id: number } }
  | { type: "game_started"; data: { startedAt: string } }
  | { type: "new_round"; data: { round: number; currentPlayerId: number } }
  | { type: "ghost_drawn"; data: { playerId: number; question: string } };
