import { submitAnswer } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useSubmitAnswer() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({
      code,
      answer,
      roundID,
      playerID,
    }: {
      code: string;
      answer: string;
      roundID: number;
      playerID: number;
    }) => submitAnswer({ code, roundID, answer, playerID }),
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
