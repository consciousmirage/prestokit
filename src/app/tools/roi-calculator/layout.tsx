import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free ROI Calculator | Calculate Return on Investment - PrestoKit",
  description:
    "Calculate return on investment (ROI) for any business decision. Simple ROI, compound investment growth over time, and marketing ROI with ROAS. Visual growth charts and side-by-side comparison. Free, no signup.",
  keywords: [
    "ROI calculator",
    "return on investment calculator",
    "investment ROI calculator",
    "marketing ROI calculator",
    "ROAS calculator",
    "compound investment calculator",
    "investment return calculator",
    "business ROI calculator",
    "free ROI calculator",
    "ad spend ROI calculator",
  ],
  openGraph: {
    title: "Free ROI Calculator | Return on Investment - PrestoKit",
    description:
      "Calculate ROI for any business decision. Simple ROI, compound growth, and marketing ROI with ROAS. Visual charts and comparison mode. Free.",
    type: "website",
    url: "https://prestokit.com/tools/roi-calculator",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/roi-calculator",
  },
};

export default function RoiCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
