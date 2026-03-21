import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How to Create a Professional Invoice (2026 Guide)",
  description:
    "Learn how to create a professional invoice step-by-step. Covers essential invoice elements, best practices, payment terms, common mistakes, and free tools to create invoices instantly.",
  keywords: [
    "how to create an invoice",
    "professional invoice",
    "invoice template",
    "invoice guide",
    "invoicing best practices",
    "invoice payment terms",
    "how to invoice clients",
    "freelance invoice",
    "small business invoice",
    "invoice generator",
    "free invoice maker",
    "types of invoices",
    "invoice tips",
  ],
  openGraph: {
    title: "How to Create a Professional Invoice (2026 Guide) | PrestoKit",
    description:
      "Learn how to create a professional invoice step-by-step. Essential elements, best practices, and free tools.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-create-invoice",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Create a Professional Invoice (2026 Guide) | PrestoKit",
    description:
      "Learn how to create a professional invoice step-by-step. Essential elements, best practices, and free tools.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-create-invoice",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What should be included on a professional invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A professional invoice should include: your business name and contact information, client details, a unique invoice number, invoice date and due date, itemized list of products or services with descriptions and amounts, subtotal, applicable taxes, total amount due, accepted payment methods, and payment terms.",
      },
    },
    {
      "@type": "Question",
      name: "When should I send an invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Send invoices immediately after delivering your product or completing your service. For ongoing projects, invoice at agreed-upon milestones or on a regular schedule (weekly, bi-weekly, or monthly). The sooner you invoice, the sooner you get paid.",
      },
    },
    {
      "@type": "Question",
      name: "What are standard invoice payment terms?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Common payment terms include: Due on Receipt (immediate payment), Net 15 (15 days), Net 30 (30 days, most common), Net 60 (60 days, for larger companies), and 2/10 Net 30 (2% discount if paid within 10 days, otherwise due in 30). Net 30 is the industry standard for most businesses.",
      },
    },
    {
      "@type": "Question",
      name: "How do I follow up on an unpaid invoice?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Send a friendly reminder 1-2 days before the due date. If unpaid, follow up at 1 day overdue, 7 days overdue, and 14 days overdue with increasingly firm but professional language. Always reference the invoice number and amount. Offer to discuss payment plans if needed.",
      },
    },
    {
      "@type": "Question",
      name: "Can I create a professional invoice for free?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. PrestoKit offers a free Invoice Generator that creates professional PDF invoices instantly. No signup or credit card required. Simply fill in your details and download your invoice.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Create a Professional Invoice (2026 Guide)",
  description:
    "Learn how to create a professional invoice step-by-step. Covers essential invoice elements, best practices, payment terms, and common mistakes.",
  author: {
    "@type": "Organization",
    name: "PrestoKit",
    url: "https://prestokit.com",
  },
  publisher: {
    "@type": "Organization",
    name: "PrestoKit",
    url: "https://prestokit.com",
  },
  datePublished: "2026-03-01",
  dateModified: "2026-03-20",
  mainEntityOfPage: "https://prestokit.com/guides/how-to-create-invoice",
};

export default function InvoiceGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="invoice-guide-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="invoice-guide-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
