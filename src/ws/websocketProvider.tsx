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

    console.log("useEffect", code, playerID);

    socketRef.current = socket;

    socket.onmessage = (event) => {
      console.log("event", event);
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
      console.log("closing socket", socket.readyState);
      if (socketRef.current === socket) {
        socket.close();
      }
    };
  }, [code, playerID]);
  return (
    <WebSocketContext.Provider value={{ close }}>
      {children}
    </WebSocketContext.Provider>
  );
}
