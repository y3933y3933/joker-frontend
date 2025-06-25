import { startGame } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useStartGame() {
  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: startGame,
  });

  return {
    mutate,
    isLoading: isPending,
    isError,
    error,
  };
}
