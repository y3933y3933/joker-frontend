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
              How to Play JOKER
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
              Setup
            </h4>
            <p>
              Create a room or join with a room code. You need at least 2
              players to start.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-pink-400 flex items-center gap-2">
              <span className="bg-pink-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                2
              </span>
              Taking Turns
            </h4>
            <p>
              Players take turns drawing cards. When it's your turn, click "Draw
              Card" and wait for the dramatic reveal!
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-purple-400 flex items-center gap-2">
              <span className="bg-purple-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                3
              </span>
              The Ghost Card
            </h4>
            <p>
              Most cards are safe, but beware the{" "}
              <Ghost className="inline h-4 w-4 text-red-400" />{" "}
              <strong className="text-red-400">Ghost Card</strong>! When drawn,
              ALL players must complete a fun challenge together.
            </p>
          </div>

          <div className="space-y-2">
            <h4 className="text-lg font-semibold text-yellow-400 flex items-center gap-2">
              <span className="bg-yellow-400 text-black rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                4
              </span>
              Have Fun!
            </h4>
            <p>
              The game continues with each player taking turns. The real fun
              happens when the ghost card appears and brings everyone together!
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
