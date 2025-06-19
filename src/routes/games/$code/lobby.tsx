import { getPlayers, leaveGame } from "@/api/games/games";
import { createRound } from "@/api/rounds/rounds";
import type {
  CreateRoundRequest,
  CreateRoundResponse,
} from "@/api/rounds/rounds.type";
import { Button } from "@/components/ui/button";
import LobbyHeader from "@/features/games/components/LobbyHeader";
import { GAME } from "@/features/games/constants";
import {
  useGameActions,
  useGameCode,
  useGameLevel,
  useGamePlayers,
} from "@/features/games/store/game";
import {
  useIsHost,
  usePlayerActions,
  usePlayerID,
} from "@/features/games/store/player";
import PlayersSectionInLobby from "@/features/players/components/PlyersSectionInLobby";
import { useApiRequest } from "@/hooks/useApiRequest";

import {
  createFileRoute,
  useLoaderData,
  useNavigate,
  useParams,
} from "@tanstack/react-router";
import { Play } from "lucide-react";
import { useEffect } from "react";

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
  const navigate = useNavigate();

  // store
  const { updatePlayersWithAvatar, reset: resetGame } = useGameActions();
  const players = useGamePlayers();
  const level = useGameLevel();
  const gameCode = useGameCode();
  const playerId = usePlayerID();
  const { reset: resetPlayer } = usePlayerActions();
  const isHost = useIsHost();

  // api
  const createRoundRequest = useApiRequest<
    CreateRoundRequest,
    CreateRoundResponse
  >({
    requestFn: createRound,
    onError: () => {
      alert("無法開始遊戲");
    },
  });

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

  async function handleStartGame() {
    if (!code || !playerId) return;
    await createRoundRequest.execute({
      code,
      playerId: playerId,
    });
  }

  useEffect(() => {
    // 一開始初始化 store
    updatePlayersWithAvatar(rawPlayers);
  }, [rawPlayers]);

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
        {code && level && <LobbyHeader gameCode={code} level={level} />}

        <PlayersSectionInLobby players={players} />

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
              onClick={handleStartGame}
              disabled={players.length < GAME.MIN_PLAYER_NUM}
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
