import { endGameByAdmin } from "@/integrations/axios/games/games";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useEndGameByAdmin() {
  const queryClient = useQueryClient();
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: ({ code }: { code: string }) => endGameByAdmin(code),
    onSuccess: (_) => {
      queryClient.invalidateQueries({
        queryKey: ["games"],
      });
    },
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
