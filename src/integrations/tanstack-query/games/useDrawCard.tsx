import { drawCard } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

export default function useDrawCard() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: (req: {
      code: string;
      roundId: number;
      playerId: number;
      index: number;
    }) => drawCard(req),
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
