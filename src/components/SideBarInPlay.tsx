import { Users } from "lucide-react";
import PlayerListInPlay from "./PlayerListInPlay";
import type { Player } from "@/integrations/axios/games/game.schema";
import type { RoundStatus } from "@/types";

interface SideBarInPlayProps {
  players: Player[];
  role: "normal" | "answer" | "question";
  roundStatus: RoundStatus;
  currentPlayer: {
    id: number | null;
    nickname: string;
  };
}

export default function SideBarInPlay({
  players,
  role,
  roundStatus,
  currentPlayer,
}: SideBarInPlayProps) {
  return (
    <div className="lg:w-80 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border-r border-gray-700/50 p-4">
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Users className="h-5 w-5 text-cyan-400" />
          <h2 className="text-lg font-bold text-cyan-400">
            PLAYERS {players.length}
          </h2>
        </div>

        <div className="space-y-3">
          <PlayerListInPlay
            players={players}
            currentPlayerID={currentPlayer.id}
          />
        </div>

        {/* Turn indicator */}
        {/* <div className="mt-6 p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-1">
              {roundStatus === "question" && "選題中"}
              {roundStatus === "answer" && "作答中"}
              {roundStatus === "draw" && "抽牌中"}
              {(roundStatus === "revealed" || roundStatus === "safe") &&
                "揭曉結果"}
            </div>
            <div className="text-lg font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
              {currentPlayer.nickname}
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}
