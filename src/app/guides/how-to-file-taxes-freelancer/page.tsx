import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to File Taxes as a Freelancer (Complete 2026 Guide)",
  description:
    "Learn how to file taxes as a freelancer or self-employed worker. Covers quarterly estimated payments, deductions, Schedule C, and self-employment tax with step-by-step instructions.",
  keywords: [
    "how to file taxes as a freelancer",
    "freelance taxes",
    "self-employment tax",
    "quarterly estimated taxes",
    "Schedule C",
    "freelancer tax deductions",
    "1099 taxes",
    "self-employed tax guide",
    "freelance tax calculator",
    "independent contractor taxes",
  ],
  openGraph: {
    title: "How to File Taxes as a Freelancer (Complete 2026 Guide)",
    description:
      "Everything freelancers need to know about taxes: quarterly payments, deductions, Schedule C, and self-employment tax.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-file-taxes-freelancer",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to File Taxes as a Freelancer | PrestoKit",
    description:
      "Complete guide to freelance taxes: quarterly estimates, deductions, Schedule C, and more.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-file-taxes-freelancer",
  },
};

const tocItems = [
  { id: "freelance-taxes-different", label: "Why Freelance Taxes Are Different" },
  { id: "self-employment-tax", label: "Understanding Self-Employment Tax" },
  { id: "quarterly-payments", label: "Quarterly Estimated Tax Payments" },
  { id: "schedule-c", label: "Filing Schedule C" },
  { id: "deductions", label: "Common Freelancer Tax Deductions" },
  { id: "record-keeping", label: "Record-Keeping Best Practices" },
  { id: "common-mistakes", label: "Mistakes That Trigger Audits" },
  { id: "tools", label: "Estimate Your Taxes Now" },
];

export default function HowToFileTaxesFreelancerPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to File Taxes as a Freelancer (Complete 2026 Guide)",
    description:
      "Learn how to file taxes as a freelancer or self-employed worker. Covers quarterly payments, deductions, Schedule C, and self-employment tax.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-22",
    dateModified: "2026-03-22",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-file-taxes-freelancer",
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
            <span className="text-muted-light">Freelancer Taxes</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to File Taxes as a Freelancer
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Freelancing gives you freedom, but it also gives you the full responsibility of managing your own taxes. This guide walks you through everything from quarterly payments to deductions, so you never overpay or get caught off guard.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>11 min read</span>
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
          <section id="freelance-taxes-different" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Freelance Taxes Are Different
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              When you work as a traditional employee, your employer handles much of the tax burden for you. They withhold federal and state income tax from each paycheck, pay half of your Social Security and Medicare taxes, and send you a W-2 at the end of the year. As a freelancer, none of that happens automatically.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Instead, you are responsible for calculating your own taxes, making quarterly payments to the IRS, paying both the employee and employer portions of Social Security and Medicare (called self-employment tax), and tracking your own income and expenses. Clients who pay you $600 or more will send you a 1099-NEC form, but many smaller payments may not come with any tax documentation at all. You are still required to report all income regardless.
            </p>
            <p className="text-muted-light leading-relaxed">
              The upside is that freelancers have access to more tax deductions than employees. With proper planning, you can significantly reduce your tax bill. The key is understanding the rules and staying organized throughout the year, not just at tax time.
            </p>
          </section>

          <section id="self-employment-tax" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Understanding Self-Employment Tax
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Self-employment tax is the freelancer&rsquo;s version of FICA (Social Security and Medicare). Traditional employees split this cost with their employer, each paying 7.65%. As a freelancer, you pay both halves, for a total of 15.3% on the first $168,600 of net earnings (2025 figure, adjusted annually), plus 2.9% Medicare on everything above that.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              This often catches first-time freelancers by surprise. If you earn $80,000 in freelance income, your self-employment tax alone is about $11,300, before federal and state income taxes. That is why setting aside 25-30% of every payment you receive is the most common recommendation for freelancers.
            </p>
            <p className="text-muted-light leading-relaxed">
              The good news: you can deduct the employer-equivalent portion (half) of your self-employment tax from your gross income. This means the 7.65% employer share reduces your adjusted gross income, which in turn lowers your income tax. You claim this deduction on Form 1040, Schedule SE.
            </p>
          </section>

          <section id="quarterly-payments" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Quarterly Estimated Tax Payments
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The IRS expects you to pay taxes as you earn income, not in one lump sum on April 15. If you expect to owe $1,000 or more in taxes for the year, you are required to make quarterly estimated tax payments using Form 1040-ES. The due dates are:
            </p>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Q1 (Jan 1 - Mar 31)</span>
                <span className="text-sm font-semibold text-white">April 15</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Q2 (Apr 1 - May 31)</span>
                <span className="text-sm font-semibold text-white">June 15</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Q3 (Jun 1 - Aug 31)</span>
                <span className="text-sm font-semibold text-white">September 15</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-muted-light">Q4 (Sep 1 - Dec 31)</span>
                <span className="text-sm font-semibold text-white">January 15 (next year)</span>
              </div>
            </div>
            <p className="text-muted-light leading-relaxed">
              Missing quarterly payments results in underpayment penalties and interest charges. The simplest approach is the &ldquo;safe harbor&rdquo; method: pay at least 100% of your prior year&rsquo;s total tax liability (110% if your income exceeded $150,000) spread across four equal payments. This guarantees you avoid penalties, even if you end up owing more at filing time.
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Estimate your freelance tax bill in seconds.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Tax Calculator estimates your federal tax, self-employment tax, and quarterly payment amounts based on your freelance income.
            </p>
            <Link
              href="/tools/tax-calculator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Estimate My Taxes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <section id="schedule-c" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Filing Schedule C
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Schedule C (Profit or Loss From Business) is the main form freelancers use to report income and expenses. You attach it to your personal Form 1040. On Schedule C, you report your total gross income from freelancing, itemize your business expenses by category, and calculate your net profit (or loss). Your net profit flows to your Form 1040 as self-employment income and is also used to calculate your self-employment tax on Schedule SE.
            </p>
            <p className="text-muted-light leading-relaxed">
              If you operate as a sole proprietor (the default structure for most freelancers), Schedule C is your primary business tax form. LLCs taxed as sole proprietorships also file Schedule C. If you have formed an S-Corp or C-Corp, the filing requirements are different and typically require the help of a tax professional.
            </p>
          </section>

          <section id="deductions" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Common Freelancer Tax Deductions
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Deductions are the most powerful tool for reducing your tax bill. Every legitimate business expense reduces your taxable income. Here are the most common deductions freelancers miss:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Home office deduction.</strong> If you use a dedicated space in your home regularly and exclusively for business, you can deduct a portion of your rent or mortgage, utilities, and insurance. The simplified method allows $5 per square foot, up to 300 square feet ($1,500 max).</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Equipment and software.</strong> Computers, monitors, cameras, software subscriptions (Adobe, Figma, etc.), and other tools you use for work are deductible. Items over $2,500 may need to be depreciated over multiple years.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Internet and phone.</strong> The business-use percentage of your internet and phone bill is deductible. If you use your phone 60% for business, deduct 60% of the bill.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Health insurance premiums.</strong> Self-employed individuals can deduct 100% of health insurance premiums for themselves and their dependents. This is an above-the-line deduction, meaning it reduces your AGI.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Retirement contributions.</strong> SEP IRA contributions (up to 25% of net self-employment income) and Solo 401(k) contributions reduce your taxable income significantly.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Professional development.</strong> Courses, books, conferences, and certifications related to your freelance work are deductible.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Travel and meals.</strong> Business travel expenses are fully deductible. Business meals are 50% deductible. Keep receipts and note the business purpose for each expense.</span>
              </li>
            </ul>
          </section>

          <section id="record-keeping" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Record-Keeping Best Practices
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Good records make tax time painless and protect you in an audit. The IRS requires you to keep records for at least three years from the date you file, though keeping them for seven years is safer.
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Use a separate bank account.</strong> Keep all freelance income and expenses in a dedicated business account. This makes tracking income and expenses dramatically easier.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Save every receipt.</strong> Use an app to photograph receipts immediately. Paper receipts fade, and the IRS will not accept illegible records.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Track mileage if applicable.</strong> If you drive for business purposes, log every trip with the date, destination, purpose, and miles driven. The standard mileage rate changes annually.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Reconcile monthly.</strong> Do not wait until April to organize your finances. Set aside 30 minutes each month to categorize expenses and confirm your income records match your bank deposits.</span>
              </li>
            </ul>
          </section>

          <section id="common-mistakes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Mistakes That Trigger Audits
            </h2>
            <div className="space-y-4">
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Reporting a loss every year</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  The IRS expects a business to show a profit in at least three out of five years. Consistent losses suggest a hobby, not a business, and can trigger scrutiny.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Deducting 100% of mixed-use expenses</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Your personal phone, car, and internet are not 100% business expenses. You must calculate and deduct only the business-use percentage. Claiming full deductions for mixed-use items is a red flag.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Not reporting all income</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  The IRS receives copies of your 1099 forms. If your reported income does not match, you will hear from them. Report every dollar, even from clients who did not send a 1099.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Excessive home office deductions</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A home office that is larger than the rest of your living space raises questions. Be honest about the square footage and ensure the space is used exclusively for business.
                </p>
              </div>
            </div>
          </section>

          <section id="tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Estimate Your Taxes Now
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Knowing your estimated tax bill helps you set aside the right amount and avoid year-end surprises. PrestoKit&rsquo;s free Tax Calculator gives you a quick estimate of your federal, self-employment, and state tax based on your freelance income.
            </p>

            <Link
              href="/tools/tax-calculator"
              className="group flex items-start gap-5 rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl" style={{ backgroundColor: "#ff980015" }}>
                {"\uD83D\uDCCA"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-light transition-colors">
                  Free Tax Calculator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Enter your freelance income and deductions. See your estimated federal tax, self-employment tax, and quarterly payment amounts instantly.
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
            <Link
              href="/guides/freelancing-guide"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                Freelancing 101
              </h3>
              <p className="mt-1 text-sm text-muted">
                Everything you need to know about starting and growing a freelance career.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/tax-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Tax Calculator
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
              href="/tools/profit-margin-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Profit Margin Calculator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
