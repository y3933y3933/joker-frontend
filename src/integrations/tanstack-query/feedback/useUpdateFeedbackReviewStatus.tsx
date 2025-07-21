import { UpdateFeedbackReviewStatus } from "@/integrations/axios/feedback/feedback";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateFeedbackReviewStatus = () => {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: UpdateFeedbackReviewStatus,
    onSuccess: (_) => {
      queryClient.invalidateQueries({
        queryKey: ["feedback"],
      });
    },
  });

  return { mutateAsync, isPending };
};
