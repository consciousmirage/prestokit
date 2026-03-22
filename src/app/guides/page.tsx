import Link from "next/link";

const guides = [
  {
    title: "How to Create a Professional Invoice",
    description:
      "Everything you need to know about creating invoices that get you paid on time. Covers essential elements, best practices, and common mistakes.",
    href: "/guides/how-to-create-invoice",
    icon: "\uD83E\uDDFE",
    color: "#448aff",
    readTime: "12 min read",
  },
  {
    title: "How to Start a Small Business \u2014 Complete Guide",
    description:
      "A step-by-step walkthrough of launching your business, from choosing an idea to registering your LLC and landing your first customers.",
    href: "/guides/how-to-start-business",
    icon: "\uD83D\uDE80",
    color: "#ff9100",
    readTime: "15 min read",
  },
  {
    title: "Freelancing 101 \u2014 Getting Started as a Freelancer",
    description:
      "Your comprehensive guide to building a freelance career. Learn how to find clients, set rates, manage projects, and handle taxes.",
    href: "/guides/freelancing-guide",
    icon: "\uD83D\uDCBC",
    color: "#7c6cf0",
    readTime: "14 min read",
  },
  {
    title: "QR Codes \u2014 The Complete Guide",
    description:
      "Everything you need to know about QR codes: how they work, business use cases, design best practices, and printing guidelines.",
    href: "/guides/qr-code-guide",
    icon: "\uD83D\uDCF1",
    color: "#00e676",
    readTime: "11 min read",
  },
  {
    title: "How to Calculate Compound Interest",
    description:
      "Understand the compound interest formula, walk through real examples, and learn how to maximize your savings and investment growth.",
    href: "/guides/how-to-calculate-compound-interest",
    icon: "\uD83D\uDCB0",
    color: "#4caf50",
    readTime: "9 min read",
  },
  {
    title: "How to Write a Privacy Policy",
    description:
      "Step-by-step guide to writing a privacy policy that complies with GDPR, CCPA, and other regulations. Protect your business and build user trust.",
    href: "/guides/how-to-write-privacy-policy",
    icon: "\uD83D\uDD12",
    color: "#7c4dff",
    readTime: "10 min read",
  },
  {
    title: "How to Calculate Your Paycheck After Taxes",
    description:
      "Break down every deduction between your gross pay and take-home pay. Covers federal tax, FICA, state tax, and common payroll deductions.",
    href: "/guides/how-to-calculate-paycheck-after-taxes",
    icon: "\uD83D\uDCB5",
    color: "#00bcd4",
    readTime: "10 min read",
  },
  {
    title: "How to File Taxes as a Freelancer",
    description:
      "Everything freelancers need to know: quarterly estimated payments, Schedule C, self-employment tax, and deductions that save you money.",
    href: "/guides/how-to-file-taxes-freelancer",
    icon: "\uD83D\uDCCA",
    color: "#ff9800",
    readTime: "11 min read",
  },
  {
    title: "How to Create a Professional Business Card",
    description:
      "Design a business card that makes a lasting impression. Covers layout, typography, essential information, and printing tips.",
    href: "/guides/how-to-create-business-card",
    icon: "\uD83C\uDFB4",
    color: "#e91e63",
    readTime: "9 min read",
  },
  {
    title: "How to Calculate a Loan Payment",
    description:
      "Learn the monthly payment formula, understand amortization, and calculate the true cost of any mortgage, auto loan, or personal loan.",
    href: "/guides/how-to-calculate-loan-payment",
    icon: "\uD83C\uDFE0",
    color: "#2196f3",
    readTime: "10 min read",
  },
];

export default function GuidesIndex() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative border-b border-brand-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
        />
        <div className="mx-auto max-w-4xl px-6 pb-12 pt-12 sm:pt-16 text-center">
          {/* Breadcrumb */}
          <nav className="mb-8 flex items-center justify-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-white">
              PrestoKit
            </Link>
            <span className="text-muted-dark">/</span>
            <span className="text-white">Guides</span>
          </nav>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
            Free Business{" "}
            <span className="text-gradient-primary">Guides</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-light">
            Practical, no-fluff guides to help you invoice smarter, launch your
            business, go freelance, and grow. Written by the PrestoKit team.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {guides.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group relative overflow-hidden rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all duration-300 hover:bg-brand-card hover:-translate-y-0.5 hover:border-brand-border-hover"
            >
              {/* Colored top accent bar */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl transition-all duration-300 group-hover:h-[4px]"
                style={{ backgroundColor: guide.color }}
              />

              {/* Icon */}
              <div
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
                style={{ backgroundColor: `${guide.color}15` }}
              >
                {guide.icon}
              </div>

              <h2 className="text-lg font-semibold text-white">
                {guide.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-muted">
                {guide.description}
              </p>

              <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-muted-dark">{guide.readTime}</span>
                <span
                  className="flex items-center gap-1 text-sm font-medium opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ color: guide.color }}
                >
                  Read guide
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
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-brand-border">
        <div className="mx-auto max-w-4xl px-6 py-16 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to put this knowledge to work?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-light">
            PrestoKit gives you free, professional-grade tools to run your
            business. No signup required.
          </p>
          <Link
            href="/#tools"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white shadow-xl shadow-primary/20 transition-all hover:bg-primary-light hover:shadow-2xl hover:shadow-primary/30 hover:-translate-y-0.5"
          >
            Browse Free Tools
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
    </div>
  );
}
