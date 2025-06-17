import type { APIErrorResponse } from "@/api/api.type";
import { AxiosError } from "axios";

export function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  if (typeof err === "object" && err !== null) {
    if ((err as AxiosError<APIErrorResponse>).isAxiosError) {
      return (
        (err as AxiosError<APIErrorResponse>).response?.data?.error ??
        "發生未知錯誤"
      );
    }
  }
  return "發生未知錯誤";
}
