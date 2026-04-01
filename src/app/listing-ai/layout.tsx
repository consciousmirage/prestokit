import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ListingAI — Write MLS Listings in 30 Seconds | PrestoKit",
  description:
    "AI-powered MLS listing description generator for real estate agents. Enter property details, get a professional listing description, compelling headline, and social media caption instantly.",
  keywords: [
    "MLS listing description generator",
    "AI real estate listing writer",
    "listing description AI",
    "realtor AI tool",
    "real estate copywriting AI",
    "MLS description writer",
    "property listing generator",
    "real estate agent tools",
  ],
  openGraph: {
    title: "ListingAI — Write MLS Listings in 30 Seconds",
    description:
      "Stop spending 40 minutes on every listing. AI-powered MLS descriptions, headlines & social captions for real estate agents.",
    url: "https://prestokit.com/listing-ai",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/listing-ai",
  },
};

export default function ListingAILayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
