export type WSMessage =
  | PlayerJoined
  | GameStarted
  | RoundQuestion
  | AnswerTime
  | AnswerSubmitted
  | JokerRevealed
  | PlayerSafe
  | RoundStarted
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
    roundId: number;
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
    question: string;
  };
};

type AnswerTime = {
  type: "answer_time";
};

type AnswerSubmitted = {
  type: "answer_submitted";
  data: {
    roundId: number;
    answer: string;
  };
};

type JokerRevealed = {
  type: "joker_revealed";
  data: {
    question: string;
  };
};

type PlayerSafe = {
  type: "player_safe";
};

type RoundStarted = {
  type: "round_started";
  data: {
    roundId: number;
    answererId: number;
    questionerId: number;
  };
};

type GameEnded = {
  type: "game_ended";
  data: {
    gameCode: number;
  };
};
