import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Base64 Encoder & Decoder | Base64 Converter - PrestoKit",
  description:
    "Encode or decode Base64 strings instantly. Free online Base64 encoder and decoder with real-time conversion, copy button, and support for text and data. No signup required.",
  keywords: [
    "base64 encoder",
    "base64 decoder",
    "base64 converter",
    "encode base64",
    "decode base64",
    "base64 online",
    "base64 to text",
    "text to base64",
    "base64 encoding",
    "base64 decoding",
    "free base64 tool",
    "base64 string converter",
  ],
  openGraph: {
    title: "Free Base64 Encoder & Decoder | Base64 Converter - PrestoKit",
    description:
      "Encode or decode Base64 strings instantly. Free online tool with real-time conversion — no signup required.",
    url: "https://prestokit.com/tools/base64-encoder",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/base64-encoder",
  },
};

export default function Base64EncoderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
