import { useGamePlayers } from "@/integrations/zustand/store/game.store";
import {
  useRoundAnswerPlayerID,
  useRoundStatus,
} from "@/integrations/zustand/store/round.store";

export default function useRoundPlayer() {
  const players = useGamePlayers();
  const roundStatus = useRoundStatus();
  const answerID = useRoundAnswerPlayerID();
  const questionPlayerId = useRoundAnswerPlayerID();

  const currentPlayerID =
    roundStatus === "answer" ? answerID : questionPlayerId;

  const currentPlayerName =
    players.find((player) => player.id === currentPlayerID)?.nickname || "";

  return { currentPlayerID, currentPlayerName };
}
