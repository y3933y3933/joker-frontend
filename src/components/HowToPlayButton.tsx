import { Ghost, Zap } from "lucide-react";
import { Button } from "./ui/button";
import {
  DialogHeader,
  DialogFooter,
  Dialog,
  DialogTrigger,
  DialogClose,
  DialogContent,
  DialogTitle,
} from "./ui/dialog";

export default function HowToPlayButton() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mt-4 border-yellow-400/50 text-yellow-400 hover:bg-yellow-400/10 hover:border-yellow-400 transition-all duration-300"
        >
          <Zap className="mr-2 h-4 w-4" />
          How to Play
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md w-full max-w-2xl bg-gray-900/95 border-yellow-500/30 shadow-2xl shadow-yellow-500/20 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="text-center space-y-2">
            <h3 className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              如何遊玩 JOKER
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full" />
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 text-gray-300">
          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-cyan-400 flex items-center gap-2">
              <span className="bg-cyan-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                1
              </span>
              遊戲準備
            </h4>
            <p>建立房間或輸入代碼加入遊戲。至少需要 2 位玩家才能開始遊戲。</p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
              <span className="bg-pink-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </span>
              題目揭示
            </h4>
            <p>
              每回合會隨機選出一位玩家，該玩家會看到一個提問題目，例如：「你覺得誰最有可能三天不洗澡？」
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <span className="bg-purple-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </span>
              抽牌決定是否公開
            </h4>
            <p>
              看到題目後，點擊「抽牌」：
              <br />
              抽到 <strong className="text-red-400">鬼牌</strong> 👉
              你必須公開題目內容，並說出你的真實答案 <br />
              沒抽到鬼牌 👉 啥事都不用做，換下一位玩家進行下一題！
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
              <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                4
              </span>
              持續進行
            </h4>
            <p>
              遊戲依序進行，讓每個人都體驗心理壓力與爆料的刺激時刻。越後面越緊張，你準備好了嗎？
            </p>
          </div>
        </div>

        <DialogFooter className="sm:justify-start pt-4 border-t border-gray-700">
          <DialogClose asChild>
            <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3">
              Got it! Let's Play
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
