import type { Level } from "@/types";

export type WSMessage =
  | PlayerJoined
  | GameStarted
  | RoundQuestion
  | AnswerTime
  | AnswerSubmitted
  | JokerRevealed
  | PlayerSafe
  | NextRoundStarted
  | GameEnded
  | PlayerLeft
  | HostTransferred;

type PlayerJoined = {
  type: "player_joined";
  data: {
    id: number;
    nickname: string;
    isHost: boolean;
  };
};

type GameStarted = {
  type: "game_started";
  data: {
    roundID: number;
    answererID: number;
    questionPlayerID: number;
  };
};

type PlayerLeft = {
  type: "player_left";
  data: {
    id: number;
    nickname: string;
  };
};

type HostTransferred = {
  type: "host_transferred";
  data: {
    id: number;
    nickname: string;
  };
};

type RoundQuestion = {
  type: "round_question";
  data: {
    level: Level;
    content: string;
  };
};

type AnswerTime = {
  type: "answer_time";
};

type AnswerSubmitted = {
  type: "answer_submitted";
  data: {
    answer: string;
  };
};

type JokerRevealed = {
  type: "joker_revealed";
  data: {
    content: string;
    level: Level;
  };
};

type PlayerSafe = {
  type: "player_safe";
};

type NextRoundStarted = {
  type: "next_round_started";
  data: {
    roundID: number;
    answererID: number;
    questionPlayerID: number;
  };
};

type GameEnded = {
  type: "game_ended";
  data: {
    gameCode: number;
  };
};
