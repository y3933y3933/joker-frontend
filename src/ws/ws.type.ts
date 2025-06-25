export type WSMessage = PlayerJoined | GameStarted | RoundQuestion | AnswerTime;

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
    answererId: number;
    questionerId: number;
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
