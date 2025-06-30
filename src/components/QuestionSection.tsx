import type { Question } from "@/integrations/axios/games/game.schema";
import { Card, CardContent } from "./ui/card";

interface QuestionSectionProps {
  questions: Question[];
  selectQuestion: (question: number) => void;
}

export default function QuestionSection({
  questions,
  selectQuestion,
}: QuestionSectionProps) {
  return (
    <div className="grid md:grid-cols-3 gap-4">
      {questions.map((question) => (
        <Card
          key={question.id}
          className="bg-gray-900 border-gray-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-400/25 hover:scale-105"
          onClick={() => selectQuestion(question.id)}
        >
          <CardContent className="p-6 text-center">
            <div
              className={`inline-block px-2 py-1 rounded text-xs font-bold mb-3 ${
                question.level === "normal" ? "bg-neon-cyan" : "bg-red-400"
              }`}
            >
              {question.level.toUpperCase()}
            </div>
            <p className="text-white">{question.content}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
