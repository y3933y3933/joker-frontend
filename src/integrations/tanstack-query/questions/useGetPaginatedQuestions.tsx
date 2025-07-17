import { getPaginatedQuestions } from "@/integrations/axios/questions/questions";
import type { QuestionFilters } from "@/integrations/axios/questions/questions.schema";
import { useQuery } from "@tanstack/react-query";

export default function useGetPaginatedQuestions(filters?: QuestionFilters) {
  const { data, isLoading } = useQuery({
    queryKey: ["questions", filters],
    queryFn: async () => await getPaginatedQuestions(filters),
  });

  return { data, isLoading };
}
