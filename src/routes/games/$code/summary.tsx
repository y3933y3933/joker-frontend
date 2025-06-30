import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getGameSummary } from "@/integrations/axios/games/games";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/games/$code/summary")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getGameSummary(params.code);
  },
});

function RouteComponent() {
  const {
    totalRounds,
    jokerCards,
    players: playerStats,
  } = Route.useLoaderData();

  const [animatedStats, setAnimatedStats] = useState({
    totalRounds: 0,
    jokerCards: 0,
  });

  // Animate stats on mount
  useEffect(() => {
    const animateNumbers = () => {
      let roundsCount = 0;
      let jokerCount = 0;

      const interval = setInterval(() => {
        if (roundsCount < totalRounds) {
          roundsCount++;
          setAnimatedStats((prev) => ({ ...prev, totalRounds: roundsCount }));
        }
        if (jokerCount < jokerCards) {
          jokerCount++;
          setAnimatedStats((prev) => ({ ...prev, jokerCards: jokerCount }));
        }

        if (roundsCount >= totalRounds && jokerCount >= jokerCards) {
          clearInterval(interval);
        }
      }, 150);
    };

    setTimeout(animateNumbers, 500);
  }, [totalRounds, jokerCards]);

  // Calculate achievements
  const luckiestPlayer = playerStats.reduce((prev, current) =>
    prev.jokerCardsDrawn < current.jokerCardsDrawn ? prev : current,
  );
  const unluckiestPlayer = playerStats.reduce((prev, current) =>
    prev.jokerCardsDrawn > current.jokerCardsDrawn ? prev : current,
  );

  return (
    <div className="flex-1 flex flex-col items-center justify-start space-y-8 max-w-5xl mx-auto py-8">
      {/* Simple Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          GAME COMPLETE
        </h1>
        <div className="h-1 w-48 mx-auto bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full" />
      </div>

      {/* Game Summary Stats */}
      <div className="grid grid-cols-2 gap-6 w-full max-w-2xl mb-8">
        <Card className="p-6 bg-black/80 border-2 border-cyan-400/50 shadow-[0_0_20px_rgba(34,211,238,0.3)] text-center">
          <h3 className="text-lg font-bold text-cyan-400 mb-2">Total Rounds</h3>
          <div className="text-4xl font-bold text-white">
            {animatedStats.totalRounds}
          </div>
        </Card>

        <Card className="p-6 bg-black/80 border-2 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-center">
          <h3 className="text-lg font-bold text-red-400 mb-2">
            Secrets Revealed
          </h3>
          <div className="text-4xl font-bold text-white">
            {animatedStats.jokerCards}
          </div>
        </Card>
      </div>

      {/* Player Performance Chart */}
      <Card className="p-6 bg-black/80 border-2 border-purple-400/50 shadow-[0_0_20px_rgba(168,85,247,0.3)] w-full">
        <h2 className="text-2xl font-bold text-purple-400 mb-6 text-center">
          Player Performance
        </h2>

        {/* Joker Cards Chart */}
        <div className="mb-8">
          <h3 className="text-lg font-bold text-red-400 mb-4">
            Joker Cards Drawn
          </h3>
          <div className="space-y-3">
            {playerStats.map((player) => (
              <div key={player.id} className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 w-32">
                  {/* <span className="text-xl">{player.avatar}</span> */}
                  {/* ${player.isCurrentPlayer ? "text-yellow-400" : "text-white"} */}
                  <span className={`text-sm font-medium text-yellow-400`}>
                    {player.nickname}
                  </span>
                </div>
                <div className="flex-1 bg-gray-800 rounded-full h-6 relative overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${(player.jokerCardsDrawn / 3) * 100}%` }}
                  />
                  <span className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                    {player.jokerCardsDrawn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Simple Achievements */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl">
        <Card className="p-6 bg-black/80 border-2 border-green-400/50 shadow-[0_0_20px_rgba(34,197,94,0.3)] text-center">
          <div className="text-4xl mb-3">🍀</div>
          <h3 className="text-xl font-bold text-green-400 mb-2">
            Luckiest Player
          </h3>
          <div className="text-2xl font-bold text-white mb-1">
            {luckiestPlayer.nickname}
          </div>
          <div className="text-green-300 text-sm">
            Only {luckiestPlayer.jokerCardsDrawn} joker cards!
          </div>
        </Card>

        <Card className="p-6 bg-black/80 border-2 border-red-400/50 shadow-[0_0_20px_rgba(239,68,68,0.3)] text-center">
          <div className="text-4xl mb-3">💀</div>
          <h3 className="text-xl font-bold text-red-400 mb-2">Most Exposed</h3>
          <div className="text-2xl font-bold text-white mb-1">
            {unluckiestPlayer.nickname}
          </div>
          <div className="text-red-300 text-sm">
            {unluckiestPlayer.jokerCardsDrawn} secrets revealed!
          </div>
        </Card>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full max-w-2xl mt-8">
        <Button
          // onClick={onPlayAgain}
          className="flex-1 py-4 text-lg bg-gradient-to-r from-green-500 to-cyan-500 hover:from-green-400 hover:to-cyan-400 border-2 border-green-400 shadow-[0_0_20px_rgba(34,197,94,0.5)] hover:shadow-[0_0_30px_rgba(34,197,94,0.8)] transition-all duration-300 transform hover:scale-105"
        >
          🔄 Play Again
        </Button>

        <Button
          // onClick={onBackToLanding}
          className="flex-1 py-4 text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 border-2 border-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.5)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] transition-all duration-300 transform hover:scale-105"
        >
          🏠 Back to Menu
        </Button>

        <Button
          onClick={() => {
            // Mock share functionality
            if (navigator.share) {
              navigator.share({
                title: "Joker Game Results",
                text: `Just played Joker Game! ${jokerCards} secrets were revealed! 🃏`,
                url: window.location.href,
              });
            } else {
              // Fallback for browsers that don't support Web Share API
              navigator.clipboard.writeText(
                `Just played Joker Game! ${jokerCards} secrets were revealed! 🃏 ${window.location.href}`,
              );
              alert("Results copied to clipboard! 📋");
            }
          }}
          className="flex-1 py-4 text-lg bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.5)] hover:shadow-[0_0_30px_rgba(255,255,0,0.8)] transition-all duration-300 transform hover:scale-105"
        >
          📤 Share Results
        </Button>
      </div>

      {/* Simple Footer */}
      <div className="text-center mt-8">
        <p className="text-gray-400">Thanks for playing! 🎮</p>
      </div>
    </div>
  );
}
