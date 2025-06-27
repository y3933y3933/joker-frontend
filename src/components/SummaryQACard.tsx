import { Card } from "./ui/card";

interface SummaryQACardProps {
  question: string;
  answer: string;
}

export default function SummaryQACard({
  question,
  answer,
}: SummaryQACardProps) {
  return (
    <Card className="p-6 bg-black/80 border-2 border-magenta-400/50 shadow-[0_0_15px_rgba(236,72,153,0.3)] hover:scale-105 transition-transform duration-300 neon-border">
      <div className="space-y-4">
        {/* <div className="text-3xl text-center animate-pulse">
                  {qa.emoji}
                </div> */}
        <div>
          <h4 className="font-bold text-cyan-300 mb-2 font-mono">題目:</h4>
          <p className="text-white text-sm italic font-mono">"{question}"</p>
        </div>
        <div>
          <h4 className="font-bold text-cyan-300 mb-2 font-mono">回答:</h4>
          <p className="text-white text-sm font-mono">"{answer}"</p>
        </div>
      </div>
    </Card>
  );
}
