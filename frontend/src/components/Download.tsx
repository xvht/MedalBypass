"use client";

import { PostBodySchema } from "@/schemas/PostBody";
import Download from "@/server/API";
import { useState } from "react";

export default function DownloadComponent() {
  const [link, setLink] = useState<string>("");
  const [id, setId] = useState<string>("");
  const [downloadLink, setDownloadLink] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const downloadVideo = async (url: string): Promise<void> => {
    if (!url) return;

    const data = await fetch(url);
    const blobLink = window.URL.createObjectURL(await data.blob());
    const link = document.createElement("a");

    link.href = blobLink;
    link.setAttribute("download", url.replace(/.*\//, ""));

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownload = async (value: string) => {
    const body = id ? { id: value } : { url: value };

    if (!PostBodySchema.safeParse(body).success) return;

    try {
      setLoading(true);
      const data = await Download(body);
      if (!data) return;

      setDownloadLink(data.src);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!PostBodySchema.safeParse({ url: e.target.value }).success) {
      setId(e.target.value);
      return;
    }

    setLink(e.target.value);
  };

  return (
    <div className="flex flex-col items-center">
      <input
        className="absolute bottom-72 rounded-md bg-neutral-900/80 px-4 py-2 text-white outline-none"
        placeholder="Link / ID"
        style={{
          width: "calc(35% - 2rem)",
          textAlign: "left",
        }}
        onChange={handleLinkChange}
      />
      <button
        className="absolute bottom-56 overflow-hidden rounded-2xl border border-hidden bg-neutral-900/80 px-4 py-2 font-semibold transition-all duration-300 ease-in-out"
        onClick={async () => await handleDownload(link)}
      >
        Submit
      </button>
      {loading && (
        <div className="absolute bottom-32">
          <div className="border-custom-main-second h-20 w-20 animate-spin rounded-full border-b-2 border-t-2"></div>
        </div>
      )}

      {/* {!loading && downloadLink && (
        <a
          href={downloadLink}
          className="hover:text-custom-main-second absolute bottom-40 font-semibold underline transition-colors duration-300 ease-in-out"
          target="_blank"
          rel="noreferrer noopener"
        >
          Download
        </a>
      )} */}

      {!loading && downloadLink && (
        <button
          className="hover:text-custom-main-second absolute bottom-40 font-semibold underline transition-colors duration-300 ease-in-out"
          onClick={() => downloadVideo(downloadLink)}
        >
          Download
        </button>
      )}
    </div>
  );
}
