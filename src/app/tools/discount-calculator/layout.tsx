import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Discount Calculator | Percent Off Calculator - PrestoKit",
  description:
    "Calculate sale prices, savings, and discounts instantly. Find the final price after any percent off, or figure out the original price from a sale price. Free online discount calculator — no signup required.",
  keywords: [
    "discount calculator",
    "percent off calculator",
    "sale price calculator",
    "percentage discount calculator",
    "how much is 20 percent off",
    "calculate discount",
    "price after discount",
    "savings calculator",
    "markdown calculator",
    "off calculator",
    "sale calculator",
    "free discount calculator",
  ],
  openGraph: {
    title: "Free Discount Calculator | Percent Off Calculator - PrestoKit",
    description:
      "Calculate sale prices, savings, and discounts instantly. Find the final price after any percent off. Free, no signup.",
    url: "https://prestokit.com/tools/discount-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/discount-calculator",
  },
};

export default function DiscountCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
