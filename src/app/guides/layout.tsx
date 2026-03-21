import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Business Guides & Resources | PrestoKit",
  description:
    "Expert guides on invoicing, starting a business, freelancing, QR codes, and more. Practical, actionable advice for entrepreneurs and freelancers.",
  keywords: [
    "business guides",
    "invoicing guide",
    "how to start a business",
    "freelancing guide",
    "QR code guide",
    "small business tips",
    "freelancer resources",
    "entrepreneur guides",
    "business resources",
    "free business advice",
  ],
  openGraph: {
    title: "Free Business Guides & Resources | PrestoKit",
    description:
      "Expert guides on invoicing, starting a business, freelancing, QR codes, and more. Practical, actionable advice for entrepreneurs and freelancers.",
    type: "website",
    url: "https://prestokit.com/guides",
  },
  twitter: {
    card: "summary_large_image",
    title: "Free Business Guides & Resources | PrestoKit",
    description:
      "Expert guides on invoicing, starting a business, freelancing, QR codes, and more.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides",
  },
};

export default function GuidesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
