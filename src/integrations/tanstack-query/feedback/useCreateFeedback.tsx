import { createFeedback } from "@/integrations/axios/feedback/feedback";
import { useMutation } from "@tanstack/react-query";

export default function useCreateFeedback() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: createFeedback,
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
