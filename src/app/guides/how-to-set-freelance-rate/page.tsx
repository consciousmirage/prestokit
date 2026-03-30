import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Set Your Freelance Rate (Formula + Real Examples)",
  description:
    "Learn how to set freelance rates that cover your costs and match your market value. Includes the bare minimum formula, target income method, hourly vs project pricing, and real calculation examples.",
  keywords: [
    "how to set freelance rates",
    "freelance rate calculator",
    "freelance hourly rate",
    "how much to charge as a freelancer",
    "freelance pricing",
    "raise freelance rates",
    "freelance rate formula",
    "project rate vs hourly rate",
    "freelance income calculator",
    "what to charge clients",
  ],
  openGraph: {
    title: "How to Set Your Freelance Rate (Formula + Real Examples)",
    description:
      "The complete guide to setting freelance rates. Two formulas, real examples, market research tips, and advice on raising rates.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-set-freelance-rate",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Set Your Freelance Rate | PrestoKit",
    description:
      "Stop undercharging. Learn the formula for setting freelance rates that actually cover your costs and match your value.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-set-freelance-rate",
  },
};

const tocItems = [
  { id: "why-rate-matters", label: "Why Your Rate Matters More Than You Think" },
  { id: "bare-minimum-formula", label: "The Bare Minimum Formula" },
  { id: "target-income-method", label: "The Target Income Method" },
  { id: "market-research", label: "Market Research: What Others Charge" },
  { id: "hourly-vs-project", label: "Hourly vs. Project-Based Rates" },
  { id: "raising-rates", label: "How to Raise Your Rates" },
  { id: "common-mistakes", label: "Common Pricing Mistakes" },
  { id: "faq", label: "Frequently Asked Questions" },
];

export default function HowToSetFreelanceRatePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Set Your Freelance Rate (Formula + Real Examples)",
    description:
      "Learn how to set freelance rates using the bare minimum formula and target income method. Includes market research tips and examples.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-30",
    dateModified: "2026-03-30",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-set-freelance-rate",
  };

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Header */}
      <section className="relative border-b border-brand-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
        />
        <div className="mx-auto max-w-[720px] px-6 pb-10 pt-12 sm:pt-16">
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-white">
              PrestoKit
            </Link>
            <span className="text-muted-dark">/</span>
            <Link href="/guides" className="transition-colors hover:text-white">
              Guides
            </Link>
            <span className="text-muted-dark">/</span>
            <span className="text-muted-light">Freelance Rates</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Set Your Freelance Rate
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Most freelancers set their rate by guessing, copying a competitor, or just charging whatever feels safe. All three methods lead to the same outcome: leaving money on the table or burning out trying to stay afloat. This guide gives you two concrete formulas, real example calculations, and the market research approach that gets you paid what you are worth.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>12 min read</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="mx-auto max-w-[720px] px-6 py-12">
        <nav className="mb-12 rounded-2xl border border-brand-border bg-brand-card/40 p-6">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted-dark">
            Table of Contents
          </h2>
          <ol className="space-y-2">
            {tocItems.map((item, i) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="flex items-start gap-3 text-sm text-muted-light transition-colors hover:text-primary-light"
                >
                  <span className="mt-px font-mono text-xs text-muted-dark">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {item.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <div className="prose-custom">
          <section id="why-rate-matters" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Your Rate Matters More Than You Think
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Your hourly or project rate is not just a number. It determines the clients you attract, the work you take on, the hours you work, and whether freelancing is actually sustainable for you long-term. A rate that is too low attracts difficult clients who do not value your work, forces you to overwork to hit income goals, and creates a ceiling on what you can earn regardless of how good you get.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              A rate that is appropriately priced signals expertise. Counter-intuitively, raising your rate often attracts better clients, fewer problem projects, and more professional respect. Clients who pay premium rates tend to trust your judgment, respect your time, and be easier to work with.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              There is also a math problem that most freelancers underestimate. When you work for an employer, they handle payroll taxes, benefits, equipment, professional development, vacation pay, and the cost of finding new work. As a freelancer, all of those costs come out of your rate. An employee earning $60,000 per year has a true cost to their employer of $80,000-90,000. A freelancer charging the equivalent of $60,000 per year is actually earning far less after accounting for those same costs.
            </p>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm text-muted-light leading-relaxed">
                <strong className="text-white">Rule of thumb:</strong> Your freelance hourly rate should be at least 2x the equivalent employee hourly rate to account for taxes, benefits, downtime, and business expenses.
              </p>
            </div>
          </section>

          <section id="bare-minimum-formula" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Bare Minimum Formula
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Before you can charge what you are worth, you need to know the minimum you can charge without going broke. This formula calculates the floor, not the ceiling.
            </p>

            <div className="my-6 rounded-xl border border-brand-border bg-brand-card/30 p-6 text-center">
              <p className="text-lg font-mono text-white">
                Minimum Rate = (Annual Expenses + Taxes) / Billable Hours Per Year
              </p>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Step 1: Calculate Annual Expenses</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              List every cost you need to cover in a year. Include both personal living expenses and business costs:
            </p>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Rent / mortgage</span>
                <span className="text-sm text-white">$24,000/yr ($2,000/mo)</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Food, utilities, transportation</span>
                <span className="text-sm text-white">$18,000/yr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Health insurance</span>
                <span className="text-sm text-white">$6,000/yr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Software &amp; tools</span>
                <span className="text-sm text-white">$2,400/yr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Professional development</span>
                <span className="text-sm text-white">$1,200/yr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Emergency fund / savings</span>
                <span className="text-sm text-white">$6,000/yr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3 font-semibold">
                <span className="text-sm text-white">Total annual expenses</span>
                <span className="text-sm text-white">$57,600/yr</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Step 2: Add Self-Employment Tax</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Self-employment tax runs about 15.3% on top of income tax. A rough multiplier for taxes is 1.35x your net income need. So: $57,600 x 1.35 = <strong className="text-white">$77,760 gross revenue needed</strong>.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Step 3: Calculate Realistic Billable Hours</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              This is where most freelancers make a critical error. A full-time freelancer does not have 2,080 billable hours per year (40 hours x 52 weeks). You need time for:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Marketing and sales (finding new clients): 5-10 hours/week</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Admin, invoicing, emails: 3-5 hours/week</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Vacation and sick days: 3-4 weeks/year</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Gaps between projects: varies</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed mb-4">
              A realistic estimate for a full-time freelancer is <strong className="text-white">1,000 to 1,200 billable hours per year</strong> — not 2,080. Let us use 1,000 hours (conservative).
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Step 4: Calculate Your Minimum Rate</h3>
            <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
              <p className="text-sm text-muted-light leading-relaxed">
                $77,760 gross needed / 1,000 billable hours = <strong className="text-white">$77.76/hour minimum</strong>
              </p>
              <p className="text-sm text-muted-light leading-relaxed mt-2">
                If you want to charge $50/hour, you would need to bill 1,555 hours per year — nearly every working hour of the year, leaving no time for admin, marketing, or breaks. The math does not work.
              </p>
            </div>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Calculate your take-home after taxes.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Salary Calculator and Paycheck Calculator help you see exactly what a given rate translates to after self-employment tax and income tax.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/tools/salary-calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
              >
                Salary Calculator
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/tools/paycheck-calculator"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-border bg-brand-card px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-card/80"
              >
                Paycheck Calculator
              </Link>
            </div>
          </div>

          <section id="target-income-method" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Target Income Method
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The bare minimum formula tells you the floor. The target income method tells you what to actually charge to hit your financial goals. The formula is the same, but you replace &ldquo;annual expenses&rdquo; with your target income.
            </p>

            <div className="my-6 rounded-xl border border-brand-border bg-brand-card/30 p-6 text-center">
              <p className="text-lg font-mono text-white">
                Target Rate = (Target Income x 1.35) / Billable Hours Per Year
              </p>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Example: Targeting $100,000/Year</h3>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Target net income</span>
                <span className="text-sm text-white">$100,000</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Gross revenue needed (x1.35 for taxes)</span>
                <span className="text-sm text-white">$135,000</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Billable hours (conservative)</span>
                <span className="text-sm text-white">1,000 hrs/yr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3 font-semibold">
                <span className="text-sm text-white">Required hourly rate</span>
                <span className="text-sm text-white">$135/hr</span>
              </div>
            </div>

            <p className="text-muted-light leading-relaxed mb-4">
              If $135/hour feels high compared to what you are currently charging, that is important information. Either your income target needs to adjust, or you need to find a market where that rate is achievable. Both are valid paths.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Adjusting for Billable Hour Assumptions</h3>
            <p className="text-muted-light leading-relaxed">
              If you have steady, long-term client relationships and spend minimal time on business development, you might realistically bill 1,200-1,400 hours per year, which lowers your required rate. If you are new and expect significant downtime between projects, 800-900 hours is more conservative. Run your own numbers — the formula is the same regardless.
            </p>
          </section>

          <section id="market-research" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Market Research: What Others Charge
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Your minimum rate calculation tells you what you need. Market research tells you what the market will bear. The goal is to find a rate that covers your needs and is defensible based on market data.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Where to Find Rate Data</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">LinkedIn:</strong> Look at freelancers in your field with similar experience levels. Many list their rates or package pricing on their profiles.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Upwork:</strong> Search your skill category and filter by top-rated freelancers. Their displayed rates are public. Note the range from entry-level to expert.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Professional communities:</strong> Slack groups, Discord servers, and subreddits specific to your field regularly have rate discussion threads. These are often more honest than public profiles.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Ask directly:</strong> If you have a peer network, ask what people charge. Most freelancers are willing to share this information with peers. You do not need to ask clients — ask fellow freelancers.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Salary surveys:</strong> Bureau of Labor Statistics and industry surveys publish median hourly rates for many fields. Multiply the employee median rate by 2-2.5x to get a reasonable freelance equivalent.</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3">Rate Ranges by Common Freelance Category (2026)</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Graphic Design</span>
                <span className="text-sm text-white">$50 - $150/hr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Web Development (Frontend)</span>
                <span className="text-sm text-white">$75 - $200/hr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Copywriting / Content Writing</span>
                <span className="text-sm text-white">$50 - $150/hr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Video Editing</span>
                <span className="text-sm text-white">$50 - $125/hr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Marketing Strategy / Consulting</span>
                <span className="text-sm text-white">$100 - $300/hr</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">UX/Product Design</span>
                <span className="text-sm text-white">$100 - $250/hr</span>
              </div>
            </div>
            <p className="text-muted-light leading-relaxed text-sm">
              These are US market rates. Rates vary significantly by geography, industry, and specialization. A specialist commanding a niche skill can charge 2-3x the generalist rate in the same category.
            </p>
          </section>

          <section id="hourly-vs-project" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Hourly vs. Project-Based Rates
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The billing model you choose affects your income ceiling, your client relationships, and your risk exposure.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Hourly Rates</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Hourly billing protects you from scope creep — if a project takes longer, you get paid more. It is simple to explain and easy to track. The downside: clients can pressure you on hours, you are penalized for efficiency (the faster you get, the less you earn), and your income is capped by hours available.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Hourly works best for ongoing, open-ended work like consulting, maintenance retainers, or projects with unclear scope.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Project-Based (Fixed) Rates</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Fixed-price projects let you earn more when you are efficient. A project you price at $3,000 and complete in 15 hours nets you $200/hr. That same project priced hourly at $100/hr would have only earned you $1,500. Project pricing rewards expertise and speed.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              The risk: if you underestimate scope, you absorb the extra hours. Protect yourself with a detailed scope of work, a change order process, and a built-in buffer (add 20-30% to your hour estimate before setting the project price).
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Converting Between the Two</h3>
            <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
              <p className="text-sm text-muted-light leading-relaxed mb-2">
                To convert an hourly rate to a project price:
              </p>
              <p className="text-sm text-white font-mono mb-3">
                Project Price = (Estimated Hours x Hourly Rate) x 1.25 buffer
              </p>
              <p className="text-sm text-muted-light leading-relaxed">
                Example: 20-hour project at $100/hr = $2,000 x 1.25 = <strong className="text-white">$2,500 project price</strong>. The buffer covers unexpected complexity and protects your effective rate.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-white mt-6 mb-3">Retainer Agreements</h3>
            <p className="text-muted-light leading-relaxed">
              A retainer is a recurring monthly fee for a set scope of work or number of hours. Retainers provide predictable income, reduce the need for constant client acquisition, and build long-term relationships. A common structure: charge 80-90% of your normal rate in exchange for guaranteed monthly income. Use PrestoKit&rsquo;s{" "}
              <Link href="/tools/invoice-generator" className="text-primary-light hover:underline">
                Invoice Generator
              </Link>{" "}
              to send recurring professional invoices for retainer clients.
            </p>
          </section>

          <section id="raising-rates" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              How to Raise Your Rates
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              If you have been freelancing for more than a year and have not raised your rates, you almost certainly should. Inflation alone erodes your real income. Add experience, portfolio growth, and skill development, and your market value has increased even if your rate has not.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">When to Raise Your Rate</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">You are fully booked.</strong> If you cannot take on new work, you are underpriced. Raising rates is the economically correct move.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">You have new credentials or portfolio.</strong> Significant new skills, certifications, or high-profile client work justifies a rate increase.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Clients never push back on your rate.</strong> If 100% of prospects accept your rate immediately, you are likely underpriced. Some pushback is healthy and expected.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">It has been 12+ months since your last increase.</strong> Annual rate reviews should be standard practice.</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3">How to Communicate a Rate Increase</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Give existing clients 30-60 days notice. Be direct and confident — do not apologize. A good template:
            </p>
            <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
              <p className="text-sm text-muted-light leading-relaxed italic">
                &ldquo;Hi [Client], I wanted to give you advance notice that my rates will be increasing from $X to $Y per hour effective [date]. I have genuinely enjoyed working with you and am committed to delivering the same quality and responsiveness you have come to expect. If you have upcoming projects you would like to start before the rate change, I am happy to prioritize those. Please let me know if you have any questions.&rdquo;
              </p>
            </div>
            <p className="text-muted-light leading-relaxed mt-4">
              Most long-term clients will accept a reasonable increase. Some will not, and that is fine. A client who leaves over a 15-20% rate increase was likely not a high-value client relationship.
            </p>
          </section>

          <section id="common-mistakes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Common Pricing Mistakes
            </h2>
            <div className="space-y-5">
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Charging by the hour when you should charge by value</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  If your work delivers $50,000 in measurable value to a client, charging $100/hr for 10 hours ($1,000) leaves 98% of the value you created on the table. Value-based pricing asks: what is this worth to the client? That number should anchor your project price, not your hourly rate.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Not accounting for non-billable time</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Sales calls, proposals, project admin, revisions not covered by scope, and learning new skills all take time. If you are billing 30 hours/week but working 50, your effective rate is dramatically lower than your stated rate.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Discounting to win work</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Discounting trains clients to negotiate and signals that your rate was arbitrary to begin with. Instead of discounting, reduce scope. &ldquo;I cannot do this at $2,000, but I can do a lighter version for that budget.&rdquo; This maintains rate integrity while finding a middle ground.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Setting rates once and never reviewing them</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Your rate should increase at minimum annually. As you build experience, portfolio, and client relationships, your market value increases. A freelancer charging the same rate in year five as year one is effectively taking a pay cut every year due to inflation.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Competing on price with offshore talent</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  If your strategy is to be the cheapest option, you will always lose to someone in a lower cost-of-living country. Instead, compete on specialization, communication quality, cultural alignment, and proven results. These are things a client in Chicago values that someone charging $10/hr cannot provide.
                </p>
              </div>
            </div>
          </section>

          <section id="faq" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white mb-2">Should I show my rates on my website?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  There is no universal answer. Showing rates pre-qualifies prospects (those who cannot afford you will not waste your time) and can increase perceived transparency. Not showing rates lets you quote based on project complexity. Most experienced freelancers show starting rates or package prices rather than hourly rates, which avoids anchoring while giving prospects enough information to self-qualify.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">What if a client says my rate is too high?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Do not immediately drop your rate. Instead, acknowledge the feedback and ask what budget they have in mind. If the gap is small, consider a scope reduction. If the gap is large, they may simply not be the right client for your services. &ldquo;I understand — this may not be the right fit right now, but I am happy to reconnect if your budget changes.&rdquo; Maintaining rate integrity attracts better clients over time.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">How do I handle rates for different types of clients (startup vs. enterprise)?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Many freelancers charge different rates for different client types. Enterprise clients often have larger budgets, more complex projects, longer timelines, and higher stakes — all of which justify higher rates. A startup with a tight budget might get a slightly lower rate in exchange for an interesting project or equity. Just make sure your rate still covers your minimum from the bare minimum formula.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Should I charge more for rush work?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Yes, absolutely. A rush fee of 25-50% is standard and fair. Rush work disrupts your schedule, forces you to work evenings or weekends, and often creates stress. Charging for this is not rude — it is an accurate reflection of the cost to you.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">How do I handle a client who wants to renegotiate after we have agreed on a price?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Hold firm. Once a project is underway, renegotiating downward is a red flag behavior from a client. Reference your signed agreement and explain that you are committed to delivering what was scoped. If they want to reduce scope, that is a separate conversation. If they simply want to pay less for the same work, that is not a negotiation — it is a breach of your agreement.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">I am just starting out. Should I charge less to build my portfolio?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Working for reduced rates (or free) to build your portfolio is a temporary strategy, not a business model. Two or three portfolio projects is enough. After that, charge your real rate. You will attract the quality of client you price for. Clients who hire you at low rates tend to value you less and refer you to other low-budget clients.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">How do I invoice clients professionally?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Use a professional invoice template that includes your name or business name, client information, an itemized list of work, payment terms (net 15 or net 30 is standard), and your preferred payment method. PrestoKit&rsquo;s free Invoice Generator handles all of this automatically.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Related Guides */}
        <section className="mt-16 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/how-to-file-taxes-freelancer"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to File Taxes as a Freelancer
              </h3>
              <p className="mt-1 text-sm text-muted">
                Quarterly payments, deductions, Schedule C — everything you need.
              </p>
            </Link>
            <Link
              href="/guides/how-to-negotiate-salary"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Negotiate Your Salary
              </h3>
              <p className="mt-1 text-sm text-muted">
                Scripts and strategies that work for raises and new job offers.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/salary-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Salary Calculator
              </h3>
            </Link>
            <Link
              href="/tools/invoice-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Invoice Generator
              </h3>
            </Link>
            <Link
              href="/tools/paycheck-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Paycheck Calculator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
