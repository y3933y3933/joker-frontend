import type { Level } from "@/types";
import api from "../axios-instance";
import {
  CreateGameResponseSchema,
  DrawCardResSchema,
  GameSchema,
  GameSummaryResponseSchema,
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
  await api.post(`/games/${code}/start`);
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
  await api.post(`/games/${code}/rounds/${roundID}/question`, {
    questionId,
  });
};

export const submitAnswer = async (
  code: string,
  roundID: number,
  answer: string,
) => {
  await api.post(`/games/${code}/rounds/${roundID}/answer`, { answer });
};

export const drawCard = async ({
  code,
  roundId,
  playerId,
  index,
}: {
  code: string;
  roundId: number;
  playerId: number;
  index: number;
}) => {
  const res = await api.post(`/games/${code}/rounds/${roundId}/draw`, {
    index,
    playerId,
  });
  return DrawCardResSchema.parse(res.data.data);
};

export const nextRound = async ({
  code,
  hostId,
  currentRoundId,
}: {
  code: string;
  hostId: number;
  currentRoundId: number;
}) => {
  await api.post(`/games/${code}/rounds/next`, {
    hostId,
    currentRoundId,
  });
};

export const endGame = async ({
  code,
  playerID,
}: {
  code: string;
  playerID: number;
}) => {
  await api.post(
    `/games/${code}/end`,
    {},
    {
      headers: { "X-Player-ID": playerID },
    },
  );
};

export const getGameSummary = async (code: string) => {
  const res = await api.get(`/games/${code}/summary`);
  return GameSummaryResponseSchema.parse(res.data.data);
};
