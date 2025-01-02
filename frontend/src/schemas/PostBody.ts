import { z } from "zod";

export const PostBodySchema = z.object({
  url: z.string().url().optional(),
  id: z.string().optional(),
});

export type PostBodyType = z.infer<typeof PostBodySchema>;
