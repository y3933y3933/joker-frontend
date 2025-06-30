import { useGameActions } from "@/integrations/zustand/store/game.store";
import { useRoundActions } from "@/integrations/zustand/store/round.store";
import {
  useUserActions,
  useUserID,
} from "@/integrations/zustand/store/user.store";
import { WebSocketProvider } from "@/ws/websocketProvider";
import type { WSMessage } from "@/ws/ws.type";
import { createFileRoute, Outlet, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

export const Route = createFileRoute("/games/$code")({
  component: RouteComponent,
});

function RouteComponent() {
  const { code } = Route.useParams();
  const playerID = useUserID();
  const navigate = useNavigate();

  const { addPlayer, reset: resetGame, removePlayer } = useGameActions();
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
          toast.success(`${msg.data.nickname} 加入遊戲`);
        }
      },
      game_started: (msg) => {
        if (msg.type === "game_started") {
          setRoundID(msg.data.roundId);
          setAnswerPlayerID(msg.data.answererID);
          setQuestionPlayerID(msg.data.questionPlayerID);
          updateUserRole({
            questionID: msg.data.questionPlayerID,
            answerID: msg.data.answererID,
          });
          setRoundStatus("waiting_for_question");
          navigate({ to: `/games/${code}/play` });
        }
      },
      player_left: (msg) => {
        if (msg.type === "player_left") {
          console.log("leave player id ", msg.data.id);
          removePlayer(msg.data.id);
          toast.warning(`${msg.data.nickname} 已離開房間`);
        }
      },
      round_question: (msg) => {
        if (msg.type === "round_question") {
          setQuestion(msg.data.question);
        }
      },
      answer_time: (_) => {
        setRoundStatus("waiting_for_answer");
      },
      answer_submitted: (msg) => {
        if (msg.type === "answer_submitted") {
          setAnswer(msg.data.answer);
          setRoundStatus("waiting_for_draw");
        }
      },
      joker_revealed: (msg) => {
        if (msg.type === "joker_revealed") {
          setQuestion(msg.data.question);
          setRoundStatus("revealed");
        }
      },
      player_safe: (_) => {
        setRoundStatus("done");
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
          setRoundStatus("waiting_for_question");
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
