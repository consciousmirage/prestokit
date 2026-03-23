import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Hashtag Generator | Instagram, TikTok & Twitter Hashtags - PrestoKit",
  description:
    "Generate trending hashtags for Instagram, TikTok, and Twitter by topic. Get relevant, high-engagement hashtags instantly. Free online hashtag generator — no signup required.",
  keywords: [
    "hashtag generator",
    "instagram hashtag generator",
    "tiktok hashtag generator",
    "twitter hashtag generator",
    "free hashtag generator",
    "trending hashtags",
    "hashtag finder",
    "best hashtags for instagram",
    "social media hashtags",
    "hashtag ideas",
    "generate hashtags",
    "hashtag tool",
  ],
  openGraph: {
    title: "Free Hashtag Generator | Instagram, TikTok & Twitter Hashtags - PrestoKit",
    description:
      "Generate trending hashtags for Instagram, TikTok, and Twitter by topic. Free, no signup.",
    url: "https://prestokit.com/tools/hashtag-generator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/hashtag-generator",
  },
};

export default function HashtagGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
