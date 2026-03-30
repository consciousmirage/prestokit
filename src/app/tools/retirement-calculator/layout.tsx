import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Retirement Calculator | How Much to Save for Retirement - PrestoKit",
  description:
    "Calculate how much you need to save for retirement, your projected savings at retirement, monthly income from your nest egg, and whether you're on track. Free retirement savings calculator — no signup required.",
  keywords: [
    "retirement calculator",
    "retirement savings calculator",
    "how much to save for retirement",
    "401k calculator",
    "retirement income calculator",
    "retirement planning calculator",
    "retirement nest egg calculator",
    "4% rule calculator",
    "when can I retire",
    "retirement projection calculator",
    "free retirement calculator",
  ],
  openGraph: {
    title: "Free Retirement Calculator | How Much to Save for Retirement - PrestoKit",
    description:
      "Calculate projected retirement savings, monthly income from your nest egg, and whether you're on track. Free, no signup.",
    url: "https://prestokit.com/tools/retirement-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/retirement-calculator",
  },
};

export default function RetirementCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
