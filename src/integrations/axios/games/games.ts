import type { Level } from "@/types";
import api from "../axios-instance";
import {
  CreateGameResponseSchema,
  JoinGameResponseSchema,
} from "./game.schema";

export const createGame = async (level: Level) => {
  const res = await api.post("/games", { level });
  return CreateGameResponseSchema.parse(res.data);
};

export const joinGame = async (code: string, nickname: string) => {
  const res = await api.post(`/games/${code}/join`, { nickname });
  return JoinGameResponseSchema.parse(res.data);
};
