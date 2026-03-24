import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free URL Encoder & Decoder Online | Percent Encoding - PrestoKit",
  description:
    "Encode or decode URLs instantly with this free online URL encoder and decoder. Supports percent encoding (encodeURIComponent), special characters, and query strings. No signup required.",
  keywords: [
    "url encoder",
    "url decoder",
    "percent encoding",
    "url encode online",
    "url decode online",
    "encodeURIComponent",
    "decodeURIComponent",
    "url escape",
    "url unescape",
    "query string encoder",
    "url special characters",
    "percent decode",
  ],
  openGraph: {
    title: "Free URL Encoder & Decoder Online | Percent Encoding - PrestoKit",
    description:
      "Encode or decode URLs instantly. Free online URL encoder and decoder with percent encoding support — no signup required.",
    url: "https://prestokit.com/tools/url-encoder",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/url-encoder",
  },
};

export default function UrlEncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
