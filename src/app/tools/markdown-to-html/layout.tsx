import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Markdown to HTML Converter Online - PrestoKit",
  description:
    "Convert Markdown to HTML instantly with live preview. Supports headings, bold, italic, links, images, code blocks, tables, lists, and more. Free online Markdown converter.",
  keywords: [
    "markdown to html converter",
    "markdown converter",
    "markdown to html online",
    "convert markdown",
    "markdown preview",
    "markdown parser",
    "markdown editor",
    "markdown renderer",
    "md to html",
    "free markdown converter",
    "markdown table converter",
    "markdown code block",
  ],
  openGraph: {
    title: "Free Markdown to HTML Converter Online - PrestoKit",
    description:
      "Convert Markdown to HTML with live preview. Supports all common Markdown syntax. Free, instant, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/markdown-to-html",
  },
};

export default function MarkdownToHtmlLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
