import { joinGame } from "@/api/games/games";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useGameActions } from "@/features/games/store/game";
import { usePlayerActions } from "@/features/games/store/player";
import { useApiRequest } from "@/hooks/useApiRequest";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/join")({
  component: RouteComponent,
});

function RouteComponent() {
  const [nickname, setNickname] = useState("");
  const [inputGameCode, setInputGameCode] = useState("");
  const navigate = useNavigate();

  const {
    setPlayerID,
    setNickname: setPlayerNickname,
    setIsHost,
  } = usePlayerActions();
  const { setGameCode } = useGameActions();

  const joinRequest = useApiRequest<
    { code: string; nickname: string },
    { id: number; nickname: string; isHost: boolean }
  >({
    requestFn: ({ code, nickname }) => joinGame(code, nickname),
    onSuccess: (res) => {
      setPlayerID(res.id);
      setPlayerNickname(res.nickname);
      setIsHost(false);
    },
    onError: (error) => {
      console.error(error);
      toast.error("加入房間失敗", {
        description: error,
      });
    },
  });

  async function handleJoin() {
    if (!nickname.trim() || !inputGameCode.trim()) {
      alert("請輸入暱稱與遊戲代碼");
      return;
    }

    const player = await joinRequest.execute({ code: inputGameCode, nickname });
    if (!player) return;

    setGameCode(inputGameCode);
    navigate({ to: `/games/${inputGameCode}/lobby` });
  }

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-left duration-500">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
            Join Room
          </h2>
          <p className="text-gray-400">Enter your nickname and room code</p>
        </div>

        <Card className="py-0 w-full max-w-md bg-gray-900/50 border-pink-500/30 shadow-lg shadow-pink-500/10">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-pink-400">
                Nickname
              </label>
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="bg-black/50 border-pink-500/50 text-white placeholder-gray-500 focus:border-pink-400 focus:ring-pink-400/20"
              />
            </div>

            <div className="space-y-2">
              <label className="flex flex-col text-sm font-medium text-pink-400">
                Room Code
              </label>
              <Input
                value={inputGameCode}
                onChange={(e) => setInputGameCode(e.target.value.toUpperCase())}
                placeholder="Enter room code"
                className="bg-black/50 border-pink-500/50 text-white placeholder-gray-500 focus:border-pink-400 focus:ring-pink-400/20 font-mono"
                //   onKeyPress={(e) => e.key === "Enter" && joinRoom()}
              />
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-600  bg-gray-800 text-white"
              >
                <Link to="/" className="inline-block w-full">
                  Back
                </Link>
              </Button>
              <Button
                onClick={handleJoin}
                disabled={!nickname.trim() || !inputGameCode.trim()}
                className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Join
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
