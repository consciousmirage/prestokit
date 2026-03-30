import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Net Worth Calculator | Assets & Liabilities Calculator - PrestoKit",
  description:
    "Calculate your personal net worth instantly. Enter your assets (cash, investments, real estate) and liabilities (mortgage, loans, credit cards) to see your net worth and financial health. Free — no signup required.",
  keywords: [
    "net worth calculator",
    "how to calculate net worth",
    "personal net worth",
    "assets and liabilities calculator",
    "net worth tracker",
    "personal finance calculator",
    "wealth calculator",
    "financial net worth",
    "total assets calculator",
    "free net worth calculator",
  ],
  openGraph: {
    title: "Free Net Worth Calculator | Assets & Liabilities Calculator - PrestoKit",
    description:
      "Calculate your personal net worth by entering your assets and liabilities. Get instant financial health insights. Free, no signup.",
    url: "https://prestokit.com/tools/net-worth-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/net-worth-calculator",
  },
};

export default function NetWorthCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
