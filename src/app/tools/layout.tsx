import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Business Tools — No Signup Required | PrestoKit",
  description:
    "Browse all 16 free online business tools — invoice generator, QR codes, calculators, email signatures, and more. No signup, no credit card, instant results. Professional-grade tools for freelancers and small businesses.",
  keywords: [
    "free online tools",
    "free business tools",
    "no signup tools",
    "invoice generator",
    "QR code generator",
    "email signature creator",
    "business name generator",
    "profit margin calculator",
    "receipt maker",
    "estimate builder",
    "pay stub creator",
    "password generator",
    "word counter",
    "lorem ipsum generator",
    "percentage calculator",
    "text case converter",
    "color palette generator",
    "JSON formatter",
    "markdown to HTML",
    "freelancer tools",
    "small business tools",
    "online calculators",
    "free PDF tools",
  ],
  openGraph: {
    title: "Free Online Business Tools — No Signup Required | PrestoKit",
    description:
      "Browse all 16 free online business tools. Invoice generator, QR codes, calculators, and more. No signup required.",
    type: "website",
    url: "https://prestokit.com/tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Business Tools — No Signup Required | PrestoKit",
    description:
      "Browse all 16 free online business tools. Invoice generator, QR codes, calculators, and more. No signup required.",
  },
};

export default function ToolsIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
