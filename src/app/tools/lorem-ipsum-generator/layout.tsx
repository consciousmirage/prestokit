import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Lorem Ipsum Generator | Placeholder Text Generator - PrestoKit",
  description:
    "Generate lorem ipsum placeholder text for your designs, mockups, and layouts. Choose paragraphs, sentences, or words. Free online lorem ipsum generator.",
  keywords: [
    "lorem ipsum generator",
    "placeholder text generator",
    "dummy text generator",
    "lorem ipsum",
    "free lorem ipsum",
    "lipsum generator",
    "filler text generator",
    "random text generator",
    "lorem ipsum online",
    "design placeholder text",
  ],
  openGraph: {
    title: "Free Lorem Ipsum Generator | Placeholder Text Generator - PrestoKit",
    description:
      "Generate lorem ipsum placeholder text for designs and mockups. Choose paragraphs, sentences, or words. Free, instant.",
    type: "website",
    url: "https://prestokit.com/tools/lorem-ipsum-generator",
  },
};

export default function LoremIpsumGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
