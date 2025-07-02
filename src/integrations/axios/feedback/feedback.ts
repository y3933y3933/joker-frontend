import type { FeedbackType } from "@/types";
import api from "../axios-instance";

export const createFeedback = async ({
  type,
  content,
}: {
  type: FeedbackType;
  content: string;
}) => {
  const res = await api.post("/feedback", { type, content });
  return res.data;
};
