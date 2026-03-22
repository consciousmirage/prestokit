import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Paycheck Calculator | Estimate Take-Home Pay After Taxes - PrestoKit",
  description:
    "Calculate your take-home pay after federal and state taxes, Social Security, and Medicare. Estimate net pay for any salary or hourly wage. Free online paycheck calculator — no signup required.",
  keywords: [
    "paycheck calculator",
    "take home pay calculator",
    "salary after taxes",
    "net pay calculator",
    "paycheck estimator",
    "how much will my paycheck be",
    "after tax income calculator",
    "hourly paycheck calculator",
    "salary paycheck calculator",
    "free paycheck calculator",
    "payroll calculator",
    "wage calculator after taxes",
  ],
  openGraph: {
    title: "Free Paycheck Calculator | Estimate Take-Home Pay After Taxes - PrestoKit",
    description:
      "Calculate your take-home pay after federal tax, state tax, Social Security, and Medicare. Free, no signup.",
    url: "https://prestokit.com/tools/paycheck-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/paycheck-calculator",
  },
};

export default function PaycheckCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
