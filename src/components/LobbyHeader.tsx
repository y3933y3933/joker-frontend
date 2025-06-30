import useClipboard from "@/hooks/useClipboard";
import { Button } from "./ui/button";
import { Check, Copy } from "lucide-react";

interface LobbyHeaderProps {
  gameCode: string;
}

export default function LobbyHeader({ gameCode }: LobbyHeaderProps) {
  const { copied, copyToClipboard } = useClipboard();

  return (
    <div className="text-center space-y-4">
      <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
        遊戲大廳
      </h2>
      <div className="flex items-center justify-center gap-2">
        <span className="text-gray-400">房間代碼:</span>
        <code className="text-2xl font-mono bg-gray-800 px-4 py-2 rounded-lg border border-yellow-500/30 text-yellow-400">
          {gameCode}
        </code>
        <Button
          onClick={() => copyToClipboard(gameCode)}
          size="sm"
          variant="ghost"
          className="text-yellow-400 hover:bg-yellow-400/10 hover:text-white"
        >
          {copied ? (
            <Check className="h-4 w-4" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
}
