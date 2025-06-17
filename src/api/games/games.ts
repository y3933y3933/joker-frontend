import type { Level } from "@/features/games/types";
import api from "../instance";
import type { CreateGameResponse } from "./games.type";

export const createGame = async (level: Level): Promise<CreateGameResponse> => {
  const res = await api.post("/games", { level });
  return res.data;
};

export const joinGame = async (
  code: string,
  nickname: string,
): Promise<{ id: number; name: string }> => {
  const res = await api.post(`/games/${code}/join`, { nickname });
  return res.data;
};
