import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Free Email Signature Generator | Create HTML Signatures for Gmail & Outlook - PrestoKit",
  description:
    "Create professional HTML email signatures for Gmail, Outlook, and Apple Mail. Choose from 4 templates, customize colors, add social links, and copy with one click. Free, no signup.",
  keywords: [
    "free email signature generator",
    "email signature creator",
    "HTML email signature",
    "Gmail signature generator",
    "Outlook signature creator",
    "professional email signature",
    "email signature template",
    "email signature maker",
    "create email signature online",
    "email signature design",
  ],
  openGraph: {
    title:
      "Free Email Signature Generator | HTML Signatures for Gmail & Outlook - PrestoKit",
    description:
      "Create professional HTML email signatures for Gmail, Outlook, and Apple Mail. 4 templates, custom colors, one-click copy. Free, no signup.",
    type: "website",
    url: "https://prestokit.com/tools/email-signature-creator",
  },
};

export default function EmailSignatureCreatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
