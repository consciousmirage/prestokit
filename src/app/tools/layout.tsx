import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Online Business Tools — No Signup Required | PrestoKit",
  description:
    "Browse all 46+ free online business tools — invoice generator, contract templates, ROI calculator, time zone converter, QR codes, and more. No signup, no credit card, instant results. Professional-grade tools for freelancers and small businesses.",
  keywords: [
    "free online tools",
    "free business tools",
    "no signup tools",
    "invoice generator",
    "invoice templates",
    "contract generator",
    "contract template",
    "ROI calculator",
    "time zone converter",
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
      "Browse all 46+ free online business tools. Invoice generator, contracts, calculators, and more. No signup required.",
    type: "website",
    url: "https://prestokit.com/tools",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Online Business Tools — No Signup Required | PrestoKit",
    description:
      "Browse all 46+ free online business tools. Invoice generator, QR codes, calculators, and more. No signup required.",
  },
};

export default function ToolsIndexLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
