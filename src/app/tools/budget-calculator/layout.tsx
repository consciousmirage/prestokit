import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Budget Calculator | Monthly Budget Planner & 50/30/20 Rule - PrestoKit",
  description:
    "Plan your monthly budget with our free calculator. Enter your income and expenses by category, see where your money goes, and check if you're following the 50/30/20 budgeting rule. Free — no signup required.",
  keywords: [
    "budget calculator",
    "monthly budget calculator",
    "50 30 20 rule calculator",
    "personal budget planner",
    "budget planner",
    "monthly budget planner",
    "household budget calculator",
    "50/30/20 budget",
    "budget tracker",
    "how to budget",
    "free budget calculator",
  ],
  openGraph: {
    title: "Free Budget Calculator | Monthly Budget Planner & 50/30/20 Rule - PrestoKit",
    description:
      "Plan your monthly budget, see spending by category, and check your 50/30/20 rule compliance. Free, no signup.",
    url: "https://prestokit.com/tools/budget-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/budget-calculator",
  },
};

export default function BudgetCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
