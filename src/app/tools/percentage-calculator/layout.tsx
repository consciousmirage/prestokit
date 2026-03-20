import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Percentage Calculator | Calculate Percentages Online - PrestoKit",
  description:
    "Calculate percentages instantly. Find what percent of a number, percentage change, increase, and decrease. Free online percentage calculator with multiple modes.",
  keywords: [
    "percentage calculator",
    "percent calculator",
    "calculate percentage",
    "percentage change calculator",
    "percentage increase calculator",
    "percentage decrease calculator",
    "what percent of",
    "free percentage calculator",
    "online percent calculator",
    "percentage difference calculator",
  ],
  openGraph: {
    title: "Free Percentage Calculator | Calculate Percentages Online - PrestoKit",
    description:
      "Calculate percentages instantly with multiple modes. Percentage of, percentage change, increase & decrease. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/percentage-calculator",
  },
};

export default function PercentageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
