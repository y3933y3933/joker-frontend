import { updateQuestion } from "@/integrations/axios/questions/questions";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateQuestion = () => {
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation({
    mutationFn: updateQuestion,
    onSuccess: (_) => {
      // 重新獲取問題列表
      queryClient.invalidateQueries({
        queryKey: ["questions"],
      });
    },
  });

  return { mutateAsync };
};
