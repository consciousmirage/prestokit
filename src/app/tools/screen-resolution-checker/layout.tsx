import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Screen Resolution Checker | Display Info Tool - PrestoKit",
  description:
    "Check your screen resolution, DPI, aspect ratio, color depth, and device pixel ratio instantly. Free online screen resolution checker — no signup required.",
  keywords: [
    "screen resolution checker",
    "what is my screen resolution",
    "display resolution",
    "screen size checker",
    "monitor resolution",
    "dpi checker",
    "pixel density",
    "aspect ratio checker",
    "screen resolution test",
    "device pixel ratio",
    "screen info",
    "free screen resolution tool",
  ],
  openGraph: {
    title: "Free Screen Resolution Checker | Display Info Tool - PrestoKit",
    description:
      "Check your screen resolution, DPI, aspect ratio, and more. Free, no signup.",
    url: "https://prestokit.com/tools/screen-resolution-checker",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/screen-resolution-checker",
  },
};

export default function ScreenResolutionCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
