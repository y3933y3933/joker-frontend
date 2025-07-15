import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { createFileRoute } from "@tanstack/react-router";
import { Users, GamepadIcon, Activity, MessageSquare } from "lucide-react";

export const Route = createFileRoute("/admin/_layout/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  const stats = [
    {
      title: "Live Players",
      value: "2,847",
      change: "+12%",
      icon: Users,
      color: "text-blue-400",
    },
    {
      title: "Games Today",
      value: "156",
      change: "+8%",
      icon: GamepadIcon,
      color: "text-green-400",
    },
    {
      title: "Active Rooms",
      value: "23",
      change: "+3%",
      icon: Activity,
      color: "text-purple-400",
    },
    {
      title: "Recent Feedback",
      value: "89",
      change: "+15%",
      icon: MessageSquare,
      color: "text-orange-400",
    },
  ];

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
  return (
    <div className="p-6 space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-300">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <p className="text-xs text-green-400 mt-1">
                {stat.change} from last month
              </p>
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
