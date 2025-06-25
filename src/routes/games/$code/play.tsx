import AnswerSection from "@/components/AnswerSection";
import DrawCardSection from "@/components/DrawCardSection";
import QuestionSection from "@/components/QuestionSection";
import SideBarInPlay from "@/components/SideBarInPlay";
import useRoundPlayer from "@/hooks/useRoundPlayer";
import useGetQuestions from "@/integrations/tanstack-query/games/useGetQuestions";
import useSubmitQuestion from "@/integrations/tanstack-query/games/useSubmitQuestion";
import { useGamePlayers } from "@/integrations/zustand/store/game.store";
import {
  useRoundID,
  useRoundQuestion,
  useRoundStatus,
} from "@/integrations/zustand/store/round.store";
import { useUserRole } from "@/integrations/zustand/store/user.store";
import type { RoundStatus } from "@/types";
import { createFileRoute } from "@tanstack/react-router";

const TitleTextMap: Record<RoundStatus, string> = {
  question: "pick a question",
  answer: "answer this question",
  draw: "draw a card",
  done: "next",
};

export const Route = createFileRoute("/games/$code/play")({
  component: RouteComponent,
});

function RouteComponent() {
  const { code } = Route.useParams();
  const players = useGamePlayers();
  const role = useUserRole();
  const roundStatus = useRoundStatus();
  const roundID = useRoundID();
  const question = useRoundQuestion();
  const { currentPlayerID, currentPlayerName } = useRoundPlayer();
  const { mutateAsync: submitQuestion } = useSubmitQuestion();

  const { data: questions } = useGetQuestions(code, roundID);

  async function handlerSelectQuestion(questionId: number) {
    if (!code || !roundID) return;
    await submitQuestion({ code, roundId: roundID, questionId });
  }

  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col h-full animate-in fade-in duration-500">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900/30 via-black/50 to-cyan-900/30 backdrop-blur-sm border-b border-cyan-500/20 p-4">
          <div className="flex items-center justify-center gap-2">
            <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent ">
              GAME IN PROGRESS
            </h1>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col lg:flex-row">
          {/* Side Player List */}
          <SideBarInPlay
            players={players}
            role={role}
            roundStatus={roundStatus}
            currentPlayer={{
              id: currentPlayerID,
              nickname: currentPlayerName,
            }}
          />

          {/* Center Content Area */}
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-8">
            <div className="text-center space-y-6 w-full max-w-4xl">
              <h2 className="text-3xl font-bold text-cyan-400">
                {currentPlayerName}, {TitleTextMap[roundStatus]}
              </h2>
              {/* Question */}
              {roundStatus === "question" && role === "question" && (
                <QuestionSection
                  questions={questions || []}
                  selectQuestion={handlerSelectQuestion}
                />
              )}

              {/* Answer  */}
              {roundStatus === "answer" && role === "answer" && question && (
                <AnswerSection question={question} />
              )}

              {/* Draw  */}
              {roundStatus === "draw" && role === "answer" && (
                <DrawCardSection />
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        {/* <PlayFooter /> */}
      </div>
    </div>
  );
}
