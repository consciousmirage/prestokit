import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Loan Calculator | Monthly Payment & Amortization Schedule - PrestoKit",
  description:
    "Calculate loan monthly payments, total interest, and total cost. View a full amortization schedule showing principal vs interest breakdown for each payment. Free online loan calculator — no signup required.",
  keywords: [
    "loan calculator",
    "loan payment calculator",
    "monthly payment calculator",
    "amortization calculator",
    "amortization schedule",
    "personal loan calculator",
    "auto loan calculator",
    "car loan calculator",
    "loan interest calculator",
    "loan payoff calculator",
    "how much is my loan payment",
    "free loan calculator",
  ],
  openGraph: {
    title: "Free Loan Calculator | Monthly Payment & Amortization Schedule - PrestoKit",
    description:
      "Calculate loan monthly payments, total interest, and view full amortization schedule. Free, no signup.",
    url: "https://prestokit.com/tools/loan-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/loan-calculator",
  },
};

export default function LoanCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
