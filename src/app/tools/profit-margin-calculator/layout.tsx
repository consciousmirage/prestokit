import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Profit Margin Calculator — Calculate Margin, Markup & Break-Even | PrestoKit",
  description:
    "Calculate profit margins, markups, and break-even points instantly with our free online calculator. No sign-up required. Supports margin, markup, target margin, and break-even analysis for small businesses.",
  keywords: [
    "profit margin calculator",
    "markup calculator",
    "break even calculator",
    "gross margin calculator",
    "net profit margin",
    "business profit calculator",
    "margin vs markup",
    "free margin calculator",
    "small business profit calculator",
    "pricing calculator",
  ],
  openGraph: {
    title: "Free Profit Margin Calculator | PrestoKit",
    description:
      "Calculate profit margins, markups, and break-even points instantly. Free, no sign-up required.",
    url: "https://prestokit.com/tools/profit-margin-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/profit-margin-calculator",
  },
};

export default function ProfitMarginCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
