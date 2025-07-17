import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Level } from "@/types";
import { toast } from "sonner";

interface AddQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (question: { text: string; type: Level }) => void;
}

const AddQuestionModal = ({
  isOpen,
  onClose,
  onAdd,
}: AddQuestionModalProps) => {
  const [questionText, setQuestionText] = useState("");
  const [questionType, setQuestionType] = useState<Level>("normal");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!questionText.trim()) return;

    setIsSubmitting(true);

    try {
      await onAdd({
        text: questionText.trim(),
        type: questionType,
      });

      // 🎉 只有成功時才執行這些
      setQuestionText("");
      setQuestionType("normal");
      onClose(); // 關閉 modal
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "新增問題失敗";
      toast.error("新增問題失敗", { description: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setQuestionText("");
    setQuestionType("normal");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
          <DialogDescription>
            Create a new question for your game. Choose the appropriate type and
            enter your question text.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="question-type">Question Type</Label>
              <Select
                value={questionType}
                onValueChange={(value: Level) => setQuestionType(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select question type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="spicy">Spicy</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="question-text">Question Text</Label>
              <Textarea
                id="question-text"
                placeholder="Enter your question here..."
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                rows={4}
                className="resize-none"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!questionText.trim() || isSubmitting}
            >
              {isSubmitting ? "Adding..." : "Add Question"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddQuestionModal;
