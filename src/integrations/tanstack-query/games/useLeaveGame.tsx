import { leaveGame } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useLeaveGame() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: ({ code, playerID }: { code: string; playerID: number }) =>
      leaveGame(code, playerID),
  });

  return {
    mutate,
    isLoading: isPending,
    isError,
    error,
  };
}
