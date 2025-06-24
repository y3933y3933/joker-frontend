import { Gamepad2 } from "lucide-react";
import { Card, CardContent } from "./ui/card";

export default function GameRules() {
  return (
    <Card className="w-full max-w-4xl bg-gray-900/50 border-yellow-500/30 shadow-lg shadow-yellow-500/10">
      <CardContent>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-yellow-400 flex items-center gap-2">
            <Gamepad2 />
            遊戲規則
          </h3>
          <ul className="space-y-2 text-gray-300 text-base">
            <li>• 玩家輪流出題並由下一位玩家秘密作答</li>
            <li>• 作答完畢後，從三張卡牌中抽一張</li>
            <li>• 如果你抽到 🃏 鬼牌，你的回答將會被公開給所有人！</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
