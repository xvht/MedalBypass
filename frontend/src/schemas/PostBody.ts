import { z } from "zod";

export const PostBodySchema = z.object({
  url: z.string().url().includes("medal.tv"),
});

export type PostBodyType = z.infer<typeof PostBodySchema>;
