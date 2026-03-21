import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "How to Start a Small Business \u2014 Complete Guide (2026)",
  description:
    "Step-by-step guide to starting a small business in 2026. Covers choosing a business idea, writing a business plan, LLC vs sole proprietorship, getting an EIN, and essential tools.",
  keywords: [
    "how to start a business",
    "start a small business",
    "starting a business guide",
    "LLC vs sole proprietorship",
    "business plan",
    "get an EIN",
    "register a business",
    "business bank account",
    "small business tips",
    "entrepreneur guide",
    "business name generator",
    "free business tools",
  ],
  openGraph: {
    title: "How to Start a Small Business \u2014 Complete Guide (2026) | PrestoKit",
    description:
      "Step-by-step guide to starting a small business. From idea to launch, everything you need to know.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-start-business",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Start a Small Business \u2014 Complete Guide (2026) | PrestoKit",
    description:
      "Step-by-step guide to starting a small business. From idea to launch, everything you need to know.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-start-business",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much does it cost to start a small business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Startup costs vary widely by industry. A service-based business (consulting, freelancing, design) can launch for under $500 covering LLC registration, a domain name, and basic tools. A product-based business may require $2,000-$50,000+ for inventory, packaging, and shipping infrastructure. The key costs are: business registration ($50-$500 depending on state), EIN (free from IRS), domain name ($10-15/year), website hosting ($5-30/month), and basic accounting software ($0-30/month).",
      },
    },
    {
      "@type": "Question",
      name: "Should I form an LLC or sole proprietorship?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An LLC (Limited Liability Company) is recommended for most small businesses because it separates your personal assets from business liabilities. If your business is sued or goes into debt, your personal savings, home, and car are protected. A sole proprietorship is simpler and cheaper to set up but offers no liability protection. If you are doing anything beyond very low-risk freelance work, an LLC is worth the small extra cost.",
      },
    },
    {
      "@type": "Question",
      name: "What is an EIN and do I need one?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "An EIN (Employer Identification Number) is a federal tax ID number for your business, issued by the IRS for free. You need an EIN if you plan to hire employees, open a business bank account, or operate as an LLC or corporation. Even sole proprietors benefit from having an EIN to keep their Social Security number off business documents.",
      },
    },
    {
      "@type": "Question",
      name: "Do I need a business plan to start a business?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You do not need a formal 50-page business plan unless you are seeking investors or bank loans. However, every business benefits from a simple one-page plan that outlines: what you sell, who you sell it to, how you will reach them, what it costs, and how you will make money. This clarity keeps you focused and helps you make better decisions as you grow.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Start a Small Business \u2014 Complete Guide (2026)",
  description:
    "Step-by-step guide to starting a small business in 2026. Covers choosing a business idea, writing a business plan, LLC vs sole proprietorship, getting an EIN, and essential tools.",
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
  mainEntityOfPage: "https://prestokit.com/guides/how-to-start-business",
};

export default function StartBusinessGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="start-business-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="start-business-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
