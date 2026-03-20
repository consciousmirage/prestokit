import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Business Name Generator | Creative Name Ideas Instantly - PrestoKit",
  description:
    "Generate unique business name ideas for free. Enter keywords, choose your industry and style, and get dozens of creative name suggestions instantly. Check domain availability. No signup required.",
  keywords: [
    "free business name generator",
    "business name ideas",
    "company name generator",
    "startup name generator",
    "brand name generator",
    "creative business names",
    "business name maker",
    "name generator for business",
    "company name ideas",
    "business name with domain check",
  ],
  openGraph: {
    title:
      "Free Business Name Generator | Creative Name Ideas Instantly - PrestoKit",
    description:
      "Generate unique business name ideas for free. Enter keywords, choose your industry and style, and get creative name suggestions instantly.",
    type: "website",
    url: "https://prestokit.com/tools/business-name-generator",
  },
};

export default function BusinessNameGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
