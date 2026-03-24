import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Readability Score Checker | Flesch-Kincaid Calculator - PrestoKit",
  description:
    "Check the readability of your text with Flesch-Kincaid Grade Level, Flesch Reading Ease, word count, sentence count, and grade-level interpretation. Free online readability checker — no signup required.",
  keywords: [
    "readability checker",
    "readability score",
    "flesch kincaid calculator",
    "flesch reading ease",
    "readability test",
    "grade level checker",
    "text readability",
    "reading level checker",
    "flesch kincaid grade level",
    "content readability",
    "writing readability score",
    "readability analyzer",
  ],
  openGraph: {
    title: "Free Readability Score Checker | Flesch-Kincaid Calculator - PrestoKit",
    description:
      "Check the readability of your writing with Flesch-Kincaid scores, grade level analysis, and improvement suggestions. Free, no signup.",
    url: "https://prestokit.com/tools/readability-checker",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/readability-checker",
  },
};

export default function ReadabilityCheckerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
