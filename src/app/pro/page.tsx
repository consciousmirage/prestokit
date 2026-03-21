import Link from "next/link";

/* ──────────────────── Data ──────────────────── */

const proFeatures = [
  "All 24+ free tools (always free)",
  "Premium downloadable templates (invoice packs, email templates, business docs)",
  "Exclusive Pro-only tools (coming soon)",
  "AI-powered features (coming soon)",
  "No ads, clean experience",
  "Priority support",
  "New premium content monthly",
];

const comparisonRows = [
  { feature: "24+ Business Tools", free: true, pro: true },
  { feature: "PDF & PNG Export", free: true, pro: true },
  { feature: "Premium Template Packs", free: false, pro: true },
  { feature: "100 ChatGPT Business Prompts", free: false, pro: true },
  { feature: "50 Email Templates", free: false, pro: true },
  { feature: "Business Launch Checklist", free: false, pro: true },
  { feature: "Social Media Planner", free: false, pro: true },
  { feature: "Freelancer Pricing Calculator", free: false, pro: true },
  { feature: "Exclusive Pro-Only Tools", free: false, pro: true },
  { feature: "AI-Powered Features", free: false, pro: true },
  { feature: "Ad-Free Experience", free: false, pro: true },
  { feature: "Priority Support", free: false, pro: true },
  { feature: "New Premium Content Monthly", free: false, pro: true },
];

const faqs = [
  {
    question: "Is it really cancel anytime?",
    answer:
      "Yes, 100%. You can cancel your subscription at any time from your account — no hoops to jump through, no retention tactics, no questions asked. You keep access until the end of your billing period.",
  },
  {
    question: "What do I get immediately after subscribing?",
    answer:
      "Instant access to all premium downloadable templates: the Invoice Template Pack, 100 ChatGPT Business Prompts, 50 Email Templates, Business Launch Checklist, Social Media Planner, and Freelancer Pricing Calculator. More content is added monthly.",
  },
  {
    question: "Do I lose access to free tools if I don't subscribe?",
    answer:
      "Never. All 24+ core tools are free forever. Pro is purely additive — it gives you premium templates, exclusive tools, and extra features on top of what's already free.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes. If you're not satisfied within the first 7 days, email us and we'll refund you in full. No questions asked.",
  },
  {
    question: "Will more Pro content be added?",
    answer:
      "Absolutely. We add new premium templates, tools, and resources every month. Your subscription gets more valuable over time.",
  },
  {
    question: "Can I use the templates for client work?",
    answer:
      "Yes! All premium templates come with a commercial license. Use them for your own business or for client projects — no restrictions.",
  },
];

/* ──────────────────── Page ──────────────────── */

export default function ProPage() {
  return (
    <div role="main">
      {/* ─── Hero ─── */}
      <section className="relative isolate overflow-hidden">
        {/* Animated background glows */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 50% -20%, rgba(124, 108, 240, 0.15), transparent)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 -z-10 h-[600px] w-[900px] -translate-x-1/2 -translate-y-1/3 rounded-full blur-[120px] animate-hero-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(124, 108, 240, 0.12) 0%, rgba(157, 144, 245, 0.06) 50%, transparent 100%)",
          }}
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute right-1/4 top-1/3 -z-10 h-[350px] w-[350px] rounded-full blur-[100px] animate-hero-glow-alt"
          style={{
            background:
              "radial-gradient(circle, rgba(0, 230, 118, 0.08) 0%, transparent 70%)",
          }}
        />
        {/* Extra gold glow for premium feel */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-[250px] w-[250px] rounded-full blur-[100px] animate-hero-glow"
          style={{
            background:
              "radial-gradient(circle, rgba(255, 215, 0, 0.06) 0%, transparent 70%)",
          }}
        />

        <div className="mx-auto max-w-4xl px-6 pb-8 pt-12 text-center sm:pt-16 lg:pt-20">
          {/* Pro badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-5 py-2 text-sm font-medium backdrop-blur-sm">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="text-primary-light"
            >
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="text-primary-light">Premium</span>
          </div>

          <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
            PrestoKit{" "}
            <span
              style={{
                background:
                  "linear-gradient(135deg, #7c6cf0 0%, #9d90f5 30%, #c4b5fd 60%, #e0d4ff 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Pro
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-balance text-lg leading-relaxed text-muted-light sm:text-xl">
            Supercharge your workflow with premium tools and resources
          </p>
        </div>
      </section>

      {/* ─── Pricing Card ─── */}
      <section className="relative border-t border-brand-border bg-brand-darker/50">
        <div className="mx-auto max-w-2xl px-6 py-16 sm:py-20">
          <div className="relative overflow-hidden rounded-3xl border border-primary/30 bg-brand-card/80 p-8 sm:p-12 shadow-2xl">
            {/* Card glow effects */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full blur-[80px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(124, 108, 240, 0.2) 0%, transparent 70%)",
              }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full blur-[80px]"
              style={{
                background:
                  "radial-gradient(circle, rgba(0, 230, 118, 0.08) 0%, transparent 70%)",
              }}
            />
            {/* Shimmering border top */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  "linear-gradient(90deg, transparent 0%, #7c6cf0 20%, #9d90f5 50%, #7c6cf0 80%, transparent 100%)",
              }}
            />

            <div className="relative">
              {/* Plan name */}
              <div className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary-light">
                Pro Plan
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2">
                <span className="text-6xl font-extrabold tracking-tight text-white sm:text-7xl">
                  $9
                </span>
                <span className="text-xl text-muted">/month</span>
              </div>

              <p className="mt-3 text-muted-light">
                Everything you need to level up your business workflow.
              </p>

              {/* Divider */}
              <div className="my-8 h-px bg-brand-border" />

              {/* Feature list */}
              <ul className="space-y-4">
                {proFeatures.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3 text-[15px] text-muted-light"
                  >
                    <svg
                      width="20"
                      height="20"
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

              {/* CTA */}
              <div className="mt-10">
                <a
                  id="pro-subscribe-btn"
                  href="https://buy.stripe.com/eVq6oIgtm9HF96c9Mm0x200"
                  className="group relative block w-full overflow-hidden rounded-xl bg-primary px-8 py-4 text-center text-lg font-bold text-white shadow-xl shadow-primary/25 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/35 hover:-translate-y-0.5"
                >
                  {/* Button shimmer effect */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%)",
                    }}
                  />
                  <span className="relative">Subscribe to Pro &mdash; $9/mo</span>
                </a>
              </div>

              {/* Cancel anytime note */}
              <p className="mt-4 text-center text-sm text-muted">
                Cancel anytime. No contracts, no hidden fees.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Comparison Table ─── */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-4xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              Compare Plans
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Free vs Pro
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-light">
              Free tools are free forever. Pro adds premium content and
              features on top.
            </p>
          </div>

          <div className="mt-12 overflow-hidden rounded-2xl border border-brand-border">
            {/* Table header */}
            <div className="grid grid-cols-3 bg-brand-card/80 px-6 py-4 text-sm font-semibold">
              <div className="text-muted-light">Feature</div>
              <div className="text-center text-muted-light">Free</div>
              <div className="text-center text-primary-light">Pro</div>
            </div>

            {/* Table rows */}
            {comparisonRows.map((row, i) => (
              <div
                key={row.feature}
                className={`grid grid-cols-3 items-center px-6 py-3.5 text-sm ${
                  i % 2 === 0
                    ? "bg-brand-card/30"
                    : "bg-brand-card/10"
                } ${i < comparisonRows.length - 1 ? "border-b border-brand-border/50" : ""}`}
              >
                <div className="text-muted-light">{row.feature}</div>
                <div className="text-center">
                  {row.free ? (
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      className="mx-auto text-accent"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5" />
                    </svg>
                  ) : (
                    <span className="text-muted-dark">&mdash;</span>
                  )}
                </div>
                <div className="text-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="mx-auto text-accent"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 6L9 17l-5-5" />
                  </svg>
                </div>
              </div>
            ))}

            {/* Price row */}
            <div className="grid grid-cols-3 items-center border-t border-brand-border bg-brand-card/60 px-6 py-5">
              <div className="text-sm font-semibold text-white">Price</div>
              <div className="text-center">
                <span className="text-lg font-bold text-white">$0</span>
                <span className="text-sm text-muted">/mo</span>
              </div>
              <div className="text-center">
                <span className="text-lg font-bold text-white">$9</span>
                <span className="text-sm text-muted">/mo</span>
              </div>
            </div>
          </div>

          {/* CTA under table */}
          <div className="mt-8 text-center">
            <a
              href="https://buy.stripe.com/eVq6oIgtm9HF96c9Mm0x200"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Get Pro Now
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
            </a>
          </div>
        </div>
      </section>

      {/* ─── Money-Back Guarantee ─── */}
      <section className="border-t border-brand-border bg-brand-darker/50">
        <div className="mx-auto max-w-2xl px-6 py-12">
          <div className="relative overflow-hidden rounded-2xl border border-accent/20 bg-accent/5 p-8 text-center">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 -z-10"
              style={{
                background:
                  "radial-gradient(circle at center, rgba(0, 230, 118, 0.06) 0%, transparent 70%)",
              }}
            />
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                className="text-accent"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                <path d="M9 12l2 2 4-4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white">
              7-Day Money-Back Guarantee
            </h3>
            <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-light">
              Not satisfied? Email us within 7 days for a full refund. No
              questions asked. We&apos;re confident you&apos;ll love it.
            </p>
          </div>
        </div>
      </section>

      {/* ─── FAQ ─── */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-primary">
              FAQ
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="mt-12 space-y-6">
            {faqs.map((faq) => (
              <div
                key={faq.question}
                className="rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-colors hover:border-brand-border-hover hover:bg-brand-card/60"
              >
                <h3 className="text-base font-semibold text-white">
                  {faq.question}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-light">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Final CTA ─── */}
      <section className="border-t border-brand-border bg-brand-darker/50">
        <div className="mx-auto max-w-3xl px-6 py-16 sm:py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to go{" "}
            <span className="text-gradient-primary">Pro</span>?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-muted-light">
            Join PrestoKit Pro today and unlock premium templates, exclusive
            tools, and a cleaner experience.
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <a
              href="https://buy.stripe.com/eVq6oIgtm9HF96c9Mm0x200"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
            >
              Subscribe to Pro &mdash; $9/mo
            </a>
            <Link
              href="/#tools"
              className="text-sm font-medium text-muted transition-colors hover:text-white"
            >
              Or browse free tools &rarr;
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
