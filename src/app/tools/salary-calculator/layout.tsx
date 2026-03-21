import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Salary to Hourly Calculator | Convert Pay Rates & Estimate Taxes - PrestoKit",
  description:
    "Convert between salary, hourly, daily, weekly, and monthly pay rates instantly. Estimate federal and state taxes, FICA, and take-home pay. Compare two salaries side by side. Free online salary calculator.",
  keywords: [
    "salary to hourly calculator",
    "hourly to salary calculator",
    "salary calculator",
    "pay rate converter",
    "annual salary calculator",
    "take home pay calculator",
    "salary comparison calculator",
    "wage calculator",
    "income tax calculator",
    "free salary calculator",
  ],
  openGraph: {
    title: "Free Salary to Hourly Calculator | Convert Pay Rates - PrestoKit",
    description:
      "Convert between salary, hourly, daily, weekly, and monthly rates. Estimate taxes and take-home pay. Compare salaries. Free, no signup.",
    url: "https://prestokit.com/tools/salary-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/salary-calculator",
  },
};

export default function SalaryCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
