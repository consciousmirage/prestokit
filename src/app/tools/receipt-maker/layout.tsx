import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Receipt Maker — Create & Download Receipts Online | PrestoKit",
  description:
    "Create professional receipts for free online. Add business info, line items, tax, and tips. Download as PDF instantly. No sign-up required. Works 100% in your browser.",
  keywords: [
    "receipt maker",
    "free receipt generator",
    "online receipt maker",
    "receipt template",
    "create receipt online",
    "business receipt maker",
    "cash receipt generator",
    "receipt PDF download",
    "digital receipt creator",
    "printable receipt",
  ],
  openGraph: {
    title: "Free Receipt Maker | PrestoKit",
    description:
      "Create professional receipts for free. Fill in details and download a PDF receipt instantly. No sign-up required.",
    url: "https://prestokit.com/tools/receipt-maker",
    siteName: "PrestoKit",
    type: "website",
  },
  alternates: {
    canonical: "https://prestokit.com/tools/receipt-maker",
  },
};

export default function ReceiptMakerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
