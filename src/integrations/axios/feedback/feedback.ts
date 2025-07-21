import type { FeedbackType } from "@/types";
import api from "../axios-instance";
import {
  FeedbackResponseSchema,
  FeedbackSchema,
  type FeedbackFilters,
} from "./feedback.schema";

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

export const getPaginatedFeedback = async (filters?: FeedbackFilters) => {
  const params = new URLSearchParams();
  if (filters?.type) {
    params.append("type", filters.type);
  }

  if (filters?.reviewStatus !== undefined) {
    params.append("reviewStatus", filters.reviewStatus);
  }
  if (filters?.page) {
    params.append("page", filters.page.toString());
  }

  if (filters?.page_size) {
    params.append("page_size", filters.page_size.toString());
  }

  const res = await api.get(`/admin/feedback?${params.toString()}`);
  return FeedbackResponseSchema.parse(res.data.data);
};

export const getFeedbackById = async (id: number) => {
  const res = await api.get(`/admin/feedback/${id}`);
  return FeedbackSchema.parse(res.data.data);
};

export const UpdateFeedbackReviewStatus = async ({
  id,
  reviewStatus,
}: {
  id: number;
  reviewStatus: "new" | "reviewed";
}) => {
  const res = await api.patch(`/admin/feedback/${id}/review-status`, {
    reviewStatus,
  });
  return res.data;
};
