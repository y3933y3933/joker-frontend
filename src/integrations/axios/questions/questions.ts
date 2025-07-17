import api from "../axios-instance";
import {
  QuestionSchema,
  QuestionsResponseSchema,
  type QuestionFilters,
} from "./questions.schema";

export const getPaginatedQuestions = async (filters?: QuestionFilters) => {
  // 建立查詢參數
  const params = new URLSearchParams();

  if (filters?.keyword) {
    params.append("keyword", filters.keyword);
  }

  if (filters?.level) {
    params.append("level", filters.level);
  }

  if (filters?.sort_by) {
    params.append("sort_by", filters.sort_by);
  }

  if (filters?.page) {
    params.append("page", filters.page.toString());
  }

  if (filters?.page_size) {
    params.append("page_size", filters.page_size.toString());
  }

  const res = await api.get(`/admin/questions?${params.toString()}`);

  return QuestionsResponseSchema.parse(res.data.data);
};

export const getQuestionById = async (id: number) => {
  const res = await api.get(`/admin/questions/${id}`);
  return QuestionSchema.parse(res.data.data);
};

export const createQuestion = async (data: {
  level: "normal" | "spicy";
  content: string;
}) => {
  const res = await api.post("/admin/questions", data);
  return QuestionSchema.parse(res.data.data);
};

export const updateQuestion = async (
  id: number,
  data: { level: "normal" | "spicy"; content: string },
) => {
  const res = await api.put(`/admin/questions/${id}`, data);
  return QuestionSchema.parse(res.data.data);
};

export const deleteQuestion = async (id: number) => {
  const res = await api.delete(`/admin/questions/${id}`);
  return res.data;
};
