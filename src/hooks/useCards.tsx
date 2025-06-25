import { useState } from "react";

type CardType = "joker" | "safe";

type UseDrawCardOptions = {
  drawCardAPI: (cardIndex: number) => Promise<CardType>; // 外部傳入的 API 函式
  // onDrawEnd?: (cardType: CardType, cardIndex: number) => void; // 抽完牌後的 callback
};

export function useCards({ drawCardAPI }: UseDrawCardOptions) {
  const [flippingCard, setFlippingCard] = useState<number | null>(null); // 目前正在翻的卡片
  const [flippedCards, setFlippedCards] = useState<Record<number, CardType>>(
    {},
  ); // 已翻的卡片記錄
  const [selectedCard, setSelectedCard] = useState<number | null>(null); // 被選中的卡片

  const handleCardSelect = async (cardIndex: number) => {
    if (flippingCard !== null || selectedCard !== null) return; // 防止多次點擊

    setFlippingCard(cardIndex); // 設定翻牌中狀態

    try {
      const cardType = await drawCardAPI(cardIndex); // 呼叫 API 拿到牌的結果

      // 等一下再翻開（模擬動畫的延遲）
      // setTimeout(() => {
      setFlippedCards((prev) => ({ ...prev, [cardIndex]: cardType })); // 記錄結果
      setSelectedCard(cardIndex); // 標記這張是被選到的

      // onDrawEnd?.(cardType, cardIndex); // 執行外部給的 callback

      // // 2 秒後自動清除（可選，可移除）
      // setTimeout(() => {
      //   setFlippingCard(null);
      //   setSelectedCard(null);
      // }, 2000);
      // }, 400); // 翻開前等 400ms（動畫時間）
    } catch (err) {
      console.error("抽牌失敗", err);
      setFlippingCard(null); // 抽失敗就重設 flipping 狀態
    }
  };

  const resetCardState = () => {
    setFlippedCards({});
    setFlippingCard(null);
    setSelectedCard(null);
  };

  return {
    flippingCard,
    flippedCards,
    selectedCard,
    handleCardSelect,
    resetCardState,
  };
}
