import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useGetDashboard from "@/integrations/tanstack-query/admin/useGetDashboard";
import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/_authenticated/dashboard")({
  component: RouteComponent,
  // loader: async () => {
  //   const res = await getDashboardData();
  //   return transformDashboardStats(res);
  // },
});

function RouteComponent() {
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const { data: stats, isLoading, refetch } = useGetDashboard();

  const recentFeedback = [
    {
      id: 1,
      user: "Alex Chen",
      avatar: "/placeholder.svg?height=32&width=32",
      comment: "Great game experience! The new features are amazing...",
      timestamp: "2 minutes ago",
      rating: 5,
    },
    {
      id: 2,
      user: "Sarah Johnson",
      avatar: "/placeholder.svg?height=32&width=32",
      comment: "Love the updated UI, much more intuitive now...",
      timestamp: "15 minutes ago",
      rating: 4,
    },
    {
      id: 3,
      user: "Mike Rodriguez",
      avatar: "/placeholder.svg?height=32&width=32",
      comment: "Could use some improvements in the matchmaking...",
      timestamp: "1 hour ago",
      rating: 3,
    },
    {
      id: 4,
      user: "Emma Wilson",
      avatar: "/placeholder.svg?height=32&width=32",
      comment: "Fantastic multiplayer experience! Keep it up...",
      timestamp: "2 hours ago",
      rating: 5,
    },
  ];

  async function handleRefresh() {
    await refetch();
    setLastUpdated(new Date());
  }
  return (
    <div className="p-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <span className="text-sm text-gray-400">
            Last Updated: {lastUpdated.toLocaleTimeString()}
          </span>
          <Button
            variant="outline"
            size="sm"
            className="border-gray-600 text-gray-300 hover:bg-gray-700 bg-transparent"
            onClick={handleRefresh}
            disabled={isLoading}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats?.map((stat, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              {/* <p className="text-xs text-green-400 mt-1">
                {stat.change} from last month
              </p> */}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Feedback */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-white">
            Recent Feedback
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentFeedback.map((feedback) => (
              <div
                key={feedback.id}
                className="flex items-start space-x-4 p-4 rounded-lg bg-gray-700/50 hover:bg-gray-700 transition-colors"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={feedback.avatar || "/placeholder.svg"}
                    alt={feedback.user}
                  />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {feedback.user
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-white">
                      {feedback.user}
                    </p>
                    <div className="flex items-center space-x-2">
                      {/* <Badge
                              variant="outline"
                              className="text-xs border-gray-600 text-gray-300"
                            >
                              {"★".repeat(feedback.rating)}
                            </Badge> */}
                      <span className="text-xs text-gray-400">
                        {feedback.timestamp}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300 mt-1 truncate">
                    {feedback.comment}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
