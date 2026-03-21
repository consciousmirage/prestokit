import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Mortgage Calculator | Calculate Monthly Payments & Amortization - PrestoKit",
  description:
    "Calculate your monthly mortgage payment, total interest paid, and view a full amortization schedule. Supports extra payments to see how much time and money you can save. Free online mortgage calculator.",
  keywords: [
    "mortgage calculator",
    "monthly mortgage payment",
    "mortgage payment calculator",
    "home loan calculator",
    "amortization calculator",
    "amortization schedule",
    "mortgage interest calculator",
    "extra mortgage payment calculator",
    "house payment calculator",
    "free mortgage calculator",
  ],
  openGraph: {
    title: "Free Mortgage Calculator | Monthly Payments & Amortization - PrestoKit",
    description:
      "Calculate monthly mortgage payments, total interest, and amortization. See how extra payments save you time and money. Free, no signup.",
    url: "https://prestokit.com/tools/mortgage-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/mortgage-calculator",
  },
};

export default function MortgageCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
