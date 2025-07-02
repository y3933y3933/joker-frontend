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
import { Label } from "./ui/label";
import { SelectNative } from "./ui/select-native";
import { useState } from "react";
import { FeedbackTypeOptions } from "@/constants";
import type { FeedbackType } from "@/types";
import useCreateFeedback from "@/integrations/tanstack-query/feedback/useCreateFeedback";
import { toast } from "sonner";

export default function Feedback() {
  const [open, setOpen] = useState(false);
  const [feedbackType, setFeedbackType] = useState<FeedbackType>("feature");
  const [content, setContent] = useState("");

  const { mutateAsync: createFeedback, isLoading } = useCreateFeedback();

  async function handleSubmit() {
    try {
      await createFeedback({ type: feedbackType, content });
      toast.success("傳送回饋成功");
      setOpen(false);
      setContent("");
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
          <div className="*:not-first:mt-2">
            <Label htmlFor="feedback-type">類型</Label>
            <SelectNative
              id="feedback-type"
              value={feedbackType}
              onChange={(e) => setFeedbackType(e.target.value as FeedbackType)}
            >
              {FeedbackTypeOptions.map((opt) => (
                <option value={opt.value} key={opt.value}>
                  {opt.label}
                </option>
              ))}
            </SelectNative>
          </div>

          <div className="*:not-first:mt-2">
            <Label htmlFor="feedback-type">內容</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              id="feedback"
              placeholder="在這裡輸入你的想法..."
              aria-label="Send feedback"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-end">
            <Button
              type="button"
              disabled={!content.trim() || isLoading}
              onClick={handleSubmit}
            >
              Send feedback
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
