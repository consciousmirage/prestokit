import Link from "next/link";

const tocItems = [
  { id: "what-is-an-invoice", label: "What Is an Invoice?" },
  { id: "essential-elements", label: "Essential Elements of a Professional Invoice" },
  { id: "step-by-step", label: "Step-by-Step: Creating Your Invoice" },
  { id: "best-practices", label: "Invoice Best Practices" },
  { id: "common-mistakes", label: "Common Invoicing Mistakes" },
  { id: "when-to-send", label: "When to Send an Invoice" },
  { id: "follow-up", label: "How to Follow Up on Unpaid Invoices" },
  { id: "types-of-invoices", label: "Types of Invoices" },
  { id: "tools", label: "Create Your Invoice Now" },
];

export default function HowToCreateInvoicePage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative border-b border-brand-border">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 bg-hero-glow"
        />
        <div className="mx-auto max-w-[720px] px-6 pb-10 pt-12 sm:pt-16">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-2 text-sm text-muted">
            <Link href="/" className="transition-colors hover:text-white">
              PrestoKit
            </Link>
            <span className="text-muted-dark">/</span>
            <Link href="/guides" className="transition-colors hover:text-white">
              Guides
            </Link>
            <span className="text-muted-dark">/</span>
            <span className="text-muted-light">Invoicing</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Create a Professional Invoice
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            A complete guide to invoicing that gets you paid on time, every time. Whether you are a freelancer sending your first invoice or a business owner streamlining your billing, this guide covers everything you need.
          </p>

          {/* Meta */}
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
          {/* Section 1 */}
          <section id="what-is-an-invoice" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              What Is an Invoice and Why Do You Need One?
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              An invoice is a formal document that a seller sends to a buyer requesting payment for goods or services provided. Think of it as a professional &ldquo;you owe me&rdquo; letter, except it includes all the details both parties need for clear, trackable transactions.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              But an invoice is more than just a payment request. It serves several critical functions in your business:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Legal protection.</strong> An invoice creates a paper trail that proves a transaction took place. If a dispute ever arises, your invoices are your evidence.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Tax compliance.</strong> Invoices are essential for accurate tax reporting. They document your income and, when you receive them, your deductible expenses.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Cash flow management.</strong> Tracking invoices helps you understand what money is coming in, what is outstanding, and when to expect payment.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Professionalism.</strong> A clean, well-structured invoice signals to clients that you run a serious business. It builds trust and sets expectations.</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              Whether you are a solo freelancer or running a team of 50, invoicing is a non-negotiable part of getting paid. The good news: it does not have to be complicated.
            </p>
          </section>

          {/* Section 2 */}
          <section id="essential-elements" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Essential Elements of a Professional Invoice
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Every professional invoice should contain these elements. Miss any of them and you risk delays, confusion, or outright non-payment.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">1. Your Business Information</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Place your business name, address, phone number, email, and website at the top. If you have a logo, include it. This is the first thing your client sees, so make it look polished. If you operate as an LLC or corporation, use your registered business name, not a personal nickname.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">2. Client Information</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Include your client&rsquo;s full name (or company name), mailing address, and email. Getting this right matters. In larger organizations, invoices often need to be routed to an accounts payable department, and incorrect details can cause your invoice to get lost in a pile.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">3. Unique Invoice Number</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Every invoice needs a unique identifier. This is essential for your records and your client&rsquo;s. A simple sequential system works well (INV-001, INV-002, etc.), or you can incorporate dates (INV-2026-03-001). The key is consistency. Never reuse an invoice number.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">4. Invoice Date and Due Date</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The invoice date is when you issue the invoice. The due date is when you expect payment. Always include both. Common payment terms include Net 15, Net 30, and Due on Receipt. We will cover payment terms in detail later.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">5. Itemized Line Items</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              This is the core of your invoice. Each line item should include a clear description of the service or product, the quantity, the unit price, and the line total. Be specific. Instead of writing &ldquo;Design work,&rdquo; write &ldquo;Homepage redesign &mdash; responsive layout with 3 revision rounds.&rdquo; Specificity prevents disputes and helps clients approve invoices faster.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">6. Subtotal, Taxes, and Total</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Show the subtotal (sum of all line items), any applicable taxes or fees, discounts if offered, and the final total amount due. Make the total amount prominent. It should be the most visually obvious number on the invoice.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">7. Payment Methods and Instructions</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Tell clients exactly how to pay you. Include bank transfer details, PayPal address, Venmo handle, or a link to pay online. The fewer steps between seeing the invoice and making payment, the faster you will get paid.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">8. Notes and Terms</h3>
            <p className="text-muted-light leading-relaxed">
              Use this section for late payment penalties, early payment discounts, project-specific notes, or a simple &ldquo;Thank you for your business.&rdquo; Keep it professional but human.
            </p>
          </section>

          {/* Section 3 */}
          <section id="step-by-step" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Step-by-Step: Creating Your Invoice
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Here is the practical process, from blank page to sent invoice.
            </p>

            <div className="space-y-6">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 1: Choose Your Format
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  You have three main options: a free online invoice generator (like PrestoKit), spreadsheet software (Google Sheets or Excel), or dedicated invoicing software (QuickBooks, FreshBooks, etc.). For most freelancers and small businesses, a free generator is the fastest path. You get a professional result without a monthly subscription.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 2: Fill In Your Business Details
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Enter your company name, address, email, and phone number. Add your logo if you have one. This is your invoice header and it should look identical on every invoice you send. Consistency builds brand recognition.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 3: Add Client Information
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Enter the client&rsquo;s name, company (if applicable), and mailing address. Double-check spelling. A misspelled company name is an easy way to look unprofessional and potentially delay payment in companies with automated invoice processing.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 4: Assign an Invoice Number and Date
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Use a sequential numbering system and set the invoice date to today. Decide on your payment terms and calculate the due date. If you are new, Net 30 (payment due in 30 days) is the safe default.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 5: Add Line Items
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  List each service or product on a separate line. Include a clear description, the quantity (hours, units, or a flat rate), the unit price, and the line total. Group related items together. For example, list all design work in one section and development work in another.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 6: Calculate Totals
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Add up the line items for your subtotal. Apply any applicable sales tax (check your state and local requirements). Subtract discounts if offered. Display the final total prominently, preferably in a larger font or bold text.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 7: Include Payment Details
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Specify exactly how you want to be paid. Include all relevant details: bank name and account number for wire transfers, your PayPal or Venmo handle, or a payment link. The more options you offer, the easier it is for clients to pay quickly.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  Step 8: Review and Send
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Proofread everything. Check that amounts are correct, dates make sense, and client details are accurate. Export as PDF (never send editable formats like Word docs) and email it with a brief, professional message referencing the invoice number and amount due.
                </p>
              </div>
            </div>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Skip the hassle. Create your invoice in 60 seconds.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Invoice Generator handles formatting, math, and PDF export automatically.
            </p>
            <Link
              href="/tools/invoice-generator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Create Free Invoice
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Section 4 */}
          <section id="best-practices" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Invoice Best Practices
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">Keep It Simple and Scannable</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Your client should be able to glance at your invoice and immediately see who it is from, how much is owed, and when it is due. Avoid clutter. Use clean fonts, adequate white space, and a logical layout. The best invoices communicate everything in under five seconds of scanning.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Be Specific in Descriptions</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Vague line items invite questions and delays. Instead of &ldquo;Consulting,&rdquo; write &ldquo;Marketing strategy consultation &mdash; 3 hours (March 5, 2026).&rdquo; Specificity reduces back-and-forth and makes it clear what value you provided.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Send Invoices Promptly</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The longer you wait to invoice, the longer you wait to get paid. Ideally, send your invoice the same day you complete the work or deliver the product. If you batch invoicing, set a weekly schedule and stick to it.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Always Use PDF Format</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              PDFs look professional on every device, cannot be accidentally edited, and maintain your formatting perfectly. Never send an invoice as a Word document, Google Doc link, or in the body of an email. PDF is the standard for a reason.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Set Clear Payment Terms Upfront</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Do not wait until invoice day to discuss payment terms. Agree on terms before you start work. Include them in your contract or proposal. When both sides know what to expect, the payment process is smoother.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Keep Copies of Everything</h3>
            <p className="text-muted-light leading-relaxed">
              Save a copy of every invoice you send, organized by client and date. This is essential for tax time, for resolving disputes, and for tracking your income over time. Cloud storage like Google Drive or Dropbox works well for this.
            </p>
          </section>

          {/* Section 5 */}
          <section id="common-mistakes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Common Invoicing Mistakes (and How to Avoid Them)
            </h2>

            <div className="space-y-4">
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Forgetting the invoice number</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Without a unique number, tracking invoices becomes a nightmare. It also makes you look disorganized. Always assign a unique, sequential number.
                </p>
              </div>

              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Not including a due date</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  If you do not tell clients when payment is due, they will pay whenever they get around to it &mdash; which could be months. Always specify a clear due date.
                </p>
              </div>

              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Vague descriptions</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Line items like &ldquo;Services rendered&rdquo; or &ldquo;Miscellaneous&rdquo; invite confusion. Be specific about what you delivered and when.
                </p>
              </div>

              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Math errors</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Nothing erodes trust faster than incorrect totals. Use a tool that calculates automatically, or double-check every number manually.
                </p>
              </div>

              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Sending to the wrong person</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  In larger companies, your day-to-day contact may not handle payments. Ask upfront: &ldquo;Who should I send invoices to?&rdquo; and get the accounts payable email address.
                </p>
              </div>

              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Not following up</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Many freelancers send an invoice and hope for the best. That is not a strategy. Have a follow-up system in place for overdue invoices.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="when-to-send" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              When to Send an Invoice
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Timing matters more than most people realize. The right invoicing schedule depends on the type of work you do.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">For one-off projects</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Send the invoice immediately upon project completion and delivery. Do not wait until the end of the week or month. The longer you delay, the longer the client takes your work for granted and the more likely payment will be delayed.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">For large or milestone-based projects</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Break the project into milestones and invoice at each one. A common structure is 30% upfront, 30% at the midpoint, and 40% upon completion. This keeps your cash flow healthy and reduces risk.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">For retainers and ongoing services</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Invoice on the same date each month, ideally the 1st or 15th. Consistency helps your clients budget for your services and trains their accounting team to expect your invoice at a predictable time.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">For hourly work</h3>
            <p className="text-muted-light leading-relaxed">
              Invoice weekly or bi-weekly. Waiting to invoice a full month of hourly work creates large invoices that can shock clients and slow down payment. Smaller, more frequent invoices tend to get paid faster.
            </p>
          </section>

          {/* Section 7 */}
          <section id="follow-up" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              How to Follow Up on Unpaid Invoices
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Late payments happen. According to industry surveys, more than 60% of freelancers have dealt with late-paying clients. The key is having a polite but firm follow-up system.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  1-2 days before the due date: Friendly reminder
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Send a brief email: &ldquo;Hi [Name], just a quick reminder that Invoice #[number] for $[amount] is due on [date]. Please let me know if you have any questions.&rdquo; This is not aggressive. It is professional and puts the invoice top of mind.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  1 day overdue: Polite follow-up
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  &ldquo;Hi [Name], I wanted to follow up on Invoice #[number] for $[amount], which was due yesterday. Please let me know the expected payment date, or if there is anything you need from me to process this.&rdquo;
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  7 days overdue: Firmer nudge
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Reattach the invoice and reference your payment terms. &ldquo;Hi [Name], Invoice #[number] is now 7 days past due. As outlined in our agreement, payment was due on [date]. I have reattached the invoice for your convenience. Please advise on timing.&rdquo;
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">
                  14+ days overdue: Escalation
                </h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  At this point, reference any late payment fees in your contract. Consider calling instead of emailing. If the client remains unresponsive after 30 days, you may want to send a formal demand letter or consider a collections service for larger amounts.
                </p>
              </div>
            </div>

            <p className="mt-6 text-muted-light leading-relaxed">
              Pro tip: Always remain professional, no matter how frustrated you are. Burning bridges costs more than a late invoice. Most late payments are due to disorganization, not malice.
            </p>
          </section>

          {/* Section 8 */}
          <section id="types-of-invoices" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Types of Invoices
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Not all invoices are the same. Here are the most common types and when to use each.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Standard Invoice</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  The most common type. Sent after goods or services are delivered, requesting payment within a specified time frame. This is what most people mean when they say &ldquo;invoice.&rdquo;
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Proforma Invoice</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A preliminary bill sent before work begins. It outlines the estimated costs and scope. Think of it as a formal quote. It is not a demand for payment, but it sets expectations and can serve as the basis for the final invoice.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Recurring Invoice</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Used for ongoing services billed at regular intervals, like monthly retainers, subscriptions, or maintenance contracts. The details stay the same each cycle, making them easy to automate.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Commercial Invoice</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Used in international trade. In addition to standard invoice details, commercial invoices include customs information, country of origin, harmonized system codes, and shipping terms. These are required for goods crossing international borders.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Credit Note (Credit Memo)</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Issued when you need to refund or reduce the amount owed. If you overbilled, delivered a partial service, or agreed on a discount after the original invoice, a credit note adjusts the amount without voiding the original invoice.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Past-Due Invoice</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A re-issued invoice that includes a past-due notice and any applicable late fees. It is essentially a stronger version of a payment reminder, formatted as an updated invoice document.
                </p>
              </div>
            </div>
          </section>

          {/* Section 9 - CTA */}
          <section id="tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Create Your Invoice Now
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              You now know everything you need to create professional invoices. The fastest way to put this knowledge into practice is with PrestoKit&rsquo;s free Invoice Generator, which handles all the formatting, calculations, and PDF export for you.
            </p>

            {/* Tool Card */}
            <Link
              href="/tools/invoice-generator"
              className="group flex items-start gap-5 rounded-2xl border border-brand-border bg-brand-card/40 p-6 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl text-3xl" style={{ backgroundColor: "#448aff15" }}>
                {"\uD83E\uDDFE"}
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white group-hover:text-primary-light transition-colors">
                  Free Invoice Generator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Create professional invoices in seconds. Add your details, customize line items, and download as PDF. No signup, no credit card, completely free.
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
              href="/guides/how-to-start-business"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDE80"}</span>
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Start a Small Business
              </h3>
              <p className="mt-1 text-sm text-muted">
                Complete guide from idea to launch, including registration and first customers.
              </p>
            </Link>
            <Link
              href="/guides/freelancing-guide"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDCBC"}</span>
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
              href="/tools/invoice-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83E\uDDFE"}</span>
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Invoice Generator
              </h3>
            </Link>
            <Link
              href="/tools/estimate-builder"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDCCB"}</span>
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Estimate Builder
              </h3>
            </Link>
            <Link
              href="/tools/receipt-maker"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83C\uDFF7\uFE0F"}</span>
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Receipt Maker
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
