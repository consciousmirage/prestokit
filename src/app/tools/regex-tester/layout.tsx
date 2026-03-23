import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Regex Tester | Regular Expression Tester Online - PrestoKit",
  description:
    "Test regular expressions with live matching and highlighting. Supports JavaScript regex flags. Free online regex tester — no signup required.",
  keywords: [
    "regex tester",
    "regular expression tester",
    "regex checker",
    "regex validator",
    "regex online",
    "test regex",
    "regex match",
    "regex pattern tester",
    "javascript regex",
    "regex debugger",
    "regex tool",
    "free regex tester",
  ],
  openGraph: {
    title: "Free Regex Tester | Regular Expression Tester Online - PrestoKit",
    description:
      "Test regular expressions with live matching and highlighting. Free, no signup.",
    url: "https://prestokit.com/tools/regex-tester",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/regex-tester",
  },
};

export default function RegexTesterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
