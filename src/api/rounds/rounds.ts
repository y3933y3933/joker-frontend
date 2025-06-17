import type { APISuccessResponse } from "../api.type";
import api from "../instance";
import type { CreateRoundRequest, CreateRoundResponse } from "./rounds.type";

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
