import { getDashboardData } from "@/integrations/axios/admin/admin";
import { useQuery } from "@tanstack/react-query";
import { Users, GamepadIcon, Activity, MessageSquare } from "lucide-react";

export default function useGetDashboard() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => await getDashboardData(),
    select: (res) => transformDashboardStats(res),
    staleTime: 1000 * 60,
  });

  return { data, isLoading, refetch };
}

function transformDashboardStats(data: {
  gamesTodayCount: number;
  activeRoomsCount: number;
  feedbackOneMonthCount: number;
  livePlayerCount: number;
}) {
  return [
    {
      title: "Live Players",
      value: data.livePlayerCount.toLocaleString(),
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Games Today",
      value: data.gamesTodayCount.toLocaleString(),
      icon: GamepadIcon,
      color: "text-green-400",
    },
    {
      title: "Active Rooms",
      value: data.activeRoomsCount.toLocaleString(),
      icon: Activity,
      color: "text-purple-400",
    },
    {
      title: "Recent Feedback",
      value: data.feedbackOneMonthCount.toLocaleString(),
      icon: MessageSquare,
      color: "text-orange-400",
    },
  ];
}
