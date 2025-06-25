import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";

interface AnswerSectionProps {
  question: string;
}

export default function AnswerSection({ question }: AnswerSectionProps) {
  return (
    <Card className="bg-gray-900 border-purple-500">
      <CardContent className="p-6">
        <p className="text-xl text-white mb-4">{question}</p>

        {/* <Input
          value={gameRound.answer}
          onChange={(e) =>
            setGameRound((prev) => ({ ...prev, answer: e.target.value }))
          }
          placeholder="Type your answer..."
          className="bg-gray-800 border-purple-400 text-white placeholder-gray-400 mb-4"
        /> */}
        <Button
          //   disabled={!gameRound.answer.trim()}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold disabled:opacity-50"
        >
          Submit Answer
        </Button>
      </CardContent>
    </Card>
  );
}
