import { Card } from "./ui/card";

interface RoundSummaryCardProps {
  title: string;
  content: string | number;
}

export default function RoundSummaryCard({
  title,
  content,
}: RoundSummaryCardProps) {
  return (
    <Card className="p-6 bg-black/80 border-2 border-cyan-400/50 shadow-[0_0_30px_rgba(34,211,238,0.3)] neon-border">
      <div className="text-center space-y-4">
        <h3 className="text-2xl font-bold text-cyan-400 font-mono">{title}</h3>
        <div className="text-6xl font-bold text-white animate-pulse font-mono">
          {content}
        </div>
      </div>
    </Card>
  );
}
