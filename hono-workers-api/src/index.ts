import { type Context, Hono } from "hono";
import { cors } from "hono/cors";
import { getVideoURL } from "./utils/video";
import { configureURL, checkURL } from "./utils/url";
import type { ClipResponse } from "./types";

const app = new Hono();

app.use("*", cors());

app.get("/api/clip", async (c) => {
  const url = c.req.query("url") || c.req.query("id");
  if (!url) {
    return c.json<ClipResponse>(
      {
        valid: false,
        reasoning: "No URL provided",
      },
      400
    );
  }

  return await handleClipRequest(url, c);
});

app.post("/api/clip", async (c) => {
  const body = await c.req.json();
  const url = body.url || body.id;
  return await handleClipRequest(url, c);
});

app.get("/api/download", async (c) => {
  const url = c.req.query("url");
  if (!url) {
    return c.json<ClipResponse>(
      {
        valid: false,
        reasoning: "No URL provided",
      },
      400
    );
  }

  const mUrl = configureURL(url);

  if (!mUrl || !checkURL(mUrl)) {
    return c.json<ClipResponse>(
      {
        valid: false,
        reasoning: "Invalid URL",
      },
      400
    );
  }

  const videoURL = await getVideoURL(mUrl);
  if (!videoURL) {
    return c.json<ClipResponse>(
      {
        valid: false,
        reasoning: "Error fetching video",
      },
      500
    );
  }

  const res = await fetch(videoURL);

  c.header("Content-Type", "video/mp4");
  c.header("Content-Disposition", `attachment; filename="clip.mp4"`);
  return c.newResponse(res.body);
});

// Catch-all redirect
app.get("*", (c) => {
  return c.redirect(
    "https://github.com/Tyson3101/Medal-Bypass/blob/main/API.md"
  );
});

// Handler implementation
async function handleClipRequest(inputtedUrl: string, c: Context) {
  const url = configureURL(inputtedUrl);

  if (!url || !checkURL(url)) {
    return c.json<ClipResponse>(
      {
        valid: false,
        reasoning: "Invalid URL",
      },
      400
    );
  }

  try {
    const src = await getVideoURL(url);
    if (!src) {
      return c.json<ClipResponse>(
        {
          valid: false,
          reasoning: "No clip found",
        },
        404
      );
    }

    return c.json<ClipResponse>({ valid: true, src });
  } catch (error) {
    return c.json<ClipResponse>(
      {
        valid: false,
        reasoning: "Error fetching clip",
      },
      500
    );
  }
}

export default app;
