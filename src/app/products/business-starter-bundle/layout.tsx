import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Business Starter Bundle — 30+ Professional Templates for $29 | PrestoKit",
  description:
    "Get 30+ professional business templates: invoices, contracts, financial dashboards, email sequences, content calendars, and more. One-time purchase, commercial license included.",
  openGraph: {
    title: "Business Starter Bundle — 30+ Templates for $29",
    description:
      "Professional business templates for invoices, contracts, financial tracking, email sequences, and more. One-time purchase.",
    url: "https://prestokit.com/products/business-starter-bundle",
  },
  alternates: {
    canonical: "https://prestokit.com/products/business-starter-bundle",
  },
};

export default function BundleLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
