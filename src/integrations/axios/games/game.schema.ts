import * as z from "zod/v4";

export const PlayerSchema = z.object({
  id: z.int().positive(),
  nickname: z.string(),
  isHost: z.boolean(),
  gameID: z.int().positive(),
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
  isJoker: z.boolean(),
});

export const PlayerSummarySchema = z.object({
  playerId: z.number(),
  nickname: z.string(),
  questionsAsked: z.number(),
  questionsAnswered: z.number(),
  jokerCardsDrawn: z.number(),
});

// export const RoundSummarySchema = z.object({
//   roundId: z.number(),
//   question: z.string(),
//   answer: z.string(),
//   isJoker: z.boolean(),
//   questionPlayerId: z.number(),
//   questionPlayerNickname: z.string(),
//   answerPlayerId: z.number(),
//   answerPlayerNickname: z.string(),
// });

export const QAItemSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

export const HighlightsSchema = z.object({
  luckiestPlayer: PlayerSummarySchema,
  unluckiestPlayer: PlayerSummarySchema,
  bestQAs: z.array(QAItemSchema).nullable(), // 可以是 null 或 array
});

export const GameInfoSchema = z.object({
  code: z.string(),
  level: z.union([z.literal("easy"), z.literal("normal"), z.literal("spicy")]),
  totalRounds: z.number(),
  totalJokerCards: z.number(),
});

export const GameSummaryResponseSchema = z.object({
  game: GameInfoSchema,
  players: z.array(PlayerSummarySchema),
  // rounds: z.array(PlayerSummarySchema),
  highlights: HighlightsSchema,
});

export type GameSummary = z.infer<typeof GameSummaryResponseSchema>;
