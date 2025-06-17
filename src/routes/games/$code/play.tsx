import { Button } from "@/components/ui/button";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, Crown, Ghost, Zap } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/games/$code/play")({
  component: RouteComponent,
});

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

function RouteComponent() {
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
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">
        {/* Top Players Section */}
        <div className="bg-gradient-to-r from-purple-900/30 via-black/50 to-cyan-900/30 backdrop-blur-sm border-b border-cyan-500/20 p-4">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <span className="text-cyan-400 font-bold text-lg">
              GAME IN PROGRESS
            </span>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>

          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {players.map((player, index) => (
              <div
                key={player.id}
                className={`relative flex flex-col items-center p-3 rounded-xl border transition-all duration-500 ${
                  index === currentPlayerIndex
                    ? "border-cyan-400 bg-gradient-to-b from-cyan-400/20 to-transparent shadow-lg shadow-cyan-400/30 scale-110"
                    : "border-gray-700/50 bg-gray-900/30 hover:border-gray-600"
                }`}
              >
                {/* Current player indicator */}
                {index === currentPlayerIndex && (
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-cyan-400 rounded-full animate-ping" />
                )}

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-black font-bold text-lg border-2 transition-all duration-300 ${
                    index === currentPlayerIndex
                      ? "border-cyan-400 shadow-lg shadow-cyan-400/50"
                      : "border-gray-600"
                  }`}
                  style={{ backgroundColor: player.avatar }}
                >
                  {player.nickname.charAt(0).toUpperCase()}
                </div>

                <span
                  className={`text-sm font-medium mt-2 text-center ${
                    index === currentPlayerIndex
                      ? "text-cyan-400"
                      : "text-gray-300"
                  }`}
                >
                  {player.nickname}
                </span>

                {player.isHost && (
                  <Crown className="h-3 w-3 text-yellow-400 mt-1" />
                )}

                {index === currentPlayerIndex && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2">
                    <div className="w-8 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full animate-pulse" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Central Game Area */}
        <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
          {/* Turn Indicator */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-3">
              <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" />
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-pink-400 via-cyan-400 to-yellow-400 bg-clip-text text-transparent">
                {players[currentPlayerIndex]?.nickname}'s Turn
              </h2>
              <div
                className="w-3 h-3 bg-pink-400 rounded-full animate-bounce"
                style={{ animationDelay: "0.2s" }}
              />
            </div>
          </div>

          {/* Question/Challenge Area */}
          {challengePrompt && drawnCard === "ghost" && (
            <div className="w-full max-w-3xl animate-in zoom-in duration-700">
              <div className="bg-gradient-to-r from-red-900/50 via-purple-900/50 to-red-900/50 backdrop-blur-sm border border-red-500/50 rounded-2xl p-6 shadow-2xl shadow-red-500/20">
                <div className="text-center space-y-4">
                  <div className="flex items-center justify-center gap-2">
                    <Ghost className="h-8 w-8 text-red-400 animate-bounce" />
                    <h3 className="text-2xl md:text-3xl font-bold text-red-400">
                      GHOST CARD CHALLENGE
                    </h3>
                    <Ghost
                      className="h-8 w-8 text-red-400 animate-bounce"
                      style={{ animationDelay: "0.3s" }}
                    />
                  </div>
                  <div className="w-full h-px bg-gradient-to-r from-transparent via-red-400 to-transparent" />
                  <p className="text-lg md:text-xl text-white font-medium leading-relaxed">
                    {challengePrompt}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Card Draw Section */}
          <div className="relative">
            {!drawnCard && !isDrawing && (
              <div className="text-center space-y-6 animate-in fade-in duration-500">
                <div className="relative">
                  <div className="w-40 h-56 md:w-48 md:h-64 bg-gradient-to-br from-purple-600 via-pink-600 to-cyan-600 rounded-2xl mx-auto shadow-2xl shadow-purple-500/30 border border-purple-400/30 flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                    <div className="text-6xl md:text-7xl">🎴</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                  </div>
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-cyan-600/20 rounded-3xl blur-xl animate-pulse" />
                </div>

                {currentPlayer?.id !== players[currentPlayerIndex]?.id && (
                  <div className="text-center space-y-3">
                    <p className="text-xl text-gray-300">
                      Waiting for{" "}
                      <span className="text-cyan-400 font-bold">
                        {players[currentPlayerIndex]?.nickname}
                      </span>{" "}
                      to draw...
                    </p>
                    <div className="flex justify-center space-x-1">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-bounce" />
                      <div
                        className="w-2 h-2 bg-pink-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.1s" }}
                      />
                      <div
                        className="w-2 h-2 bg-yellow-400 rounded-full animate-bounce"
                        style={{ animationDelay: "0.2s" }}
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {isDrawing && (
              <div className="text-center space-y-6 animate-in zoom-in duration-500">
                <div className="relative">
                  <div className="w-40 h-56 md:w-48 md:h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mx-auto animate-bounce shadow-2xl shadow-purple-500/50 border-2 border-purple-400 flex items-center justify-center">
                    <div className="text-6xl md:text-7xl animate-spin">���</div>
                  </div>
                  <div className="absolute -inset-6 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-purple-600/30 rounded-3xl blur-2xl animate-pulse" />
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                    Drawing Card...
                  </p>
                  <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto rounded-full animate-pulse" />
                </div>
              </div>
            )}

            {drawnCard === "normal" && (
              <div className="text-center space-y-6 animate-in zoom-in duration-700">
                <div className="relative">
                  <div className="w-40 h-56 md:w-48 md:h-64 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-2xl mx-auto shadow-2xl shadow-blue-500/50 border-2 border-cyan-400 flex items-center justify-center">
                    <div className="text-6xl md:text-7xl">🃏</div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-2xl" />
                  </div>
                  <div className="absolute -inset-6 bg-gradient-to-r from-blue-600/30 via-cyan-600/30 to-blue-600/30 rounded-3xl blur-2xl animate-pulse" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl font-bold text-green-400">
                    Safe Card!
                  </h3>
                  <p className="text-lg text-gray-300">
                    Nothing happens this turn.
                  </p>
                </div>
              </div>
            )}

            {drawnCard === "ghost" && (
              <div className="text-center space-y-6 animate-in zoom-in duration-700">
                <div className="relative">
                  <div className="w-40 h-56 md:w-48 md:h-64 bg-gradient-to-br from-red-600 via-purple-600 to-red-600 rounded-2xl mx-auto shadow-2xl shadow-red-500/50 border-2 border-red-400 flex items-center justify-center animate-pulse">
                    <Ghost className="h-20 w-20 md:h-24 md:w-24 text-white animate-bounce" />
                    <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl" />
                  </div>
                  <div className="absolute -inset-6 bg-gradient-to-r from-red-600/40 via-purple-600/40 to-red-600/40 rounded-3xl blur-2xl animate-pulse" />
                </div>
                <div className="space-y-3">
                  <h3 className="text-2xl md:text-3xl font-bold text-red-400 animate-pulse">
                    👻 GHOST CARD! 👻
                  </h3>
                  <p className="text-lg text-gray-300">
                    Challenge activated for all players!
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Action Area */}
        <div className="bg-gradient-to-r from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            {!drawnCard &&
              !isDrawing &&
              currentPlayer?.id === players[currentPlayerIndex]?.id && (
                <Button
                  onClick={drawCard}
                  className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-xl border border-purple-400/50"
                >
                  <Zap className="mr-3 h-6 w-6 animate-pulse" />
                  Draw Card
                </Button>
              )}

            {drawnCard === "normal" && (
              <Button
                onClick={nextTurn}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Next Turn
              </Button>
            )}

            {drawnCard === "ghost" && (
              <Button
                onClick={nextTurn}
                className="w-full sm:w-auto bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-400 hover:via-pink-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Challenge Complete - Next Round
              </Button>
            )}

            <Button
              onClick={resetGame}
              variant="outline"
              className="w-full sm:w-auto border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300"
            >
              End Game
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
