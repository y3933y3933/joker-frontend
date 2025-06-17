import type { WSMessage } from "@/ws/ws.type";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type GameWebSocketContextValue = {
  sendMessage: (data: unknown) => void;
};

export const GameWebSocketContext =
  createContext<GameWebSocketContextValue | null>(null);

export function GameWebSocketProvider({
  gameCode,
  playerId,
  onMessage,
  children,
}: {
  gameCode: string;
  playerId: number | null;
  onMessage: (msg: WSMessage) => void;
  children: ReactNode;
}) {
  const socketRef = useRef<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!gameCode || !playerId) return;

    const socket = new WebSocket(
      `ws://localhost:8080/ws/games/${gameCode}?player_id=${playerId}`,
    );
    socketRef.current = socket;

    socket.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    socket.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        onMessage(message);
      } catch (err) {
        console.error("Failed to parse message", err);
      }
    };

    socket.onclose = () => {
      console.log("❌ WebSocket closed");
      setIsConnected(false);
    };

    socket.onerror = (err) => {
      console.error("WebSocket error", err);
    };

    return () => {
      socket.close();
    };
  }, [gameCode, playerId]);

  const sendMessage = (data: any) => {
    if (isConnected && socketRef.current?.readyState === WebSocket.OPEN) {
      socketRef.current.send(JSON.stringify(data));
    }
  };

  return (
    <GameWebSocketContext.Provider value={{ sendMessage }}>
      {children}
    </GameWebSocketContext.Provider>
  );
}
