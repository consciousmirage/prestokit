import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Freelancing 101 \u2014 Getting Started as a Freelancer (2026 Guide)",
  description:
    "The complete guide to starting a freelance career. Learn how to find your niche, set rates, build a portfolio, find clients, write proposals, manage projects, handle invoicing, and navigate freelance taxes.",
  keywords: [
    "freelancing guide",
    "how to freelance",
    "freelancing for beginners",
    "freelance rates",
    "find freelance clients",
    "freelance portfolio",
    "freelance proposal",
    "freelance invoicing",
    "freelance taxes",
    "start freelancing",
    "freelancer tips",
    "freelance tools",
  ],
  openGraph: {
    title: "Freelancing 101 \u2014 Getting Started as a Freelancer (2026 Guide) | PrestoKit",
    description:
      "The complete guide to starting a freelance career. Find clients, set rates, manage projects, and get paid.",
    type: "article",
    url: "https://prestokit.com/guides/freelancing-guide",
  },
  twitter: {
    card: "summary_large_image",
    title: "Freelancing 101 \u2014 Getting Started as a Freelancer (2026 Guide) | PrestoKit",
    description:
      "The complete guide to starting a freelance career. Find clients, set rates, manage projects, and get paid.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/freelancing-guide",
  },
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How much should I charge as a freelancer?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Start by calculating your target annual income, adding 30% for taxes and benefits, then dividing by your billable hours (typically 1,000-1,200 hours per year, not 2,080). Research market rates for your skill and experience level on sites like Glassdoor and Payscale. As a general rule, your hourly freelance rate should be 2-3x what you would earn as an hourly employee, because you cover your own taxes, insurance, equipment, and non-billable time.",
      },
    },
    {
      "@type": "Question",
      name: "How do I find freelance clients?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The most effective methods for finding freelance clients are: leveraging your existing network (tell everyone you know), cold outreach with personalized pitches, creating content that showcases your expertise (blog posts, social media, case studies), freelance platforms like Upwork and Toptal for building initial reviews, and asking current clients for referrals. Most successful freelancers get 60-80% of their work through referrals and repeat clients.",
      },
    },
    {
      "@type": "Question",
      name: "Do freelancers need to pay estimated taxes?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Yes. If you expect to owe $1,000 or more in federal taxes for the year, the IRS requires you to make quarterly estimated tax payments. Due dates are April 15, June 15, September 15, and January 15. You will owe federal income tax plus self-employment tax (15.3% for Social Security and Medicare). Most freelancers set aside 25-30% of their net income for taxes.",
      },
    },
    {
      "@type": "Question",
      name: "Should I charge hourly or per project?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Project-based pricing is generally better for experienced freelancers because it rewards efficiency and allows you to capture more value. Hourly pricing penalizes you for getting faster at your work. However, hourly pricing works well when the scope is unclear, for ongoing retainer work, or when you are just starting and still learning how long projects take. Many freelancers use hourly rates internally to estimate project prices but present flat project fees to clients.",
      },
    },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Freelancing 101 \u2014 Getting Started as a Freelancer (2026 Guide)",
  description:
    "The complete guide to starting a freelance career. Learn how to find your niche, set rates, build a portfolio, find clients, write proposals, manage projects, handle invoicing, and navigate freelance taxes.",
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
  mainEntityOfPage: "https://prestokit.com/guides/freelancing-guide",
};

export default function FreelancingGuideLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Script
        id="freelancing-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="freelancing-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
