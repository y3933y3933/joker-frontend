import { getGame } from "@/integrations/axios/games/games";
import { useGameActions } from "@/integrations/zustand/store/game.store";
import { useUserID } from "@/integrations/zustand/store/user.store";
import { WebSocketProvider } from "@/ws/websocketProvider";
import type { WSMessage } from "@/ws/ws.type";
import { createFileRoute, Outlet } from "@tanstack/react-router";
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

  const { setGameLevel, addPlayer } = useGameActions();

  useEffect(() => {
    setGameLevel(game.level);
  }, [game.level]);

  const handleMessageMap: Record<
    WSMessage["type"],
    (data: WSMessage["data"]) => void
  > = {
    player_joined: (data) => {
      addPlayer(data);
    },
  };
  return (
    <WebSocketProvider
      code={code}
      playerID={playerID}
      onMessage={(msg) => handleMessageMap[msg.type](msg.data)}
    >
      <Outlet />
    </WebSocketProvider>
  );
}
