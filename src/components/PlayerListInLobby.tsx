import { Crown, User2Icon, Users } from "lucide-react";
import { Card, CardContent } from "./ui/card";
import { APP } from "@/constants";
import type { PlayWithoutGameID } from "@/integrations/axios/games/game.schema";
import PlayerAvatar from "./PlayerAvatar";

interface PlayerListInLobbyProps {
  players: PlayWithoutGameID[];
}

export default function PlayerListInLobby({ players }: PlayerListInLobbyProps) {
  const emptySlots = Array.from({
    length: Math.max(0, APP.MAX_PLAYER_NUM - players.length),
  });
  return (
    <Card className="w-full max-w-4xl bg-gray-900/50 border-yellow-500/30 shadow-lg shadow-yellow-500/10">
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Players ( {players.length} / {APP.MAX_PLAYER_NUM} )
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {players.map((player) => (
              <PlayerCard
                key={player.id}
                isHost={player.isHost}
                nickname={player.nickname}
                isOnline={player.status === "online"}
              />
            ))}

            {/* Empty slots */}
            {emptySlots.map((_, index) => (
              <EmptySlot key={`empty-${index}`} />
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm">
            Waiting for more players to join... (minimum {APP.MIN_PLAYER_NUM}{" "}
            players)
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function EmptySlot() {
  return (
    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border-2 border-dashed  border-gray-700/50 animate-pulse">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        <User2Icon className="text-gray-600 w-5 h-5" />
      </div>
      <span className="flex-1 text-white font-medium">Waiting...</span>
    </div>
  );
}

function PlayerCard({
  isHost,
  nickname,
  isOnline,
}: {
  isHost: boolean;
  nickname: string;
  isOnline: boolean;
}) {
  return (
    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-gray-700/50 ">
      <PlayerAvatar name={nickname} isOnline={isOnline} />
      <span className="flex-1 text-white font-medium">{nickname}</span>
      {isHost && <Crown className="h-4 w-4 text-yellow-400" />}
    </div>
  );
}
