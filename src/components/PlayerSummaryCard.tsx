import { Card } from "./ui/card";

interface PlayerSummaryCardProps {
  nickname: string;
  questionsAsked: number;
  questionsAnswered: number;
  jokerCardsDrawn: number;
}

export default function PlayerSummaryCard({
  nickname,
  questionsAnswered,
  questionsAsked,
  jokerCardsDrawn,
}: PlayerSummaryCardProps) {
  return (
    <Card
      // key={player.playerId}
      className="p-4 bg-black/80 border-2 transition-all duration-300 hover:scale-105"
      // className={`p-4 bg-black/80 border-2 transition-all duration-300 hover:scale-105 ${
      //   player.isCurrentPlayer
      //     ? "border-yellow-400 shadow-[0_0_20px_rgba(255,255,0,0.5)] neon-border"
      //     : "border-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
      // }`}
    >
      <div className="text-center space-y-3">
        {/* <div className="text-4xl animate-pulse">{player.avatar}</div> */}
        <h3 className="font-bold text-white font-mono">{nickname}</h3>

        <div className="space-y-2 text-sm font-mono">
          <div className="flex justify-between items-center">
            <span className="text-gray-300">出題次數:</span>
            <span className="text-cyan-400 font-bold">{questionsAsked}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">回答次數:</span>
            <span className="text-green-400 font-bold">
              {questionsAnswered}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-300">抽到鬼牌:</span>
            <span className="text-red-400 font-bold">{jokerCardsDrawn}</span>
          </div>
        </div>
      </div>
    </Card>
  );
}
