import type { PlayWithoutGameID } from "@/integrations/axios/games/game.schema";
import { useUserID } from "@/integrations/zustand/store/user.store";
import { Crown } from "lucide-react";
import PlayerAvatar from "./PlayerAvatar";

interface PlayerListInPlayProps {
  players: PlayWithoutGameID[];
  currentPlayerID: number | null;
}

export default function PlayerListInPlay({
  players,
  currentPlayerID,
}: PlayerListInPlayProps) {
  const userID = useUserID();

  return (
    <>
      {players.map((player) => (
        <div
          key={player.id}
          className={`relative flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${
            player.id === userID
              ? "border-cyan-400 bg-gradient-to-r from-cyan-400/20 to-transparent shadow-lg shadow-cyan-400/30"
              : "border-gray-700/50 bg-gray-900/30 hover:border-gray-600"
          }`}
        >
          {/* Current player indicator */}
          {player.id === currentPlayerID && (
            <div className="absolute -left-1 top-1/2 transform -translate-y-1/2 w-1 h-8 bg-cyan-400 rounded-full animate-pulse" />
          )}

          <PlayerAvatar
            name={player.nickname}
            isOnline={player.status === "online"}
          />

          <div className="flex-1">
            <span
              className={`font-medium ${
                player.id === currentPlayerID
                  ? "text-cyan-400"
                  : "text-gray-300"
              }`}
            >
              {player.nickname}
            </span>
            {player.id === currentPlayerID && (
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
