import Link from "next/link";
import Script from "next/script";

/* ──────────────────── Data ──────────────────── */

interface Tool {
  name: string;
  description: string;
  icon: string;
  href: string;
  color: string;
  comingSoon?: boolean;
}

const tools: Tool[] = [
  {
    name: "Invoice Generator",
    icon: "\uD83E\uDDFE",
    description:
      "Create professional invoices in seconds. Download as PDF instantly.",
    href: "/tools/invoice-generator",
    color: "#448aff",
  },
  {
    name: "QR Code Generator",
    icon: "\uD83D\uDCF1",
    description:
      "Generate QR codes for URLs, text, WiFi, contacts, and more.",
    href: "/tools/qr-code-generator",
    color: "#00e676",
  },
  {
    name: "Email Signature Creator",
    icon: "\u2709\uFE0F",
    description:
      "Build beautiful HTML email signatures for Gmail, Outlook, and Apple Mail.",
    href: "/tools/email-signature-creator",
    color: "#7c6cf0",
  },
  {
    name: "Business Name Generator",
    icon: "\uD83D\uDCA1",
    description:
      "AI-powered business name ideas with instant domain availability checks.",
    href: "/tools/business-name-generator",
    color: "#ff9100",
  },
  {
    name: "Profit Margin Calculator",
    icon: "\uD83D\uDCCA",
    description:
      "Calculate profit margins, markups, and break-even points instantly.",
    href: "/tools/profit-margin-calculator",
    color: "#18ffff",
  },
  {
    name: "Receipt Maker",
    icon: "\uD83C\uDFF7\uFE0F",
    description:
      "Generate professional receipts for transactions and record-keeping.",
    href: "/tools/receipt-maker",
    color: "#ff4081",
  },
  {
    name: "Estimate Builder",
    icon: "\uD83D\uDCCB",
    description:
      "Build detailed project estimates and quotes for your clients.",
    href: "/tools/estimate-builder",
    color: "#ffd740",
  },
  {
    name: "Pay Stub Creator",
    icon: "\uD83D\uDCB0",
    description:
      "Create pay stubs for employees and contractors in minutes.",
    href: "/tools/pay-stub-creator",
    color: "#26a69a",
  },
  {
    name: "Password Generator",
    icon: "\uD83D\uDD10",
    description:
      "Generate secure random passwords with custom length and complexity.",
    href: "/tools/password-generator",
    color: "#e040fb",
  },
  {
    name: "Word Counter",
    icon: "\uD83D\uDCDD",
    description:
      "Count words, characters, sentences, and get reading time estimates.",
    href: "/tools/word-counter",
    color: "#64ffda",
  },
  {
    name: "Lorem Ipsum Generator",
    icon: "\uD83D\uDCDC",
    description:
      "Generate placeholder text for your designs and mockups instantly.",
    href: "/tools/lorem-ipsum-generator",
    color: "#ffab91",
  },
  {
    name: "Percentage Calculator",
    icon: "\uD83D\uDCAF",
    description:
      "Calculate percentages, percentage change, increase, and decrease.",
    href: "/tools/percentage-calculator",
    color: "#80d8ff",
  },
  {
    name: "Text Case Converter",
    icon: "\uD83D\uDD24",
    description:
      "Convert text between UPPER, lower, Title, camelCase, snake_case, and more.",
    href: "/tools/text-case-converter",
    color: "#b388ff",
  },
  {
    name: "Color Palette Generator",
    icon: "\uD83C\uDFA8",
    description:
      "Generate beautiful color palettes with harmony modes and CSS export.",
    href: "/tools/color-palette-generator",
    color: "#ff6e40",
  },
  {
    name: "JSON Formatter",
    icon: "\uD83D\uDCC4",
    description:
      "Format, validate, and minify JSON with syntax highlighting.",
    href: "/tools/json-formatter",
    color: "#40c4ff",
  },
  {
    name: "Markdown to HTML",
    icon: "\u2B07\uFE0F",
    description:
      "Convert Markdown to HTML with live preview and instant copy.",
    href: "/tools/markdown-to-html",
    color: "#69f0ae",
  },
  {
    name: "Image Compressor",
    icon: "\uD83D\uDDBC\uFE0F",
    description:
      "Compress images in your browser. No upload needed, 100% private.",
    href: "/tools/image-compressor",
    color: "#ff7043",
  },
  {
    name: "Unit Converter",
    icon: "\uD83D\uDD04",
    description:
      "Convert between units of length, weight, temperature, volume, and more.",
    href: "/tools/unit-converter",
    color: "#7986cb",
  },
  {
    name: "Tip Calculator",
    icon: "\uD83D\uDCB5",
    description:
      "Calculate tips and split bills between any number of people.",
    href: "/tools/tip-calculator",
    color: "#4db6ac",
  },
  {
    name: "Date Calculator",
    icon: "\uD83D\uDCC5",
    description:
      "Calculate days between dates, add/subtract days, and countdown timers.",
    href: "/tools/date-calculator",
    color: "#f06292",
  },
  {
    name: "Mortgage Calculator",
    icon: "\uD83C\uDFE0",
    description:
      "Calculate monthly mortgage payments with amortization schedule.",
    href: "/tools/mortgage-calculator",
    color: "#aed581",
  },
  {
    name: "BMI Calculator",
    icon: "\u2696\uFE0F",
    description:
      "Calculate your Body Mass Index with Imperial or Metric units.",
    href: "/tools/bmi-calculator",
    color: "#4fc3f7",
  },
  {
    name: "Salary Calculator",
    icon: "\uD83D\uDCB0",
    description:
      "Convert between salary, hourly, daily, and monthly rates with tax estimates.",
    href: "/tools/salary-calculator",
    color: "#fff176",
  },
  {
    name: "Random Number Generator",
    icon: "\uD83C\uDFB2",
    description:
      "Generate random numbers, roll dice, flip coins, and pick from lists.",
    href: "/tools/random-number-generator",
    color: "#ce93d8",
  },
  {
    name: "Invoice Templates",
    icon: "\uD83D\uDCC3",
    description:
      "Browse 10 professional invoice template designs. Pick your style.",
    href: "/tools/invoice-templates",
    color: "#90a4ae",
  },
  {
    name: "Contract Generator",
    icon: "\uD83D\uDCDD",
    description:
      "Generate freelance contracts, NDAs, and service agreements instantly.",
    href: "/tools/contract-generator",
    color: "#a1887f",
  },
  {
    name: "Time Zone Converter",
    icon: "\uD83C\uDF0D",
    description:
      "Convert times between 22 time zones. Compare up to 4 zones at once.",
    href: "/tools/timezone-converter",
    color: "#4dd0e1",
  },
  {
    name: "ROI Calculator",
    icon: "\uD83D\uDCC8",
    description:
      "Calculate return on investment, compound growth, and marketing ROI.",
    href: "/tools/roi-calculator",
    color: "#81c784",
  },
  {
    name: "Tax Calculator",
    icon: "\uD83C\uDFE6",
    description:
      "Estimate federal income tax by bracket. See effective and marginal tax rates.",
    href: "/tools/tax-calculator",
    color: "#ef5350",
  },
  {
    name: "Compound Interest Calculator",
    icon: "\uD83D\uDCB9",
    description:
      "Calculate compound interest with contributions and visualize growth over time.",
    href: "/tools/compound-interest-calculator",
    color: "#ff9100",
  },
  {
    name: "Paycheck Calculator",
    icon: "\uD83D\uDCB8",
    description:
      "Estimate take-home pay after federal, state, Social Security, and Medicare taxes.",
    href: "/tools/paycheck-calculator",
    color: "#26c6da",
  },
  {
    name: "Business Card Generator",
    icon: "\uD83D\uDCBC",
    description:
      "Design professional business cards and download as high-resolution PNG.",
    href: "/tools/business-card-generator",
    color: "#ab47bc",
  },
  {
    name: "Privacy Policy Generator",
    icon: "\uD83D\uDD12",
    description:
      "Generate a privacy policy for your website covering GDPR, CCPA, and cookies.",
    href: "/tools/privacy-policy-generator",
    color: "#5c6bc0",
  },
  {
    name: "Age Calculator",
    icon: "\uD83C\uDF82",
    description:
      "Calculate your exact age in years, months, days, hours. Birthday countdown included.",
    href: "/tools/age-calculator",
    color: "#f48fb1",
  },
  {
    name: "GPA Calculator",
    icon: "\uD83C\uDF93",
    description:
      "Calculate weighted and unweighted GPA with multiple grading scales.",
    href: "/tools/gpa-calculator",
    color: "#9575cd",
  },
  {
    name: "Discount Calculator",
    icon: "\uD83D\uDCB2",
    description:
      "Calculate sale prices, savings, and percent off. Stack discounts and add tax.",
    href: "/tools/discount-calculator",
    color: "#e57373",
  },
  {
    name: "Loan Calculator",
    icon: "\uD83C\uDFE6",
    description:
      "Calculate monthly loan payments, total interest, and view amortization schedule.",
    href: "/tools/loan-calculator",
    color: "#4db6ac",
  },
  {
    name: "Character Counter",
    icon: "\uD83D\uDD24",
    description:
      "Count characters with limits for Twitter, Instagram, YouTube, LinkedIn, and more.",
    href: "/tools/character-counter",
    color: "#7986cb",
  },
  {
    name: "Hashtag Generator",
    icon: "#\uFE0F\u20E3",
    description:
      "Generate trending hashtags for Instagram, TikTok, and Twitter by topic.",
    href: "/tools/hashtag-generator",
    color: "#e040fb",
  },
  {
    name: "Resume Builder",
    icon: "\uD83D\uDCC4",
    description:
      "Build a professional resume with live preview. Print or save as PDF instantly.",
    href: "/tools/resume-builder",
    color: "#42a5f5",
  },
  {
    name: "Fuel Cost Calculator",
    icon: "\u26FD",
    description:
      "Calculate gas cost for any trip by distance, MPG, and fuel price.",
    href: "/tools/fuel-cost-calculator",
    color: "#66bb6a",
  },
  {
    name: "Screen Resolution Checker",
    icon: "\uD83D\uDDA5\uFE0F",
    description:
      "Check your screen resolution, DPI, aspect ratio, and device pixel ratio.",
    href: "/tools/screen-resolution-checker",
    color: "#29b6f6",
  },
  {
    name: "Regex Tester",
    icon: "\uD83D\uDD0D",
    description:
      "Test regular expressions with live matching, highlighting, and capture groups.",
    href: "/tools/regex-tester",
    color: "#ff7043",
  },
];

const valueProps = [
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
    title: "Instant. No Signup.",
    description:
      "Every tool works immediately. No accounts, no email gates, no friction.",
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M8 12l2 2 4-4" />
      </svg>
    ),
    title: "100% Free Forever",
    description:
      'No hidden fees. No "free trials" that auto-charge. Core tools are free, period.',
  },
  {
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
    title: "Professional Quality",
    description:
      "Every output looks like it came from expensive software. Impress your clients.",
  },
];

/* ──────────────────── JSON-LD Structured Data ──────────────────── */

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "PrestoKit",
  url: "https://prestokit.com",
  description:
    "Free instant business tools — invoice generator, QR code generator, email signature creator, and more. No signup required.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://prestokit.com/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const toolsSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Free Business Tools",
  numberOfItems: tools.length,
  itemListElement: tools.map((tool, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: tool.name,
    url: `https://prestokit.com${tool.href}`,
  })),
};

/* ──────────────────── Page ──────────────────── */

export default function Home() {
  return (
    <>
      {/* Structured Data */}
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        strategy="afterInteractive"
      />
      <Script
        id="tools-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
        strategy="afterInteractive"
      />

      <div role="main">
        {/* ─── Hero ─── */}
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
          {/* Secondary glow orb */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[300px] w-[300px] rounded-full bg-accent/5 blur-[100px] animate-hero-glow-alt"
          />

          <div className="mx-auto max-w-5xl px-6 pb-8 pt-10 text-center sm:pt-12 lg:pt-14">
            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card/60 px-4 py-1.5 text-sm backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
              </span>
              <span className="text-muted-light">
                <span className="font-semibold text-white">43</span> free tools
                &mdash; zero signup
              </span>
            </div>

            <h1 className="text-balance text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl">
              Free Business Tools
              <br />
              <span className="text-gradient-primary">That Just Work</span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-balance text-base leading-relaxed text-muted-light sm:text-lg">
              Invoice Generator, QR Code Creator, Email Signatures, Profit
              Calculator, and more &mdash; all free, instant, no signup
              required.
            </p>

            {/* Single CTA */}
            <div className="mt-7">
              <Link
                href="/#tools"
                className="group relative inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
              >
                Browse Tools
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-transform group-hover:translate-x-0.5"
                >
                  <path d="M5 12h14" />
                  <path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* ─── Tools Grid ─── */}
        <section
          id="tools"
          className="scroll-mt-20 border-t border-brand-border bg-brand-darker/50"
        >
          <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20">
            {/* Section header */}
            <div className="text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-4 py-1.5 text-sm font-semibold text-accent">
                <span>{tools.length} Tools</span>
              </div>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                43 Free Tools, Zero Signup
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-muted-light">
                Professional-grade business tools, completely free. Pick one and
                get started in seconds.
              </p>
            </div>

            <div className="mt-12 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
              {tools.map((tool) => (
                <ToolCard key={tool.href} tool={tool} />
              ))}
            </div>
          </div>
        </section>

        {/* ─── Why PrestoKit ─── */}
        <section
          id="why"
          className="scroll-mt-20 border-t border-brand-border"
        >
          <div className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
            <div className="text-center">
              <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                Why PrestoKit?
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Built different, on purpose
              </h2>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-3">
              {valueProps.map((prop) => (
                <article
                  key={prop.title}
                  className="group rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:border-brand-border-hover hover:bg-brand-card"
                >
                  <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary/20">
                    {prop.icon}
                  </div>
                  <h3 className="text-base font-semibold text-white">
                    {prop.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {prop.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ─── Pro Teaser ─── */}
        <section
          id="pro"
          className="scroll-mt-20 border-t border-brand-border bg-brand-darker/50"
        >
          <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
            <div className="relative overflow-hidden rounded-3xl border border-brand-border bg-brand-card/60 p-8 sm:p-12">
              {/* Background accent glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-primary/10 blur-[80px]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-accent/5 blur-[80px]"
              />

              <div className="relative">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Now Available
                </div>

                <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                  PrestoKit{" "}
                  <span className="text-gradient-primary">Pro</span>
                </h2>

                <p className="mt-4 max-w-xl text-lg text-muted-light">
                  Supercharge your workflow with AI-powered tools, saved
                  templates, and premium features.
                </p>

                <ul className="mt-8 space-y-3">
                  {[
                    "AI-powered invoice writing and auto-fill",
                    "Save and reuse templates across all tools",
                    "Custom branding: your logo, colors, and fonts on every document",
                    "Bulk generation: create 100 QR codes or invoices at once",
                    "Priority access to new tools before everyone else",
                    "Export in every format: PDF, PNG, SVG, CSV",
                  ].map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-sm text-muted-light"
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="mt-0.5 flex-shrink-0 text-accent"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M20 6L9 17l-5-5" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold text-white">
                      $9
                    </span>
                    <span className="text-muted">/mo</span>
                  </div>
                  <Link
                    href="/pro"
                    className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
                  >
                    Subscribe to Pro &mdash; $9/mo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── Request a Tool CTA ─── */}
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
  const cardContent = (
    <>
      {/* Colored top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 group-hover:h-[4px]"
        style={{ backgroundColor: tool.color }}
      />

      {/* Icon with colored background */}
      <div
        className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl text-2xl transition-transform group-hover:scale-110"
        style={{ backgroundColor: `${tool.color}15` }}
      >
        {tool.icon}
      </div>

      <div className="flex items-center gap-2">
        <h3 className="text-base font-semibold text-white">{tool.name}</h3>
        {tool.comingSoon && (
          <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-primary-light">
            Soon
          </span>
        )}
      </div>
      <p className="mt-2 text-sm leading-relaxed text-muted">
        {tool.description}
      </p>
      {!tool.comingSoon && (
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
      )}
    </>
  );

  if (tool.comingSoon) {
    return (
      <div className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card/40 p-6 opacity-60">
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={tool.href}
      className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all duration-300 hover:bg-brand-card hover:-translate-y-0.5"
      style={
        {
          "--card-color": tool.color,
        } as React.CSSProperties
      }
      onMouseEnter={undefined}
    >
      {/* Hover glow effect via CSS custom property */}
      <style>{`
        a[href="${tool.href}"]:hover {
          border-color: ${tool.color}40;
          box-shadow: 0 0 20px ${tool.color}15, 0 8px 32px ${tool.color}10;
        }
      `}</style>
      {cardContent}
    </Link>
  );
}
