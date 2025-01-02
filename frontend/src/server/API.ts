"use server";

import { env } from "@/env";
import { type Response } from "@/types/Download";
import { PostBodySchema, type PostBodyType } from "@/schemas/PostBody";

export default async function Download(body: PostBodyType) {
  try {
    if (!PostBodySchema.safeParse(body)) return;

    const res = await fetch(`${env.API_URL}/api/clip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url: body.url }),
    });

    const data = (await res.json()) as Response;
    return data;
  } catch (e) {
    return;
  }
}
