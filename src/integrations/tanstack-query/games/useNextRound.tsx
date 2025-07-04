import { nextRound } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useNextRound() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (req: { code: string; playerID: number }) => nextRound(req),
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
