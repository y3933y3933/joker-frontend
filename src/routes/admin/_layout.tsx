import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { createFileRoute, Outlet } from "@tanstack/react-router";
import {
  GamepadIcon,
  X,
  Menu,
  MessageSquare,
  BarChart3,
  Home,
  LogOut,
} from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/_layout")({
  component: RouteComponent,
});

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { name: "Dashboard", icon: Home, active: true },
    { name: "Questions", icon: MessageSquare, active: false },
    { name: "Game Rooms", icon: GamepadIcon, active: false },
    { name: "Feedback", icon: BarChart3, active: false },
  ];

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
              JA
            </AvatarFallback>
          </Avatar>
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-300 hover:text-white hover:bg-gray-700"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 border-r border-gray-700 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:inset-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        `}
        >
          <div className="flex flex-col h-full pt-16 lg:pt-0">
            <nav className="flex-1 px-4 py-6 space-y-2">
              {navigationItems.map((item) => (
                <Button
                  key={item.name}
                  variant={item.active ? "secondary" : "ghost"}
                  className={`w-full justify-start text-left ${
                    item.active
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "text-gray-300 hover:text-white hover:bg-gray-700"
                  }`}
                >
                  <item.icon className="h-5 w-5 mr-3" />
                  {item.name}
                </Button>
              ))}
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
