"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Script from "next/script";

/* ──────────────────── Data ──────────────────── */

type Category =
  | "All"
  | "Business Documents"
  | "Generators"
  | "Calculators"
  | "Developer Tools"
  | "Text Tools";

interface Tool {
  name: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  category: Category;
  tags: string[];
}

const categories: Category[] = [
  "All",
  "Business Documents",
  "Generators",
  "Calculators",
  "Developer Tools",
  "Text Tools",
];

const categoryColors: Record<Category, string> = {
  All: "#7c6cf0",
  "Business Documents": "#448aff",
  Generators: "#00e676",
  Calculators: "#18ffff",
  "Developer Tools": "#40c4ff",
  "Text Tools": "#64ffda",
};

const tools: Tool[] = [
  {
    name: "Invoice Generator",
    icon: "\uD83E\uDDFE",
    description:
      "Create professional invoices in seconds. Add line items, tax, discounts, and download as PDF instantly.",
    href: "/tools/invoice-generator",
    color: "#448aff",
    category: "Business Documents",
    tags: ["invoice", "pdf", "billing", "freelance"],
  },
  {
    name: "Receipt Maker",
    icon: "\uD83C\uDFF7\uFE0F",
    description:
      "Generate professional receipts for transactions and record-keeping. Download as PDF.",
    href: "/tools/receipt-maker",
    color: "#ff4081",
    category: "Business Documents",
    tags: ["receipt", "transaction", "payment", "record"],
  },
  {
    name: "Estimate Builder",
    icon: "\uD83D\uDCCB",
    description:
      "Build detailed project estimates and quotes for your clients. Professional formatting included.",
    href: "/tools/estimate-builder",
    color: "#ffd740",
    category: "Business Documents",
    tags: ["estimate", "quote", "proposal", "project"],
  },
  {
    name: "Pay Stub Creator",
    icon: "\uD83D\uDCB0",
    description:
      "Create pay stubs for employees and contractors in minutes. All deductions calculated.",
    href: "/tools/pay-stub-creator",
    color: "#26a69a",
    category: "Business Documents",
    tags: ["paystub", "payroll", "salary", "employee"],
  },
  {
    name: "QR Code Generator",
    icon: "\uD83D\uDCF1",
    description:
      "Generate QR codes for URLs, text, WiFi, contacts, and more. Download as PNG or SVG.",
    href: "/tools/qr-code-generator",
    color: "#00e676",
    category: "Generators",
    tags: ["qr", "barcode", "url", "wifi", "contact"],
  },
  {
    name: "Business Name Generator",
    icon: "\uD83D\uDCA1",
    description:
      "AI-powered business name ideas with instant domain availability checks.",
    href: "/tools/business-name-generator",
    color: "#ff9100",
    category: "Generators",
    tags: ["business name", "brand", "startup", "domain"],
  },
  {
    name: "Password Generator",
    icon: "\uD83D\uDD10",
    description:
      "Generate secure random passwords with custom length, complexity, and special characters.",
    href: "/tools/password-generator",
    color: "#e040fb",
    category: "Generators",
    tags: ["password", "security", "random", "strong"],
  },
  {
    name: "Lorem Ipsum Generator",
    icon: "\uD83D\uDCDC",
    description:
      "Generate placeholder text for your designs and mockups. Paragraphs, sentences, or words.",
    href: "/tools/lorem-ipsum-generator",
    color: "#ffab91",
    category: "Generators",
    tags: ["lorem ipsum", "placeholder", "dummy text", "design"],
  },
  {
    name: "Color Palette Generator",
    icon: "\uD83C\uDFA8",
    description:
      "Generate beautiful color palettes with harmony modes, contrast checks, and CSS export.",
    href: "/tools/color-palette-generator",
    color: "#ff6e40",
    category: "Generators",
    tags: ["color", "palette", "design", "css", "hex"],
  },
  {
    name: "Email Signature Creator",
    icon: "\u2709\uFE0F",
    description:
      "Build beautiful HTML email signatures for Gmail, Outlook, and Apple Mail. One-click copy.",
    href: "/tools/email-signature-creator",
    color: "#7c6cf0",
    category: "Generators",
    tags: ["email", "signature", "html", "gmail", "outlook"],
  },
  {
    name: "Profit Margin Calculator",
    icon: "\uD83D\uDCCA",
    description:
      "Calculate profit margins, markups, and break-even points instantly. Visual charts included.",
    href: "/tools/profit-margin-calculator",
    color: "#18ffff",
    category: "Calculators",
    tags: ["profit", "margin", "markup", "break-even", "business"],
  },
  {
    name: "Percentage Calculator",
    icon: "\uD83D\uDCAF",
    description:
      "Calculate percentages, percentage change, increase, and decrease. Multiple calculation modes.",
    href: "/tools/percentage-calculator",
    color: "#80d8ff",
    category: "Calculators",
    tags: ["percentage", "percent", "math", "calculate"],
  },
  {
    name: "JSON Formatter",
    icon: "\uD83D\uDCC4",
    description:
      "Format, validate, and minify JSON with syntax highlighting. Detect errors instantly.",
    href: "/tools/json-formatter",
    color: "#40c4ff",
    category: "Developer Tools",
    tags: ["json", "format", "validate", "minify", "developer"],
  },
  {
    name: "Markdown to HTML",
    icon: "\u2B07\uFE0F",
    description:
      "Convert Markdown to clean HTML with live preview and instant copy. Supports GFM.",
    href: "/tools/markdown-to-html",
    color: "#69f0ae",
    category: "Developer Tools",
    tags: ["markdown", "html", "convert", "preview", "developer"],
  },
  {
    name: "Text Case Converter",
    icon: "\uD83D\uDD24",
    description:
      "Convert text between UPPER, lower, Title, camelCase, snake_case, kebab-case, and more.",
    href: "/tools/text-case-converter",
    color: "#b388ff",
    category: "Developer Tools",
    tags: ["text", "case", "convert", "camelCase", "snake_case"],
  },
  {
    name: "Word Counter",
    icon: "\uD83D\uDCDD",
    description:
      "Count words, characters, sentences, paragraphs, and get reading time estimates instantly.",
    href: "/tools/word-counter",
    color: "#64ffda",
    category: "Text Tools",
    tags: ["word count", "character count", "reading time", "writing"],
  },
];

/* ──────────────────── JSON-LD ──────────────────── */

const toolsItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Online Business Tools",
  description:
    "A comprehensive collection of free online business tools — no signup required.",
  numberOfItems: tools.length,
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `https://prestokit.com${tool.href}`,
  })),
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "PrestoKit",
      item: "https://prestokit.com",
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Tools",
      item: "https://prestokit.com/tools",
    },
  ],
};

/* ──────────────────── Page ──────────────────── */

export default function ToolsIndexPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const matchesCategory =
        activeCategory === "All" || tool.category === activeCategory;
      const query = search.toLowerCase().trim();
      const matchesSearch =
        query === "" ||
        tool.name.toLowerCase().includes(query) ||
        tool.description.toLowerCase().includes(query) ||
        tool.tags.some((tag) => tag.toLowerCase().includes(query));
      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory]);

  const toolCount = filteredTools.length;
  const totalCount = tools.length;

  return (
    <>
      {/* JSON-LD Structured Data */}
      <Script
        id="tools-index-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsItemList) }}
        strategy="afterInteractive"
      />
      <Script
        id="tools-index-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        strategy="afterInteractive"
      />

      <div role="main">
        {/* ─── Hero Section ─── */}
        <section className="relative isolate overflow-hidden">
          {/* Animated background glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/5 blur-[120px] animate-hero-glow"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px] animate-hero-glow-alt"
          />

          <div className="mx-auto max-w-5xl px-6 pb-6 pt-10 sm:pt-12 lg:pt-14">
            {/* Breadcrumb */}
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex items-center gap-2 text-sm text-muted"
            >
              <Link
                href="/"
                className="transition-colors hover:text-white"
              >
                PrestoKit
              </Link>
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-muted-dark"
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
              <span className="text-white font-medium">Tools</span>
            </nav>

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card/60 px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-light">
                <span className="font-semibold text-white">{totalCount}</span>{" "}
                free tools &mdash; zero signup
              </span>
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Free Online{" "}
              <span className="text-gradient-primary">Business Tools</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-light sm:text-lg">
              Every tool is 100% free, works instantly in your browser, and
              requires no signup or credit card. Professional results in
              seconds.
            </p>
          </div>
        </section>

        {/* ─── Search & Filter ─── */}
        <section className="border-t border-brand-border bg-brand-darker/50">
          <div className="mx-auto max-w-7xl px-6 pt-8 pb-2">
            {/* Search bar */}
            <div className="relative mx-auto max-w-xl">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted"
                >
                  <circle cx="11" cy="11" r="8" />
                  <path d="M21 21l-4.35-4.35" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search tools... (e.g. invoice, QR code, password)"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-xl border border-brand-border bg-brand-card/60 py-3.5 pl-11 pr-4 text-sm text-white placeholder-muted outline-none backdrop-blur-sm transition-all focus:border-primary/50 focus:ring-2 focus:ring-primary/20"
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute inset-y-0 right-0 flex items-center pr-4 text-muted transition-colors hover:text-white"
                  aria-label="Clear search"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M18 6L6 18" />
                    <path d="M6 6l12 12" />
                  </svg>
                </button>
              )}
            </div>

            {/* Category filter buttons */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
              {categories.map((cat) => {
                const isActive = activeCategory === cat;
                const catColor = categoryColors[cat];
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200"
                    style={
                      isActive
                        ? {
                            backgroundColor: `${catColor}20`,
                            color: catColor,
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: `${catColor}40`,
                            boxShadow: `0 0 12px ${catColor}15`,
                          }
                        : {
                            backgroundColor: "transparent",
                            color: "#8888a0",
                            borderWidth: "1px",
                            borderStyle: "solid",
                            borderColor: "#1e1e2e",
                          }
                    }
                  >
                    {cat}
                    {isActive && cat !== "All" && (
                      <span
                        className="ml-1.5 inline-flex h-5 min-w-[20px] items-center justify-center rounded-full px-1 text-xs font-bold"
                        style={{
                          backgroundColor: `${catColor}30`,
                          color: catColor,
                        }}
                      >
                        {tools.filter((t) => t.category === cat).length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Result count */}
            <div className="mt-5 text-center text-sm text-muted">
              {search || activeCategory !== "All" ? (
                <span>
                  Showing{" "}
                  <span className="font-semibold text-white">{toolCount}</span>{" "}
                  of {totalCount} tools
                  {search && (
                    <span>
                      {" "}
                      for &ldquo;
                      <span className="text-primary-light">{search}</span>
                      &rdquo;
                    </span>
                  )}
                </span>
              ) : (
                <span>
                  Showing all{" "}
                  <span className="font-semibold text-white">{totalCount}</span>{" "}
                  tools
                </span>
              )}
            </div>
          </div>
        </section>

        {/* ─── Tools Grid ─── */}
        <section className="bg-brand-darker/50">
          <div className="mx-auto max-w-7xl px-6 pb-16 pt-6 sm:pb-20">
            {filteredTools.length > 0 ? (
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredTools.map((tool) => (
                  <ToolCard key={tool.href} tool={tool} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-card border border-brand-border">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-muted"
                  >
                    <circle cx="11" cy="11" r="8" />
                    <path d="M21 21l-4.35-4.35" />
                    <path d="M8 11h6" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-white">
                  No tools found
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Try a different search term or category.
                </p>
                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary/10 px-4 py-2 text-sm font-medium text-primary-light transition-colors hover:bg-primary/20"
                >
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* ─── CTA Section ─── */}
        <section className="border-t border-brand-border">
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20 text-center">
            <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-brand-card/40 p-8 sm:p-12">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-0 -z-10 h-40 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[80px]"
              />

              <div className="relative">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10">
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-accent"
                  >
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>

                <h2 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">
                  Need a specific tool?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-muted-light">
                  We build new tools every week based on what you need. Tell us
                  what&apos;s missing and we&apos;ll build it.
                </p>

                <a
                  href="mailto:hello@prestokit.com?subject=Tool%20Request"
                  className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-brand-dark shadow-xl shadow-accent/20 transition-all hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-0.5"
                >
                  Request a Tool
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 12h14" />
                    <path d="M12 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

/* ──────────────────── Components ──────────────────── */

function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.href}
      className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all duration-300 hover:bg-brand-card hover:-translate-y-0.5"
    >
      {/* Colored top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 group-hover:h-[4px]"
        style={{ backgroundColor: tool.color }}
      />

      {/* Hover glow effect */}
      <style>{`
        a[href="${tool.href}"]:hover {
          border-color: ${tool.color}40;
          box-shadow: 0 0 20px ${tool.color}15, 0 8px 32px ${tool.color}10;
        }
      `}</style>

      {/* Icon with colored background */}
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${tool.color}15` }}
      >
        {tool.icon}
      </div>

      {/* Tool name */}
      <h3 className="text-base font-semibold text-white">{tool.name}</h3>

      {/* Category badge */}
      <div
        className="mt-1.5 inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium"
        style={{
          backgroundColor: `${tool.color}12`,
          color: `${tool.color}`,
        }}
      >
        {tool.category}
      </div>

      {/* Description */}
      <p className="mt-3 text-sm leading-relaxed text-muted">
        {tool.description}
      </p>

      {/* Open tool CTA */}
      <div
        className="mt-4 flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
        style={{ color: tool.color }}
      >
        Open tool
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M5 12h14" />
          <path d="M12 5l7 7-7 7" />
        </svg>
      </div>
    </Link>
  );
}
