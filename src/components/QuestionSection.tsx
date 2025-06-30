import type { Question } from "@/integrations/axios/games/game.schema";
import { Card, CardContent } from "./ui/card";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "./ui/button";

interface QuestionSectionProps {
  questions: Question[];
  loading: boolean;
  selectQuestion: (question: number) => void;
}

export default function QuestionSection({
  questions,
  selectQuestion,
  loading,
}: QuestionSectionProps) {
  const [selected, setSelected] = useState<number | null>(null);

  function handleSubmit() {
    if (!selected) return;
    selectQuestion(selected);
  }

  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4  mb-4 md:mb-8">
        {questions.map((question) => (
          <Card
            key={question.id}
            className={cn(
              "bg-gray-900 border-gray-700 hover:border-cyan-400 transition-all duration-300 cursor-pointer hover:shadow-lg hover:shadow-cyan-400/25 hover:scale-105",
              selected === question.id &&
                "border-yellow-500 border-2 hover:border-yellow-500 hover:scale-none",
            )}
            onClick={() => setSelected(question.id)}
          >
            <CardContent className="p-6 text-center">
              <div
                className={`inline-block px-2 py-1 rounded text-xs font-bold mb-3 ${
                  question.level === "normal" ? "bg-green-600" : "bg-red-600"
                }`}
              >
                {question.level.toUpperCase()}
              </div>
              <p className="text-white">{question.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Button
        onClick={handleSubmit}
        disabled={!selected || loading}
        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-green-500/25 border border-green-400 transition-all duration-300 hover:shadow-green-400/50 hover:scale-105 disabled:opacity-50"
      >
        確認
      </Button>
    </div>
  );
}
