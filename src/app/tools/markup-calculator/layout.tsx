import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Markup Calculator — Markup Percentage & Pricing Tool | PrestoKit",
  description:
    "Calculate markup percentage from cost and selling price, or find your selling price from cost and markup %. Includes a quick reference table for common markup percentages. Free, no sign-up required.",
  keywords: [
    "markup calculator",
    "markup percentage calculator",
    "markup vs margin",
    "how to calculate markup",
    "pricing calculator",
    "markup formula",
    "selling price calculator",
    "gross profit margin calculator",
    "cost plus pricing",
    "retail markup calculator",
  ],
  openGraph: {
    title: "Free Markup Calculator | Markup Percentage & Pricing Tool | PrestoKit",
    description:
      "Calculate markup % from cost and selling price, or find your selling price from cost and markup %. Free, no sign-up required.",
    url: "https://prestokit.com/tools/markup-calculator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/markup-calculator",
  },
};

export default function MarkupCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
