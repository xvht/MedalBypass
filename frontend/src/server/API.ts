"use server";

import { env } from "@/env";
import { PostBodySchema, type PostBodyType } from "@/schemas/PostBody";
import { type Response } from "@/types/Download";

export default async function getURL(body: PostBodyType) {
  try {
    if (!PostBodySchema.safeParse(body).success) return;

    const res = await fetch(`${env.API_URL}/v1/api/clip`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
      body: JSON.stringify({ url: body.url }),
    });

    const data = (await res.json()) as Response;
    return data;
  } catch (e) {
    return;
  }
}
