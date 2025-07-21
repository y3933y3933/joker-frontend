import type { AdminGameFilter } from "@/integrations/axios/games/game.schema";
import { getPaginatedGame } from "@/integrations/axios/games/games";

import { useQuery } from "@tanstack/react-query";

export default function useGetPaginatedGames(filters?: AdminGameFilter) {
  const { data, isLoading } = useQuery({
    queryKey: ["games", filters],
    queryFn: async () => await getPaginatedGame(filters),
  });

  return { data, isLoading };
}
