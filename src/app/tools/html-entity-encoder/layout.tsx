import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free HTML Entity Encoder & Decoder Online | Special Characters - PrestoKit",
  description:
    "Encode and decode HTML entities instantly. Convert special characters like &, <, >, and quotes to their HTML entity equivalents. Free online HTML entity encoder and decoder.",
  keywords: [
    "html entity encoder",
    "html entity decoder",
    "html special characters",
    "html entities",
    "encode html",
    "decode html entities",
    "html escape",
    "html unescape",
    "amp lt gt quot",
    "html character codes",
    "html entity converter",
    "html encoding tool",
  ],
  openGraph: {
    title: "Free HTML Entity Encoder & Decoder Online | Special Characters - PrestoKit",
    description:
      "Encode and decode HTML entities instantly. Convert special characters to HTML entities and back. Free, no signup.",
    url: "https://prestokit.com/tools/html-entity-encoder",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/html-entity-encoder",
  },
};

export default function HtmlEntityEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
