import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Word Counter & Character Counter Online - PrestoKit",
  description:
    "Count words, characters, sentences, and paragraphs in your text instantly. Get reading time, speaking time, and keyword density analysis. Free online word counter tool.",
  keywords: [
    "word counter",
    "character counter",
    "word count tool",
    "online word counter",
    "free word counter",
    "character count",
    "sentence counter",
    "paragraph counter",
    "reading time calculator",
    "keyword density checker",
  ],
  openGraph: {
    title: "Free Word Counter & Character Counter Online - PrestoKit",
    description:
      "Count words, characters, sentences, and paragraphs instantly. Get reading time and keyword density. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/word-counter",
  },
};

export default function WordCounterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
