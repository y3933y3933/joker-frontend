import { useGamePlayers } from "@/features/games/store/game";
import { usePlayerID } from "@/features/games/store/player";
import { Crown } from "lucide-react";

interface PlayerListInPlayProps {
  currentRoundPlayerId: number;
}

export default function PlayerListInPlay({
  currentRoundPlayerId,
}: PlayerListInPlayProps) {
  const playerId = usePlayerID();
  const players = useGamePlayers();

  return (
    <>
      {players.map((player) => (
        <div
          key={player.id}
          className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
            player.id === playerId
              ? "border-cyan-400 bg-gradient-to-r from-cyan-400/20 to-transparent shadow-lg shadow-cyan-400/30"
              : "border-gray-700/50 bg-gray-900/30 hover:border-gray-600"
          }`}
        >
          {/* Current player indicator */}
          {player.id === currentRoundPlayerId && (
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-full animate-pulse" />
          )}

          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg border-2 transition-all duration-300 ${
              player.id === currentRoundPlayerId
                ? "border-cyan-400 shadow-lg shadow-cyan-400/50"
                : "border-gray-600"
            }`}
            style={{ backgroundColor: player.avatar }}
          >
            {player.nickname.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <span
              className={`font-medium ${
                player.id === currentRoundPlayerId
                  ? "text-cyan-400"
                  : "text-gray-300"
              }`}
            >
              {player.nickname}
            </span>
            {player.id === currentRoundPlayerId && (
              <div className="text-xs text-cyan-300 font-medium">
                Current Turn
              </div>
            )}
          </div>

          {player.isHost && <Crown className="h-4 w-4 text-yellow-400" />}
        </div>
      ))}
    </>
  );
}
