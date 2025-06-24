import { createContext, useEffect, useRef, type ReactNode } from "react";
import type { WSMessage } from "./ws.type";

type WebSocketContextValue = {
  close: () => void;
};

export const WebSocketContext = createContext<WebSocketContextValue | null>(
  null,
);

interface WebSocketProviderProps {
  code: string | null;
  playerID: number | null;
  children: ReactNode;
  onMessage: (msg: WSMessage) => void;
}

export function WebSocketProvider({
  code,
  playerID,
  children,
  onMessage,
}: WebSocketProviderProps) {
  const socketRef = useRef<WebSocket | null>(null);

  function close() {
    socketRef.current?.close();
  }

  useEffect(() => {
    if (!code || !playerID) return;
    const socket = new WebSocket(
      `ws://localhost:8080/ws/games/${code}?player_id=${playerID}`,
    );

    socketRef.current = socket;

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        onMessage(message);
      } catch (err) {
        console.error("Failed to parse message", err);
      }
    };

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
    };

    socket.onclose = () => {
      console.log("❌ WebSocket closed");
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      socket.close();
    };
  }, [playerID, code]);

  return (
    <WebSocketContext.Provider value={{ close }}>
      {children}
    </WebSocketContext.Provider>
  );
}
