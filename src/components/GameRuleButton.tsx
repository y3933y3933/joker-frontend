import { useState } from "react";
import { ArrowRightIcon, Gamepad2 } from "lucide-react";
import step1Img from "../assets/images/rules-1.jpeg";
import step2Img from "../assets/images/rules-2.jpeg";
import step3Img from "../assets/images/rules-3.jpeg";
import step4Img from "../assets/images/rules-4.jpeg";
import step5Img from "../assets/images/rules-5.jpeg";
import step6Img from "../assets/images/rules-6.jpeg";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const stepContent = [
  {
    title: "遊戲目標",
    description:
      "Joker 是一款社交問答遊戲，透過匿名題目與玩家互動，創造爆笑又出其不意的回答情境。",
    img: step1Img,
  },
  {
    title: "遊戲大廳",
    description:
      "玩家可以透過創建房間或加入房間進入大廳，由房主開始遊戲，最少 3 人，最多 8 人。",
    img: step2Img,
  },
  {
    title: "提問階段",
    description:
      "每一輪會依照順序指定一位玩家作為題目選擇者，玩家需要從題庫中選擇一題提問，例如：「你覺得誰最戀愛腦？」將題目私下發送給回答者。",
    img: step3Img,
  },
  {
    title: "回答階段",
    description:
      "每一輪會依照順序指定一位玩家作為回答對象，回答者需要提交答案。所有人將看到這個答案，但不知道題目是什麼。",
    img: step4Img,
  },
  {
    title: "抽牌事件",
    description:
      "回答者接著抽一張牌。如果抽中鬼牌，題目會公開給所有玩家；若未抽中，題目則保持隱密，只留下令人猜想的答案。",
    img: step5Img,
  },
  {
    title: "持續進行",
    description:
      "房主可以選擇進行下一回合或結束遊戲，若結束遊戲則會顯示這次遊戲的結果。",
    img: step6Img,
  },
];

export default function GameRuleButton() {
  const [step, setStep] = useState(1);

  const totalSteps = stepContent.length;

  const handleContinue = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  return (
    <Dialog
      onOpenChange={(open) => {
        if (open) setStep(1);
      }}
    >
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-400 hover:to-orange-400 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-yellow-500/25 hover:shadow-yellow-500/40 transition-all duration-300 transform hover:scale-105 border border-yellow-400/50">
          <Gamepad2 className="mr-2 h-4 w-4" />
          How to Play
        </Button>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 [&>button:last-child]:text-white">
        <div className="p-2">
          <img
            className="w-full rounded-md"
            src={stepContent[step - 1].img}
            width={382}
            height={216}
            alt="image"
          />
        </div>
        <div className="space-y-6 px-6 pt-3 pb-6">
          <DialogHeader>
            <DialogTitle>{stepContent[step - 1].title}</DialogTitle>
            <DialogDescription>
              {stepContent[step - 1].description}
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex justify-center space-x-1.5 max-sm:order-1">
              {[...Array(totalSteps)].map((_, index) => (
                <div
                  key={index}
                  className={cn(
                    "bg-primary size-1.5 rounded-full",
                    index + 1 === step ? "bg-primary" : "opacity-20",
                  )}
                />
              ))}
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="ghost">
                  Skip
                </Button>
              </DialogClose>
              {step < totalSteps ? (
                <Button
                  className="group"
                  type="button"
                  onClick={handleContinue}
                >
                  Next
                  <ArrowRightIcon
                    className="-me-1 opacity-60 transition-transform group-hover:translate-x-0.5"
                    size={16}
                    aria-hidden="true"
                  />
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button type="button">Okay</Button>
                </DialogClose>
              )}
            </DialogFooter>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
