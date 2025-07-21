import { getUser } from "@/integrations/axios/admin/admin";
import { useQuery } from "@tanstack/react-query";

export default function useGetUser() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
    staleTime: 5 * 60 * 1000,
  });

  return { data, isLoading, refetch };
}
