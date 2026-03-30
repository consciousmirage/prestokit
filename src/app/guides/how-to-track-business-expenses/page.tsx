import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Track Business Expenses (Complete Guide + Best Methods)",
  description:
    "Learn how to track business expenses effectively. Covers what counts as a deductible expense, best tracking methods, how to set up a system, and the tax deduction categories you cannot afford to miss.",
  keywords: [
    "how to track business expenses",
    "business expense tracking",
    "small business expenses",
    "tax deductible business expenses",
    "business expense categories",
    "expense tracking app",
    "self-employed expenses",
    "business expense spreadsheet",
    "track expenses for taxes",
    "freelance expense tracking",
  ],
  openGraph: {
    title: "How to Track Business Expenses (Complete Guide + Best Methods)",
    description:
      "Everything you need to know about tracking business expenses: what qualifies, how to do it, and how to maximize your deductions.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-track-business-expenses",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Track Business Expenses | PrestoKit",
    description:
      "Set up a business expense tracking system that works year-round, not just at tax time.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-track-business-expenses",
  },
};

const tocItems = [
  { id: "why-tracking-matters", label: "Why Expense Tracking Matters" },
  { id: "what-counts", label: "What Counts as a Business Expense?" },
  { id: "best-methods", label: "Best Methods for Tracking Expenses" },
  { id: "setting-up-system", label: "Setting Up a Tracking System" },
  { id: "quarterly-review", label: "The Quarterly Expense Review" },
  { id: "tax-categories", label: "Key Tax Deduction Categories" },
  { id: "common-mistakes", label: "Common Expense Tracking Mistakes" },
  { id: "faq", label: "Frequently Asked Questions" },
];

export default function HowToTrackBusinessExpensesPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Track Business Expenses (Complete Guide + Best Methods)",
    description:
      "Learn how to track business expenses, what qualifies as a deduction, and how to set up a system that makes tax time easy.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-30",
    dateModified: "2026-03-30",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-track-business-expenses",
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
            <span className="text-muted-light">Track Business Expenses</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Track Business Expenses
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Most self-employed people and small business owners overpay their taxes by failing to track deductible expenses. Every uncaptured expense is money you could have kept. This guide shows you exactly what to track, how to track it, and how to build a system so airtight that tax season becomes a non-event.
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
          <section id="why-tracking-matters" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Expense Tracking Matters
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Every dollar of legitimate business expenses you document reduces your taxable income by that same dollar. If you are in the 22% federal tax bracket and miss $5,000 in deductible expenses, you overpay your taxes by $1,100 — plus self-employment tax on top of that. Over a five-year period, that compounds to thousands of dollars of unnecessary tax payments.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Beyond taxes, proper expense tracking tells you where your money is actually going. Many business owners are shocked when they run their first real expense report. Subscriptions they forgot about, costs that have crept up over time, and spending that does not align with business priorities all become visible. This information helps you make better decisions about where to invest and where to cut.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Good records also protect you in the event of an IRS audit. The burden of proof is on you. If you claim a deduction, you need documentation to back it up. Without receipts and records, you risk having legitimate deductions disallowed and facing penalties on top of back taxes.
            </p>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm text-muted-light leading-relaxed">
                <strong className="text-white">IRS record-keeping rule:</strong> Keep expense records for at least three years from the date you filed the tax return they were claimed on. If you underreported income by more than 25%, the statute of limitations extends to six years. When in doubt, keep records for seven years.
              </p>
            </div>
          </section>

          <section id="what-counts" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              What Counts as a Business Expense?
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The IRS defines a deductible business expense as one that is both &ldquo;ordinary&rdquo; (common and accepted in your industry) and &ldquo;necessary&rdquo; (helpful and appropriate for your business). This is a broad standard that covers most expenses directly related to your work.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Clearly Deductible</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Software subscriptions used for work (design tools, project management, accounting)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Office supplies (printer paper, pens, notebooks)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Professional fees (accountant, attorney, business consultants)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Business insurance premiums</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Marketing and advertising costs</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Bank fees for business accounts</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Postage and shipping</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Industry publications and subscriptions</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3">Partially Deductible (Requires Allocation)</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Cell phone:</strong> Deduct the percentage used for business (e.g., 70% business use = 70% of the bill)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Internet:</strong> Same allocation rule as cell phone</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Vehicle:</strong> Business mileage or actual expenses based on the percentage used for business</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Home office:</strong> Square footage of dedicated workspace as a percentage of total home square footage</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Business meals:</strong> 50% deductible when business is discussed and documented</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3">Not Deductible</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400/60" />
                <span>Personal meals, entertainment, and clothing (with limited exceptions for uniforms)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400/60" />
                <span>Commuting costs between home and your regular place of business</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400/60" />
                <span>Fines and penalties (traffic tickets, tax penalties)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400/60" />
                <span>Capital expenditures (though these may be depreciated over time)</span>
              </li>
            </ul>
          </section>

          <section id="best-methods" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Best Methods for Tracking Expenses
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">Method 1: Dedicated Business Debit/Credit Card</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              This is the single highest-leverage change you can make. Use one card exclusively for business expenses. Every transaction is automatically logged in your bank or card statement, which becomes your expense record. At year-end, you can export a CSV and categorize in one batch session, rather than trying to remember which expenses were business and which were personal.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Business credit cards with cashback or points categories (often including office supplies, advertising, and travel) add a return on every business dollar you spend. Chase Ink, American Express Business Gold, and Capital One Spark are popular choices.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Method 2: Accounting Software</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Accounting software like Wave (free), QuickBooks Self-Employed ($15/month), or FreshBooks ($17/month) connects directly to your business bank account and credit card. Transactions import automatically, and you categorize them. Most have mobile apps that let you photograph receipts and match them to transactions. Reports generate with one click at tax time.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              For most freelancers and small businesses earning under $500,000/year, Wave (free) provides everything needed: expense tracking, invoicing, and basic financial reports. The paid options add features like mileage tracking and tax estimates.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Method 3: Spreadsheet</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              A well-designed spreadsheet works perfectly for low-volume businesses. Google Sheets or Excel with columns for date, vendor, amount, category, and notes gives you full control. The discipline required is entering every expense as it happens — not weekly or monthly, when memory fades and receipts get lost.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Method 4: Dedicated Expense Apps</h3>
            <p className="text-muted-light leading-relaxed">
              Apps like Expensify, Zoho Expense, and Dext (formerly Receipt Bank) are designed specifically for receipt capture and expense categorization. They use OCR (optical character recognition) to automatically read receipt data from photos. These are especially useful if you have multiple people submitting expenses or if you travel frequently for business.
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Invoice clients and track income in one place.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Invoice Generator and Receipt Maker help you create professional financial documents and keep your records organized.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/tools/invoice-generator"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
              >
                Invoice Generator
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/tools/receipt-maker"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-border bg-brand-card px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-card/80"
              >
                Receipt Maker
              </Link>
            </div>
          </div>

          <section id="setting-up-system" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Setting Up a Tracking System
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              The best expense tracking system is the one you will actually use consistently. Here is a practical setup that works for most freelancers and small businesses.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Week 1: Separate Your Finances</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Open a dedicated business checking account and a business credit card if you do not already have one. Transfer any pending business expenses to the new card going forward. This single step eliminates most of the complexity in expense tracking.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Week 1: Set Up Your Tracking Tool</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Connect your business bank account to Wave or your accounting software of choice. If using a spreadsheet, create it now with your expense categories. Set up your receipt capture method — either the app&rsquo;s photo feature or a dedicated folder in Google Drive or Dropbox.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Ongoing: Capture Receipts Immediately</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  The receipt capture habit is the most important behavior to build. When you make a purchase, photograph the receipt immediately. Do not wait until you get home. Paper receipts fade, digital receipts get buried in email, and memory is unreliable. Many expense apps let you photograph a receipt in under 10 seconds.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Weekly: 15-Minute Reconciliation</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Set a recurring calendar block — 15 minutes every Friday afternoon works well. Review any uncategorized transactions from the week, match receipts to transactions, note the business purpose for any meals or travel, and confirm your records match your bank statement. Fifteen minutes weekly beats three miserable days in April.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Monthly: Review Your P&amp;L</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Run a simple profit and loss report monthly. Are your expenses tracking with your projections? Are there categories that have grown unexpectedly? This 10-minute review helps you stay on top of your business finances and catch billing errors or forgotten subscriptions before they add up.
                </p>
              </div>
            </div>
          </section>

          <section id="quarterly-review" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Quarterly Expense Review
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Four times per year, do a deeper audit of your expenses. This aligns with quarterly estimated tax payments and gives you an accurate picture of your tax liability.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">What to Review Each Quarter</h3>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Active subscriptions audit.</strong> List every recurring software or service subscription. Cancel anything you are not actively using. SaaS subscription creep is one of the most common expense leaks for small businesses.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Mileage log reconciliation.</strong> If you drive for business, confirm your mileage log is current and accurate. Calculate your deduction using the standard mileage rate (adjusted annually by the IRS).</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Home office calculation.</strong> If you claim a home office, confirm your square footage calculation is current and that the space still qualifies (used regularly and exclusively for business).</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Estimated tax calculation.</strong> Use your year-to-date profit to estimate your annual tax liability and confirm your quarterly payment is sufficient. Use PrestoKit&rsquo;s{" "}
                  <Link href="/tools/tax-calculator" className="text-primary-light hover:underline">
                    Tax Calculator
                  </Link>{" "}
                  to estimate your bill.
                </span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Uncategorized transaction cleanup.</strong> Identify any transactions you missed during the quarter and categorize them before the pile grows.</span>
              </li>
            </ul>
          </section>

          <section id="tax-categories" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Key Tax Deduction Categories
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              These are the standard Schedule C expense categories the IRS uses. Match your tracking categories to these to make tax filing seamless.
            </p>

            <div className="space-y-3">
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Advertising</span>
                <span className="text-sm text-muted-light">Google Ads, social media ads, print materials</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Car &amp; Truck</span>
                <span className="text-sm text-muted-light">Mileage or actual vehicle expenses</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Commissions &amp; Fees</span>
                <span className="text-sm text-muted-light">Payments to contractors, platform fees</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Insurance</span>
                <span className="text-sm text-muted-light">Business liability, E&amp;O, property insurance</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Legal &amp; Professional</span>
                <span className="text-sm text-muted-light">Attorney fees, accounting, consulting</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Office Expense</span>
                <span className="text-sm text-muted-light">Supplies, printer ink, small equipment</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Rent or Lease</span>
                <span className="text-sm text-muted-light">Office space, co-working memberships</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Travel</span>
                <span className="text-sm text-muted-light">Flights, hotels, rental cars for business trips</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Meals (50%)</span>
                <span className="text-sm text-muted-light">Business meals with clients or prospects</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Utilities</span>
                <span className="text-sm text-muted-light">Internet, phone, electricity (business portion)</span>
              </div>
              <div className="flex justify-between rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-sm text-white font-medium">Other Expenses</span>
                <span className="text-sm text-muted-light">Software subscriptions, education, professional development</span>
              </div>
            </div>
          </section>

          <section id="common-mistakes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Common Expense Tracking Mistakes
            </h2>
            <div className="space-y-5">
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Mixing personal and business accounts</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  This is the most common and most costly mistake. When business and personal money share an account, every transaction requires manual sorting. In an audit, you will need to justify why personal purchases were not claimed as business expenses, and vice versa. Use separate accounts — no exceptions.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Not tracking small purchases</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A $4 parking fee, a $12 software trial, a $25 book about your industry — these feel too small to bother with, but they add up. If you buy one book per month, that is $300 in professional development deductions per year. Ten parking charges per month at $4 each is $480. Capture everything.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Not noting the business purpose for meals and entertainment</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  For meals deducted as business expenses, the IRS requires that you document who was there and what business was discussed. A receipt alone is not sufficient. Note the names of people present and the business purpose on the receipt or in your tracking system at the time of the expense.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Waiting until tax season to reconcile</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Trying to reconstruct a year&rsquo;s worth of expenses from memory and bank statements in March is painful and error-prone. You will miss legitimate deductions simply because you cannot remember them. Fifteen minutes per week all year is dramatically more effective than two frantic days before the April deadline.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Claiming 100% of mixed-use expenses</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Your cell phone, home internet, and vehicle are almost certainly not used 100% for business. Claiming them as if they are is a significant audit red flag. Be honest about the business percentage and document your calculation method.
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
                <h3 className="text-base font-semibold text-white mb-2">Do I need to keep physical receipts, or are digital copies acceptable?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  The IRS accepts digital records, including scanned receipts, photos, and electronic statements. You do not need to keep paper receipts as long as your digital copies are legible and clearly show the date, vendor, amount, and items purchased. Most receipt apps create audit-ready digital records.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Can I deduct a home office if I rent rather than own my home?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Yes. Renters can claim the home office deduction. The calculation works the same way: the square footage of your dedicated workspace as a percentage of total home square footage, applied to your rent, utilities, and renters insurance. The space must be used regularly and exclusively for business.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">What counts as a deductible business meal?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A business meal is 50% deductible when you dine with a client, prospect, or business associate and business is discussed. The meal must be ordinary and necessary, not lavish or extravagant. You cannot deduct a meal you ate alone at your desk, even if you were working at the time (with limited exceptions for travel).
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Can I deduct my entire laptop if I use it for both work and personal use?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  No — you can only deduct the business-use percentage. If you use your laptop 70% for business, deduct 70% of the cost. Items over $2,500 generally must be depreciated over their useful life rather than deducted in full in the year of purchase (though Section 179 allows immediate expensing in many cases).
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">What if I paid cash for a business expense and have no receipt?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  The IRS requires receipts for expenses over $75. Below $75, a contemporaneous written record (noting the date, amount, vendor, and business purpose) can suffice. That said, paying business expenses in cash is a best-practice red flag — use a card whenever possible to create an automatic paper trail.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Are business startup costs deductible?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Yes, but with limits. You can deduct up to $5,000 in startup costs in the year you open for business, with the remainder amortized over 15 years. Startup costs include market research, advertising before opening, employee training, and legal fees for business setup. Formation costs (LLC filing fees) are treated separately under organizational expense rules.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">How do I track mileage for business use?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Log every business trip with the date, destination, purpose, and miles driven. Apps like MileIQ and Everlance track mileage automatically using your phone&rsquo;s GPS and let you swipe to classify trips as business or personal. At year-end, multiply your total business miles by the standard IRS mileage rate (check irs.gov for the current rate) to get your deduction.
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
                Quarterly payments, Schedule C, and every deduction you should be taking.
              </p>
            </Link>
            <Link
              href="/guides/how-to-write-a-business-plan"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Write a Business Plan
              </h3>
              <p className="mt-1 text-sm text-muted">
                Build your financial projections and expense budget into a full business plan.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/invoice-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Invoice Generator
              </h3>
            </Link>
            <Link
              href="/tools/receipt-maker"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Receipt Maker
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
