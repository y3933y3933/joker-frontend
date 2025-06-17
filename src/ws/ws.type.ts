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
  | { type: "game_started"; data: { roundId: number; playerId: number } }
  | {
      type: "joker_revealed";
      data: {
        roundId: number;
        playerId: number;
        question: string;
      };
    }
  | {
      type: "player_safe";
      data: {
        roundId: number;
        playerId: number;
      };
    }
  | {
      type: "round_started";
      data: {
        roundId: number;
        playerId: number;
      };
    }
  | {
      type: "round_question";
      data: {
        question: string;
      };
    };
