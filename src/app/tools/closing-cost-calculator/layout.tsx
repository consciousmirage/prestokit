import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Closing Cost Calculator — Free | PrestoKit",
  description:
    "Estimate closing costs for buyers and sellers. Calculate title fees, transfer taxes, loan origination, escrow, and more. Free, no signup.",
  keywords: [
    "closing cost calculator",
    "home closing costs",
    "buyer closing costs",
    "seller closing costs",
    "mortgage closing costs",
    "real estate closing fees",
  ],
  openGraph: {
    title: "Closing Cost Calculator — Free | PrestoKit",
    description:
      "Estimate closing costs for buyers and sellers. Calculate title fees, transfer taxes, loan origination, escrow, and more. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/closing-cost-calculator",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/closing-cost-calculator",
  },
};

export default function ClosingCostLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
