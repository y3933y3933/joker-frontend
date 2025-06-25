import type { Level } from "@/types";
import api from "../axios-instance";
import {
  CreateGameResponseSchema,
  GameSchema,
  PlayerSchema,
  PlayersSchema,
  QuestionsSchema,
} from "./game.schema";

export const createGame = async (level: Level) => {
  const res = await api.post("/games", { level });
  return CreateGameResponseSchema.parse(res.data.data);
};

export const joinGame = async (code: string, nickname: string) => {
  const res = await api.post(`/games/${code}/join`, { nickname });
  return PlayerSchema.parse(res.data.data);
};

export const getPlayers = async (code: string) => {
  const res = await api.get(`/games/${code}/players`);
  return PlayersSchema.parse(res.data.data);
};

export const getGame = async (code: string) => {
  const res = await api.get(`/games/${code}`);
  return GameSchema.parse(res.data.data);
};

export const startGame = async (code: string) => {
  const res = await api.post(`/games/${code}/start`);
};

export const getQuestions = async (code: string) => {
  const res = await api.get(`/games/${code}/questions`);
  return QuestionsSchema.parse(res.data.data);
};

export const submitQuestion = async (
  code: string,
  roundID: number,
  questionId: number,
) => {
  const res = await api.post(`/games/${code}/rounds/${roundID}/question`, {
    questionId,
  });
};
