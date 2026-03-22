import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Privacy Policy Generator | Create a Privacy Policy for Your Website - PrestoKit",
  description:
    "Generate a free, customizable privacy policy for your website or app. Covers GDPR, CCPA, cookies, analytics, and more. Free privacy policy generator — no signup required.",
  keywords: [
    "privacy policy generator",
    "free privacy policy generator",
    "privacy policy template",
    "website privacy policy",
    "GDPR privacy policy",
    "CCPA privacy policy",
    "privacy policy for website",
    "create privacy policy",
    "online privacy policy generator",
    "app privacy policy",
    "privacy policy maker",
    "generate privacy policy free",
  ],
  openGraph: {
    title: "Free Privacy Policy Generator | Create a Privacy Policy for Your Website - PrestoKit",
    description:
      "Generate a free privacy policy for your website or app. Covers GDPR, CCPA, cookies, and more. Free, no signup.",
    url: "https://prestokit.com/tools/privacy-policy-generator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/privacy-policy-generator",
  },
};

export default function PrivacyPolicyGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
