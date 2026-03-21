import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Templates | 10 Professional Designs to Download - PrestoKit",
  description:
    "Browse 10 free invoice templates with different styles — minimal, corporate, creative, bold, elegant, and more. Preview each design, customize with your details, and download as PDF. No signup required.",
  keywords: [
    "free invoice templates",
    "invoice template download",
    "professional invoice templates",
    "invoice design templates",
    "minimal invoice template",
    "creative invoice template",
    "modern invoice template",
    "business invoice template",
    "freelance invoice template",
    "printable invoice template",
  ],
  openGraph: {
    title: "Free Invoice Templates | 10 Professional Designs - PrestoKit",
    description:
      "Browse 10 free invoice templates. Preview each style, customize with your info, and download as PDF. No signup required.",
    type: "website",
    url: "https://prestokit.com/tools/invoice-templates",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/invoice-templates",
  },
};

export default function InvoiceTemplatesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
