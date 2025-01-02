"use client";

import GetURL from "@/server/API";
import { useState } from "react";

export default function DownloadComponent() {
  const [link, setLink] = useState<string>("");
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const downloadVideo = async (url: string): Promise<void> => {
    if (!url) return;

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", url.replace(/[^a-zA-Z0-9]/g, ""));

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = async (url: string) => {
    if (!link) return;

    try {
      setLoading(true);
      const data = await GetURL({
        url,
      });

      if (!data) return;
      setDownloadLink(data.src);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        className="absolute bottom-72 rounded-md bg-neutral-900/80 px-4 py-2 text-white outline-none"
        placeholder="Clip URL"
        style={{
          width: "calc(35% - 2rem)",
          textAlign: "left",
        }}
        onChange={(e) => setLink(e.target.value)}
      />
      <button
        className="absolute bottom-56 overflow-hidden rounded-2xl border border-hidden bg-neutral-900/80 px-4 py-2 font-semibold transition-all duration-300 ease-in-out"
        onClick={async () => await handleDownload(link)}
      >
        Submit
      </button>
      {loading && (
        <div className="absolute bottom-32">
          <div className="h-20 w-20 animate-spin rounded-full border-b-2 border-t-2 border-custom-main-second"></div>
        </div>
      )}

      {!loading && downloadLink && (
        <button
          className="absolute bottom-40 font-semibold underline transition-colors duration-300 ease-in-out hover:text-custom-main-second"
          onClick={() => downloadVideo(downloadLink)}
        >
          Download
        </button>
      )}
    </div>
  );
}
