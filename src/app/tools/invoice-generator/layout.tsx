import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator | Create & Download PDF Invoices - PrestoKit",
  description:
    "Create professional invoices for free with PrestoKit's invoice generator. Add line items, tax, discounts, and download as PDF instantly. No signup required. Works 100% in your browser.",
  keywords: [
    "free invoice generator",
    "invoice maker",
    "create invoice online",
    "invoice template",
    "PDF invoice generator",
    "online invoice creator",
    "professional invoice",
    "freelance invoice",
    "small business invoice",
    "invoice generator no signup",
  ],
  openGraph: {
    title: "Free Invoice Generator | Create & Download PDF Invoices - PrestoKit",
    description:
      "Create professional invoices for free. Add line items, tax, discounts, and download as PDF instantly. No signup required.",
    type: "website",
    url: "https://prestokit.com/tools/invoice-generator",
  },
};

export default function InvoiceGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
