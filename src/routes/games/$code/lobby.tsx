import { getPlayers, leaveGame } from "@/api/games/games";
import type { PlayerResponse } from "@/api/games/games.type";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  useGameActions,
  useGameCode,
  useGamePlayers,
} from "@/features/games/store/game";
import {
  useIsHost,
  usePlayerActions,
  usePlayerID,
} from "@/features/games/store/player";
import { useApiRequest } from "@/hooks/useApiRequest";
import useClipboard from "@/hooks/useClipboard";
import { useGameWebSocket } from "@/hooks/useGameWebSocket";
import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Check, Copy, Users, Crown, Zap } from "lucide-react";
import { useEffect, useRef } from "react";

export const Route = createFileRoute("/games/$code/lobby")({
  loader: async ({ params }) => {
    const players = await getPlayers(params.code);
    return { players };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { code } = useParams({ strict: false });
  const { players: rawPlayers } = useLoaderData({ from: "/games/$code/lobby" });

  // const playersRef = useRef<PlayerResponse[]>(rawPlayers);

  const {
    updatePlayersWithAvatar,
    reset: resetGame,
    addPlayer,
    removePlayer,
  } = useGameActions();

  const navigate = useNavigate();

  const { copied, copyToClipboard } = useClipboard();

  const players = useGamePlayers();
  const gameCode = useGameCode();
  const playerId = usePlayerID();
  const { reset: resetPlayer } = usePlayerActions();

  const isHost = useIsHost();

  const leaveGameRequest = useApiRequest<
    { gameCode: string; playerId: number },
    void
  >({
    requestFn: leaveGame,
    onSuccess: () => {
      resetGame();
      resetPlayer();
      navigate({ to: "/" });
    },
  });

  async function handleLeave() {
    if (!gameCode || playerId == null) return;
    await leaveGameRequest.execute({
      gameCode,
      playerId,
    });
  }

  useGameWebSocket({
    gameCode: code || "",
    onMessage: (msg) => {
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
      }
    },
  });

  useEffect(() => {
    // 一開始初始化 store
    updatePlayersWithAvatar(rawPlayers);
  }, [rawPlayers]);

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            等待玩家加入...
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-400">房間代碼:</span>
            <code className="text-2xl font-mono bg-gray-800 px-4 py-2 rounded-lg border border-yellow-500/30 text-yellow-400">
              {code}
            </code>
            <Button
              onClick={() => copyToClipboard(code || "")}
              size="sm"
              variant="ghost"
              className="text-yellow-400 hover:bg-yellow-400/10 hover:text-white"
            >
              {copied ? (
                <Check className="h-4 w-4" />
              ) : (
                <Copy className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        <Card className="w-full max-w-2xl bg-gray-900/50 border-yellow-500/30 shadow-lg shadow-yellow-500/10">
          <CardContent className="p-6">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
                <Users className="h-5 w-5" />
                Players ({players.length})
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-gray-700/50 animate-pulse"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm"
                      style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
                    >
                      {player.avatar}
                    </div>
                    <span className="flex-1 text-white font-medium">
                      {player.nickname}
                    </span>
                    {player.isHost && (
                      <Crown className="h-4 w-4 text-yellow-400" />
                    )}
                  </div>
                ))}
              </div>

              {players.length && (
                <p className="text-center text-gray-400 text-sm">
                  Waiting for more players to join... (minimum 2 players)
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button
            onClick={handleLeave}
            variant="outline"
            className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            Leave Room
          </Button>

          {isHost && (
            <Button
              // onClick={startGame}
              disabled={players.length < 2}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed px-8"
            >
              <Zap className="mr-2 h-4 w-4" />
              Start Game
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
