import Feedback from "@/components/Feedback";
import GameRuleButton from "@/components/GameRuleButton";
import { Button } from "@/components/ui/button";
import { APP } from "@/constants";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Crown, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,255,255,0.1),transparent_50%)]" />

      {/* Scanline effect */}
      <div className="absolute inset-0 bg-[linear-gradient(transparent_98%,rgba(0,255,255,0.03)_100%)] bg-[length:100%_4px] animate-pulse" />

      <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
        <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-1000">
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
              {APP.NAME}
            </h1>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 to-pink-400 mx-auto rounded-full animate-pulse" />
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {APP.DESCRIPTION}
            </p>
          </div>

          <div className="flex flex-col  gap-4 w-full max-w-md">
            <Button
              asChild
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40 transition-all duration-300 transform hover:scale-105 border border-cyan-400/50"
            >
              <Link to="/create" className="flex items-center">
                <Crown className="mr-2 h-5 w-5" />
                Create Room
              </Link>
            </Button>

            <Button
              asChild
              className=" bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-400 hover:to-purple-400 text-white font-bold py-4 px-8 rounded-lg shadow-lg shadow-pink-500/25 hover:shadow-pink-500/40 transition-all duration-300 transform hover:scale-105 border border-pink-400/50"
            >
              <Link to="/join" className="flex items-center">
                <Users className="mr-2 h-5 w-5" />
                Join Room
              </Link>
            </Button>

            <GameRuleButton />

            <Feedback />
          </div>
        </div>
      </div>
    </div>
  );
}
