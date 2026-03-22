import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free GPA Calculator | Calculate Your Grade Point Average - PrestoKit",
  description:
    "Calculate your GPA instantly with our free GPA calculator. Supports weighted and unweighted GPA, multiple grading scales, and unlimited courses. See cumulative and semester GPA — no signup required.",
  keywords: [
    "GPA calculator",
    "grade point average calculator",
    "college GPA calculator",
    "high school GPA calculator",
    "weighted GPA calculator",
    "unweighted GPA calculator",
    "cumulative GPA calculator",
    "semester GPA calculator",
    "calculate my GPA",
    "GPA calculator online",
    "how to calculate GPA",
    "free GPA calculator",
  ],
  openGraph: {
    title: "Free GPA Calculator | Calculate Your Grade Point Average - PrestoKit",
    description:
      "Calculate weighted and unweighted GPA instantly. Add unlimited courses, multiple grading scales. Free, no signup.",
    url: "https://prestokit.com/tools/gpa-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/gpa-calculator",
  },
};

export default function GPACalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
