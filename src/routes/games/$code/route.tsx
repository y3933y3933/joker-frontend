import { getGame } from "@/integrations/axios/games/games";
import { useGameActions } from "@/integrations/zustand/store/game.store";
import { useRoundActions } from "@/integrations/zustand/store/round.store";
import {
  useUserActions,
  useUserID,
} from "@/integrations/zustand/store/user.store";
import { WebSocketProvider } from "@/ws/websocketProvider";
import type { WSMessage } from "@/ws/ws.type";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/games/$code")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getGame(params.code);
  },
});

function RouteComponent() {
  const { code } = Route.useParams();
  const playerID = useUserID();
  const game = Route.useLoaderData();
  const navigate = useNavigate();

  const { setGameLevel, addPlayer, reset: resetGame } = useGameActions();
  const {
    setRoundID,
    setQuestionPlayerID,
    setAnswerPlayerID,
    setRoundStatus,
    setQuestion,
    setAnswer,
    reset: resetRound,
  } = useRoundActions();
  const {
    setUserRoleAnswer,
    setUserRoleNormal,
    setUserRoleQuestion,
    reset: resetUser,
  } = useUserActions();

  useEffect(() => {
    setGameLevel(game.level);
  }, [game.level]);

  function updateUserRole({
    questionID,
    answerID,
  }: {
    questionID: number;
    answerID: number;
  }) {
    if (playerID === questionID) {
      setUserRoleQuestion();
    } else if (playerID === answerID) {
      setUserRoleAnswer();
    } else {
      setUserRoleNormal();
    }
  }

  function reset() {
    resetGame();
    resetUser();
    resetRound();
  }

  const handleMessageMap: Record<WSMessage["type"], (msg: WSMessage) => void> =
    {
      player_joined: (msg) => {
        if (msg.type === "player_joined") {
          addPlayer(msg.data);
        }
      },
      game_started: (msg) => {
        if (msg.type === "game_started") {
          setRoundID(msg.data.roundId);
          setAnswerPlayerID(msg.data.answererId);
          setQuestionPlayerID(msg.data.questionerId);
          updateUserRole({
            questionID: msg.data.questionerId,
            answerID: msg.data.answererId,
          });
          setRoundStatus("question");
          navigate({ to: `/games/${code}/play` });
        }
      },

      round_question: (msg) => {
        if (msg.type === "round_question") {
          setQuestion(msg.data.question);
        }
      },
      answer_time: (_) => {
        setRoundStatus("answer");
      },
      answer_submitted: (msg) => {
        if (msg.type === "answer_submitted") {
          setAnswer(msg.data.answer);
          setRoundStatus("draw");
        }
      },
      joker_revealed: (msg) => {
        if (msg.type === "joker_revealed") {
          setQuestion(msg.data.question);
          setRoundStatus("revealed");
        }
      },
      player_safe: (_) => {
        setRoundStatus("safe");
      },
      round_started: (msg) => {
        if (msg.type === "round_started") {
          setRoundID(msg.data.roundId);
          setAnswerPlayerID(msg.data.answererId);
          setQuestionPlayerID(msg.data.questionerId);
          updateUserRole({
            questionID: msg.data.questionerId,
            answerID: msg.data.answererId,
          });
          setRoundStatus("question");
          setQuestion("");
          setAnswer("");
        }
      },

      game_ended: (msg) => {
        if (msg.type === "game_ended") {
          navigate({
            to: `/games/${msg.data.gameCode}/summary?playerID=${playerID}`,
          });
          reset();
        }
      },
    };
  return (
    <WebSocketProvider
      code={code}
      playerID={playerID}
      onMessage={(msg) => handleMessageMap[msg.type](msg)}
    >
      <Outlet />
    </WebSocketProvider>
  );
}
