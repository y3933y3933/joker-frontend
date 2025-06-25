import type { Level } from "@/types";
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { useState } from "react";

interface AnswerSectionProps {
  question: string;
  options: string[];
  level: Level;

  submitAnswer: (answer: string) => void;
}

export default function AnswerSection({
  question,
  options,
  level,

  submitAnswer,
}: AnswerSectionProps) {
  const [answer, setAnswer] = useState("");

  return (
    <>
      <Card className="p-8 bg-black/50 border-2 border-purple-400/50 w-full gap-0">
        <div
          className={`text-xs font-bold px-3 py-1 rounded-full w-fit mb-4 ${
            level === "easy"
              ? "bg-green-600 text-green-100"
              : level === "normal"
                ? "bg-yellow-600 text-yellow-100"
                : "bg-red-600 text-red-100"
          }`}
        >
          {level.toUpperCase()}
        </div>
        <p className="text-white text-xl leading-relaxed mb-8 text-left">
          {question}
        </p>

        <div className="space-y-4">
          <h4 className="text-lg font-medium text-cyan-400 mb-4 text-left">
            SELECT A PLAYER:
          </h4>
          <div className="space-y-3 grid grid-cols-1 md:grid-cols-3">
            {options.map((player) => (
              <label
                key={player}
                className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                  answer === player
                    ? "border-cyan-400 bg-cyan-400/10 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    : "border-gray-600 hover:border-cyan-400/50 hover:bg-cyan-400/5"
                }`}
              >
                <input
                  type="radio"
                  name="selectedPlayer"
                  value={player}
                  checked={answer === player}
                  onChange={(e) => setAnswer(e.target.value)}
                  className="sr-only"
                />
                <div
                  className={`w-5 h-5 rounded-full border-2 mr-4 flex items-center justify-center ${
                    answer === player
                      ? "border-cyan-400 bg-cyan-400"
                      : "border-gray-400"
                  }`}
                >
                  {answer === player && (
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                  )}
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-white font-medium text-lg">
                    {player}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </Card>

      <Button
        disabled={!answer.trim()}
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-bold disabled:opacity-50"
        onClick={() => submitAnswer(answer)}
      >
        Submit Answer
      </Button>
    </>
  );
}
