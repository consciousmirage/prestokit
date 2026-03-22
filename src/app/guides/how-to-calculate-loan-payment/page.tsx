import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate a Loan Payment (Formula, Examples & Free Tool)",
  description:
    "Learn how to calculate monthly loan payments step by step. Understand amortization, interest, and total cost of a mortgage, car loan, or personal loan with our free calculator.",
  keywords: [
    "how to calculate loan payment",
    "loan payment formula",
    "mortgage payment calculator",
    "loan amortization",
    "monthly payment calculator",
    "car loan calculator",
    "personal loan calculator",
    "loan interest calculator",
    "amortization schedule",
    "loan payment examples",
  ],
  openGraph: {
    title: "How to Calculate a Loan Payment (Formula, Examples & Free Tool)",
    description:
      "Step-by-step guide to calculating monthly loan payments. Understand amortization and total cost for any loan.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-calculate-loan-payment",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate a Loan Payment | PrestoKit",
    description:
      "Learn the loan payment formula, see real examples, and calculate payments for any loan type.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-calculate-loan-payment",
  },
};

const tocItems = [
  { id: "how-loan-payments-work", label: "How Loan Payments Work" },
  { id: "the-formula", label: "The Monthly Payment Formula" },
  { id: "step-by-step", label: "Step-by-Step Calculation" },
  { id: "amortization", label: "Understanding Amortization" },
  { id: "loan-types", label: "Calculations for Different Loan Types" },
  { id: "factors-affecting", label: "Factors That Affect Your Payment" },
  { id: "tips-to-save", label: "Tips to Lower Your Monthly Payment" },
  { id: "tools", label: "Calculate Your Payment Now" },
];

export default function HowToCalculateLoanPaymentPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Calculate a Loan Payment (Formula, Examples & Free Tool)",
    description:
      "Learn how to calculate monthly loan payments step by step. Understand amortization, interest, and total cost of any loan.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-22",
    dateModified: "2026-03-22",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-calculate-loan-payment",
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
            <span className="text-muted-light">Loan Payments</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Calculate a Loan Payment
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Whether you are buying a home, financing a car, or taking out a personal loan, understanding how your monthly payment is calculated helps you make smarter borrowing decisions. This guide breaks down the formula, walks through real examples, and explains what drives the total cost of a loan.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>10 min read</span>
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
          <section id="how-loan-payments-work" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              How Loan Payments Work
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              When you take out a loan, you borrow a specific amount (the principal) and agree to pay it back over a set period (the term) with interest. Most loans use fixed monthly payments, meaning you pay the same amount each month for the life of the loan. However, the split between principal and interest within each payment changes over time.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              In the early months, most of your payment goes toward interest. As you gradually pay down the principal, the interest portion shrinks and more of each payment reduces the balance. This process is called amortization, and it is how virtually all mortgages, auto loans, and personal loans work.
            </p>
            <p className="text-muted-light leading-relaxed">
              Understanding this structure is important because it explains why making extra payments early in a loan&rsquo;s life saves far more interest than extra payments made later. It also helps you see the true cost of borrowing beyond just the interest rate.
            </p>
          </section>

          <section id="the-formula" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Monthly Payment Formula
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The standard formula for calculating a fixed monthly loan payment is:
            </p>
            <div className="my-6 rounded-xl border border-brand-border bg-brand-card/30 p-6 text-center">
              <p className="text-xl font-mono text-white">
                M = P[r(1+r)<sup>n</sup>] / [(1+r)<sup>n</sup> - 1]
              </p>
            </div>
            <p className="text-muted-light leading-relaxed mb-4">
              Where:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">M</strong> = your monthly payment</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">P</strong> = the principal (loan amount)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">r</strong> = the monthly interest rate (annual rate divided by 12)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">n</strong> = the total number of monthly payments (loan term in years x 12)</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              This formula looks intimidating, but it is straightforward once you plug in the numbers. A calculator handles the math instantly, but understanding the formula helps you see how changing each variable affects your payment.
            </p>
          </section>

          <section id="step-by-step" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Step-by-Step Calculation
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Let us calculate the monthly payment on a $300,000 mortgage at 6.5% interest for 30 years.
            </p>

            <div className="space-y-6">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 1: Identify Your Variables</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  P = $300,000 | Annual rate = 6.5% | r = 0.065/12 = 0.005417 | n = 30 x 12 = 360 monthly payments
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 2: Calculate the Numerator</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  r(1+r)<sup>n</sup> = 0.005417(1.005417)<sup>360</sup> = 0.005417 x 6.9917 = 0.03788
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 3: Calculate the Denominator</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  (1+r)<sup>n</sup> - 1 = 6.9917 - 1 = 5.9917
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 4: Divide and Multiply</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  M = 300,000 x (0.03788 / 5.9917) = 300,000 x 0.006321 = <strong className="text-white">$1,896.20 per month</strong>
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Step 5: Find the Total Cost</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Total paid over 30 years: $1,896.20 x 360 = $682,632. Total interest: $682,632 - $300,000 = <strong className="text-white">$382,632 in interest</strong>. You pay more than double the original loan amount.
                </p>
              </div>
            </div>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Calculate your loan payment instantly.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Mortgage Calculator handles the formula automatically. Enter your loan amount, interest rate, and term to see your monthly payment and total interest.
            </p>
            <Link
              href="/tools/mortgage-calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Calculate Loan Payment
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <section id="amortization" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Understanding Amortization
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              An amortization schedule shows exactly how each payment splits between principal and interest. Using our $300,000 mortgage example at 6.5% for 30 years:
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Payment 1</span>
                <span className="text-sm text-muted-light">$1,625 interest / $271 principal</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Payment 60 (Year 5)</span>
                <span className="text-sm text-muted-light">$1,546 interest / $350 principal</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Payment 180 (Year 15)</span>
                <span className="text-sm text-muted-light">$1,276 interest / $620 principal</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Payment 360 (Final)</span>
                <span className="text-sm text-muted-light">$10 interest / $1,886 principal</span>
              </div>
            </div>
            <p className="text-muted-light leading-relaxed">
              In the first payment, 86% goes to interest and only 14% to principal. By the final payment, it flips almost entirely to principal. This is why the first few years of a mortgage feel like you are barely making progress on the balance. It also explains why refinancing early saves more than refinancing late, and why extra principal payments in the early years are so powerful.
            </p>
          </section>

          <section id="loan-types" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Calculations for Different Loan Types
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">Mortgage</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Mortgages typically span 15 or 30 years. Remember that your total monthly housing payment includes not just principal and interest but also property tax, homeowner&rsquo;s insurance, and possibly PMI (private mortgage insurance, required if your down payment is less than 20%). These additional costs can add $300-800+ per month depending on your area.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Auto Loan</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Car loans are usually 36, 48, 60, or 72 months. A $30,000 car loan at 5.5% for 60 months results in a monthly payment of about $574, with $4,418 in total interest. Shorter terms mean higher payments but less total interest. A 36-month term on the same loan costs $904 per month but only $2,534 in interest, saving you nearly $1,900.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Personal Loan</h3>
            <p className="text-muted-light leading-relaxed">
              Personal loans typically range from 12 to 84 months with higher interest rates than secured loans (7-25%+ depending on credit). A $10,000 personal loan at 10% for 36 months results in a monthly payment of about $323. The same formula applies. Because of the higher rates, the total interest adds up quickly, so shorter terms are generally advisable for personal loans.
            </p>
          </section>

          <section id="factors-affecting" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Factors That Affect Your Payment
            </h2>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Interest rate.</strong> Even a 0.5% difference in rate changes your payment significantly. On a $300,000 30-year mortgage, the difference between 6% and 6.5% is about $95 per month, or $34,200 over the life of the loan.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Loan term.</strong> Longer terms mean lower monthly payments but far more total interest. Shorter terms cost more per month but save substantially overall.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Down payment.</strong> A larger down payment reduces the principal, which lowers both your monthly payment and total interest paid.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Credit score.</strong> Your credit score directly affects the interest rate you qualify for. A score above 740 typically qualifies for the best rates, while scores below 680 may face rates 1-3% higher.</span>
              </li>
            </ul>
          </section>

          <section id="tips-to-save" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Tips to Lower Your Monthly Payment
            </h2>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Improve your credit score before applying.</strong> Paying down existing debt and correcting credit report errors can qualify you for a lower rate, which reduces every payment for the life of the loan.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Make a larger down payment.</strong> Every dollar in your down payment is a dollar you do not pay interest on. Even an extra $5,000 down can save thousands over a 30-year mortgage.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Shop multiple lenders.</strong> Rates vary between lenders. Getting quotes from three to five lenders and comparing their offers can save you thousands. Even a quarter percent difference matters over decades.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Make biweekly payments.</strong> Paying half your monthly payment every two weeks results in 26 half-payments (13 full payments) per year instead of 12. This extra payment each year can shave years off your loan and save tens of thousands in interest.</span>
              </li>
            </ul>
          </section>

          <section id="tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Calculate Your Payment Now
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Run the numbers on any loan scenario with PrestoKit&rsquo;s free Mortgage Calculator. Enter the loan amount, interest rate, and term, and see your monthly payment, total interest, and full amortization breakdown instantly.
            </p>

            <Link
              href="/tools/mortgage-calculator"
              className="group flex items-start gap-5 rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl" style={{ backgroundColor: "#2196f315" }}>
                {"\uD83C\uDFE0"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-light transition-colors">
                  Free Mortgage / Loan Calculator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Enter your loan amount, interest rate, and term. See your monthly payment, total interest, and amortization schedule. Works for mortgages, auto loans, and personal loans.
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
              href="/guides/how-to-calculate-compound-interest"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Calculate Compound Interest
              </h3>
              <p className="mt-1 text-sm text-muted">
                Understand the formula, see real examples, and learn how to grow your savings.
              </p>
            </Link>
            <Link
              href="/guides/how-to-calculate-paycheck-after-taxes"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Calculate Your Paycheck After Taxes
              </h3>
              <p className="mt-1 text-sm text-muted">
                Understand every deduction on your pay stub, from federal tax to FICA.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/mortgage-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Mortgage Calculator
              </h3>
            </Link>
            <Link
              href="/tools/compound-interest-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Compound Interest Calculator
              </h3>
            </Link>
            <Link
              href="/tools/percentage-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Percentage Calculator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
