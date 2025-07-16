import * as z from "zod/v4";

export const LoginResponseSchema = z.object({
  token: z.string(),
});

export type LoginResponse = z.infer<typeof LoginResponseSchema>;

export const AdminUserSchema = z.object({
  id: z.int().positive(),
  username: z.string(),
});
