import { createFileRoute, Link } from "@tanstack/react-router";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Crown,
  Zap,
  Ghost,
  ArrowRight,
  Copy,
  Check,
} from "lucide-react";
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
  const [copied, setCopied] = useState(false);

  const generateRoomCode = () => {
    return Math.random().toString(36).substring(2, 8).toUpperCase();
  };

  const generateAvatar = (name: string) => {
    const colors = ["#00ffff", "#ff00ff", "#ffff00", "#ff0080", "#80ff00"];
    return colors[name.length % colors.length];
  };

  const createRoom = () => {
    if (!nickname.trim()) return;

    const code = generateRoomCode();
    const newPlayer: Player = {
      id: "1",
      nickname: nickname.trim(),
      isHost: true,
      avatar: generateAvatar(nickname),
    };

    setCurrentRoomCode(code);
    setPlayers([newPlayer]);
    setCurrentPlayer(newPlayer);
    setGameState("room-lobby");
  };

  const joinRoom = () => {
    if (!nickname.trim() || !roomCode.trim()) return;

    const newPlayer: Player = {
      id: Date.now().toString(),
      nickname: nickname.trim(),
      isHost: false,
      avatar: generateAvatar(nickname),
    };

    setCurrentRoomCode(roomCode.toUpperCase());
    setPlayers((prev) => [...prev, newPlayer]);
    setCurrentPlayer(newPlayer);
    setGameState("room-lobby");
  };

  const startGame = () => {
    if (players.length < 2) return;
    setCurrentPlayerIndex(0);
    setGameState("in-game");
  };

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

  const copyRoomCode = async () => {
    try {
      await navigator.clipboard.writeText(currentRoomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy room code");
    }
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
              A mysterious turn-based party game where one player draws the
              ghost card and triggers a shared challenge
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

        {gameState === "in-game" && (
          <div className="flex-1 flex flex-col space-y-8 animate-in fade-in duration-500">
            {/* Turn indicator */}
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Game in Progress
              </h2>
              <div className="flex items-center justify-center gap-2 text-lg">
                <span className="text-gray-400">Current Turn:</span>
                <span className="text-white font-bold">
                  {players[currentPlayerIndex]?.nickname}
                </span>
              </div>
            </div>

            {/* Players display */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className={`p-4 rounded-lg border transition-all duration-300 ${
                    index === currentPlayerIndex
                      ? "border-cyan-400 bg-cyan-400/10 shadow-lg shadow-cyan-400/20 animate-pulse"
                      : "border-gray-700 bg-gray-900/30"
                  }`}
                >
                  <div className="flex flex-col items-center space-y-2">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-black font-bold"
                      style={{ backgroundColor: player.avatar }}
                    >
                      {player.nickname.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm font-medium text-center">
                      {player.nickname}
                    </span>
                    {player.isHost && (
                      <Crown className="h-3 w-3 text-yellow-400" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Game action area */}
            <div className="flex-1 flex flex-col items-center justify-center space-y-8">
              {!drawnCard &&
                !isDrawing &&
                currentPlayer?.id === players[currentPlayerIndex]?.id && (
                  <Button
                    onClick={drawCard}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-6 px-12 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 text-xl"
                  >
                    <Zap className="mr-3 h-6 w-6" />
                    Draw Card
                  </Button>
                )}

              {isDrawing && (
                <div className="text-center space-y-4 animate-pulse">
                  <div className="w-32 h-48 bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl mx-auto animate-bounce shadow-lg shadow-purple-500/50" />
                  <p className="text-xl text-gray-300">Drawing card...</p>
                </div>
              )}

              {drawnCard === "normal" && (
                <div className="text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-32 h-48 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl mx-auto flex items-center justify-center shadow-lg shadow-blue-500/50">
                    <span className="text-4xl">🃏</span>
                  </div>
                  <p className="text-xl text-gray-300">
                    Safe card! Nothing happens.
                  </p>
                  <Button
                    onClick={nextTurn}
                    className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 px-8 py-3"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Next Turn
                  </Button>
                </div>
              )}

              {drawnCard === "ghost" && (
                <div className="text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-32 h-48 bg-gradient-to-br from-red-600 to-purple-600 rounded-xl mx-auto flex items-center justify-center shadow-lg shadow-red-500/50 animate-pulse">
                    <Ghost className="h-16 w-16 text-white" />
                  </div>
                  <div className="max-w-2xl mx-auto space-y-4">
                    <h3 className="text-2xl font-bold text-red-400">
                      👻 GHOST CARD! 👻
                    </h3>
                    <Card className="bg-red-900/20 border-red-500/50">
                      <CardContent className="p-6">
                        <p className="text-lg text-white font-medium">
                          {challengePrompt}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  <Button
                    onClick={nextTurn}
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-400 hover:to-pink-400 px-8 py-3"
                  >
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Challenge Complete - Next Turn
                  </Button>
                </div>
              )}

              {!isDrawing &&
                !drawnCard &&
                currentPlayer?.id !== players[currentPlayerIndex]?.id && (
                  <div className="text-center space-y-4">
                    <p className="text-xl text-gray-300">
                      Waiting for{" "}
                      <span className="text-cyan-400 font-bold">
                        {players[currentPlayerIndex]?.nickname}
                      </span>{" "}
                      to draw a card...
                    </p>
                    <div className="w-24 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mx-auto animate-pulse" />
                  </div>
                )}
            </div>

            {/* Game controls */}
            <div className="flex justify-center">
              <Button
                onClick={resetGame}
                variant="outline"
                className="border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                End Game
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
