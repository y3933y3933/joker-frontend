import { useGamePlayers } from "@/integrations/zustand/store/game.store";
import {
  useRoundAnswerPlayerID,
  useRoundQuestionPlayerID,
  useRoundStatus,
} from "@/integrations/zustand/store/round.store";

export default function useRoundPlayer() {
  const players = useGamePlayers();
  const roundStatus = useRoundStatus();
  const answerID = useRoundAnswerPlayerID();
  const questionPlayerId = useRoundQuestionPlayerID();

  const currentPlayerID =
    roundStatus === "question" ? questionPlayerId : answerID;

  const currentPlayerName =
    players.find((player) => player.id === currentPlayerID)?.nickname || "";

  return { currentPlayerID, currentPlayerName };
}
