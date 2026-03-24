"use client";

import { useState, useMemo } from "react";
import PromoBar from "@/components/PromoBar";

/* ------------------------------------------------------------------ */
/*  FAQ Accordion                                                      */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#1e1e2e] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#1a1a26]/60 transition-colors"
      >
        <span className="text-[#e0e0ea] font-medium text-sm sm:text-base pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 text-[#7c6cf0] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#a0a0b8] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Breadcrumb                                                         */
/* ------------------------------------------------------------------ */

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm text-[#8888a0] mb-8">
      <a href="/" className="hover:text-[#7c6cf0] transition-colors">
        PrestoKit
      </a>
      <span>/</span>
      <a href="/tools" className="hover:text-[#7c6cf0] transition-colors">
        Tools
      </a>
      <span>/</span>
      <span className="text-[#f0f0f5]">Meta Tag Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What are meta tags and why are they important for SEO?",
    answer:
      "Meta tags are snippets of HTML code that describe your page's content to search engines and social media platforms. The most important meta tags for SEO are the title tag and meta description — they directly influence how your page appears in Google search results and can significantly impact your click-through rate. Open Graph and Twitter Card tags control how your page looks when shared on social media, making them essential for social marketing.",
  },
  {
    question: "What is the ideal length for a meta title and description?",
    answer:
      "Google typically displays the first 50-60 characters of a title tag and the first 150-160 characters of a meta description. For best results, keep your title under 60 characters and your description under 160 characters. Our generator shows a character count and warns you when you exceed these limits. Titles that are too long get truncated with an ellipsis (...) in search results, which can hurt click-through rates.",
  },
  {
    question: "What are Open Graph tags?",
    answer:
      "Open Graph (OG) tags are meta tags that control how your content appears when shared on Facebook, LinkedIn, and other social platforms. The key OG tags are og:title, og:description, og:image, and og:url. When someone shares your link on Facebook, these tags determine the title, description, and image that appear in the preview card. Without OG tags, social platforms will guess what to display, which often looks unprofessional.",
  },
  {
    question: "What are Twitter Card tags?",
    answer:
      "Twitter Card tags are similar to Open Graph tags but specifically for Twitter/X. They control how your link appears when shared on Twitter. The most common type is 'summary_large_image', which shows a large preview image with title and description. Twitter also supports 'summary' (small square image), 'app' (for mobile apps), and 'player' (for video/audio). If Twitter Card tags are not present, Twitter will fall back to Open Graph tags.",
  },
  {
    question: "How do I add meta tags to my website?",
    answer:
      "Copy the generated HTML code and paste it inside the <head> section of your HTML page, before the closing </head> tag. If you use WordPress, you can use an SEO plugin like Yoast SEO or Rank Math to add meta tags without editing code. For Shopify, go to Online Store > Preferences for homepage tags, or edit individual product/page SEO settings. For Next.js or React, use the appropriate metadata API or Head component.",
  },
  {
    question: "Do meta keywords still matter for SEO?",
    answer:
      "No. Google has officially stated that it does not use the meta keywords tag for ranking purposes, and has not since at least 2009. However, some smaller search engines like Yandex may still consider them. Our generator includes a keywords field as an option, but the title tag and meta description are far more important for SEO. Focus your efforts on writing compelling titles and descriptions that accurately represent your content and include your target keywords naturally.",
  },
  {
    question: "What image size should I use for Open Graph?",
    answer:
      "The recommended Open Graph image size is 1200 x 630 pixels with an aspect ratio of 1.91:1. This size works well across Facebook, LinkedIn, and Twitter. Use high-quality images in JPG or PNG format, and keep the file size under 1MB for fast loading. Make sure important content is centered, as some platforms may crop the edges. Facebook recommends a minimum of 600 x 315 pixels, but the larger size provides better quality on high-resolution displays.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MetaTagGeneratorPage() {
  const [pageTitle, setPageTitle] = useState("");
  const [pageDescription, setPageDescription] = useState("");
  const [pageKeywords, setPageKeywords] = useState("");
  const [pageAuthor, setPageAuthor] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [ogImageUrl, setOgImageUrl] = useState("");
  const [siteName, setSiteName] = useState("");
  const [twitterHandle, setTwitterHandle] = useState("");
  const [copied, setCopied] = useState(false);

  const generatedCode = useMemo(() => {
    const lines: string[] = [];
    lines.push("<!-- Primary Meta Tags -->");
    if (pageTitle) lines.push(`<title>${pageTitle}</title>`);
    if (pageTitle) lines.push(`<meta name="title" content="${pageTitle}" />`);
    if (pageDescription) lines.push(`<meta name="description" content="${pageDescription}" />`);
    if (pageKeywords) lines.push(`<meta name="keywords" content="${pageKeywords}" />`);
    if (pageAuthor) lines.push(`<meta name="author" content="${pageAuthor}" />`);

    lines.push("");
    lines.push("<!-- Open Graph / Facebook -->");
    lines.push(`<meta property="og:type" content="website" />`);
    if (pageUrl) lines.push(`<meta property="og:url" content="${pageUrl}" />`);
    if (pageTitle) lines.push(`<meta property="og:title" content="${pageTitle}" />`);
    if (pageDescription) lines.push(`<meta property="og:description" content="${pageDescription}" />`);
    if (ogImageUrl) lines.push(`<meta property="og:image" content="${ogImageUrl}" />`);
    if (siteName) lines.push(`<meta property="og:site_name" content="${siteName}" />`);

    lines.push("");
    lines.push("<!-- Twitter -->");
    lines.push(`<meta property="twitter:card" content="summary_large_image" />`);
    if (pageUrl) lines.push(`<meta property="twitter:url" content="${pageUrl}" />`);
    if (pageTitle) lines.push(`<meta property="twitter:title" content="${pageTitle}" />`);
    if (pageDescription) lines.push(`<meta property="twitter:description" content="${pageDescription}" />`);
    if (ogImageUrl) lines.push(`<meta property="twitter:image" content="${ogImageUrl}" />`);
    if (twitterHandle) lines.push(`<meta name="twitter:site" content="${twitterHandle}" />`);
    if (twitterHandle) lines.push(`<meta name="twitter:creator" content="${twitterHandle}" />`);

    return lines.join("\n");
  }, [pageTitle, pageDescription, pageKeywords, pageAuthor, pageUrl, ogImageUrl, siteName, twitterHandle]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncate = (text: string, max: number) =>
    text.length > max ? text.slice(0, max) + "..." : text;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Meta Tag Generator",
    description:
      "Generate HTML meta tags, Open Graph tags, and Twitter Card tags for your website. Live Google search preview included.",
    url: "https://prestokit.com/tools/meta-tag-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Meta Tag{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate perfect HTML meta tags, Open Graph tags, and Twitter Card
              tags for your website. See a live Google search preview.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 space-y-5">
              {/* Page Title */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Page Title{" "}
                  <span className="text-[#555566] font-normal">
                    ({pageTitle.length}/60)
                  </span>
                </label>
                <input
                  type="text"
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  placeholder="My Awesome Website - Home"
                  className={`w-full rounded-xl border bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none transition-colors ${
                    pageTitle.length > 60
                      ? "border-[#ff5252] focus:border-[#ff5252]"
                      : "border-[#1e1e2e] focus:border-[#7c6cf0]"
                  }`}
                />
                {pageTitle.length > 60 && (
                  <p className="text-xs text-[#ff5252] mt-1">
                    Title exceeds 60 characters and may be truncated in search results.
                  </p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Meta Description{" "}
                  <span className="text-[#555566] font-normal">
                    ({pageDescription.length}/160)
                  </span>
                </label>
                <textarea
                  value={pageDescription}
                  onChange={(e) => setPageDescription(e.target.value)}
                  placeholder="A brief description of your page for search engines and social media..."
                  rows={3}
                  className={`w-full rounded-xl border bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none transition-colors resize-none ${
                    pageDescription.length > 160
                      ? "border-[#ff5252] focus:border-[#ff5252]"
                      : "border-[#1e1e2e] focus:border-[#7c6cf0]"
                  }`}
                />
                {pageDescription.length > 160 && (
                  <p className="text-xs text-[#ff5252] mt-1">
                    Description exceeds 160 characters and may be truncated.
                  </p>
                )}
              </div>

              {/* Keywords */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Keywords{" "}
                  <span className="text-[#555566] font-normal">(comma-separated)</span>
                </label>
                <input
                  type="text"
                  value={pageKeywords}
                  onChange={(e) => setPageKeywords(e.target.value)}
                  placeholder="seo, meta tags, web development"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Author
                </label>
                <input
                  type="text"
                  value={pageAuthor}
                  onChange={(e) => setPageAuthor(e.target.value)}
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Page URL */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Page URL
                </label>
                <input
                  type="url"
                  value={pageUrl}
                  onChange={(e) => setPageUrl(e.target.value)}
                  placeholder="https://example.com/page"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Site Name */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Site Name
                </label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  placeholder="My Website"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* OG Image URL */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  OG Image URL{" "}
                  <span className="text-[#555566] font-normal">(1200x630 recommended)</span>
                </label>
                <input
                  type="url"
                  value={ogImageUrl}
                  onChange={(e) => setOgImageUrl(e.target.value)}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Twitter Handle */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Twitter Handle
                </label>
                <input
                  type="text"
                  value={twitterHandle}
                  onChange={(e) => setTwitterHandle(e.target.value)}
                  placeholder="@yourusername"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>
            </div>

            {/* Preview & Output */}
            <div className="space-y-4">
              {/* Google Search Preview */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Google Search Preview
                </h2>
                <div className="rounded-xl border border-[#1e1e2e] bg-white p-4">
                  <div className="text-xs text-[#202124] mb-1 truncate">
                    {pageUrl || "https://example.com/page"}
                  </div>
                  <div className="text-lg text-[#1a0dab] font-normal leading-snug mb-1 line-clamp-1 hover:underline cursor-pointer">
                    {pageTitle
                      ? truncate(pageTitle, 60)
                      : "Your Page Title Will Appear Here"}
                  </div>
                  <div className="text-sm text-[#4d5156] leading-relaxed line-clamp-2">
                    {pageDescription
                      ? truncate(pageDescription, 160)
                      : "Your meta description will appear here. Write a compelling description to improve click-through rates from search results."}
                  </div>
                </div>
              </div>

              {/* Social Media Preview */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Social Media Preview
                </h2>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] overflow-hidden">
                  {ogImageUrl ? (
                    <div className="w-full h-40 bg-[#1e1e2e] flex items-center justify-center overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={ogImageUrl}
                        alt="OG Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-full h-40 bg-[#1e1e2e] flex items-center justify-center">
                      <span className="text-xs text-[#555566]">
                        No image URL provided
                      </span>
                    </div>
                  )}
                  <div className="p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      {pageUrl
                        ? new URL(pageUrl).hostname
                        : "example.com"}
                    </div>
                    <div className="text-sm font-semibold text-white mb-1 line-clamp-1">
                      {pageTitle || "Your Page Title"}
                    </div>
                    <div className="text-xs text-[#8888a0] line-clamp-2">
                      {pageDescription || "Your meta description will appear here."}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Generated Code */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white">
                Generated Meta Tags
              </h2>
              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-2 rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-4 py-2.5 text-sm font-semibold text-white transition-all shadow-lg shadow-[#7c6cf0]/20"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy Code
                  </>
                )}
              </button>
            </div>
            <pre className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-sm text-[#9d90f5] overflow-x-auto whitespace-pre-wrap font-mono leading-relaxed">
              {generatedCode}
            </pre>
          </div>

          {/* Promo Bars */}
          <div className="mb-6">
            <PromoBar type="pro" dismissKey="metatag-pro" />
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Page Details",
                  description:
                    "Fill in your page title, description, URL, and optional fields like keywords, author, and OG image URL.",
                },
                {
                  step: "2",
                  title: "Preview in Real Time",
                  description:
                    "See exactly how your page will appear in Google search results and on social media platforms before you publish.",
                },
                {
                  step: "3",
                  title: "Copy & Paste",
                  description:
                    "Copy the generated HTML meta tags and paste them into the <head> section of your website. Done!",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#8888a0] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {FAQ_DATA.map((item, i) => (
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "QR Code Generator",
                  description:
                    "Create custom QR codes for URLs, WiFi, email, and more.",
                  href: "/tools/qr-code-generator",
                },
                {
                  title: "Email Signature Creator",
                  description:
                    "Design professional HTML email signatures for Gmail and Outlook.",
                  href: "/tools/email-signature-creator",
                },
                {
                  title: "Base64 Encoder",
                  description:
                    "Encode and decode text or files to Base64 format instantly.",
                  href: "/tools/base64-encoder",
                },
              ].map((tool) => (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 hover:border-[#7c6cf0]/40 transition-all group"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#7c6cf0] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[#8888a0]">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
