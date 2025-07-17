import * as z from "zod/v4";

export const QuestionSchema = z.object({
  id: z.number(),
  level: z.enum(["normal", "spicy"]),
  content: z.string(),
  createdAt: z.iso.datetime({ offset: true }).transform((dateStr) => {
    return new Date(dateStr).toLocaleString("zh-TW");
  }),
});

export const QuestionsResponseSchema = z.object({
  questions: z.array(QuestionSchema).min(1),
  totalCount: z.number().optional(),
  currentPage: z.number().optional(),
  pageSize: z.number().optional(),
  firstPage: z.number().optional(),
  lastPage: z.number().optional(),
});

export const QuestionFiltersSchema = z.object({
  keyword: z.string().optional(),
  level: z.enum(["normal", "spicy"]).optional(),
  sort_by: z.enum(["created_at_asc", "created_at_desc"]).optional(),
  page: z.number().min(1).optional(),
  page_size: z.number().min(1).max(100).optional(),
});

export type QuestionFilters = z.infer<typeof QuestionFiltersSchema>;
