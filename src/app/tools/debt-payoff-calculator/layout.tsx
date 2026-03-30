import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Debt Payoff Calculator | Snowball vs Avalanche Strategy - PrestoKit",
  description:
    "Calculate your debt payoff date, total interest paid, and compare debt snowball vs debt avalanche strategies. Add multiple debts and extra payments to find the fastest path to debt freedom. Free — no signup required.",
  keywords: [
    "debt payoff calculator",
    "debt snowball calculator",
    "debt avalanche calculator",
    "how to pay off debt",
    "debt freedom calculator",
    "credit card payoff calculator",
    "debt repayment calculator",
    "snowball vs avalanche",
    "pay off debt faster",
    "free debt payoff calculator",
  ],
  openGraph: {
    title: "Free Debt Payoff Calculator | Snowball vs Avalanche Strategy - PrestoKit",
    description:
      "Compare debt snowball vs avalanche strategies, see your payoff date and total interest. Add multiple debts. Free, no signup.",
    url: "https://prestokit.com/tools/debt-payoff-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/debt-payoff-calculator",
  },
};

export default function DebtPayoffCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
