import Link from "next/link";

const tocItems = [
  { id: "find-niche", label: "Finding Your Freelance Niche" },
  { id: "set-rates", label: "Setting Your Rates" },
  { id: "build-portfolio", label: "Building a Portfolio" },
  { id: "find-clients", label: "Finding Clients" },
  { id: "write-proposals", label: "Writing Proposals That Win" },
  { id: "manage-projects", label: "Managing Projects" },
  { id: "invoicing", label: "Invoicing and Getting Paid" },
  { id: "taxes", label: "Taxes for Freelancers" },
  { id: "essential-tools", label: "Essential Freelancer Tools" },
];

export default function FreelancingGuidePage() {
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
            <span className="text-muted-light">Freelancing</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Freelancing 101 &mdash; Getting Started as a Freelancer
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            The no-BS guide to building a freelance career that actually pays the bills. From finding your first client to handling quarterly taxes, this guide covers every step of the journey.
          </p>

          {/* Meta */}
          <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-muted">
            <span>By PrestoKit Team</span>
            <span className="text-muted-dark">|</span>
            <span>Last updated: March 2026</span>
            <span className="text-muted-dark">|</span>
            <span>14 min read</span>
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
          <section id="find-niche" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Finding Your Freelance Niche
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The biggest mistake new freelancers make is trying to be everything to everyone. A &ldquo;web designer who also does copywriting, social media, and a little bit of video editing&rdquo; has no clear identity. Clients hire specialists. The more specific your niche, the easier it is to stand out, command higher rates, and attract the right clients.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">How to Pick Your Niche</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Start with what you are already good at. Your niche should be an intersection of your strongest skill and a market that pays well for that skill. Ask yourself: What do people already come to me for? What work do I enjoy enough to do every day? What skill has the most earning potential?
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Niche Down, Then Niche Down Again</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              &ldquo;Graphic designer&rdquo; is broad. &ldquo;Brand identity designer for tech startups&rdquo; is a niche. &ldquo;Brand identity designer for B2B SaaS companies&rdquo; is an even tighter niche. You might worry that going narrow limits your opportunities, but the opposite is true. When a B2B SaaS founder needs brand work, they are going to choose the specialist who understands their world over a generalist every single time. Specialists get more inquiries, close more deals, and charge more.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Test Before You Commit</h3>
            <p className="text-muted-light leading-relaxed">
              You do not need to pick your niche forever on day one. Try a niche for three to six months. Take on a few projects, see how the work feels, and evaluate the earning potential. If it is not working, pivot. The point is to start specific rather than trying to figure it out while being a generalist.
            </p>
          </section>

          {/* Section 2 */}
          <section id="set-rates" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Setting Your Rates
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Pricing is the most emotionally loaded topic in freelancing. Charge too little and you burn out doing unsustainable volume. Charge too much before you have the portfolio to back it up and you cannot close deals. Here is a rational approach.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">The Math Behind Your Rate</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Start with your target annual income. Add 30% for self-employment taxes, health insurance, and retirement savings. Then divide by your realistic billable hours. Most freelancers are billable 1,000 to 1,200 hours per year (not the 2,080 hours of a full-time job). The rest of your time goes to marketing, admin, invoicing, proposals, and all the other work that keeps your business running.
            </p>
            <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5 mb-4">
              <p className="text-sm text-muted-light leading-relaxed">
                <strong className="text-white">Example:</strong> If you want to earn $80,000 per year, add 30% for taxes and expenses ($104,000), and divide by 1,100 billable hours. Your minimum hourly rate is roughly $95 per hour. That is the floor, not the ceiling.
              </p>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Hourly vs. Project-Based Pricing</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Hourly pricing is straightforward but has a fundamental flaw: it punishes you for being efficient. As you get faster and better at your work, you earn less per project. Project-based pricing fixes this. You quote a flat fee for a defined scope of work. If you complete it in 10 hours instead of 20, your effective hourly rate doubles.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Use hourly rates when the scope is unclear, for discovery and consulting work, or when you are just starting out and still learning how long things take. Use project pricing when the scope is well-defined and you can confidently estimate the time and effort involved.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Raising Your Rates</h3>
            <p className="text-muted-light leading-relaxed">
              Raise your rates for new clients whenever you are consistently fully booked. If every prospect says yes immediately, your rates are too low. You want some prospects to balk at the price. That means you are in the right range. For existing clients, give 30-60 days notice and frame it as an adjustment to reflect your growing experience and market rates.
            </p>
          </section>

          {/* Section 3 */}
          <section id="build-portfolio" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Building a Portfolio
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Your portfolio is your most important sales tool. It is the proof that you can do what you claim. But here is the thing most new freelancers get wrong: you do not need 20 projects to have a strong portfolio. Three to five excellent pieces are far better than 15 mediocre ones.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Starting From Zero</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              If you have no client work to show, create sample projects. Pick a real company and redesign their website as a concept. Write a marketing strategy for a brand you admire. Build an app prototype that solves a real problem. The work is real even if the client is not. Label these as &ldquo;concept projects&rdquo; and be transparent about it. Another option: offer deeply discounted work to one or two clients in exchange for being able to showcase the results.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">What to Include</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              For each portfolio piece, include: the client or project name, the problem you were hired to solve, your approach, the final deliverable (screenshots, links, or results), and measurable outcomes if available. Clients do not just want to see pretty pictures. They want to see that you understand business problems and can deliver solutions.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Where to Host It</h3>
            <p className="text-muted-light leading-relaxed">
              A simple personal website is the best option. Use your domain name (yourname.com). You can build one quickly with Carrd, Squarespace, or a simple custom site. Avoid relying solely on Behance, Dribbble, or LinkedIn. You want to own your portfolio and control the experience. Those platforms can supplement your portfolio, but they should not be the only place your work lives.
            </p>
          </section>

          {/* Section 4 */}
          <section id="find-clients" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Finding Clients
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              This is the question every freelancer asks: where do the clients come from? The answer depends on where you are in your journey.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Your Existing Network (Start Here)</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Before you do anything else, tell everyone you know that you are freelancing. Post on LinkedIn. Message former coworkers. Tell friends and family. Your first 2-3 clients will almost certainly come from people who already know and trust you, or from people one connection away. This is not networking in the cringey sense. It is simply letting people know you are available.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Cold Outreach</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Cold emails work, but only if they are genuinely personalized. Research the company, identify a specific problem you can solve, and pitch a solution in 3-4 sentences. Do not send a generic &ldquo;I do design work, here is my portfolio&rdquo; email. Instead: &ldquo;I noticed your checkout page has a high bounce rate based on your [observable detail]. I specialize in conversion-focused design for e-commerce and have helped similar brands increase checkout completion by 25%. Could I share a few ideas?&rdquo;
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Freelance Platforms</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Upwork, Toptal, and Fiverr can be useful for building initial reviews and experience, but they should not be your long-term strategy. Rates on platforms tend to be lower due to competition, and you are always renting the platform&rsquo;s audience rather than building your own. Use platforms to get started, but invest in direct client acquisition for the long run.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Content Marketing</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Writing blog posts, sharing tips on social media, or creating short educational videos positions you as an expert and attracts inbound leads. This is a slower strategy, but it compounds over time. One well-written article can generate client inquiries for years.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Referrals</h3>
            <p className="text-muted-light leading-relaxed">
              Once you have a few happy clients, referrals become your best source of new business. After delivering great work, ask directly: &ldquo;Do you know anyone else who might need this kind of help?&rdquo; Make it specific and easy. Most clients are happy to refer you but will not think to do it unless you ask.
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Win more clients with professional estimates.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              Use PrestoKit&rsquo;s free Estimate Builder to create polished project quotes that make you look like a pro.
            </p>
            <Link
              href="/tools/estimate-builder"
              className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
            >
              Create Free Estimate
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {/* Section 5 */}
          <section id="write-proposals" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Writing Proposals That Win
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              A great proposal does not just describe what you will do. It demonstrates that you understand the client&rsquo;s problem and have a clear plan to solve it. Here is the structure that works.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">1. Restate the problem</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Show the client you listened. Summarize their challenge in your own words. This alone sets you apart from 90% of freelancers who jump straight to &ldquo;here is what I will do and how much it costs.&rdquo;
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">2. Propose your solution</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Outline your approach in clear, jargon-free language. Break it into phases if the project is complex. Explain why your approach will work, not just what it is.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">3. Define deliverables and timeline</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Be specific about what the client will receive and when. &ldquo;3 homepage design concepts delivered by March 15, with 2 rounds of revisions completed by March 30.&rdquo; Specificity builds confidence.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">4. Pricing</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Present your pricing clearly. If possible, offer 2-3 tiers (basic, standard, premium) to give the client options. Anchor with the premium option first, then present the standard option as the sweet spot.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">5. Social proof</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Include a relevant case study, testimonial, or example of similar work you have done. This eliminates the &ldquo;but can they actually do this?&rdquo; doubt in the client&rsquo;s mind.
                </p>
              </div>
            </div>
          </section>

          {/* Section 6 */}
          <section id="manage-projects" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Managing Projects
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Poor project management is the number one cause of freelancer burnout. Missed deadlines, scope creep, and miscommunication will drain your energy faster than any amount of work. Here is how to avoid it.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Define Scope in Writing</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Before starting any project, put the scope in writing. What is included? What is not? How many revision rounds? What does the client need to provide, and by when? Scope creep happens when expectations are not documented. A simple scope document signed by both parties is your best defense.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Communicate Proactively</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Do not disappear for two weeks and then deliver a finished product. Check in regularly. Send weekly progress updates, even if they are brief. If something is going to take longer than expected, say so immediately. Clients are far more understanding of delays when you communicate early rather than at the deadline.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Use a Simple Project Management System</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              You do not need enterprise project management software. A Notion page, a Trello board, or even a simple checklist in a Google Doc can work. The point is to have a single place where tasks, deadlines, and notes live so nothing falls through the cracks.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Handle Scope Creep Gracefully</h3>
            <p className="text-muted-light leading-relaxed">
              When a client asks for something outside the original scope, do not just say no. Say: &ldquo;That is a great idea. It was not included in our original scope, but I would be happy to add it. Here is what it would cost and how it would affect the timeline.&rdquo; This positions you as flexible and professional while protecting your time and income.
            </p>
          </section>

          {/* Section 7 */}
          <section id="invoicing" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Invoicing and Getting Paid
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Getting paid is the whole point of freelancing, so treat invoicing as seriously as you treat the work itself. Late or missing payments can cripple your finances, especially when you are starting out and do not have a cash reserve.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Invoice Immediately</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Send your invoice the same day you deliver the work, or on the agreed-upon schedule for ongoing projects. Every day you delay invoicing is a day you delay getting paid. Make it a habit, not an afterthought.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Always Get a Deposit</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              For any project over $500, require a deposit (typically 25-50% of the total) before starting work. This protects you from clients who disappear after receiving deliverables and ensures the client has skin in the game. Frame it as standard business practice, because it is.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Make It Easy to Pay You</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Accept multiple payment methods: bank transfer, PayPal, Stripe, or whatever is convenient for your clients. Include clear payment instructions on every invoice. The less friction between &ldquo;I received this invoice&rdquo; and &ldquo;I paid this invoice,&rdquo; the faster you get your money.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Follow Up on Late Payments</h3>
            <p className="text-muted-light leading-relaxed">
              Have a system for following up. Send a friendly reminder before the due date, a polite follow-up the day after it passes, and progressively firmer reminders at 7 and 14 days overdue. Most late payments are due to disorganization, not malice. A simple nudge usually does the trick.
            </p>
          </section>

          {/* Section 8 */}
          <section id="taxes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Taxes for Freelancers
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Taxes are the part of freelancing no one wants to talk about, but ignoring them will create serious problems. Here is what you need to know.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Self-Employment Tax</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              As a freelancer, you pay both the employee and employer portions of Social Security and Medicare taxes, totaling 15.3% of your net earnings. This is in addition to your regular income tax. Yes, it stings. But half of the self-employment tax is deductible on your income tax return, which softens the blow slightly.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Quarterly Estimated Taxes</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Unlike employees who have taxes withheld from every paycheck, freelancers pay estimated taxes quarterly. The due dates are April 15, June 15, September 15, and January 15 of the following year. If you underpay, the IRS charges penalties. Use Form 1040-ES to calculate your quarterly payments.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">How Much to Set Aside</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              A safe rule of thumb is to set aside 25-30% of every payment you receive in a separate savings account earmarked for taxes. Adjust based on your total income and tax bracket. If you earn over $100,000, consider saving 30-35%.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Deductions That Save You Money</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              You can deduct legitimate business expenses from your taxable income. Common deductions for freelancers include: home office space (dedicated workspace in your home), computer and software, internet and phone bills (business percentage), professional development and courses, business travel, health insurance premiums, and retirement contributions (SEP IRA or Solo 401k).
            </p>

            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm text-muted-light leading-relaxed">
                <strong className="text-white">Our advice:</strong> Hire a CPA or tax professional who works with freelancers. A good accountant will save you far more in deductions than they charge for their services. This is one area where professional help pays for itself.
              </p>
            </div>
          </section>

          {/* Section 9 */}
          <section id="essential-tools" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Essential Freelancer Tools
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              The right tools save you hours every week and make you look more professional. Here are the essentials, organized by category.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Invoicing and Finance</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">PrestoKit Invoice Generator</strong> (free) &mdash; Create professional PDF invoices in seconds. No signup needed.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">PrestoKit Estimate Builder</strong> (free) &mdash; Send polished project quotes and proposals.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">PrestoKit Profit Calculator</strong> (free) &mdash; Quickly calculate your margins and break-even points.</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Communication and Branding</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">PrestoKit Email Signature Creator</strong> (free) &mdash; Professional HTML email signatures for Gmail, Outlook, and Apple Mail.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Google Workspace</strong> ($7/month) &mdash; Professional email with your domain name.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Calendly</strong> (free tier) &mdash; Let clients book calls without back-and-forth emails.</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Project Management</h3>
            <div className="space-y-2 mb-6">
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Notion</strong> (free) &mdash; All-in-one workspace for notes, projects, and client portals.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Toggl Track</strong> (free) &mdash; Time tracking for hourly projects.</span>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Accounting and Taxes</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Wave</strong> (free) &mdash; Full accounting software with invoicing and receipt scanning.</span>
              </div>
              <div className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">QuickBooks Self-Employed</strong> ($15/month) &mdash; Automatic expense categorization and quarterly tax estimates.</span>
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
                Step-by-step guide to creating invoices that get you paid on time.
              </p>
            </Link>
            <Link
              href="/guides/how-to-start-business"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDE80"}</span>
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Start a Small Business
              </h3>
              <p className="mt-1 text-sm text-muted">
                From idea to launch, the complete guide to starting your business.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
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
              href="/tools/email-signature-creator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\u2709\uFE0F"}</span>
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Email Signature
              </h3>
            </Link>
            <Link
              href="/tools/profit-margin-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <span className="text-2xl">{"\uD83D\uDCCA"}</span>
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Profit Calculator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
