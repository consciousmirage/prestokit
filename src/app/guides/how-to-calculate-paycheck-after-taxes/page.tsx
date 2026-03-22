import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Calculate Your Paycheck After Taxes (2026 Guide)",
  description:
    "Learn how to calculate your take-home pay after federal, state, and local taxes. Understand payroll deductions, tax brackets, and use our free paycheck calculator.",
  keywords: [
    "how to calculate paycheck after taxes",
    "take home pay calculator",
    "paycheck calculator",
    "net pay calculator",
    "salary after taxes",
    "payroll deductions",
    "federal income tax",
    "state income tax",
    "FICA taxes",
    "gross vs net pay",
  ],
  openGraph: {
    title: "How to Calculate Your Paycheck After Taxes (2026 Guide)",
    description:
      "Step-by-step guide to calculating your take-home pay. Understand every deduction on your pay stub.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-calculate-paycheck-after-taxes",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Calculate Your Paycheck After Taxes | PrestoKit",
    description:
      "Learn exactly how much of your salary you take home after all taxes and deductions.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-calculate-paycheck-after-taxes",
  },
};

const tocItems = [
  { id: "gross-vs-net", label: "Gross Pay vs. Net Pay" },
  { id: "federal-income-tax", label: "Federal Income Tax" },
  { id: "fica-taxes", label: "FICA Taxes (Social Security & Medicare)" },
  { id: "state-and-local", label: "State and Local Taxes" },
  { id: "other-deductions", label: "Other Payroll Deductions" },
  { id: "step-by-step", label: "Step-by-Step Calculation Example" },
  { id: "hourly-vs-salary", label: "Hourly vs. Salary Calculations" },
  { id: "tools", label: "Calculate Your Paycheck Now" },
];

export default function HowToCalculatePaycheckPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Calculate Your Paycheck After Taxes (2026 Guide)",
    description:
      "Learn how to calculate your take-home pay after federal, state, and local taxes. Understand payroll deductions, tax brackets, and more.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-22",
    dateModified: "2026-03-22",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-calculate-paycheck-after-taxes",
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
            <span className="text-muted-light">Paycheck Calculator</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Calculate Your Paycheck After Taxes
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Understanding your take-home pay helps you budget accurately, negotiate salaries, and avoid surprises. This guide breaks down every deduction between your gross pay and the money that actually hits your bank account.
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
          <section id="gross-vs-net" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Gross Pay vs. Net Pay
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Your gross pay is the total amount your employer pays you before any deductions. If your annual salary is $60,000, your gross pay per biweekly paycheck is $2,307.69 (that is $60,000 divided by 26 pay periods).
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Your net pay, also called take-home pay, is what remains after all taxes and deductions are subtracted. For most Americans, net pay is roughly 70-80% of gross pay, depending on your tax bracket, state of residence, and benefit elections.
            </p>
            <p className="text-muted-light leading-relaxed">
              The gap between gross and net is where most people get confused. Let us break down every deduction so you know exactly where your money goes.
            </p>
          </section>

          <section id="federal-income-tax" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Federal Income Tax
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Federal income tax is the largest deduction for most workers. The US uses a progressive tax system, meaning different portions of your income are taxed at different rates. For the 2026 tax year, the brackets for a single filer are approximately:
            </p>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">$0 - $11,925</span>
                <span className="text-sm font-semibold text-white">10%</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">$11,926 - $48,475</span>
                <span className="text-sm font-semibold text-white">12%</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">$48,476 - $103,350</span>
                <span className="text-sm font-semibold text-white">22%</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">$103,351 - $197,300</span>
                <span className="text-sm font-semibold text-white">24%</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">$197,301 - $250,525</span>
                <span className="text-sm font-semibold text-white">32%</span>
              </div>
            </div>
            <p className="text-muted-light leading-relaxed">
              A common misconception is that moving into a higher tax bracket means all your income gets taxed at that rate. That is not how it works. Only the income within each bracket is taxed at that bracket&rsquo;s rate. So if you earn $60,000, the first $11,925 is taxed at 10%, the next $36,550 at 12%, and the remaining $11,525 at 22%. Your effective tax rate ends up being much lower than your marginal rate.
            </p>
          </section>

          <section id="fica-taxes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              FICA Taxes: Social Security and Medicare
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              FICA stands for the Federal Insurance Contributions Act. These are mandatory payroll taxes that fund Social Security and Medicare. Every employee pays:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Social Security: 6.2%</strong> of gross pay, up to the wage base limit ($168,600 in 2025, adjusted annually for inflation). Your employer also pays 6.2%, for a total of 12.4%.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Medicare: 1.45%</strong> of all gross pay with no wage cap. Your employer matches this amount. If you earn over $200,000, an additional 0.9% Medicare surtax applies to earnings above that threshold.</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              Combined, FICA takes 7.65% of your gross pay (up to the Social Security wage base). On a $60,000 salary, that is $4,590 per year, or about $176.54 per biweekly paycheck.
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              See your exact take-home pay instantly.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Paycheck Calculator factors in federal tax, state tax, FICA, and your specific deductions. Enter your salary and see what you actually keep.
            </p>
            <Link
              href="/tools/paycheck-calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Calculate My Paycheck
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <section id="state-and-local" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              State and Local Taxes
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              State income tax varies enormously depending on where you live. Nine states have no income tax at all: Alaska, Florida, Nevada, New Hampshire, South Dakota, Tennessee, Texas, Washington, and Wyoming. At the other end, states like California (up to 13.3%), New York, and New Jersey have some of the highest rates in the country.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Some cities and counties also levy local income taxes. New York City residents, for example, pay a city income tax on top of New York state tax and federal tax. If you live in one of these areas, local tax can add another 1-4% to your total tax burden.
            </p>
            <p className="text-muted-light leading-relaxed">
              Your state tax rate significantly impacts your take-home pay. Someone earning $60,000 in Texas keeps several thousand dollars more per year than someone earning the same salary in California, purely because of state tax differences.
            </p>
          </section>

          <section id="other-deductions" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Other Payroll Deductions
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Beyond taxes, your paycheck may have additional pre-tax and post-tax deductions:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Health insurance premiums.</strong> Your share of medical, dental, and vision insurance. These are usually pre-tax, meaning they reduce your taxable income.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">401(k) or retirement contributions.</strong> Traditional 401(k) contributions are pre-tax. If you contribute 6% of a $60,000 salary, that is $3,600 per year that reduces your taxable income.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">HSA or FSA contributions.</strong> Health Savings Account and Flexible Spending Account contributions are pre-tax and reduce your taxable income.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Life and disability insurance.</strong> Employer-sponsored policies may have employee-paid premiums deducted from your paycheck.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Wage garnishments.</strong> Court-ordered deductions for child support, student loan defaults, or tax liens.</span>
              </li>
            </ul>
          </section>

          <section id="step-by-step" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Step-by-Step Calculation Example
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Let us calculate the biweekly take-home pay for someone earning $60,000 per year, filing single, living in a state with 5% income tax, and contributing 6% to a 401(k).
            </p>

            <div className="space-y-6">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Gross Biweekly Pay</h3>
                <p className="text-sm text-muted-light leading-relaxed">$60,000 / 26 pay periods = <strong className="text-white">$2,307.69</strong></p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">401(k) Contribution (Pre-Tax)</h3>
                <p className="text-sm text-muted-light leading-relaxed">$2,307.69 x 6% = <strong className="text-white">-$138.46</strong>. Taxable pay is now $2,169.23.</p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Federal Income Tax</h3>
                <p className="text-sm text-muted-light leading-relaxed">Based on an estimated effective rate of ~12.5% on the reduced taxable income: <strong className="text-white">-$271.15</strong></p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">FICA Taxes</h3>
                <p className="text-sm text-muted-light leading-relaxed">$2,307.69 x 7.65% (FICA is on gross, not reduced by 401k): <strong className="text-white">-$176.54</strong></p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">State Income Tax</h3>
                <p className="text-sm text-muted-light leading-relaxed">$2,169.23 x 5%: <strong className="text-white">-$108.46</strong></p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Net (Take-Home) Pay</h3>
                <p className="text-sm text-muted-light leading-relaxed">$2,307.69 - $138.46 - $271.15 - $176.54 - $108.46 = approximately <strong className="text-white">$1,613.08</strong> per paycheck.</p>
              </div>
            </div>
          </section>

          <section id="hourly-vs-salary" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Hourly vs. Salary Calculations
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              If you are paid hourly, your gross pay changes each pay period. To estimate your paycheck, multiply your hourly rate by the number of hours worked. For overtime, hours beyond 40 per week are typically paid at 1.5 times your regular rate. The tax calculations work the same way, just applied to a different gross amount each period.
            </p>
            <p className="text-muted-light leading-relaxed">
              Salaried employees receive the same gross pay each period regardless of hours worked. This makes budgeting easier since your paycheck is predictable. However, bonuses, commissions, and overtime (for non-exempt salaried workers) are typically taxed at a flat supplemental rate of 22% for federal taxes, which can make those checks look different.
            </p>
          </section>

          <section id="tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Calculate Your Paycheck Now
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Skip the manual math. PrestoKit&rsquo;s free Paycheck Calculator handles federal tax, state tax, FICA, and common deductions automatically. Enter your salary or hourly rate and see your exact take-home pay.
            </p>

            <Link
              href="/tools/paycheck-calculator"
              className="group flex items-start gap-5 rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl" style={{ backgroundColor: "#00bcd415" }}>
                {"\uD83D\uDCB5"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-light transition-colors">
                  Free Paycheck Calculator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Enter your salary, state, filing status, and deductions. See your exact take-home pay per paycheck. No signup required.
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
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/paycheck-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Paycheck Calculator
              </h3>
            </Link>
            <Link
              href="/tools/salary-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Salary Calculator
              </h3>
            </Link>
            <Link
              href="/tools/tax-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Tax Calculator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
