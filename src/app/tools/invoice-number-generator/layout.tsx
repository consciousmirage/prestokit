import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Number Generator | Create Invoice Numbering Systems - PrestoKit",
  description:
    "Generate professional invoice numbers with custom prefixes, date-based formats, or random IDs. Batch generate 10-50 invoice numbers with one click. Free online tool — no signup required.",
  keywords: [
    "invoice number generator",
    "invoice numbering system",
    "generate invoice numbers",
    "invoice number format",
    "sequential invoice numbers",
    "invoice ID generator",
    "free invoice number generator",
    "invoice number template",
    "create invoice numbers",
    "batch invoice numbers",
    "professional invoice numbering",
    "invoice number maker",
  ],
  openGraph: {
    title: "Free Invoice Number Generator | Create Invoice Numbering Systems - PrestoKit",
    description:
      "Generate professional invoice numbers with custom prefixes, date-based formats, or random codes. Batch generate up to 50 at once. Free, no signup.",
    url: "https://prestokit.com/tools/invoice-number-generator",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/invoice-number-generator",
  },
};

export default function InvoiceNumberGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
