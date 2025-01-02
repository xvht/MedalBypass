import { type NextRequest } from "next/server";

const allowedDomains = ["medal.tv", "cdn.medal.tv"];

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return new Response("URL is required", { status: 400 });
  }

  if (!allowedDomains.some((domain) => url.includes(domain))) {
    return new Response("URL is not allowed", { status: 403 });
  }

  try {
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        Accept: "*/*",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch video: ${response.status} ${response.statusText}`,
      );
    }

    // Get content type and filename
    const contentType = response.headers.get("content-type") ?? "video/mp4";
    const fileName = new URL(url).pathname.split("/").pop() ?? "video.mp4";

    // Return the streamed response
    return new Response(response.body, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${fileName}"`,
      },
    });
  } catch (error) {
    console.error("Error downloading video:", error);
    return new Response("Error downloading video", { status: 500 });
  }
}
