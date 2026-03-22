import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Character Counter | Count Characters for Twitter, Instagram & More - PrestoKit",
  description:
    "Count characters, words, sentences, and paragraphs in real time. See limits for Twitter/X (280), Instagram (2,200), YouTube (5,000), LinkedIn, TikTok, and more. Free online character counter — no signup required.",
  keywords: [
    "character counter",
    "character count",
    "letter counter",
    "twitter character counter",
    "instagram character limit",
    "text character counter",
    "character counter online",
    "word counter",
    "social media character limit",
    "count characters",
    "how many characters",
    "free character counter",
  ],
  openGraph: {
    title: "Free Character Counter | Count Characters for Twitter, Instagram & More - PrestoKit",
    description:
      "Count characters, words, and sentences in real time. See social media limits for Twitter, Instagram, YouTube, and more. Free, no signup.",
    url: "https://prestokit.com/tools/character-counter",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/character-counter",
  },
};

export default function CharacterCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
