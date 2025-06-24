import GameRules from "@/components/GameRules";
import LobbyHeader from "@/components/LobbyHeader";
import PlayerListInLobby from "@/components/PlayerListInLobby";
import { Button } from "@/components/ui/button";
import { APP } from "@/constants";
import { getPlayers } from "@/integrations/axios/games/games";
import { useGameLevel } from "@/integrations/zustand/store/game.store";
import { useUserIsHost } from "@/integrations/zustand/store/user.store";
import { createFileRoute } from "@tanstack/react-router";
import { Play } from "lucide-react";

export const Route = createFileRoute("/games/$code/lobby")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getPlayers(params.code);
  },
});

function RouteComponent() {
  const { code } = Route.useParams();
  const isHost = useUserIsHost();
  const level = useGameLevel();
  const players = Route.useLoaderData();

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
        <LobbyHeader gameCode={code} level={level} />

        <GameRules />

        <PlayerListInLobby players={players} />

        <div className="flex gap-4">
          <Button
            // onClick={handleLeave}
            variant="outline"
            className="border-gray-600  bg-gray-800 text-white"
          >
            Leave Room
          </Button>

          {isHost && (
            <Button
              // onClick={handleStartGame}
              disabled={players.length < APP.MIN_PLAYER_NUM}
              className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-green-500/25 border border-green-400 transition-all duration-300 hover:shadow-green-400/50 hover:scale-105 disabled:opacity-50"
            >
              <Play className="mr-2 h-5 w-5" />
              Start Game
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
