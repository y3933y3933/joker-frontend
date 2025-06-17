import { createFileRoute, Link } from "@tanstack/react-router";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Crown, Zap, Ghost, ArrowRight } from "lucide-react";
import HowToPlayButton from "@/components/HowToPlayButton";

type GameState =
  | "landing"
  | "create-room"
  | "join-room"
  | "room-lobby"
  | "in-game";
type Player = {
  id: string;
  nickname: string;
  isHost: boolean;
  avatar: string;
};

const CHALLENGE_PROMPTS = [
  "Everyone must share their most embarrassing moment!",
  "Take a group selfie making the silliest faces possible!",
  "Everyone has to do 10 jumping jacks right now!",
  "Share a secret talent you've never told anyone!",
  "Everyone must sing happy birthday in a funny voice!",
  "Do your best impression of a famous person!",
  "Everyone shares their weirdest food combination they actually enjoy!",
  "Dance like nobody's watching for 30 seconds!",
];

export const Route = createFileRoute("/")({
  component: JokerGame,
});

export default function JokerGame() {
  const [gameState, setGameState] = useState<GameState>("landing");
  const [nickname, setNickname] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [currentRoomCode, setCurrentRoomCode] = useState("");
  const [players, setPlayers] = useState<Player[]>([]);
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnCard, setDrawnCard] = useState<"normal" | "ghost" | null>(null);
  const [challengePrompt, setChallengePrompt] = useState("");

  const drawCard = () => {
    setIsDrawing(true);

    setTimeout(() => {
      const isGhostCard = Math.random() < 0.3; // 30% chance
      const card = isGhostCard ? "ghost" : "normal";
      setDrawnCard(card);

      if (isGhostCard) {
        const randomPrompt =
          CHALLENGE_PROMPTS[
            Math.floor(Math.random() * CHALLENGE_PROMPTS.length)
          ];
        setChallengePrompt(randomPrompt);
      }

      setIsDrawing(false);
    }, 2000);
  };

  const nextTurn = () => {
    setDrawnCard(null);
    setChallengePrompt("");
    setCurrentPlayerIndex((prev) => (prev + 1) % players.length);
  };

  const resetGame = () => {
    setGameState("landing");
    setNickname("");
    setRoomCode("");
    setCurrentRoomCode("");
    setPlayers([]);
    setCurrentPlayer(null);
    setCurrentPlayerIndex(0);
    setDrawnCard(null);
    setChallengePrompt("");
  };

  return (
    <div>
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(0,255,255,0.03)_100%)] bg-[length:100%_4px] animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-1000">
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent animate-pulse">
              JOKER
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-pink-400 mx-auto rounded-full animate-pulse" />
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              回合制爆料遊戲，每回合只有一人知道題目，按下抽牌後才知道命運！抽到鬼牌就得公開說出答案，否則就能偷偷藏住秘密。
            </p>
            <HowToPlayButton />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 border border-cyan-400/50"
            >
              <Link to="/create" className="flex items-center">
                <Crown className="mr-2 h-5 w-5" />
                Create Room
              </Link>
            </Button>

            <Button
              asChild
              className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 border border-pink-400/50"
            >
              <Link to="/join" className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Join Room
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
