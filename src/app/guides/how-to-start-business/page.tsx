import Link from "next/link";

const tocItems = [
  { id: "choosing-idea", label: "Choosing a Business Idea" },
  { id: "business-plan", label: "Writing a Simple Business Plan" },
  { id: "business-structure", label: "Choosing a Business Structure" },
  { id: "registering", label: "Registering Your Business" },
  { id: "ein", label: "Getting an EIN" },
  { id: "bank-account", label: "Opening a Business Bank Account" },
  { id: "accounting", label: "Setting Up Accounting" },
  { id: "website", label: "Building a Website" },
  { id: "marketing", label: "Marketing Basics" },
  { id: "essential-tools", label: "Essential Tools for Small Businesses" },
];

export default function HowToStartBusinessPage() {
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
            <span className="text-muted-light">Starting a Business</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Start a Small Business &mdash; Complete Guide
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Everything you need to go from &ldquo;I have an idea&rdquo; to &ldquo;I have a real business.&rdquo; This guide walks you through every step, from picking your idea to landing your first customers, with zero fluff.
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>15 min read</span>
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
          <section id="choosing-idea" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Choosing a Business Idea
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The best business ideas sit at the intersection of three things: what you are good at, what people will pay for, and what you can sustain long-term without burning out. You do not need a revolutionary concept. Some of the most successful small businesses solve simple, everyday problems better than anyone else.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Start With What You Know</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Make a list of your skills, experiences, and interests. If you have been doing graphic design for five years, starting a design agency is a natural fit. If you are obsessed with fitness, a personal training or coaching business makes sense. Domain expertise gives you a head start over someone entering cold.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Validate Before You Build</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Before you spend money on logos, LLCs, and websites, validate that people will actually pay for what you want to offer. The simplest way to validate is to find 3-5 people who match your target customer and ask if they would pay for your service or product. Better yet, try to sell it before building it. Pre-sales and waitlists are powerful validation.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Consider the Economics</h3>
            <p className="text-muted-light leading-relaxed">
              A great idea is worthless if the math does not work. Ask yourself: What will you charge? What will it cost to deliver? How many customers do you need to cover your living expenses? A quick back-of-napkin calculation can save you from pursuing an idea that was never going to be profitable.
            </p>
          </section>

          {/* Section 2 */}
          <section id="business-plan" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Writing a Simple Business Plan
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Forget the 50-page business plan template from a college textbook. Unless you are pitching to investors or applying for a bank loan, you need a lean plan that fits on one page and answers five questions.
            </p>

            <div className="space-y-4 mb-6">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">1. What are you selling?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Be specific. Not &ldquo;marketing services&rdquo; but &ldquo;social media management for local restaurants, including content creation, scheduling, and monthly analytics reports.&rdquo; The more specific your offering, the easier it is to sell.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">2. Who is your customer?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Define your ideal customer in one paragraph. Their industry, size, pain points, budget range, and where they hang out online. Trying to sell to &ldquo;everyone&rdquo; is the fastest way to sell to no one.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">3. How will you reach them?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Your marketing channels. Will you cold email? Run Instagram ads? Attend local networking events? Post on LinkedIn? Pick 1-2 channels to start and focus on those until they work before expanding.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">4. What does it cost?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  List your startup costs (one-time) and your monthly operating costs. Include software, tools, marketing spend, insurance, and your own salary. Know your break-even number.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">5. How will you make money?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Your pricing model and revenue projections. Will you charge hourly, per project, or on a monthly retainer? How many clients do you need at what price point to hit your income goal? Be conservative in your estimates.
                </p>
              </div>
            </div>

            <p className="text-muted-light leading-relaxed">
              That is your business plan. Write it down, revisit it monthly, and adjust as you learn from real customers. A living one-pager beats a dusty 50-page document every time.
            </p>
          </section>

          {/* Section 3 */}
          <section id="business-structure" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Choosing a Business Structure
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              Your business structure affects your taxes, liability, and paperwork requirements. Here are the most common options for small businesses.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Sole Proprietorship</h3>
            <p className="text-muted-light leading-relaxed mb-2">
              The simplest structure. You and your business are the same legal entity. No registration required beyond local business licenses. You report business income on your personal tax return.
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex items-start gap-3 text-sm text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Pros:</strong> Free to set up, minimal paperwork, simple taxes.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                <span><strong className="text-white">Cons:</strong> No liability protection. If your business is sued, your personal assets are at risk.</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3">LLC (Limited Liability Company)</h3>
            <p className="text-muted-light leading-relaxed mb-2">
              The most popular choice for small businesses. An LLC separates your personal assets from your business liabilities while keeping taxes simple (pass-through taxation by default).
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex items-start gap-3 text-sm text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Pros:</strong> Liability protection, tax flexibility, professional credibility.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                <span><strong className="text-white">Cons:</strong> Registration fee ($50-$500 depending on state), annual filing requirements in most states.</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3">S Corporation</h3>
            <p className="text-muted-light leading-relaxed mb-2">
              An S Corp is a tax election, not a business structure. You form an LLC (or corporation) and then elect S Corp tax status with the IRS. This can reduce self-employment taxes once you are earning significant income (generally $80,000+ per year).
            </p>
            <ul className="space-y-1 mb-4">
              <li className="flex items-start gap-3 text-sm text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                <span><strong className="text-white">Pros:</strong> Potential tax savings on self-employment tax at higher incomes.</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-red-400" />
                <span><strong className="text-white">Cons:</strong> More complex accounting, must pay yourself a &ldquo;reasonable salary,&rdquo; payroll requirements.</span>
              </li>
            </ul>

            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm text-muted-light leading-relaxed">
                <strong className="text-white">Our recommendation:</strong> If you are just starting out, form an LLC. It gives you liability protection without the complexity of a corporation. You can always elect S Corp status later when your income justifies the extra accounting overhead.
              </p>
            </div>
          </section>

          {/* Section 4 */}
          <section id="registering" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Registering Your Business
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Once you have picked your structure, it is time to make it official. The exact process varies by state, but the general steps are the same.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Choose Your Business Name</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Your business name needs to be unique in your state. Search your state&rsquo;s business name database to confirm availability. Also check that the matching domain name is available, and search the USPTO trademark database to avoid conflicts. Your name should be easy to spell, easy to pronounce, and give some indication of what you do.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Register With Your State</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              For an LLC, you will file Articles of Organization with your state&rsquo;s Secretary of State office. Most states allow online filing. Fees range from $50 (Kentucky) to $500 (Massachusetts). Processing time varies from same-day to several weeks.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Get Required Licenses and Permits</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Depending on your industry and location, you may need local business licenses, professional licenses, health permits, or zoning permits. Check your city and county government websites for requirements. Do not skip this step. Operating without required licenses can result in fines.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Register for State Taxes</h3>
            <p className="text-muted-light leading-relaxed">
              If your state has sales tax and you are selling taxable goods or services, register for a sales tax permit. If you plan to hire employees, register for state employer taxes. Your state&rsquo;s Department of Revenue website will have the details.
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Need a business name? We can help.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Business Name Generator creates AI-powered name ideas with instant domain availability checks.
            </p>
            <Link
              href="/tools/business-name-generator"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Generate Business Names
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Section 5 */}
          <section id="ein" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Getting an EIN (Employer Identification Number)
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              An EIN is essentially a Social Security number for your business. The IRS issues them for free, and the application takes about five minutes online.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Who Needs an EIN?</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              You need an EIN if you plan to hire employees, operate as an LLC or corporation, or open a business bank account (most banks require it). Even if you are a sole proprietor who technically does not need one, getting an EIN keeps your Social Security number off business documents and tax forms you share with clients.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">How to Apply</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Go to the IRS website (irs.gov) and search for &ldquo;EIN application.&rdquo; The online application is available Monday through Friday, 7 AM to 10 PM Eastern Time. You will answer a series of questions about your business structure, purpose, and expected number of employees. Your EIN is issued immediately upon completion.
            </p>

            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm text-muted-light leading-relaxed">
                <strong className="text-white">Important:</strong> The IRS EIN application is completely free. Do not pay a third-party service to get one for you. Any website charging you for an EIN is simply filing the free form on your behalf and adding a markup.
              </p>
            </div>
          </section>

          {/* Section 6 */}
          <section id="bank-account" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Opening a Business Bank Account
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Separating your business and personal finances is not optional. It is essential for legal protection, clean accounting, and your own sanity at tax time. Even if you are the only person in your business, get a dedicated business account.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">What You Need to Open an Account</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Your EIN (or SSN if sole proprietor)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Articles of Organization or business registration documents</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Personal identification (driver&rsquo;s license or passport)</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>An initial deposit (varies by bank, often $25-$100)</span>
              </li>
            </ul>

            <h3 className="text-lg font-semibold text-white mb-3">Choosing a Bank</h3>
            <p className="text-muted-light leading-relaxed">
              Look for no or low monthly fees, free ACH transfers, good mobile banking, and integration with your accounting software. Online banks like Mercury, Relay, and Novo are popular with small businesses for their low fees and modern interfaces. Traditional banks like Chase and Bank of America offer more in-person services if that matters to you.
            </p>
          </section>

          {/* Section 7 */}
          <section id="accounting" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Setting Up Accounting
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Accounting is not glamorous, but it is the backbone of a healthy business. The good news: modern tools make it almost painless.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Track Everything From Day One</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The biggest mistake new business owners make is letting receipts and income pile up and trying to sort it all out at tax time. Instead, set up a system on day one. Record every expense and every dollar of income. It takes five minutes a week if you do it consistently; it takes five days in April if you do not.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Choose Your Accounting Method</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              <strong className="text-white">Cash basis</strong> records income when you receive payment and expenses when you pay them. It is simpler and what most small businesses use. <strong className="text-white">Accrual basis</strong> records income when earned and expenses when incurred, regardless of when cash changes hands. If your revenue is under $25 million per year, the IRS generally allows you to use cash basis.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Software Options</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              For freelancers and very small businesses, Wave (free) or QuickBooks Self-Employed ($15/month) are solid choices. For growing businesses, QuickBooks Online ($30/month) or Xero ($15-$78/month) offer more features. At minimum, you need something that tracks income, expenses, and generates basic reports.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Set Aside Money for Taxes</h3>
            <p className="text-muted-light leading-relaxed">
              As a business owner, no one withholds taxes from your income. A common rule of thumb is to set aside 25-30% of your net income for federal and state taxes. Put this money in a separate savings account so you are never caught off guard by a quarterly tax payment.
            </p>
          </section>

          {/* Section 8 */}
          <section id="website" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Building a Website
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              In 2026, not having a website is like not having a phone number. It does not need to be fancy, but it needs to exist. Your website is often the first impression potential customers have of your business.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">What Your Website Needs</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              At minimum, your website should clearly explain what you do, who you serve, and how to contact or hire you. For most small businesses, a one-page site with these elements is enough to start: a headline that explains your value proposition, a brief description of your services, social proof (testimonials, logos, or results), and a clear call-to-action (contact form, booking link, or phone number).
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Platform Options</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              <strong className="text-white">Carrd</strong> ($19/year) is the fastest way to get a clean one-page site live. <strong className="text-white">Squarespace</strong> ($16-$49/month) offers beautiful templates and is great for portfolios and service businesses. <strong className="text-white">Shopify</strong> ($39/month) is the standard for e-commerce. <strong className="text-white">WordPress</strong> (free software + $5-30/month hosting) is the most flexible but has a steeper learning curve.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Get Your Domain</h3>
            <p className="text-muted-light leading-relaxed">
              Buy a .com domain that matches your business name. Namecheap, Google Domains, and Cloudflare Registrar offer domains for $10-15 per year. Avoid hyphens and numbers. If your exact name is taken, try adding &ldquo;studio,&rdquo; &ldquo;co,&rdquo; or &ldquo;hq&rdquo; to the end.
            </p>
          </section>

          {/* Section 9 */}
          <section id="marketing" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Marketing Basics
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              You do not need a marketing degree or a big budget. You need a few channels that work and the discipline to show up consistently.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Start With Your Network</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Tell everyone you know that you have started a business. Friends, family, former coworkers, LinkedIn connections. Your first clients almost always come from your existing network or one degree of separation from it. Do not be shy about this. People want to support people they know.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Pick One or Two Channels</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Resist the urge to be everywhere at once. If your customers are on Instagram, focus on Instagram. If they search Google for solutions, invest in SEO and content. If they attend industry events, show up at those events. Master one channel before expanding to the next.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Create Content That Helps</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The most effective marketing for small businesses is content that genuinely helps your target audience. Write blog posts that answer their questions, share tips on social media, or create short videos showing your process. This builds trust and positions you as an expert.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Ask for Referrals</h3>
            <p className="text-muted-light leading-relaxed">
              After delivering great work, ask your clients if they know anyone else who could benefit from your services. A direct referral is the highest-converting lead source for almost every small business. Make it easy by being specific: &ldquo;Do you know any other restaurant owners who might need help with their social media?&rdquo;
            </p>
          </section>

          {/* Section 10 */}
          <section id="essential-tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Essential Tools for Small Businesses
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              You do not need expensive software to run a professional business. Here are the essential categories and our recommendations for each.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Invoicing:</strong> PrestoKit Invoice Generator (free) for creating and sending professional PDF invoices.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Estimates and proposals:</strong> PrestoKit Estimate Builder (free) for creating client-ready quotes.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Accounting:</strong> Wave (free) or QuickBooks Online (paid) for tracking income and expenses.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Business name and branding:</strong> PrestoKit Business Name Generator (free) for AI-powered name ideas.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Email:</strong> Google Workspace ($7/month) for professional email with your domain.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Project management:</strong> Notion (free) or Trello (free) for keeping tasks organized.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Communication:</strong> Slack (free) for team messaging, or just email and phone if you are solo.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Payments:</strong> Stripe or Square for accepting credit card payments online or in person.</span>
              </div>
            </div>
          </section>
        </div>

        {/* Related Guides */}
        <section className="mt-16 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Guides</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Link
              href="/guides/how-to-create-invoice"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83E\uDDFE"}</span>
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Create a Professional Invoice
              </h3>
              <p className="mt-1 text-sm text-muted">
                Everything you need to know about creating invoices that get you paid.
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
                The complete guide to starting and growing a freelance career.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/business-name-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDCA1"}</span>
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Business Name Generator
              </h3>
            </Link>
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
          </div>
        </section>
      </article>
    </div>
  );
}
