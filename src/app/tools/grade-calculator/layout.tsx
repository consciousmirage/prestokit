import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Grade Calculator | Final Grade & Weighted Average Calculator - PrestoKit",
  description:
    "Calculate what grade you need on your final exam, or find your weighted average grade from assignments and tests. Two modes: final grade calculator and weighted grade calculator. Free, no signup.",
  keywords: [
    "grade calculator",
    "final grade calculator",
    "what grade do I need on my final",
    "weighted grade calculator",
    "weighted average grade calculator",
    "grade needed on final exam",
    "course grade calculator",
    "GPA grade calculator",
    "assignment grade calculator",
    "free grade calculator",
  ],
  openGraph: {
    title: "Free Grade Calculator | Final Grade & Weighted Average - PrestoKit",
    description:
      "Find out what grade you need on your final, or calculate your weighted average from multiple assignments. Free, no signup.",
    url: "https://prestokit.com/tools/grade-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/grade-calculator",
  },
};

export default function GradeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
