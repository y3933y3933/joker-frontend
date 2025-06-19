import { Crown } from "lucide-react";

interface PlayerCardInLobbyProps {
  avatar: string;
  isHost: boolean;
  nickname: string;
}

export default function PlayerCardInLobby({
  avatar,
  isHost,
  nickname,
}: PlayerCardInLobbyProps) {
  return (
    <div className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-gray-700/50 animate-pulse">
      <div
        className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm"
        style={{ backgroundColor: "rgba(255,255,255,0.1)" }}
      >
        {avatar}
      </div>
      <span className="flex-1 text-white font-medium">{nickname}</span>
      {isHost && <Crown className="h-4 w-4 text-yellow-400" />}
    </div>
  );
}
