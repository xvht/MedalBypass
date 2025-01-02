export async function getVideoURL(url: string): Promise<string | null> {
  try {
    const clipId = extractClipID(url);
    const fetchURL = clipId ? `https://medal.tv/?contentId=${clipId}` : url;

    const res = await fetch(fetchURL);
    const html = await res.text();

    const videoContentURL = html.split('"contentUrl":"')[1]?.split('","')[0];
    if (videoContentURL) return videoContentURL;

    const videoMetaUrl = html
      .split('property="og:video:url" content="')[1]
      ?.split('"')[0];
    if (videoMetaUrl) return videoMetaUrl;

    return null;
  } catch (error) {
    console.error("Error fetching video URL:", error);
    return null;
  }
}

export function extractClipID(url: string): string | false {
  const clipIdMatch = url.match(/\/clips\/([^\/?&]+)/);
  const contentIdMatch = url.match(/[?&]contentId=([^&]+)/);

  if (clipIdMatch) return clipIdMatch[1];
  if (contentIdMatch) return contentIdMatch[1];
  return false;
}
