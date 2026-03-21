import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Contract Template Generator | Create Business Contracts - PrestoKit",
  description:
    "Generate free business contracts from professional templates. Freelance agreements, NDAs, independent contractor agreements, and service contracts. Fill in your details, preview, and download as PDF. Not legal advice.",
  keywords: [
    "free contract template",
    "contract generator",
    "freelance contract template",
    "NDA template free",
    "independent contractor agreement",
    "service agreement template",
    "business contract maker",
    "contract template download",
    "simple contract template",
    "free contract maker",
  ],
  openGraph: {
    title: "Free Contract Template Generator | Business Contracts - PrestoKit",
    description:
      "Generate free business contracts — freelance agreements, NDAs, contractor agreements, and more. Fill in details and download as PDF.",
    type: "website",
    url: "https://prestokit.com/tools/contract-generator",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/contract-generator",
  },
};

export default function ContractGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
