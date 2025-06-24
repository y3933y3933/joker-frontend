import LevelRadio from "@/components/LevelRadio";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { LevelOptions } from "@/constants";
import { useCreateAndJoinGame } from "@/integrations/tanstack-query/games/useCreateAndJoinGame";
import { useGameActions } from "@/integrations/zustand/store/game.store";
import { useUserActions } from "@/integrations/zustand/store/user.store";
import type { Level } from "@/types";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  const [nickname, setNickname] = useState("");
  const [level, setLevel] = useState<Level>("easy");
  const navigate = useNavigate();

  const { createAndJoin, isLoading } = useCreateAndJoinGame();
  const { setGameLevel } = useGameActions();
  const { setUserNickname, setUserID, setIsHost } = useUserActions();

  async function createGame() {
    try {
      const { game, joined } = await createAndJoin(level, nickname);
      updateGameStore({ level: game.level });
      updateUserStore(joined);
      toast.success("建立遊戲成功");
      navigate({ to: `/games/${game.code}/lobby` });
    } catch (err) {
      console.error("建立或加入遊戲失敗", err);
      toast.error("建立遊戲失敗");
    }
  }

  function updateGameStore({ level }: { level: Level }) {
    setGameLevel(level);
  }

  function updateUserStore({
    id,
    nickname,
    isHost,
  }: {
    id: number;
    nickname: string;
    isHost: boolean;
  }) {
    setIsHost(isHost);
    setUserNickname(nickname);
    setUserID(id);
  }

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-right duration-500">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Create Room
          </h2>
          <p className="text-gray-400">
            Enter your nickname And to create a new game room
          </p>
        </div>

        <Card className="w-full max-w-md bg-gray-900/50 border-cyan-500/30 shadow-lg shadow-cyan-500/10 py-0">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-cyan-400">
                Nickname
              </label>
              <Input
                maxLength={15}
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="bg-black/50 border-cyan-500/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20"
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-cyan-400">Level</label>
              <div className="space-y-3">
                {LevelOptions.map((option) => (
                  <LevelRadio
                    key={option.value}
                    option={option}
                    selectedLevel={level}
                    onChange={setLevel}
                  />
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1 border-gray-600 text-white bg-gray-800 hover:bg-white hover:text-gray-800 "
              >
                <Link to="/" className="inline-block w-full">
                  Back
                </Link>
              </Button>
              <Button
                disabled={!nickname.trim() || isLoading}
                onClick={createGame}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading && "Creating..."}
                {!isLoading && "Create"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
