import * as z from "zod/v4";

export const FeedbackSchema = z.object({
  id: z.number(),
  type: z.enum(["feature", "issue", "other"]),
  content: z.string(),
  reviewStatus: z.enum(["new", "reviewed"]),
  createdAt: z.iso.datetime({ offset: true }).transform((dateStr) => {
    return new Date(dateStr).toLocaleString("zh-TW");
  }),
});

export const FeedbackResponseSchema = z.object({
  feedback: z.array(FeedbackSchema).min(1),
  totalCount: z.number().optional(),
  currentPage: z.number().optional(),
  pageSize: z.number().optional(),
  firstPage: z.number().optional(),
  lastPage: z.number().optional(),
});

export const FeedbackFiltersSchema = z.object({
  type: z.enum(["feature", "issue", "other"]).optional(),
  reviewStatus: z.enum(["new", "reviewed"]).optional(),
  page: z.number().min(1).optional(),
  page_size: z.number().min(1).max(100).optional(),
});

export type FeedbackResponse = z.infer<typeof FeedbackSchema>;

export type FeedbackFilters = z.infer<typeof FeedbackFiltersSchema>;
