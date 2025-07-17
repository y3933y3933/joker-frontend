import { createQuestion } from "@/integrations/axios/questions/questions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateQuestion = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: createQuestion,
    onSuccess: (_) => {
      // 重新獲取問題列表
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
  });

  return { mutateAsync };
};
