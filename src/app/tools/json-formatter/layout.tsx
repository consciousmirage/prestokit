import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free JSON Formatter, Validator & Minifier Online - PrestoKit",
  description:
    "Format, validate, and minify JSON online. Pretty print with syntax highlighting, validate with error messages, and minify JSON. Free online JSON formatter tool.",
  keywords: [
    "JSON formatter",
    "JSON validator",
    "JSON minifier",
    "JSON beautifier",
    "JSON pretty print",
    "format JSON online",
    "validate JSON online",
    "minify JSON online",
    "JSON syntax checker",
    "JSON lint",
    "JSON parser",
    "JSON viewer",
  ],
  openGraph: {
    title: "Free JSON Formatter, Validator & Minifier Online - PrestoKit",
    description:
      "Format, validate, and minify JSON with syntax highlighting. Find errors instantly. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/json-formatter",
  },
};

export default function JsonFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
