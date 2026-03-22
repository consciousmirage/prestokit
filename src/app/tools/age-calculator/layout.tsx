import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Age Calculator | How Old Am I? Exact Age in Years, Months, Days - PrestoKit",
  description:
    "Calculate your exact age in years, months, days, hours, and minutes. Find out how old you are today, your next birthday countdown, and fun age stats. Free online age calculator — no signup required.",
  keywords: [
    "age calculator",
    "how old am I",
    "calculate my age",
    "birthday calculator",
    "age in days",
    "age in months",
    "exact age calculator",
    "date of birth calculator",
    "birthday countdown",
    "age difference calculator",
    "how many days old am I",
    "free age calculator",
  ],
  openGraph: {
    title: "Free Age Calculator | How Old Am I? Exact Age in Years, Months, Days - PrestoKit",
    description:
      "Calculate your exact age in years, months, days, hours, and minutes. Birthday countdown included. Free, no signup.",
    url: "https://prestokit.com/tools/age-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/age-calculator",
  },
};

export default function AgeCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
