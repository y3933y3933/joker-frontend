import AnswerSection from "@/components/AnswerSection";
import DrawCardSection from "@/components/DrawCardSection";
import EndGameButton from "@/components/EndGameButton";
import JokerCard from "@/components/JokerCard";
import QuestionSection from "@/components/QuestionSection";
import SafeCard from "@/components/SafeCard";
import SideBarInPlay from "@/components/SideBarInPlay";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCards } from "@/hooks/useCards";
import useRoundPlayer from "@/hooks/useRoundPlayer";
import useDrawCard from "@/integrations/tanstack-query/games/useDrawCard";
import useEndGame from "@/integrations/tanstack-query/games/useEndGame";
import useGetQuestions from "@/integrations/tanstack-query/games/useGetQuestions";
import useNextRound from "@/integrations/tanstack-query/games/useNextRound";
import useSubmitAnswer from "@/integrations/tanstack-query/games/useSubmitAnswer";
import useSubmitQuestion from "@/integrations/tanstack-query/games/useSubmitQuestion";
import { useGamePlayers } from "@/integrations/zustand/store/game.store";
import {
  useRoundAnswer,
  useRoundID,
  useRoundQuestion,
  useRoundStatus,
} from "@/integrations/zustand/store/round.store";
import {
  useUserID,
  useUserIsHost,
  useUserRole,
} from "@/integrations/zustand/store/user.store";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo } from "react";

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
  const userID = useUserID();
  const playerID = useUserID();
  const { currentPlayerID, currentPlayerName } = useRoundPlayer();
  const answer = useRoundAnswer();
  const isHost = useUserIsHost();
  const { mutateAsync: submitQuestion } = useSubmitQuestion();
  const { mutateAsync: submitAnswer } = useSubmitAnswer();
  const { mutateAsync: nextRound, isLoading: nextRoundLoading } =
    useNextRound();
  const { mutateAsync: endGame, isLoading: endGameLoading } = useEndGame();

  const { data: questions } = useGetQuestions(code, roundID);
  const { mutateAsync: drawCard } = useDrawCard();

  const {
    flippingCard,
    flippedCards,
    selectedCard,
    handleCardSelect,
    resetCardState,
  } = useCards({
    drawCardAPI: async (index: number) => {
      if (!code || !roundID || !playerID) {
        console.error("something went wrong");
        return "safe";
      }
      const data = await drawCard({
        code,
        roundId: roundID,
        playerId: playerID,
        index,
      });

      return data.isJoker ? "joker" : "safe";
    },
  });

  const answerOptions = useMemo(() => {
    return players
      .filter((player) => player.id !== userID)
      .map((item) => item.nickname);
  }, [players]);

  async function handlerSelectQuestion(questionId: number) {
    if (!code || !roundID) return;
    await submitQuestion({ code, roundId: roundID, questionId });
  }

  async function handlerSubmitAnswer(answer: string) {
    if (!code || !roundID) return;
    await submitAnswer({ code, roundId: roundID, answer });
  }

  async function handlerNextRound() {
    if (!code || !roundID || !playerID) {
      console.error("參數有誤");
      return;
    }
    await nextRound({ code, currentRoundId: roundID, hostId: playerID });
  }

  async function handlerEndGame() {
    if (!code || !playerID) {
      console.error("參數有誤");
      return;
    }
    await endGame({ code, playerID });
  }

  useEffect(() => {
    if (roundStatus === "question") {
      resetCardState();
    }
  }, [roundStatus]);

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
              {/* 出題 */}
              {roundStatus === "question" && role === "question" && (
                <>
                  <h2 className="text-3xl font-bold text-yellow-400">
                    請選擇題目
                  </h2>
                  <QuestionSection
                    questions={questions || []}
                    selectQuestion={handlerSelectQuestion}
                  />
                </>
              )}

              {/* 等待選題 */}
              {roundStatus === "question" && role !== "question" && (
                <h2 className="text-3xl font-bold text-yellow-400">
                  {currentPlayerName} 選題中...
                </h2>
              )}

              {/* 作答 */}
              {roundStatus === "answer" && role === "answer" && (
                <AnswerSection
                  question={question || ""}
                  options={answerOptions}
                  submitAnswer={handlerSubmitAnswer}
                />
              )}

              {roundStatus === "answer" && role !== "answer" && (
                <h2 className="text-3xl font-bold text-yellow-400">
                  {currentPlayerName} 作答中...
                </h2>
              )}

              {/* 抽牌 */}
              {(roundStatus === "draw" ||
                roundStatus === "revealed" ||
                roundStatus === "safe") &&
                role === "answer" && (
                  <div className="flex-1 flex flex-col items-center justify-center space-y-8">
                    <h2 className="text-3xl font-bold text-yellow-400">
                      {roundStatus === "draw" && "請抽牌"}
                      {roundStatus === "revealed" && "抽中鬼牌啦"}
                      {roundStatus === "safe" && "你安全了！"}
                    </h2>
                    <DrawCardSection
                      flippedCards={flippedCards}
                      flippingCard={flippingCard}
                      selectedCard={selectedCard}
                      onSelect={handleCardSelect}
                    />
                  </div>
                )}

              {roundStatus === "draw" && role !== "answer" && (
                <>
                  <h2 className="text-3xl font-bold text-cyan-400">
                    {currentPlayerName} 抽牌中...
                  </h2>
                  <Card className="p-8 bg-black/50 border-2 border-purple-400/50 w-full gap-0">
                    <h4 className="text-white font-medium text-lg">
                      {currentPlayerName} 的回答
                    </h4>
                    <span className="text-white font-medium text-lg">
                      {answer}
                    </span>
                  </Card>
                </>
              )}

              {roundStatus === "safe" && role !== "answer" && (
                <>
                  <div className="text-8xl">🛡️</div>
                  <h2 className="text-3xl font-bold text-yellow-400">
                    {currentPlayerName} 沒抽到鬼牌
                  </h2>
                </>
              )}

              {roundStatus === "revealed" && role !== "answer" && (
                <>
                  <div className="text-8xl animate-bounce">🃏</div>

                  <h2 className="text-3xl font-bold text-yellow-400">
                    {currentPlayerName} 抽到鬼牌啦！來看看題目是：
                  </h2>
                  <Card className="p-8 bg-black/50 border-2 border-purple-400/50 w-full gap-0">
                    <p className="text-white text-xl leading-relaxed mb-8 text-left">
                      {question}
                    </p>
                  </Card>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-gray-900/50 via-black/50 to-gray-900/50 backdrop-blur-sm border-t border-gray-700/50 p-6">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
            {isHost && (
              <EndGameButton
                onConfirm={handlerEndGame}
                disabled={endGameLoading}
              />
            )}

            {(roundStatus === "revealed" || roundStatus === "safe") &&
              isHost && (
                <Button
                  onClick={handlerNextRound}
                  disabled={nextRoundLoading}
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-400 hover:to-emerald-400 text-white font-bold   shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all duration-300 transform hover:scale-105"
                >
                  下一回合
                </Button>
              )}
          </div>
        </div>
      </div>
    </div>
  );
}
