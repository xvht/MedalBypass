export function configureURL(url: string): string | false {
  if (!url) return false;
  if (!url.toLowerCase().includes("medal")) {
    if (!url.includes("/")) {
      url = "https://medal.tv/?contentId=" + url.trim();
    } else {
      return false;
    }
  }

  if (
    url.toLowerCase().indexOf("https://") !==
    url.toLowerCase().lastIndexOf("https://")
  ) {
    return false;
  }

  if (!url.toLowerCase().includes("https://")) {
    url = "https://" + url;
  }

  url = url.replace("?theater=true", "");
  return url.trim();
}

export function checkURL(url: string): boolean {
  try {
    if (!url) return false;
    if (!new URL(url).hostname.toLowerCase().includes("medal")) {
      return false;
    }
  } catch {
    return false;
  }
  return true;
}
