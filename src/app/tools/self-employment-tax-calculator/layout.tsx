import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Self-Employment Tax Calculator | 1099 Tax Estimator - PrestoKit",
  description:
    "Calculate your self-employment tax (SE tax) for 2024 and 2025. See your Social Security and Medicare tax breakdown, deductible portion, and total SE tax owed. Free 1099 tax calculator — no signup required.",
  keywords: [
    "self employment tax calculator",
    "1099 tax calculator",
    "SE tax calculator",
    "freelance tax calculator",
    "self employed tax estimator",
    "how much self employment tax",
    "social security tax self employed",
    "medicare tax self employed",
    "independent contractor tax calculator",
    "gig worker tax calculator",
    "self employment tax rate",
    "schedule SE calculator",
  ],
  openGraph: {
    title: "Free Self-Employment Tax Calculator | 1099 Tax Estimator - PrestoKit",
    description:
      "Calculate your self-employment tax with Social Security and Medicare breakdown. Free 1099 tax calculator, no signup.",
    url: "https://prestokit.com/tools/self-employment-tax-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/self-employment-tax-calculator",
  },
};

export default function SelfEmploymentTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
