import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "QR Codes \u2014 The Complete Guide (2026)",
  description:
    "Everything you need to know about QR codes: how they work, static vs dynamic types, business use cases, design best practices, size and printing guidelines, tracking, and creative applications.",
  keywords: [
    "QR code guide",
    "what is a QR code",
    "how QR codes work",
    "QR code for business",
    "static vs dynamic QR code",
    "QR code size",
    "QR code printing",
    "QR code best practices",
    "QR code generator",
    "free QR code maker",
    "QR code uses",
    "QR code tracking",
  ],
  openGraph: {
    title: "QR Codes \u2014 The Complete Guide (2026) | PrestoKit",
    description:
      "Everything you need to know about QR codes: how they work, business use cases, design tips, and printing guidelines.",
    type: "article",
    url: "https://prestokit.com/guides/qr-code-guide",
  },
  twitter: {
    card: "summary_large_image",
    title: "QR Codes \u2014 The Complete Guide (2026) | PrestoKit",
    description:
      "Everything you need to know about QR codes: how they work, business use cases, design tips, and printing guidelines.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/qr-code-guide",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A QR (Quick Response) code is a two-dimensional barcode that stores data in a pattern of black and white squares. When scanned with a smartphone camera or QR reader app, the code instantly directs the user to a URL, displays text, shares contact information, connects to WiFi, or triggers other digital actions. QR codes were invented in 1994 by Denso Wave for tracking automotive parts and have since become one of the most widely used digital tools in the world.",
      },
    },
    {
      "@type": "Question",
      name: "What is the difference between static and dynamic QR codes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A static QR code has the destination data encoded directly into the pattern. Once created, it cannot be changed. A dynamic QR code points to a short redirect URL that can be updated at any time without changing the physical code. Dynamic codes are better for print materials because you can fix errors or update URLs without reprinting. Static codes are simpler and work offline without any redirect service.",
      },
    },
    {
      "@type": "Question",
      name: "What is the minimum size for a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The minimum recommended size for a QR code is 2 cm x 2 cm (about 0.8 inches) for scanning from a close distance of 10-15 cm. For general use (scanning from arm's length), 3-4 cm is better. For posters or signage meant to be scanned from a distance, use the 10:1 rule: the QR code should be at least 1/10th the scanning distance. So a code meant to be scanned from 1 meter away should be at least 10 cm (4 inches) wide.",
      },
    },
    {
      "@type": "Question",
      name: "Can I customize the design of a QR code?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, QR codes have built-in error correction that allows for moderate design customization. You can change the colors (maintaining high contrast), round the corners of modules, add a logo in the center (covering up to 30% of the code area with high error correction), and adjust the pattern style. Always test your customized QR code on multiple devices before printing to ensure it still scans reliably.",
      },
    },
    {
      "@type": "Question",
      name: "Are QR codes free to create?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes, static QR codes are completely free to create and use. PrestoKit offers a free QR Code Generator that creates high-quality QR codes for URLs, text, WiFi, contacts, and more with no signup required. Dynamic QR codes with tracking and editing capabilities may require a paid service, but basic static QR codes are free everywhere.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "QR Codes \u2014 The Complete Guide (2026)",
  description:
    "Everything you need to know about QR codes: how they work, static vs dynamic types, business use cases, design best practices, size and printing guidelines, tracking, and creative applications.",
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
  mainEntityOfPage: "https://prestokit.com/guides/qr-code-guide",
};

export default function QRCodeGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="qr-code-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="qr-code-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
