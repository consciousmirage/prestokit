import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Break Even Calculator | Break Even Analysis - PrestoKit",
  description:
    "Calculate your break-even point in units and revenue. Enter fixed costs, variable cost per unit, and price per unit to see how many units you need to sell. Free break even analysis tool — no signup required.",
  keywords: [
    "break even calculator",
    "break even analysis",
    "break even point",
    "breakeven calculator",
    "break even point calculator",
    "how many units to break even",
    "fixed cost variable cost",
    "contribution margin",
    "break even revenue",
    "business break even",
    "profit loss calculator",
    "free break even tool",
  ],
  openGraph: {
    title: "Free Break Even Calculator | Break Even Analysis - PrestoKit",
    description:
      "Calculate your break-even point in units and revenue. Free online break even analysis tool — no signup required.",
    url: "https://prestokit.com/tools/break-even-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/break-even-calculator",
  },
};

export default function BreakEvenCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
