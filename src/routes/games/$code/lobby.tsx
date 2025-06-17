import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Check, Copy, Users, Crown, Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/games/$code/lobby")({
  component: RouteComponent,
});

type Player = {
  id: string;
  nickname: string;
  isHost: boolean;
  avatar: string;
};

function RouteComponent() {
  const [copied, setCopied] = useState(false);
  const generateAvatar = (name: string) => {
    const colors = ["#00ffff", "#ff00ff", "#ffff00", "#ff0080", "#80ff00"];
    return colors[name.length % colors.length];
  };
  const [players, setPlayers] = useState<Player[]>([
    {
      id: "1",
      nickname: "Joanne",
      isHost: true,
      avatar: generateAvatar("Joanne"),
    },
  ]);

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText("123");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy room code");
    }
  };

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in zoom-in duration-500">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            Room Lobby
          </h2>
          <div className="flex items-center justify-center gap-2">
            <span className="text-gray-400">Room Code:</span>
            <code className="text-2xl font-mono bg-gray-800 px-4 py-2 rounded-lg border border-yellow-500/30 text-yellow-400">
              {/* {currentRoomCode} */}
              123
            </code>
            <Button
              onClick={copyRoomCode}
              size="sm"
              variant="ghost"
              className="text-yellow-400 hover:bg-yellow-400/10"
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
                Players ({players.length}) Players 12
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {players.map((player) => (
                  <div
                    key={player.id}
                    className="flex items-center gap-3 p-3 bg-black/30 rounded-lg border border-gray-700/50 animate-pulse"
                  >
                    <div
                      className="w-10 h-10 rounded-full flex items-center justify-center text-black font-bold text-sm"
                      style={{ backgroundColor: player.avatar }}
                    >
                      {player.nickname.charAt(0).toUpperCase()}
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
            //   onClick={resetGame}
            variant="outline"
            className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
          >
            Leave Room
          </Button>
          {/* {currentPlayer?.isHost && (
          <Button
            onClick={startGame}
            disabled={players.length < 2}
            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 disabled:opacity-50 disabled:cursor-not-allowed px-8"
          >
            <Zap className="mr-2 h-4 w-4" />
            Start Game
          </Button>
        )} */}
        </div>
      </div>
    </div>
  );
}
