import { getPaginatedFeedback } from "@/integrations/axios/feedback/feedback";
import type { FeedbackFilters } from "@/integrations/axios/feedback/feedback.schema";

import { useQuery } from "@tanstack/react-query";

export default function useGetPaginatedFeedback(filters?: FeedbackFilters) {
  const { data, isLoading } = useQuery({
    queryKey: ["feedback", filters],
    queryFn: async () => await getPaginatedFeedback(filters),
  });

  return { data, isLoading };
}
