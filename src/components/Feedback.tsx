import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { SendIcon } from "lucide-react";

export default function Feedback() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 transform hover:scale-105 border border-purple-400/50">
          <SendIcon className="mr-2 h-4 w-4" />
          Feedback
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Send us feedback</DialogTitle>
          <DialogDescription>
            不論是遊戲建議、功能點子或 bug 回報，我們都非常重視你的意見。
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-5">
          <Textarea
            id="feedback"
            placeholder="在這裡輸入你的想法..."
            aria-label="Send feedback"
          />
          <div className="flex flex-col sm:flex-row sm:justify-end">
            <Button type="button">Send feedback</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
