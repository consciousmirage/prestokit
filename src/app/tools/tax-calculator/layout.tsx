import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Tax Calculator | Estimate Federal Income Tax by Bracket - PrestoKit",
  description:
    "Calculate your estimated federal income tax by bracket for 2024 and 2025. See your effective tax rate, marginal rate, and tax breakdown by bracket. Free online income tax calculator — no signup required.",
  keywords: [
    "tax calculator",
    "income tax calculator",
    "federal tax calculator",
    "tax bracket calculator",
    "2024 tax calculator",
    "2025 tax calculator",
    "estimate income tax",
    "marginal tax rate",
    "effective tax rate",
    "free tax calculator",
    "tax estimator",
    "how much tax do I owe",
  ],
  openGraph: {
    title: "Free Tax Calculator | Estimate Federal Income Tax by Bracket - PrestoKit",
    description:
      "Calculate your estimated federal income tax by bracket. See effective and marginal tax rates instantly. Free, no signup.",
    url: "https://prestokit.com/tools/tax-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/tax-calculator",
  },
};

export default function TaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
