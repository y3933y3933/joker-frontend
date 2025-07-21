import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import useGetDashboard from "@/integrations/tanstack-query/admin/useGetDashboard";
import { createFileRoute } from "@tanstack/react-router";
import { RefreshCw } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/_authenticated/dashboard")({
  component: RouteComponent,
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
