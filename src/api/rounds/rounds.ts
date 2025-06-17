import type { APISuccessResponse } from "../api.type";
import api from "../instance";
import type {
  CreateRoundRequest,
  CreateRoundResponse,
  GetCurrentRoundRequest,
  GetCurrentRoundResponse,
} from "./rounds.type";

export const createRound = async ({
  code,
  playerId,
}: CreateRoundRequest): Promise<CreateRoundResponse> => {
  const res = await api.post<APISuccessResponse<CreateRoundResponse>>(
    `/games/${code}/rounds`,
    { playerId },
  );

  return res.data.data;
};

export const getCurrentRound = async ({
  code,
  playerId,
}: GetCurrentRoundRequest): Promise<GetCurrentRoundResponse> => {
  const res = await api.get<APISuccessResponse<GetCurrentRoundResponse>>(
    `/games/${code}/rounds/current?player_id=${playerId}`,
  );

  return res.data.data;
};

export const createNextRound = async (code: string): Promise<void> => {
  await api.post(`/games/${code}/rounds/next`);
};
