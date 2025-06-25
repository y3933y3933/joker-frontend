import * as z from "zod/v4";

export const PlayerSchema = z.object({
  id: z.int().positive(),
  nickname: z.string(),
  isHost: z.boolean(),
});

export type Player = z.infer<typeof PlayerSchema>;

export const CreateGameResponseSchema = z.object({
  id: z.int().positive(),
  code: z.string(),
  level: z.literal(["easy", "normal", "spicy"]),
});

export type CreateGameResponse = z.infer<typeof CreateGameResponseSchema>;

export const PlayersSchema = z.array(PlayerSchema);

export const GameSchema = z.object({
  id: z.int().positive(),
  code: z.string(),
  level: z.literal(["easy", "normal", "spicy"]),
});

export type Game = z.infer<typeof GameSchema>;

export const QuestionSchema = z.object({
  id: z.int().positive(),
  content: z.string(),
});

export type Question = z.infer<typeof QuestionSchema>;

export const QuestionsSchema = z.array(QuestionSchema);

export const DrawCardResSchema = z.object({
  isJoker: z.boolean(),
});
