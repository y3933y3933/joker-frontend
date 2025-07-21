import api from "../axios-instance";
import {
  AdminGameFilter,
  AdminGameListResponseSchema,
  CreateGameResponseSchema,
  DrawCardResSchema,
  GameSummaryResponseSchema,
  PlayerSchema,
  PlayersSchema,
  QuestionsSchema,
} from "./game.schema";

export const createGame = async () => {
  const res = await api.post("/games");
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

export const startGame = async (code: string) => {
  await api.post(`/games/${code}/start`);
};

export const getQuestions = async (code: string) => {
  const res = await api.get(`/games/${code}/questions`);
  return QuestionsSchema.parse(res.data.data);
};

export const submitQuestion = async ({
  code,
  roundID,
  questionID,
  playerID,
}: {
  code: string;
  roundID: number;
  questionID: number;
  playerID: number;
}) => {
  const res = await api.post(
    `/games/${code}/rounds/${roundID}/question`,
    {
      questionID,
    },
    {
      headers: { "X-Player-ID": playerID },
    },
  );
  return res.data;
};

export const submitAnswer = async ({
  code,
  roundID,
  answer,
  playerID,
}: {
  code: string;
  roundID: number;
  answer: string;
  playerID: number;
}) => {
  await api.post(
    `/games/${code}/rounds/${roundID}/answer`,
    { answer },
    {
      headers: { "X-Player-ID": playerID },
    },
  );
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
  const res = await api.post(
    `/games/${code}/rounds/${roundId}/draw`,
    {
      index,
    },
    {
      headers: { "X-Player-ID": playerId },
    },
  );
  return DrawCardResSchema.parse(res.data.data);
};

export const nextRound = async ({
  code,
  playerID,
}: {
  code: string;
  playerID: number;
}) => {
  await api.post(
    `/games/${code}/rounds/next`,
    {},
    {
      headers: { "X-Player-ID": playerID },
    },
  );
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

export const leaveGame = async (code: string, playerID: number) => {
  const res = await api.post(
    `/games/${code}/players/leave`,
    {},
    {
      headers: { "X-Player-ID": playerID },
    },
  );
  return res.data.data;
};

export const getPaginatedGame = async (filters?: AdminGameFilter) => {
  const params = new URLSearchParams();
  if (filters?.code) {
    params.append("code", filters.code);
  }

  if (filters?.status) {
    params.append("status", filters.status);
  }

  const res = await api.get(`/admin/games?${params.toString()}`);
  return AdminGameListResponseSchema.parse(res.data.data);
};

export const endGameByAdmin = async (code: string) => {
  const res = await api.post(`/admin/games/end`, { code });
  return res.data.data;
};
