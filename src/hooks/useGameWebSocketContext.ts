import { useContext } from "react";
import { GameWebSocketContext } from "@/providers/GameWebSocketProvider";

export const useGameWebSocketContext = () => {
  const context = useContext(GameWebSocketContext);
  if (!context) {
    throw new Error(
      "useGameWebSocketContext 必須用在 GameWebSocketProvider 裡",
    );
  }
  return context;
};
