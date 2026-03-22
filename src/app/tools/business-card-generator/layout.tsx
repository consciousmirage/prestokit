import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Business Card Generator | Create & Download Business Cards - PrestoKit",
  description:
    "Design professional business cards online and download as PNG. Choose from multiple styles, customize colors, fonts, and layout. Free business card maker — no signup required.",
  keywords: [
    "business card generator",
    "business card maker",
    "free business card maker",
    "create business card online",
    "business card design",
    "business card template",
    "professional business card",
    "digital business card",
    "business card creator",
    "printable business card",
    "custom business card",
    "make business cards free",
  ],
  openGraph: {
    title: "Free Business Card Generator | Create & Download Business Cards - PrestoKit",
    description:
      "Design professional business cards online and download as PNG. Multiple styles, customizable colors and fonts. Free, no signup.",
    url: "https://prestokit.com/tools/business-card-generator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/business-card-generator",
  },
};

export default function BusinessCardGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
