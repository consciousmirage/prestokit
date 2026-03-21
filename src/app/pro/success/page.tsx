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

      {/* ─── Account Management ─── */}
      <section className="border-t border-brand-border bg-brand-darker/30">
        <div className="mx-auto max-w-3xl px-6 py-12 text-center">
          <div className="rounded-2xl border border-brand-border bg-brand-card/40 p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary-light"
              >
                <path d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Manage Your Subscription
            </h3>
            <p className="mt-2 text-sm text-muted-light max-w-md mx-auto">
              You can manage your subscription, update payment methods, or cancel
              anytime from your account page.
            </p>
            <Link
              href="/account"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5"
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
                <path d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.506-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" />
                <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Go to Your Account
            </Link>
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
