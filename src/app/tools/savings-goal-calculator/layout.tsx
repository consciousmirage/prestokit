import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Savings Goal Calculator | How Long to Save Money - PrestoKit",
  description:
    "Calculate how long it will take to reach your savings goal. Enter your goal amount, current savings, monthly contribution, and interest rate to see your timeline, total interest earned, and month-by-month projection. Free — no signup required.",
  keywords: [
    "savings goal calculator",
    "how long to save money",
    "savings calculator",
    "reach savings goal",
    "savings timeline calculator",
    "how long to save",
    "savings target calculator",
    "emergency fund calculator",
    "savings projection calculator",
    "free savings calculator",
  ],
  openGraph: {
    title: "Free Savings Goal Calculator | How Long to Save Money - PrestoKit",
    description:
      "See how long it takes to reach your savings goal with your current contributions. Month-by-month projection included. Free, no signup.",
    url: "https://prestokit.com/tools/savings-goal-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/savings-goal-calculator",
  },
};

export default function SavingsGoalCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
