import * as z from "zod/v4";

export const PlayerSchema = z.object({
  id: z.int().positive(),
  nickname: z.string(),
  isHost: z.boolean(),
  gameID: z.int().positive(),
  status: z.literal(["online", "disconnected"]),
});

export type Player = z.infer<typeof PlayerSchema>;

export type PlayWithoutGameID = Omit<Player, "gameID">;

export const CreateGameResponseSchema = z.object({
  id: z.int().positive(),
  code: z.string(),
  status: z.literal(["waiting", "playing", "ended"]),
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
  level: z.literal(["normal", "spicy"]),
});

export type Question = z.infer<typeof QuestionSchema>;

export const QuestionsSchema = z.array(QuestionSchema);

export const DrawCardResSchema = z.object({
  joker: z.boolean(),
});

export const GameInfoSchema = z.object({
  code: z.string(),
  level: z.union([z.literal("easy"), z.literal("normal"), z.literal("spicy")]),
  totalRounds: z.number(),
  totalJokerCards: z.number(),
});

export const GamePlayerSummary = z.object({
  id: z.int().positive(),
  nickname: z.string(),
  jokerCardsDrawn: z.int(),
});

export const GameSummaryResponseSchema = z.object({
  totalRounds: z.int(),
  jokerCards: z.int(),
  players: z.array(GamePlayerSummary),
});

export type GameSummary = z.infer<typeof GameSummaryResponseSchema>;
