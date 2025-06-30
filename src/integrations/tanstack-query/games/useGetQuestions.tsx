import { getQuestions } from "@/integrations/axios/games/games";
import { useQuery } from "@tanstack/react-query";

export default function useGetQuestions(
  code: string,
  roundID: number | null,
  isQuestioner: boolean,
) {
  const { data, isLoading } = useQuery({
    queryKey: ["questions", code, roundID],
    queryFn: async () => {
      const data = await getQuestions(code);
      return data;
    },
    enabled: roundID !== null && isQuestioner,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
  });

  return { data, isLoading };
}
