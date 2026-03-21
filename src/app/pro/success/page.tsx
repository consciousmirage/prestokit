import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Welcome to PrestoKit Pro!",
  description: "Your Pro subscription is active. Download your premium templates and resources.",
  robots: { index: false, follow: false },
};

/* ──────────────────── Data ──────────────────── */

const downloads = [
  {
    name: "Premium Invoice Template Pack",
    description: "10 professionally designed invoice templates for any business",
    icon: "\uD83E\uDDFE",
    href: "#download-invoice-pack",
  },
  {
    name: "100 ChatGPT Business Prompts",
    description: "AI prompts for marketing, sales, operations, and more",
    icon: "\uD83E\uDD16",
    href: "#download-chatgpt-prompts",
  },
  {
    name: "50 Email Templates",
    description: "Cold outreach, follow-ups, client communication, and more",
    icon: "\u2709\uFE0F",
    href: "#download-email-templates",
  },
  {
    name: "Business Launch Checklist",
    description: "Step-by-step guide to launching your business the right way",
    icon: "\uD83D\uDE80",
    href: "#download-launch-checklist",
  },
  {
    name: "Social Media Planner",
    description: "30-day content calendar with post ideas and scheduling",
    icon: "\uD83D\uDCC5",
    href: "#download-social-planner",
  },
  {
    name: "Freelancer Pricing Calculator",
    description: "Spreadsheet to calculate your ideal rates and project pricing",
    icon: "\uD83D\uDCB0",
    href: "#download-pricing-calculator",
  },
];

/* ──────────────────── Page ──────────────────── */

export default function ProSuccessPage() {
  return (
    <div role="main">
      {/* ─── Hero ─── */}
      <section className="relative isolate overflow-hidden">
        {/* Background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% -20%, rgba(0, 230, 118, 0.12), transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[120px] animate-hero-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 230, 118, 0.1) 0%, rgba(124, 108, 240, 0.06) 50%, transparent 100%)",
          }}
        />

        <div className="mx-auto max-w-3xl px-6 pb-8 pt-12 text-center sm:pt-16 lg:pt-20">
          {/* Success icon */}
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 shadow-lg shadow-accent/10">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5" />
            </svg>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl">
            Welcome to PrestoKit{" "}
            <span className="text-gradient-primary">Pro!</span>
          </h1>

          <p className="mx-auto mt-4 max-w-xl text-lg leading-relaxed text-muted-light">
            Thank you for subscribing. Your Pro subscription is now active and
            you have instant access to all premium content below.
          </p>

          {/* Active badge */}
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-5 py-2 text-sm font-medium text-accent">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            Your subscription is active
          </div>
        </div>
      </section>

      {/* ─── Downloads ─── */}
      <section className="border-t border-brand-border bg-brand-darker/50">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Your Premium Content
            </p>
            <h2 className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              Download Your Pro Resources
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-light">
              Click any item below to download. New premium content is added
              monthly — check back often.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            {downloads.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all duration-300 hover:bg-brand-card hover:border-brand-border-hover hover:-translate-y-0.5"
              >
                {/* Hover glow */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/5 blur-[40px] opacity-0 transition-opacity group-hover:opacity-100"
                />

                <div className="relative flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-2xl transition-transform group-hover:scale-110">
                    {item.icon}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base font-semibold text-white">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-sm text-muted">
                      {item.description}
                    </p>
                    <div className="mt-3 flex items-center gap-1.5 text-sm font-medium text-primary-light opacity-0 transition-opacity group-hover:opacity-100">
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
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      Download
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Back to Tools ─── */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <p className="text-muted-light">
            Your premium features are now active across all tools.
          </p>
          <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/#tools"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
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
              href="/pro"
              className="text-sm font-medium text-muted transition-colors hover:text-white"
            >
              View Pro details &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
