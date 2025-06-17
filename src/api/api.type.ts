export interface APISuccessResponse<T = unknown> {
  data: T;
  message: "success";
}
