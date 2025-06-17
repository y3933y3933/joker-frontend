export interface APISuccessResponse<T = unknown> {
  data: T;
  message: "success";
}

export interface APIErrorResponse {
  error: string;
}
