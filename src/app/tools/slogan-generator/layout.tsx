import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Slogan Generator | Business Tagline Maker - PrestoKit",
  description:
    "Generate catchy business slogans and taglines instantly. Enter your business name, industry, and keywords to get 20+ slogan ideas. Free online slogan generator — no signup required.",
  keywords: [
    "slogan generator",
    "business slogan maker",
    "tagline generator",
    "slogan creator",
    "business tagline ideas",
    "free slogan generator",
    "catchy slogan maker",
    "company slogan generator",
    "brand tagline generator",
    "advertising slogan maker",
    "motto generator",
    "slogan ideas for business",
  ],
  openGraph: {
    title: "Free Slogan Generator | Business Tagline Maker - PrestoKit",
    description:
      "Generate catchy business slogans and taglines instantly. 20+ unique slogan ideas per generation. Free, no signup.",
    url: "https://prestokit.com/tools/slogan-generator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/slogan-generator",
  },
};

export default function SloganGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
