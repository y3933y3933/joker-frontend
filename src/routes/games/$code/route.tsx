import { useGameActions } from "@/features/games/store/game";
import { usePlayerID } from "@/features/games/store/player";
import { useRoundActions } from "@/features/games/store/round";
import { GameWebSocketProvider } from "@/providers/GameWebSocketProvider";
import {
  createFileRoute,
  Outlet,
  useNavigate,
  useParams,
} from "@tanstack/react-router";

export const Route = createFileRoute("/games/$code")({
  component: RouteComponent,
});

function RouteComponent() {
  const { code } = useParams({ strict: false });
  const playerId = usePlayerID();
  const { addPlayer, removePlayer } = useGameActions();
  const navigate = useNavigate();
  const { setDrawResult, setQuestion, setRound } = useRoundActions();

  return (
    <GameWebSocketProvider
      gameCode={code || ""}
      playerId={playerId}
      onMessage={(msg) => {
        switch (msg.type) {
          case "player_joined":
            addPlayer(msg.data);
            break;
          case "player_left":
            removePlayer(msg.data.id);
            break;
          case "game_started":
            navigate({ to: `/games/${code}/play` });
            break;
          case "joker_revealed":
            setDrawResult("joker");
            setQuestion(msg.data.question);
            break;
          case "player_safe":
            setDrawResult("safe");
            setQuestion(null);
            break;
          case "round_started":
            setDrawResult(null);
            setRound({
              roundId: msg.data.roundId,
              currentPlayerId: msg.data.playerId,
            });
            if (msg.data.playerId !== playerId) {
              setQuestion(null);
            }
            break;
          case "round_question":
            setQuestion(msg.data.question);
            break;
          default:
            console.warn("Unknown WS message:", msg);
        }
      }}
    >
      <Outlet />
    </GameWebSocketProvider>
  );
}
