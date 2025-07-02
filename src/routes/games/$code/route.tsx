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

  const {
    addPlayer,
    reset: resetGame,
    removePlayer,
    setHost,
    setPlayerOffline,
  } = useGameActions();
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
          addPlayer({ ...msg.data, status: "online" });
          toast.success(`${msg.data.nickname} 加入遊戲`);
        }
      },
      game_started: (msg) => {
        if (msg.type === "game_started") {
          setRoundID(msg.data.roundID);
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
          removePlayer(msg.data.id);
          toast.warning(`${msg.data.nickname} 已離開房間`);
        }
      },
      host_transferred: (msg) => {
        if (msg.type === "host_transferred") {
          setHost(msg.data.id);
          toast.warning(`房間主持人已變更為 ${msg.data.nickname}`);
        }
      },
      round_question: (msg) => {
        if (msg.type === "round_question") {
          setQuestion(msg.data);
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
          setQuestion(msg.data);
          setRoundStatus("revealed");
        }
      },
      player_safe: (_) => {
        setRoundStatus("done");
      },
      next_round_started: (msg) => {
        if (msg.type === "next_round_started") {
          resetNewRound(msg.data);
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
      round_skipped: (msg) => {
        if (msg.type === "round_skipped") {
          toast.error("跳過當前回合");

          resetNewRound({
            roundID: msg.data.roundID,
            answererID: msg.data.answererID,
            questionPlayerID: msg.data.questionPlayerID,
          });
        }
      },
      player_disconnected: (msg) => {
        if (msg.type === "player_disconnected") {
          setPlayerOffline(msg.data.id);
          toast.warning(`${msg.data.nickname} 斷線`);
        }
      },
    };

  function resetNewRound({
    roundID,
    answererID,
    questionPlayerID,
  }: {
    roundID: number;
    answererID: number;
    questionPlayerID: number;
  }) {
    setRoundID(roundID);
    setAnswerPlayerID(answererID);
    setQuestionPlayerID(questionPlayerID);
    updateUserRole({
      questionID: questionPlayerID,
      answerID: answererID,
    });
    setRoundStatus("waiting_for_question");
    setQuestion(null);
    setAnswer("");
  }

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
