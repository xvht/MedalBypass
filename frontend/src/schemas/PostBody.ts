import { z } from "zod";

export const PostBodySchema = z.object({
  url: z.string().url(),
});

export type PostBodyType = z.infer<typeof PostBodySchema>;
