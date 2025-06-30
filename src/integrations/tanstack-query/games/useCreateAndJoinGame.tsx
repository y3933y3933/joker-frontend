import { createGame } from "@/integrations/axios/games/games";
import { useMutation } from "@tanstack/react-query";
import useJoinGame from "./useJoinGame";

export function useCreateAndJoinGame() {
  const createGameMutation = useMutation({
    mutationFn: createGame,
  });

  const {
    mutateAsync: joinGameMutateAsync,
    isError: joinGameIsError,
    isLoading: joinGameIsLoading,
    error: joinGameError,
  } = useJoinGame();

  const createAndJoin = async (nickname: string) => {
    try {
      const gameData = await createGameMutation.mutateAsync();

      const joinedData = await joinGameMutateAsync({
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
    isLoading: createGameMutation.isPending || joinGameIsLoading,
    isError: createGameMutation.isError || joinGameIsError,
    error: createGameMutation.error || joinGameError,
  };
}
