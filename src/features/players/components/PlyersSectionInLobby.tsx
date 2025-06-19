import { Card, CardContent } from "@/components/ui/card";
import { GAME } from "@/features/games/constants";
import { Users } from "lucide-react";
import EmptyPlayerSlot from "./_EmptySlotPlayer";
import PlayerCardInLobby from "./_PlayerCardInLobby";
import type { PlayerWithAvatar } from "@/features/games/types";

export default function PlayersSectionInLobby({
  players,
}: {
  players: PlayerWithAvatar[];
}) {
  return (
    <Card className="w-full max-w-4xl bg-gray-900/50 border-yellow-500/30 shadow-lg shadow-yellow-500/10">
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Players ( {players.length} / {GAME.MAX_PLAYER_NUM} )
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {players.map((player) => (
              <PlayerCardInLobby
                key={player.id}
                isHost={player.isHost}
                nickname={player.nickname}
                avatar={player.avatar}
              />
            ))}

            {/* Empty slots */}
            {Array.from({
              length: Math.max(0, GAME.MAX_PLAYER_NUM - players.length),
            }).map((_, index) => (
              <EmptyPlayerSlot key={`empty-${index}`} />
            ))}
          </div>

          {players.length && (
            <p className="text-center text-gray-400 text-sm">
              Waiting for more players to join... (minimum {GAME.MIN_PLAYER_NUM}{" "}
              players)
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
