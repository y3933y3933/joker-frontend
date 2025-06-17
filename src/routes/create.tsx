import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center space-y-8 animate-in slide-in-from-right duration-500">
        <div className="text-center space-y-4">
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-pink-400 bg-clip-text text-transparent">
            Create Room
          </h2>
          <p className="text-gray-400">
            Enter your nickname to create a new game room
          </p>
        </div>

        <Card className="w-full max-w-md bg-gray-900/50 border-cyan-500/30 shadow-lg shadow-cyan-500/10 py-0">
          <CardContent className="p-6 space-y-6">
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-cyan-400">
                Nickname
              </label>
              <Input
                // value={nickname}
                // onChange={(e) => setNickname(e.target.value)}
                placeholder="Enter your nickname"
                className="bg-black/50 border-cyan-500/50 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-cyan-400/20"
                // onKeyPress={(e) => e.key === "Enter" && createRoom()}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium text-cyan-400">Level</label>
              <select
                // value={selectedLevel}
                // onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full bg-black/50 border border-cyan-500/50 text-white rounded-md px-3 py-2 focus:border-cyan-400 focus:ring-cyan-400/20 focus:outline-none"
              >
                <option value="easy" className="bg-gray-900">
                  Easy
                </option>
                <option value="normal" className="bg-gray-900">
                  Normal
                </option>
                <option value="spicy" className="bg-gray-900">
                  Spicy
                </option>
              </select>
            </div>

            <div className="flex gap-3">
              <Button
                // onClick={() => setGameState("landing")}
                variant="outline"
                className="flex-1 border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white"
              >
                <Link to="/" className="inline-block w-full">
                  Back
                </Link>
              </Button>
              <Button
                // onClick={createRoom}
                // disabled={!nickname.trim()}
                className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
