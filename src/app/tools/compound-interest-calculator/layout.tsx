import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Compound Interest Calculator | Savings & Investment Growth - PrestoKit",
  description:
    "Calculate compound interest on savings and investments with monthly contributions. See year-by-year growth charts and total interest earned. Free online compound interest calculator — no signup required.",
  keywords: [
    "compound interest calculator",
    "investment calculator",
    "savings calculator",
    "compound interest formula",
    "interest calculator",
    "investment growth calculator",
    "savings growth calculator",
    "how much will my savings grow",
    "compound interest with contributions",
    "free compound interest calculator",
    "money growth calculator",
    "retirement calculator",
  ],
  openGraph: {
    title: "Free Compound Interest Calculator | Savings & Investment Growth - PrestoKit",
    description:
      "Calculate compound interest with monthly contributions. See year-by-year growth charts and total interest earned. Free, no signup.",
    url: "https://prestokit.com/tools/compound-interest-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/compound-interest-calculator",
  },
};

export default function CompoundInterestCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
