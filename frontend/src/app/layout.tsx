import "@/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import type { Viewport, Metadata } from "next";
import _static from "@/static";

export const metadata: Metadata = {
  title: "Medal Bypass | xvht",
  description:
    "Download Medal clips without the app. No ads, no tracking, no bullshit.",
  openGraph: {
    type: "website",
    url: "https://md.xvh.lol",
    title: "Medal Bypass | xvht",
    description:
      "Download Medal clips without the app. No ads, no tracking, no bullshit.",
  },
  creator: "xvht",
  keywords: [
    "medal",
    "medal.tv",
    "medal bypass",
    "medal downloader",
    "medal clip downloader",
    "medal clip",
    "medal clip bypass",
    "medal clip download",
  ],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
  themeColor: _static.colors.first,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
