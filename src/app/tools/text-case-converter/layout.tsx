import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Text Case Converter Online - UPPERCASE, lowercase, Title Case & More - PrestoKit",
  description:
    "Convert text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE and more. Free online text case converter tool.",
  keywords: [
    "text case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "sentence case converter",
    "camelCase converter",
    "snake_case converter",
    "kebab-case converter",
    "text transformation tool",
    "change text case online",
    "PascalCase converter",
    "CONSTANT_CASE converter",
  ],
  openGraph: {
    title: "Free Text Case Converter Online - PrestoKit",
    description:
      "Convert text between 13+ case formats: UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more. Free, instant, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/text-case-converter",
  },
};

export default function TextCaseConverterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
