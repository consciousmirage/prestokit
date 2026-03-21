import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Date Calculator & Countdown Timer | Days Between Dates - PrestoKit",
  description:
    "Calculate days between dates, add or subtract days, and countdown to events. Business days option, live countdown timer. Free online date calculator.",
  keywords: [
    "date calculator",
    "days between dates",
    "countdown timer",
    "date difference calculator",
    "add days to date",
    "subtract days from date",
    "business days calculator",
    "date countdown",
    "how many days until",
    "free date calculator",
  ],
  openGraph: {
    title: "Free Date Calculator & Countdown Timer | Days Between Dates - PrestoKit",
    description:
      "Calculate days between dates, add or subtract days, and countdown to events with live timer. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/date-calculator",
  },
};

export default function DateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
