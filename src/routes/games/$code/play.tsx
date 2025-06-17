import { getCurrentRound } from "@/api/rounds/rounds";
import type { GetCurrentRoundResponse } from "@/api/rounds/rounds.type";
import PlayerListInPlay from "@/components/PlayerListInPlay";
import QuestionSection from "@/components/QuestionSection";
import { Button } from "@/components/ui/button";
import WaitForDraw from "@/features/components/WaitForDraw";
import { useGamePlayers } from "@/features/games/store/game";
import { usePlayerID } from "@/features/games/store/player";
import { useApiRequest } from "@/hooks/useApiRequest";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { ArrowRight, Crown, Ghost, Users, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import { drawCard } from "@/api/games/games";
import {
  useDrawResult,
  useRound,
  useRoundActions,
  useRoundQuestion,
} from "@/features/games/store/round";

export const Route = createFileRoute("/games/$code/play")({
  component: RouteComponent,
});

function RouteComponent() {
  const { code } = useParams({ strict: false });
  const playerId = usePlayerID();
  const players = useGamePlayers();
  const round = useRound();
  const drawResult = useDrawResult();
  const question = useRoundQuestion();
  const isMyTurn = round?.currentPlayerId === playerId;
  const [isDrawing, setIsDrawing] = useState(false);

  const { setRound, setQuestion } = useRoundActions();

  const drawCardRequest = useApiRequest<
    { code: string; roundId: number },
    void
  >({
    requestFn: drawCard,
  });

  const roundRequest = useApiRequest<
    { code: string; playerId: number },
    GetCurrentRoundResponse
  >({
    requestFn: ({ code, playerId }) => getCurrentRound({ code, playerId }),
  });

  useEffect(() => {
    if (!code || playerId == null) return;

    const fetchRound = async () => {
      const round = await roundRequest.execute({ code, playerId });
      if (round) {
        setRound(round);
        setQuestion(round.question);
      }
    };

    fetchRound();
  }, [code, playerId]);

  async function handleDraw() {
    if (!round || !code) return;
    setIsDrawing(true);
    await drawCardRequest.execute({ code, roundId: round.roundId });
    setTimeout(() => {
      setIsDrawing(false);
    }, 2000);
  }

  const nextTurn = () => {
    // setDrawnCard(null);
  };

  const resetGame = () => {
    // setDrawnCard(null);
  };

  const currentPlayerNickname = players.find(
    (player) => player.id === round?.currentPlayerId,
  )?.nickname;

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/30 via-black/50 to-cyan-900/30 backdrop-blur-sm border-b border-cyan-500/20 p-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              GAME IN PROGRESS
            </h1>
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Side Player List */}
          <div className="lg:w-80 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm border-r border-gray-700/50 p-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-5 w-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-cyan-400">
                  PLAYERS ({players.length})
                </h2>
              </div>

              {round?.currentPlayerId && (
                <div className="space-y-3">
                  <PlayerListInPlay
                    currentRoundPlayerId={round.currentPlayerId}
                  />
                </div>
              )}

              {/* Turn indicator */}
              <div className="mt-6 p-3 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl border border-purple-500/30">
                <div className="text-center">
                  <div className="text-sm text-gray-400 mb-1">Current Turn</div>
                  <div className="text-lg font-bold bg-gradient-to-r from-pink-400 to-cyan-400 bg-clip-text text-transparent">
                    {currentPlayerNickname}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
            {/* Question/Challenge Area */}
            {isMyTurn && drawResult === null && (
              <QuestionSection>{question}</QuestionSection>
            )}

            {/* Card Draw Section */}
            <div className="relative">
              {!isMyTurn && drawResult === null && currentPlayerNickname && (
                <div className="text-center space-y-6 animate-in fade-in duration-500">
                  <WaitForDraw currentPlayerNickname={currentPlayerNickname} />
                </div>
              )}

              {isDrawing && (
                <div className="text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="relative">
                    <div className="w-40 h-56 md:w-48 md:h-64 bg-gradient-to-br from-purple-600 to-pink-600 rounded-2xl mx-auto animate-bounce shadow-2xl shadow-purple-500/50 border-2 border-purple-400 flex items-center justify-center">
                      <div className="text-6xl md:text-7xl animate-spin">
                        🎴
                      </div>
                    </div>
                    <div className="absolute -inset-6 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-purple-600/30 rounded-3xl blur-2xl animate-pulse" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
                      抽牌中...
                    </p>
                    <div className="w-32 h-1 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 mx-auto rounded-full animate-pulse" />
                  </div>
                </div>
              )}

              {!isDrawing && drawResult === "safe" && (
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

              {!isDrawing && drawResult === "joker" && (
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
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            {isMyTurn && drawResult === null && (
              <Button
                onClick={handleDraw}
                className="w-full sm:w-auto bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 hover:from-purple-500 hover:via-pink-500 hover:to-cyan-500 text-white font-bold py-4 px-12 rounded-xl shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 transition-all duration-300 transform hover:scale-105 text-xl border border-purple-400/50"
              >
                <Zap className="mr-3 h-6 w-6 animate-pulse" />
                Draw Card
              </Button>
            )}

            {isMyTurn && drawResult && (
              <Button
                onClick={nextTurn}
                className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Next Turn
              </Button>
            )}

            {/* {drawnCard === "ghost" && (
              <Button
                onClick={nextTurn}
                className="w-full sm:w-auto bg-gradient-to-r from-red-500 via-pink-500 to-purple-500 hover:from-red-400 hover:via-pink-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-xl shadow-lg shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 transform hover:scale-105"
              >
                <ArrowRight className="mr-2 h-5 w-5" />
                Challenge Complete - Next Round
              </Button>
            )} */}

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
