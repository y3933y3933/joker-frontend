import { createGame, joinGame } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";

type CreateGameParams = Parameters<typeof createGame>[0];

export function useCreateAndJoinGame() {
  const createGameMutation = useMutation({
    mutationFn: createGame,
  });

  const joinGameMutation = useMutation({
    mutationFn: ({ code, nickname }: { code: string; nickname: string }) =>
      joinGame(code, nickname),
  });

  const createAndJoin = async (
    createParams: CreateGameParams,
    nickname: string,
  ) => {
    try {
      const gameData = await createGameMutation.mutateAsync(createParams);

      const joinedData = await joinGameMutation.mutateAsync({
        code: gameData.code,
        nickname,
      });

      return { game: gameData, joined: joinedData };
    } catch (err) {
      throw err;
    }
  };

  return {
    createAndJoin,
    isLoading: createGameMutation.isPending || joinGameMutation.isPending,
    isError: createGameMutation.isError || joinGameMutation.isError,
    error: createGameMutation.error || joinGameMutation.error,
  };
}
