import { endGame } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useEndGame() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({ code, playerID }: { code: string; playerID: number }) =>
      endGame({ code, playerID }),
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
