import { Card } from "./ui/card";

interface SummaryAchievementCardProps {
  icon: string;
  title: string;
  playerName: string;
  content: string;
}

export default function SummaryAchievementCard({
  icon,
  title,
  playerName,
  content,
}: SummaryAchievementCardProps) {
  return (
    <Card className="p-6 bg-black/80 border-2 border-yellow-400/50 shadow-[0_0_20px_rgba(255,255,0,0.3)] text-center neon-border">
      <div className="space-y-3">
        <div className="text-4xl animate-bounce">{icon}</div>
        <h3 className="text-xl font-bold text-yellow-300 font-mono">{title}</h3>
        <div className="text-2xl font-bold text-white font-mono">
          {playerName}
        </div>
        <div className="text-yellow-200 text-sm font-mono">{content}</div>
      </div>
    </Card>
  );
}
