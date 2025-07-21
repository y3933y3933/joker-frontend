import { getFeedbackById } from "@/integrations/axios/feedback/feedback";

import { useQuery } from "@tanstack/react-query";

export default function useGetFeedbackByID(id: number) {
  const { data, isLoading } = useQuery({
    queryKey: ["feedback", id],
    queryFn: async () => await getFeedbackById(id),
  });

  return { data, isLoading };
}
