import { submitAnswer } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useSubmitAnswer() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({
      code,
      answer,
      roundId,
    }: {
      code: string;
      answer: string;
      roundId: number;
    }) => submitAnswer(code, roundId, answer),
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
