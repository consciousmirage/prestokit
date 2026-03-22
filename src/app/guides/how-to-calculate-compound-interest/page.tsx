import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Compound Interest (With Formula & Examples)",
  description:
    "Learn how to calculate compound interest step by step. Understand the formula, see real examples, and use our free compound interest calculator to plan your savings and investments.",
  keywords: [
    "how to calculate compound interest",
    "compound interest formula",
    "compound interest examples",
    "compound interest calculator",
    "interest on interest",
    "savings growth",
    "investment calculator",
    "compound interest explained",
    "annual compound interest",
    "monthly compound interest",
  ],
  openGraph: {
    title: "How to Calculate Compound Interest (With Formula & Examples)",
    description:
      "Learn how to calculate compound interest step by step. Understand the formula, see real examples, and plan your savings.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-calculate-compound-interest",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Compound Interest | PrestoKit",
    description:
      "Step-by-step guide to understanding and calculating compound interest with real examples.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-calculate-compound-interest",
  },
};

const tocItems = [
  { id: "what-is-compound-interest", label: "What Is Compound Interest?" },
  { id: "the-formula", label: "The Compound Interest Formula" },
  { id: "step-by-step", label: "Step-by-Step Calculation" },
  { id: "compounding-frequency", label: "How Compounding Frequency Matters" },
  { id: "real-world-examples", label: "Real-World Examples" },
  { id: "simple-vs-compound", label: "Simple vs. Compound Interest" },
  { id: "tips-to-maximize", label: "Tips to Maximize Compound Interest" },
  { id: "tools", label: "Calculate It Now" },
];

export default function HowToCalculateCompoundInterestPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Calculate Compound Interest (With Formula & Examples)",
    description:
      "Learn how to calculate compound interest step by step. Understand the formula, see real examples, and use our free compound interest calculator.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-22",
    dateModified: "2026-03-22",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-calculate-compound-interest",
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
            <span className="text-muted-light">Compound Interest</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Calculate Compound Interest
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Compound interest is one of the most powerful forces in personal finance. This guide breaks down the formula, walks through real examples, and shows you how to put your money to work.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>9 min read</span>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <article className="mx-auto max-w-[720px] px-6 py-12">
        {/* Table of Contents */}
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

        {/* Content */}
        <div className="prose-custom">
          <section id="what-is-compound-interest" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              What Is Compound Interest?
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. In simple terms, it is interest on interest. This is what makes your savings grow exponentially rather than in a straight line.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              When you deposit money into a savings account or invest in the stock market, you earn interest or returns on your initial deposit. With compound interest, those earnings get added to your balance, and future interest is calculated on the new, larger amount. Over time, this snowball effect can turn modest savings into substantial wealth.
            </p>
            <p className="text-muted-light leading-relaxed">
              Albert Einstein reportedly called compound interest the eighth wonder of the world. Whether or not he actually said it, the math backs up the sentiment. Understanding how compound interest works gives you a significant advantage in planning your financial future.
            </p>
          </section>

          <section id="the-formula" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Compound Interest Formula
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The standard compound interest formula is:
            </p>
            <div className="my-6 rounded-xl border border-brand-border bg-brand-card/30 p-6 text-center">
              <p className="text-xl font-mono text-white">
                A = P(1 + r/n)<sup>nt</sup>
              </p>
            </div>
            <p className="text-muted-light leading-relaxed mb-4">
              Here is what each variable means:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">A</strong> = the future value of the investment or loan, including interest</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">P</strong> = the principal (your initial deposit or loan amount)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">r</strong> = the annual interest rate (as a decimal, so 5% = 0.05)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">n</strong> = the number of times interest compounds per year</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">t</strong> = the number of years the money is invested or borrowed</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              To find just the compound interest earned (not the total future value), subtract the principal: <strong className="text-white">Interest = A - P</strong>.
            </p>
          </section>

          <section id="step-by-step" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Step-by-Step Calculation
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Let us walk through a concrete example. Say you invest $10,000 at 6% annual interest, compounded monthly, for 5 years.
            </p>

            <div className="space-y-6">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 1: Identify Your Variables
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  P = $10,000 | r = 0.06 | n = 12 (monthly compounding) | t = 5 years
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 2: Plug Into the Formula
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A = 10,000(1 + 0.06/12)<sup>12 x 5</sup> = 10,000(1 + 0.005)<sup>60</sup>
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 3: Calculate the Parentheses
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  (1.005)<sup>60</sup> = 1.34885. This is the compound growth factor. It tells you your money will grow to about 1.349 times its original value.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 4: Multiply by the Principal
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A = 10,000 x 1.34885 = <strong className="text-white">$13,488.50</strong>. You earned $3,488.50 in compound interest on your original $10,000.
                </p>
              </div>
            </div>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Skip the math. Get instant results.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Compound Interest Calculator handles the formula automatically. Just enter your numbers and see your money grow.
            </p>
            <Link
              href="/tools/compound-interest-calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Calculate Compound Interest
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <section id="compounding-frequency" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              How Compounding Frequency Matters
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The more frequently interest compounds, the more you earn. Here is how $10,000 at 6% grows over 10 years with different compounding frequencies:
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Annually (n=1)</span>
                <span className="text-sm font-semibold text-white">$17,908.48</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Quarterly (n=4)</span>
                <span className="text-sm font-semibold text-white">$18,140.18</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Monthly (n=12)</span>
                <span className="text-sm font-semibold text-white">$18,193.97</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Daily (n=365)</span>
                <span className="text-sm font-semibold text-white">$18,220.44</span>
              </div>
            </div>
            <p className="text-muted-light leading-relaxed">
              The difference between annual and daily compounding on $10,000 over 10 years is about $312. On larger amounts or longer time horizons, this gap widens significantly. When choosing savings accounts or investments, always check the compounding frequency. Monthly or daily compounding is preferable to annual.
            </p>
          </section>

          <section id="real-world-examples" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Real-World Examples
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">Retirement Savings</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              A 25-year-old invests $5,000 per year in an index fund earning an average of 8% annually. By age 65, their total contributions are $200,000, but thanks to compound interest, their account grows to approximately $1,295,000. More than a million dollars came purely from compounding. This is why financial advisors emphasize starting early.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">High-Yield Savings Account</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              You put $20,000 in a high-yield savings account at 4.5% APY, compounded daily. After 3 years without adding any more money, your balance grows to about $22,883. That is $2,883 earned by doing absolutely nothing, and it compounds even faster if you make regular deposits.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Credit Card Debt (The Flip Side)</h3>
            <p className="text-muted-light leading-relaxed">
              Compound interest works against you with debt. A $5,000 credit card balance at 22% APR, compounded daily, with only minimum payments, can take over 20 years to pay off and cost more than $8,000 in interest. Understanding compound interest helps you see why paying down high-interest debt should be a priority.
            </p>
          </section>

          <section id="simple-vs-compound" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Simple vs. Compound Interest
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Simple interest is calculated only on the original principal. If you invest $10,000 at 6% simple interest for 10 years, you earn $600 per year, totaling $6,000 in interest and a final balance of $16,000.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              With compound interest (annual compounding), the same investment grows to $17,908. That is an extra $1,908 just from earning interest on your interest. The longer the time horizon, the more dramatic the difference becomes. Over 30 years, simple interest yields $28,000, while compound interest yields $57,435.
            </p>
            <p className="text-muted-light leading-relaxed">
              Most savings accounts, CDs, and investment returns use compound interest. Simple interest is typically found in some personal loans, car loans, and bonds. Knowing which type applies to your accounts helps you make better financial decisions.
            </p>
          </section>

          <section id="tips-to-maximize" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Tips to Maximize Compound Interest
            </h2>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Start as early as possible.</strong> Time is the most powerful variable in the compound interest formula. An extra 10 years of compounding can double or triple your returns.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Make regular contributions.</strong> Adding money consistently, even small amounts, dramatically accelerates growth. Set up automatic monthly transfers.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Choose higher compounding frequencies.</strong> Accounts that compound daily or monthly will grow faster than those compounding annually.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Reinvest your earnings.</strong> Do not withdraw interest or dividends. Let them compound. Reinvesting is what keeps the snowball growing.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Pay down high-interest debt first.</strong> Compound interest working against you (credit cards, payday loans) can negate your investment gains. Eliminate expensive debt before focusing on growth.</span>
              </li>
            </ul>
          </section>

          <section id="tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Calculate It Now
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Now that you understand how compound interest works, put it into practice. PrestoKit&rsquo;s free Compound Interest Calculator lets you plug in your numbers and instantly see how your money grows over time.
            </p>

            <Link
              href="/tools/compound-interest-calculator"
              className="group flex items-start gap-5 rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl" style={{ backgroundColor: "#4caf5015" }}>
                {"\uD83D\uDCB0"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-light transition-colors">
                  Free Compound Interest Calculator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Enter your principal, interest rate, compounding frequency, and time period. See your total growth instantly. No signup required.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary-light opacity-0 group-hover:opacity-100 transition-opacity">
                  Open tool
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5l7 7-7 7" /></svg>
                </span>
              </div>
            </Link>
          </section>
        </div>

        {/* Related Guides */}
        <section className="mt-16 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/how-to-calculate-loan-payment"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Calculate a Loan Payment
              </h3>
              <p className="mt-1 text-sm text-muted">
                Understand amortization, monthly payments, and total interest on any loan.
              </p>
            </Link>
            <Link
              href="/guides/how-to-file-taxes-freelancer"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to File Taxes as a Freelancer
              </h3>
              <p className="mt-1 text-sm text-muted">
                Quarterly estimates, deductions, and everything freelancers need to know about taxes.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/compound-interest-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Compound Interest Calculator
              </h3>
            </Link>
            <Link
              href="/tools/mortgage-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Mortgage Calculator
              </h3>
            </Link>
            <Link
              href="/tools/roi-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                ROI Calculator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
