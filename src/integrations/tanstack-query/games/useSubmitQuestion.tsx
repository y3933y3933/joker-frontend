import { submitQuestion } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useSubmitQuestion() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({
      code,
      roundID,
      questionID,
      playerID,
    }: {
      code: string;
      roundID: number;
      questionID: number;
      playerID: number;
    }) => submitQuestion({ code, roundID, questionID, playerID }),
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
