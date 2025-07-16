import { login } from "@/integrations/axios/admin/admin";
import { useMutation } from "@tanstack/react-query";

export default function useLogin() {
  const { mutateAsync, isPending, isError, error } = useMutation({
    mutationFn: login,
  });

  return {
    mutateAsync,
    isLoading: isPending,
    isError,
    error,
  };
}
