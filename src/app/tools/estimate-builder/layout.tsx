import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Estimate & Quote Builder — Create Professional Estimates | PrestoKit",
  description:
    "Create professional project estimates and quotes for free online. Add line items, tax, discounts, and terms. Download as PDF instantly. No sign-up required. 100% browser-based.",
  keywords: [
    "estimate builder",
    "free estimate template",
    "quote builder",
    "project estimate generator",
    "online estimate maker",
    "business quote creator",
    "estimate PDF download",
    "freelance estimate template",
    "contractor estimate builder",
    "professional quote generator",
  ],
  openGraph: {
    title: "Free Estimate & Quote Builder | PrestoKit",
    description:
      "Create professional project estimates and quotes for free. Download as PDF instantly. No sign-up required.",
    url: "https://prestokit.com/tools/estimate-builder",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/estimate-builder",
  },
};

export default function EstimateBuilderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
