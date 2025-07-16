import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { getUser } from "@/integrations/axios/admin/admin";
import {
  createFileRoute,
  Link,
  Outlet,
  redirect,
  useLocation,
  useNavigate,
} from "@tanstack/react-router";
import {
  Home,
  MessageSquare,
  GamepadIcon,
  BarChart3,
  X,
  Menu,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/_authenticated")({
  component: RouteComponent,
  beforeLoad: async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      throw redirect({
        to: "/admin/login",
      });
    }

    try {
      await getUser();
    } catch (_) {
      throw redirect({
        to: "/admin/login",
      });
    }
  },
  loader: () => getUser(),
});

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const user = Route.useLoaderData();
  const navigate = useNavigate();

  const navigationItems = [
    { name: "Dashboard", icon: Home, href: "/admin/dashboard" },
    { name: "Questions", icon: MessageSquare, href: "/admin/questions" },
    { name: "Game Rooms", icon: GamepadIcon, href: "/admin/game-rooms" },
    { name: "Feedback", icon: BarChart3, href: "/admin/feedback" },
  ];

  const location = useLocation();

  // 判斷當前路由是否活躍
  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/admin/login" });
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 px-4 lg:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
          <h1 className="text-xl font-bold text-blue-400">Joker Admin</h1>
        </div>

        <div className="flex items-center gap-4">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src="/placeholder.svg?height=32&width=32"
              alt="Admin"
            />
            <AvatarFallback className="bg-blue-600 text-white">
              {user.username.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-700"
            onClick={logout}
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex min-h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`flex items-center w-full px-3 py-2 rounded-md text-left transition-colors ${
                      active
                        ? "bg-blue-600 text-white hover:bg-blue-700"
                        : "text-gray-300 hover:text-white hover:bg-gray-700"
                    }`}
                    onClick={() => setSidebarOpen(false)} // 關閉側邊欄 (mobile)
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <main className="flex-1 lg:ml-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
