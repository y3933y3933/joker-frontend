import * as z from "zod/v4";

export const CreateGameResponseSchema = z.object({
  id: z.int().positive(),
  code: z.string(),
  level: z.literal(["easy", "normal", "spicy"]),
});

export type CreateGameResponse = z.infer<typeof CreateGameResponseSchema>;

export const JoinGameResponseSchema = z.object({
  id: z.int().positive(),
  nickname: z.string(),
  isHost: z.boolean(),
});

export type JoinGameResponseResponse = z.infer<typeof JoinGameResponseSchema>;
