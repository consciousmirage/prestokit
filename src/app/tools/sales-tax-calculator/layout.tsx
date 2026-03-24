import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Sales Tax Calculator | Calculate Sales Tax Instantly - PrestoKit",
  description:
    "Calculate sales tax for any US state instantly. Enter your subtotal and tax rate to see the total with tax. Includes preset rates for all 50 states. Free online sales tax calculator — no signup required.",
  keywords: [
    "sales tax calculator",
    "calculate sales tax",
    "sales tax by state",
    "how much is sales tax",
    "tax calculator",
    "state sales tax rates",
    "sales tax estimator",
    "add sales tax",
    "total with tax",
    "free sales tax calculator",
    "US sales tax calculator",
    "purchase tax calculator",
  ],
  openGraph: {
    title: "Free Sales Tax Calculator | Calculate Sales Tax Instantly - PrestoKit",
    description:
      "Calculate sales tax for any US state. Enter subtotal and tax rate to see the total with tax. Free, no signup.",
    url: "https://prestokit.com/tools/sales-tax-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/sales-tax-calculator",
  },
};

export default function SalesTaxCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
