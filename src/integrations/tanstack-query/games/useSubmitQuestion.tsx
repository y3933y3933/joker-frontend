import { submitQuestion } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useSubmitQuestion() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({
      code,
      roundId,
      questionId,
    }: {
      code: string;
      roundId: number;
      questionId: number;
    }) => submitQuestion(code, roundId, questionId),
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
