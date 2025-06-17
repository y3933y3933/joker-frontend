// hooks/useGameWebSocket.ts
import type { WSMessage } from "@/ws/ws.type";
import { useEffect, useRef } from "react";

export function useGameWebSocket({
  gameCode,
  playerId,
  onMessage,
}: {
  gameCode: string | undefined;
  playerId: number | null;
  onMessage: (data: WSMessage) => void;
}) {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!gameCode || !playerId) return;

    const socket = new WebSocket(
      `ws://localhost:8080/ws/games/${gameCode}?player_id=${playerId}`,
    );

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onmessage = (event) => {
      const message = JSON.parse(event.data);
      onMessage(message);
    };

    socket.onclose = () => {
      console.log("❌ WebSocket closed");
      // TODO: 自動重連（可選）
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      socket.close();
    };
  }, [gameCode]);
}
