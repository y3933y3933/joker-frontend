import { joinGame } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useJoinGame() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({ code, nickname }: { code: string; nickname: string }) =>
      joinGame(code, nickname),
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
