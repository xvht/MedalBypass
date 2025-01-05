import { type NextRequest } from "next/server";

export const runtime = "edge";

const allowedDomains = ["medal.tv", "cdn.medal.tv"];

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url || !URL.canParse(url)) {
    return new Response("Invalid URL", { status: 400 });
  }
  const hostname = new URL(url).hostname;
  if (!allowedDomains.some((domain) => hostname === domain)) {
    return new Response("URL is not allowed", { status: 403 });
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 seconds timeout

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "*/*",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const contentType = response.headers.get("content-type") ?? "video/mp4";
    const fileName = new URL(url).pathname.split("/").pop() ?? "video.mp4";

    const responseBody = response.body;
    if (!responseBody) {
      throw new Error("Response body is null");
    }

    return new Response(responseBody, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error(`Error downloading video from ${url}:`, error);
    return new Response("Error downloading video", { status: 500 });
  }
}
