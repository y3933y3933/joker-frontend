import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface EndGameButtonProps {
  disabled?: boolean;
  onConfirm: () => void;
}

export default function EndGameButton({
  onConfirm,
  disabled = false,
}: EndGameButtonProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled}
          className="w-full sm:w-auto border-gray-600 text-gray-400 hover:bg-gray-800 hover:text-white hover:border-gray-500 transition-all duration-300"
        >
          結束遊戲
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>確定要結束遊戲嗎？</AlertDialogTitle>
          <AlertDialogDescription>
            遊戲將結束，所有玩家將看到本輪的題目與回答紀錄。請確認是否要繼續。
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Okay</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
