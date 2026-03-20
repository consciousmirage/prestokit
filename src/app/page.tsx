import Link from "next/link";

/* ──────────────────── Data ──────────────────── */

interface Tool {
  name: string;
  description: string;
  icon: string;
  href: string;
  comingSoon?: boolean;
}

const tools: Tool[] = [
  {
    name: "Invoice Generator",
    icon: "\uD83E\uDDFE",
    description:
      "Create professional invoices in seconds. Download as PDF instantly.",
    href: "/tools/invoice-generator",
  },
  {
    name: "QR Code Generator",
    icon: "\uD83D\uDCF1",
    description:
      "Generate QR codes for URLs, text, WiFi, contacts, and more.",
    href: "/tools/qr-code-generator",
  },
  {
    name: "Email Signature Creator",
    icon: "\u2709\uFE0F",
    description:
      "Build beautiful HTML email signatures for Gmail, Outlook, and Apple Mail.",
    href: "/tools/email-signature-creator",
  },
  {
    name: "Business Name Generator",
    icon: "\uD83D\uDCA1",
    description:
      "AI-powered business name ideas with instant domain availability checks.",
    href: "/tools/business-name-generator",
  },
  {
    name: "Profit Margin Calculator",
    icon: "\uD83D\uDCCA",
    description:
      "Calculate profit margins, markups, and break-even points instantly.",
    href: "/tools/profit-margin-calculator",
  },
  {
    name: "Receipt Maker",
    icon: "\uD83C\uDFF7\uFE0F",
    description:
      "Generate professional receipts for transactions and record-keeping.",
    href: "/tools/receipt-maker",
    comingSoon: true,
  },
  {
    name: "Estimate Builder",
    icon: "\uD83D\uDCCB",
    description:
      "Build detailed project estimates and quotes for your clients.",
    href: "/tools/estimate-builder",
    comingSoon: true,
  },
  {
    name: "Pay Stub Creator",
    icon: "\uD83D\uDCB0",
    description:
      "Create pay stubs for employees and contractors in minutes.",
    href: "/tools/pay-stub-creator",
    comingSoon: true,
  },
];

const valueProps = [
  {
    icon: (
      <svg
        width="24"
        height="24"
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
      "Every tool works immediately. No accounts, no email gates, no friction. Just open and go.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
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
    title: "Beautiful & Professional",
    description:
      "Every output looks like it came from expensive software. Impress clients with polished results.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
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
    title: "100% Free",
    description:
      "No hidden fees. No \"free trials\" that auto-charge. The core tools are free forever, period.",
  },
  {
    icon: (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
    title: "New Tools Weekly",
    description:
      "We ship new business tools every week. Have a request? We'll build it.",
  },
];

/* ──────────────────── Page ──────────────────── */

export default function Home() {
  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative isolate overflow-hidden">
        {/* Background glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-primary/5 blur-[120px]"
        />

        <div className="mx-auto max-w-5xl px-6 pb-24 pt-28 text-center sm:pt-36 lg:pt-44">
          {/* Badge */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-brand-border bg-brand-card/60 px-4 py-1.5 text-sm backdrop-blur-sm">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse-glow" />
            <span className="text-muted-light">New tools added weekly</span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            Free Business Tools
            <br />
            <span className="text-gradient-primary">That Just Work</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-light sm:text-xl">
            No signup. No BS. Just tools. Create invoices, QR codes, email
            signatures, and more — instantly, for free.
          </p>

          {/* CTA buttons */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
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
            <Link
              href="/#why"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-brand-border px-8 py-3.5 text-base font-medium text-muted-light transition-all hover:border-brand-border-hover hover:bg-brand-card hover:text-white"
            >
              Learn More
            </Link>
          </div>

          {/* Social proof teaser */}
          <p className="mt-12 text-sm text-muted-dark">
            Trusted by 1,000+ freelancers, startups, and small businesses
          </p>
        </div>
      </section>

      {/* ─── Tools Grid ─── */}
      <section id="tools" className="scroll-mt-20 border-t border-brand-border bg-brand-darker/50">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Tool Suite
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need to run your business
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-light">
              Professional-grade tools, completely free. Pick one and get
              started in seconds.
            </p>
          </div>

          <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool) => (
              <ToolCard key={tool.href} tool={tool} />
            ))}
          </div>
        </div>
      </section>

      {/* ─── Why PrestoKit ─── */}
      <section id="why" className="scroll-mt-20 border-t border-brand-border">
        <div className="mx-auto max-w-7xl px-6 py-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Why PrestoKit?
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Built different, on purpose
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-light">
              We got tired of business tools that require a 10-step signup,
              credit card, and a blood sample. So we built the alternative.
            </p>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {valueProps.map((prop) => (
              <div
                key={prop.title}
                className="group rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:border-brand-border-hover hover:bg-brand-card"
              >
                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary-light transition-colors group-hover:bg-primary/20">
                  {prop.icon}
                </div>
                <h3 className="text-base font-semibold text-white">
                  {prop.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {prop.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Pro Teaser ─── */}
      <section id="pro" className="scroll-mt-20 border-t border-brand-border bg-brand-darker/50">
        <div className="mx-auto max-w-4xl px-6 py-24">
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
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary-light">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
                Coming Soon
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
                <button
                  disabled
                  className="rounded-xl bg-primary/20 px-6 py-3 text-sm font-semibold text-primary-light transition-colors cursor-not-allowed"
                >
                  Join the Waitlist (Coming Soon)
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Bottom CTA ─── */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to get things done?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-light">
            Stop paying for tools that should be free. Start building your
            business today.
          </p>
          <Link
            href="/#tools"
            className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-8 py-3.5 text-base font-semibold text-brand-dark shadow-xl shadow-accent/20 transition-all hover:bg-accent-light hover:shadow-2xl hover:shadow-accent/30 hover:-translate-y-0.5"
          >
            Start Building — It&apos;s Free
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
          </Link>
        </div>
      </section>
    </>
  );
}

/* ──────────────────── Components ──────────────────── */

function ToolCard({ tool }: { tool: Tool }) {
  const cardContent = (
    <>
      <div className="mb-4 text-3xl">{tool.icon}</div>
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
        <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary-light opacity-0 transition-opacity group-hover:opacity-100">
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
      <div className="group relative rounded-2xl border border-brand-border bg-brand-card/40 p-6 opacity-60">
        {cardContent}
      </div>
    );
  }

  return (
    <Link
      href={tool.href}
      className="group relative rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:border-brand-border-hover hover:bg-brand-card hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-0.5"
    >
      {cardContent}
    </Link>
  );
}
