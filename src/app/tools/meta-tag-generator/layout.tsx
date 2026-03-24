import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Meta Tag Generator | SEO Meta Tags & Open Graph Tags - PrestoKit",
  description:
    "Generate perfect HTML meta tags, Open Graph tags, and Twitter Card tags for your website. Live Google search preview. Free online meta tag generator — no signup required.",
  keywords: [
    "meta tag generator",
    "seo meta tags",
    "open graph generator",
    "twitter card generator",
    "html meta tags",
    "og tags generator",
    "seo tag generator",
    "meta description generator",
    "social media meta tags",
    "website meta tags",
    "free meta tag generator",
    "meta tags for seo",
  ],
  openGraph: {
    title: "Free Meta Tag Generator | SEO Meta Tags & Open Graph Tags - PrestoKit",
    description:
      "Generate HTML meta tags, Open Graph tags, and Twitter Card tags instantly. Live Google search preview. Free, no signup.",
    url: "https://prestokit.com/tools/meta-tag-generator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/meta-tag-generator",
  },
};

export default function MetaTagGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
