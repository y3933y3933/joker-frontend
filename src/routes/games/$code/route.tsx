import { useGameActions } from "@/features/games/store/game";
import { usePlayerID } from "@/features/games/store/player";
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
          default:
            console.warn("Unknown WS message:", msg);
        }
      }}
    >
      <Outlet />
    </GameWebSocketProvider>
  );
}
