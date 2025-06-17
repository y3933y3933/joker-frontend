export type WSMessage =
  | {
      type: "player_joined";
      payload: {
        id: number;
        nickname: string;
        isHost: boolean;
      };
    }
  | { type: "player_left"; payload: { id: number } }
  | { type: "game_started"; payload: { startedAt: string } }
  | { type: "new_round"; payload: { round: number; currentPlayerId: number } }
  | { type: "ghost_drawn"; payload: { playerId: number; question: string } };
