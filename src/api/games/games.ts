import type { Level } from "@/features/games/types";
import api from "../instance";
import type { CreateGameResponse, PlayerResponse } from "./games.type";
import type { APISuccessResponse } from "../api.type";

export const createGame = async (level: Level): Promise<CreateGameResponse> => {
  const res = await api.post<APISuccessResponse<CreateGameResponse>>("/games", {
    level,
  });
  return res.data.data;
};

export const joinGame = async (
  code: string,
  nickname: string,
): Promise<PlayerResponse> => {
  const res = await api.post<APISuccessResponse<PlayerResponse>>(
    `/games/${code}/join`,
    { nickname },
  );
  return res.data.data;
};

export const getPlayers = async (code: string): Promise<PlayerResponse[]> => {
  const res = await api.get<APISuccessResponse<PlayerResponse[]>>(
    `/games/${code}/players`,
  );
  return res.data.data;
};

export const leaveGame = async ({
  gameCode,
  playerId,
}: {
  gameCode: string;
  playerId: number;
}) => {
  await api.delete(`/games/${gameCode}/players/${playerId}`);
};
