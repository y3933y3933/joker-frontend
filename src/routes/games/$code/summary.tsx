import PlayerSummaryCard from "@/components/PlayerSummaryCard";
import RoundSummaryCard from "@/components/RoundSummaryCard";
import SummaryAchievementCard from "@/components/SummaryAchievementCard";
import SummaryQACard from "@/components/SummaryQACard";
import { Button } from "@/components/ui/button";
import { getGameSummary } from "@/integrations/axios/games/games";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/games/$code/summary")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getGameSummary(params.code);
  },
});

function RouteComponent() {
  const { game, players, highlights } = Route.useLoaderData();

  // function handleShare() {

  //   if (navigator.share) {
  //     navigator.share({
  //       title: "Joker Game Neural Analysis",
  //       text: `Just completed a cyberpunk Joker Game session! ${game.totalJokerCards} secrets were decrypted! 🃏⚡`,
  //       url: window.location.href,
  //     });
  //   } else {
  //     navigator.clipboard.writeText(
  //       `Just completed a cyberpunk Joker Game session! ${game.totalJokerCards} secrets were decrypted! 🃏⚡ ${window.location.href}`,
  //     );
  //     alert("Neural data copied to clipboard! 📋");
  //   }
  // }
  return (
    <div className="flex-1 flex flex-col items-center justify-start space-y-8 max-w-6xl mx-auto py-8 relative overflow-hidden cyber-grid">
      {/*  Header */}
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 bg-clip-text text-transparent neon-flicker">
          遊戲結束
        </h1>
        <div className="h-2 w-96 mx-auto bg-gradient-to-r from-cyan-400 via-magenta-500 to-yellow-400 rounded-full animate-pulse shadow-[0_0_20px_rgba(34,211,238,0.5)]" />
      </div>

      {/* Cyberpunk Stats Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mb-8">
        <RoundSummaryCard title="總回合數" content={game.totalRounds} />
        <RoundSummaryCard
          title="鬼牌被抽出"
          content={`🃏 ${game.totalJokerCards}`}
        />
      </div>

      {/* Cyberpunk Player Performance Grid */}
      <div className="w-full max-w-5xl mb-8">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-cyan-400 to-magenta-400 bg-clip-text text-transparent font-mono">
          {">"} 玩家行為記錄
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {players.map((player) => (
            <PlayerSummaryCard key={player.playerId} {...player} />
          ))}
        </div>
      </div>

      {/* Cyberpunk Achievement Badges */}
      <div className="w-full max-w-4xl mb-8">
        <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-yellow-400 to-cyan-400 bg-clip-text text-transparent font-mono">
          {">"} 成就解鎖
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <SummaryAchievementCard
            icon="👑"
            title="幸運之神"
            playerName={highlights.luckiestPlayer.nickname}
            content={`JOKERS: ${highlights.luckiestPlayer.jokerCardsDrawn}`}
          />

          <SummaryAchievementCard
            icon="💀"
            title="倒霉鬼"
            playerName={highlights.unluckiestPlayer.nickname}
            content={`JOKERS: ${highlights.unluckiestPlayer.jokerCardsDrawn}`}
          />
        </div>
      </div>

      {/* Cyberpunk Q&A Section */}
      {highlights.bestQAs && highlights.bestQAs.length > 0 && (
        <div className="w-full max-w-5xl mb-8">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-magenta-400 to-cyan-400 bg-clip-text text-transparent font-mono">
            {">"} 問答回顧
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {highlights.bestQAs.map((qa, index) => (
              <SummaryQACard
                key={`${qa.question}_${index}`}
                question={qa.question}
                answer={qa.answer}
              />
            ))}
          </div>
        </div>
      )}

      {/* Cyberpunk CTA Buttons */}
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 w-full max-w-2xl">
        <Button
          // onClick={onPlayAgain}
          className="flex-1 py-6 text-xl font-mono bg-gradient-to-r from-cyan-500 to-magenta-600 hover:from-cyan-400 hover:to-magenta-500 border-2 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_rgba(34,211,238,0.8)] transition-all duration-300 transform hover:scale-105"
          asChild
        >
          <Link to="/create">🔄 再來一局</Link>
        </Button>

        <Button
          asChild
          className="flex-1 py-6 text-xl font-mono bg-gradient-to-r from-magenta-500 to-yellow-500 hover:from-magenta-400 hover:to-yellow-400 border-2 border-magenta-400 shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] transition-all duration-300 transform hover:scale-105"
        >
          <Link to="/">🏠 回到大廳</Link>
        </Button>

        {/* <Button
          onClick={handleShare}
          className="flex-1 py-6 text-xl font-mono bg-gradient-to-r from-yellow-500 to-cyan-500 hover:from-yellow-400 hover:to-cyan-400 border-2 border-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.5)] hover:shadow-[0_0_30px_rgba(255,255,0,0.8)] transition-all duration-300 transform hover:scale-105"
        >
          📡 分享
        </Button> */}
      </div>
    </div>
  );
}
