import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Negotiate Your Salary (Scripts, Stats & Strategies That Work)",
  description:
    "Learn how to negotiate your salary with confidence. Includes exact scripts to use, research strategies, how to negotiate raises (not just job offers), and the benefits beyond base pay most people forget.",
  keywords: [
    "how to negotiate salary",
    "salary negotiation",
    "salary negotiation tips",
    "how to ask for a raise",
    "salary negotiation scripts",
    "negotiate job offer",
    "how to negotiate higher salary",
    "counter offer salary",
    "salary negotiation examples",
    "how much should I ask for",
  ],
  openGraph: {
    title: "How to Negotiate Your Salary (Scripts, Stats & Strategies That Work)",
    description:
      "The complete salary negotiation guide. Research strategies, exact scripts, raise tactics, and benefits beyond base pay.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-negotiate-salary",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Negotiate Your Salary | PrestoKit",
    description:
      "Stop leaving money on the table. Exact scripts and strategies for negotiating your salary and raises.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-negotiate-salary",
  },
};

const tocItems = [
  { id: "why-negotiation-matters", label: "Why Negotiation Matters (The Numbers)" },
  { id: "before-the-negotiation", label: "Before the Negotiation: Research & Preparation" },
  { id: "the-conversation", label: "The Negotiation Conversation" },
  { id: "scripts", label: "Scripts and Exact Phrases to Use" },
  { id: "negotiating-raises", label: "Negotiating Raises (Not Just Job Offers)" },
  { id: "beyond-base-salary", label: "Beyond Base Salary: Benefits, Equity & PTO" },
  { id: "common-mistakes", label: "Common Negotiation Mistakes" },
  { id: "faq", label: "Frequently Asked Questions" },
];

export default function HowToNegotiateSalaryPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Negotiate Your Salary (Scripts, Stats & Strategies That Work)",
    description:
      "A comprehensive guide to salary negotiation with real scripts, research strategies, raise tactics, and advice on total compensation.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-30",
    dateModified: "2026-03-30",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-negotiate-salary",
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
            <span className="text-muted-light">Negotiate Salary</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Negotiate Your Salary
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            Most people accept the first number an employer offers. That decision compounds over an entire career. This guide gives you the research framework, exact scripts, and mindset shift that turns salary negotiation from something you dread into something you are genuinely good at — for new job offers, annual reviews, and promotions.
          </p>

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
          <section id="why-negotiation-matters" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Why Negotiation Matters (The Numbers)
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Failing to negotiate your starting salary is not just a one-time cost — it compounds over your entire career. Every future raise, bonus, and retirement contribution is often calculated as a percentage of your base salary. A $5,000 difference in starting salary can translate to $150,000 or more in lost earnings over a 20-year career, once you account for raises and compounding investment growth.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              The statistics are striking:
            </p>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3 rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-primary-light font-bold text-sm mt-0.5">85%</span>
                <span className="text-sm text-muted-light">of employers expect candidates to negotiate and will not rescind an offer if you do</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-primary-light font-bold text-sm mt-0.5">73%</span>
                <span className="text-sm text-muted-light">of hiring managers have room to increase their initial offer (LinkedIn, 2024)</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-primary-light font-bold text-sm mt-0.5">$5,000+</span>
                <span className="text-sm text-muted-light">is the average salary increase achieved by those who negotiate vs. those who accept the first offer</span>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-brand-border bg-brand-card/30 px-4 py-3">
                <span className="text-primary-light font-bold text-sm mt-0.5">57%</span>
                <span className="text-sm text-muted-light">of workers have never negotiated their salary — and among those who do, 80% get at least some of what they asked for</span>
              </div>
            </div>
            <p className="text-muted-light leading-relaxed">
              The fear of negotiating is almost always worse than the negotiation itself. Employers do not rescind offers for polite, professional negotiation. The worst realistic outcome is that they say no, and you are back to exactly where you started.
            </p>
          </section>

          <section id="before-the-negotiation" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Before the Negotiation: Research &amp; Preparation
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Preparation is what separates confident negotiators from anxious ones. With good data, you negotiate from a position of knowledge rather than guesswork.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Find Your Market Rate</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Your market rate is what employers in your industry, geography, and experience level are currently paying for your role. Research from multiple sources for a more accurate range:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Glassdoor and Levels.fyi:</strong> Salary data contributed by employees, searchable by role, company, and location. Especially detailed for tech roles.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">LinkedIn Salary Insights:</strong> Available with LinkedIn Premium, shows salary ranges for specific job titles in specific cities with filters for experience level.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Bureau of Labor Statistics (bls.gov):</strong> Median wages by occupation and industry. Less granular but highly credible — useful as a floor for your research.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Salary.com and PayScale:</strong> Both let you enter your specific skills and experience to generate a personalized salary range.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Talk to peers:</strong> Ask colleagues in similar roles what they earn. Compensation transparency is growing. Knowing what someone in your role at a competitor makes is powerful negotiation data.</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed mb-4">
              Collect data from at least three sources and identify the range. Your target number should be at or slightly above the midpoint for someone at your experience level. Use PrestoKit&rsquo;s free{" "}
              <Link href="/tools/salary-calculator" className="text-primary-light hover:underline">
                Salary Calculator
              </Link>{" "}
              to understand exactly what a given salary translates to in take-home pay.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Know Your Three Numbers</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Before any negotiation conversation, have three numbers clearly defined in your head:
            </p>
            <div className="space-y-3 mb-4">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-4">
                <h4 className="text-sm font-semibold text-white mb-1">Your Target Number</h4>
                <p className="text-sm text-muted-light">What you actually want. This is your opening ask. It should be at the top of the market range for your role and experience level. Do not anchor too low.</p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-4">
                <h4 className="text-sm font-semibold text-white mb-1">Your Walk-Away Number</h4>
                <p className="text-sm text-muted-light">The minimum you will accept. If the offer cannot reach this number, you walk away. Having this number prevents you from accepting something you will resent later.</p>
              </div>
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-4">
                <h4 className="text-sm font-semibold text-white mb-1">Your BATNA</h4>
                <p className="text-sm text-muted-light">Best Alternative to a Negotiated Agreement. What do you do if this negotiation fails? Another offer? Stay in your current role? Your BATNA determines your negotiating power. The stronger your alternative, the more confidently you can negotiate.</p>
              </div>
            </div>

            <h3 className="text-lg font-semibold text-white mb-3">Document Your Value</h3>
            <p className="text-muted-light leading-relaxed">
              Before a raise negotiation (or to prepare for a new offer negotiation), make a list of your specific contributions. Not job duties — outcomes. Revenue generated, costs reduced, projects delivered, clients retained, efficiency improvements. Quantify everything you can. &ldquo;I led a campaign that generated $200,000 in new pipeline&rdquo; is more compelling than &ldquo;I am a dedicated team player.&rdquo;
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              See what your salary actually nets after taxes.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              Before accepting or countering an offer, use PrestoKit&rsquo;s free tools to understand exactly what any salary translates to in take-home pay.
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

          <section id="the-conversation" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              The Negotiation Conversation
            </h2>

            <h3 className="text-lg font-semibold text-white mb-3">Never Give the First Number (If You Can Avoid It)</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Whoever names a number first anchors the conversation. If you name too low, you have capped yourself. If you name too high, you may create a negative impression. When asked &ldquo;What are your salary expectations?&rdquo; before an offer is made, it is often in your interest to deflect:
            </p>
            <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5 mb-4">
              <p className="text-sm text-muted-light leading-relaxed italic">
                &ldquo;I am really interested in this role and the company. I would rather learn more about the full scope of the position before discussing numbers. What is the budgeted range for this role?&rdquo;
              </p>
            </div>
            <p className="text-muted-light leading-relaxed mb-4">
              If they push back or insist you provide a number first, give a range anchored at the top of market: &ldquo;Based on my research and experience, I am targeting $90,000 to $100,000, though I am open to discussing the full compensation picture.&rdquo;
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">When You Receive an Offer</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Do not accept on the spot. You are always allowed to say, &ldquo;Thank you so much — I am genuinely excited about this opportunity. Can I have until [specific date, 2-5 days out] to review and get back to you?&rdquo; No legitimate employer will rescind an offer because you asked for 48-72 hours to consider.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Use that time to compare the offer to your research, calculate the take-home pay impact using the{" "}
              <Link href="/tools/paycheck-calculator" className="text-primary-light hover:underline">
                Paycheck Calculator
              </Link>
              , review the full benefits package, and prepare your counter if needed.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">The Counter Offer</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Counter at your target number, not the midpoint of the gap. If they offer $80,000 and your target is $95,000, counter at $95,000. The final number will likely land somewhere between your counter and their offer. If you counter at $87,500 (splitting the difference), you end up at $83,750. If you counter at $95,000, you might end up at $87,500 — a much better outcome.
            </p>
            <p className="text-muted-light leading-relaxed">
              Always give a reason for your counter. &ldquo;Based on my research into market rates for this role in this market, and given my [specific experience or skill], I was expecting something closer to $95,000. Is there flexibility?&rdquo; is far more effective than just naming a number.
            </p>
          </section>

          <section id="scripts" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Scripts and Exact Phrases to Use
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              These are real phrases you can use word-for-word or adapt to your situation. Having language prepared reduces the anxiety of in-the-moment conversation.
            </p>

            <div className="space-y-5">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-3">Countering a New Job Offer</h3>
                <p className="text-sm text-muted-light leading-relaxed italic mb-3">
                  &ldquo;Thank you so much for the offer — I am genuinely excited about joining [Company] and contributing to [specific thing]. I have done some research on compensation for this role in [city] and given my [X years of experience / specific skills], I was expecting something closer to [target number]. Is there flexibility to get closer to that?&rdquo;
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">Why it works</p>
                <p className="text-sm text-muted-light leading-relaxed mt-1">
                  Expresses genuine enthusiasm (you want the job), provides a reason grounded in research (not just desire), and ends with an open question rather than an ultimatum.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-3">When They Say They Cannot Go Higher on Base Salary</h3>
                <p className="text-sm text-muted-light leading-relaxed italic mb-3">
                  &ldquo;I understand. Is there flexibility on other aspects of the offer — like signing bonus, start date, remote work flexibility, or vacation time? I want to make this work, and I want to feel good about the full package.&rdquo;
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">Why it works</p>
                <p className="text-sm text-muted-light leading-relaxed mt-1">
                  Opens the negotiation to total compensation without creating a standoff. Many companies have more flexibility on non-salary items than base salary, especially at the end of a budget cycle.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-3">Asking for a Raise (Scheduled Review)</h3>
                <p className="text-sm text-muted-light leading-relaxed italic mb-3">
                  &ldquo;Over the past year, I [specific accomplishment 1, specific accomplishment 2, specific accomplishment 3]. I have also taken on [expanded responsibility]. Based on my contributions and what I have researched about market rates for this role, I would like to discuss a salary adjustment to [specific number]. Can we talk about that?&rdquo;
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">Why it works</p>
                <p className="text-sm text-muted-light leading-relaxed mt-1">
                  Anchors the conversation in specific, documented contributions before naming a number. This is the formula: evidence first, ask second.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-3">Handling &ldquo;You Are Already at the Top of Our Band&rdquo;</h3>
                <p className="text-sm text-muted-light leading-relaxed italic mb-3">
                  &ldquo;I appreciate the transparency. If we cannot move on base salary right now, what would it take for me to move into a higher salary band, and what is the timeline? I want to understand the path forward.&rdquo;
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">Why it works</p>
                <p className="text-sm text-muted-light leading-relaxed mt-1">
                  Accepts the constraint without dropping the conversation. Gets you a concrete roadmap rather than a dead end. If they cannot answer this question, that tells you something important about the company.
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-3">When You Have a Competing Offer</h3>
                <p className="text-sm text-muted-light leading-relaxed italic mb-3">
                  &ldquo;I want to be transparent with you — I have received another offer at [amount]. My strong preference is to stay with [Company] because [specific genuine reason]. Is there any ability to close that gap?&rdquo;
                </p>
                <p className="text-xs text-muted uppercase tracking-wider">Why it works</p>
                <p className="text-sm text-muted-light leading-relaxed mt-1">
                  A competing offer is the most powerful negotiation leverage you can have. Do not bluff about this — only use it if the offer is real and you genuinely would consider taking it.
                </p>
              </div>
            </div>
          </section>

          <section id="negotiating-raises" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Negotiating Raises (Not Just Job Offers)
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Salary negotiation is most commonly discussed in the context of new job offers, but annual reviews and promotion conversations are actually where most of your career income gets determined. Most people get whatever raise their manager proposes — which is often the minimum the company is comfortable giving.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Start the Conversation Early</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Do not wait for the review meeting to bring up compensation for the first time. Have a conversation with your manager 30-60 days before your annual review. Raise the topic directly: &ldquo;I want to make sure we are aligned before my review. I have been thinking about where I am relative to market rates and my contributions this year, and I would like to discuss a raise in the [X%] range. Can we plan to cover that in my review?&rdquo;
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              This accomplishes two things. First, it signals your intent before decisions are made, giving your manager time to make a case with their budget. Second, it surfaces any concerns or obstacles early enough to address them.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Build the Case Before the Ask</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              In the months before your review, make your contributions visible. Send project updates to your manager, document wins in writing, and quantify impact wherever possible. A manager who is advocating for a raise for you needs ammunition for their own conversations with HR and finance. Give it to them.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">What to Do If the Raise Is Smaller Than Expected</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Do not accept a disappointing raise in silence. Instead, ask: &ldquo;I appreciate the increase. I was hoping for something closer to [X%] given my contributions this year. Can you help me understand what it would take to reach that level at our next review?&rdquo; This keeps the conversation open and gives you a clear roadmap.
            </p>
            <p className="text-muted-light leading-relaxed">
              If the pattern continues over multiple reviews, your best negotiating leverage is an outside offer. The data consistently shows that the highest salary increases happen when changing employers — the average raise for staying is 3-5%, while job changers often see 10-20% increases.
            </p>
          </section>

          <section id="beyond-base-salary" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Beyond Base Salary: Benefits, Equity &amp; PTO
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Total compensation is more than your base salary. When a company hits its ceiling on base salary, there is often more room on other elements of the package — and these can be financially significant.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Signing Bonus</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              A signing bonus is a one-time payment made when you join. It is often easier for companies to approve than a higher base salary because it does not permanently increase their payroll costs. A $10,000 signing bonus at a 22% tax rate nets about $7,800 — and you can ask for it to be grossed up (the company pays your taxes on it, so you receive the full amount).
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Equity / Stock Options</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              At startups and growth-stage companies, equity can be worth more than base salary. Understand what you are being granted: stock options (the right to buy shares at a set price), RSUs (restricted stock units that vest over time), or actual stock. Ask about the vesting schedule, cliff (how long before any shares vest), and the company&rsquo;s last 409A valuation or most recent preferred share price. This helps you estimate the potential value.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Paid Time Off</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              PTO is worth real money. Five additional vacation days at a $100,000 salary (working ~250 days/year) equals $2,000. If you value time highly or need flexibility, this is worth negotiating. More importantly, unlimited PTO policies sound attractive but can result in taking fewer vacation days — ask what the average actual PTO usage is at the company.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Remote Work &amp; Schedule Flexibility</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              The ability to work remotely eliminates commute time and costs. If you commute 45 minutes each way and pay $200/month in commuting costs, full remote work is worth $4,000/year in money and 375+ hours of your life annually. This is a legitimate negotiating point with real economic value.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Other High-Value Benefits</h3>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">401(k) match:</strong> A 4% match on a $100,000 salary is $4,000/year in free money. Make sure you understand the vesting schedule.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Professional development budget:</strong> $2,000-5,000/year for courses, conferences, and certifications can significantly accelerate your career and earning potential.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Health insurance quality:</strong> The difference between a platinum plan and a high-deductible plan can easily be $3,000-5,000/year in out-of-pocket costs. Factor this into your total compensation comparison.</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              Use PrestoKit&rsquo;s{" "}
              <Link href="/tools/tax-calculator" className="text-primary-light hover:underline">
                Tax Calculator
              </Link>{" "}
              to model how different total compensation scenarios compare after taxes and benefits costs.
            </p>
          </section>

          <section id="common-mistakes" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Common Negotiation Mistakes
            </h2>
            <div className="space-y-5">
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Accepting the first offer immediately</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Even if the offer is exactly what you wanted, take at least 24 hours before accepting. Immediate acceptance can actually create doubt in the employer&rsquo;s mind about whether they are paying market rate. A brief deliberation period signals that you take your career seriously.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Justifying your ask with personal finances</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  &ldquo;I need more because my rent went up&rdquo; is a weak negotiating position. Your compensation should be based on your market value and contributions, not your personal expenses. Employers are not responsible for your cost of living — they are responsible for paying market rate for your skills.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Negotiating against yourself</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Common self-defeat phrases: &ldquo;I know this might be too much, but...&rdquo; or &ldquo;I would love $90,000, but I know that might not be possible, so even $82,000 would work.&rdquo; Name your number confidently. Hedging before they have even responded gives away value for nothing.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Making ultimatums without intent to follow through</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Only issue ultimatums you mean. Saying &ldquo;if you cannot match this, I will take the other offer&rdquo; and then staying anyway destroys your credibility and negotiating power for all future conversations. Your walk-away number needs to be real.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Negotiating over email instead of in person or on the phone</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Email negotiations are slower, easier to misread, and harder to course-correct in real time. When possible, negotiate in a live conversation where you can respond to nuance, read the reaction, and find creative solutions that would take days of email back-and-forth to discover.
                </p>
              </div>
              <div className="border-l-2 border-red-500/50 pl-4">
                <h3 className="text-base font-semibold text-white mb-1">Not getting it in writing</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Verbal agreements evaporate. After any negotiation conversation, ask for the updated offer in writing before you stop negotiating or give verbal acceptance. &ldquo;Can you send over an updated offer letter reflecting the changes we discussed?&rdquo; is a perfectly normal request.
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
                <h3 className="text-base font-semibold text-white mb-2">Will negotiating make me seem greedy or difficult?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  No. Employers expect negotiation as part of the hiring process. HR professionals and hiring managers negotiate salaries routinely — they are not offended by a professional, polite counter. What creates a negative impression is negotiating rudely, making unrealistic demands, or being dishonest. A well-prepared, respectful counter is seen as a sign of professionalism.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">How much should I counter above the offer?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Counter at your target number, which should be at or near the top of the market range for your role. For most people, that means countering 10-20% above the initial offer. Going above 20% is harder to justify without exceptional credentials, a competing offer, or a below-market initial offer.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold name="text-white mb-2">What if I have no competing offer?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  You do not need a competing offer to negotiate. Market data is sufficient justification. &ldquo;Based on research into market rates for this role&rdquo; is a legitimate and common anchor for salary negotiations. A competing offer increases your leverage, but it is not required.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Is it better to negotiate by phone, video, or email?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Phone or video is generally better for negotiation because you can read reactions, clarify misunderstandings in real time, and build rapport. However, always get any agreed changes in writing before accepting. Some people prefer email because it gives them time to think through their response — if that is your preference, use it. Any professional negotiation method is acceptable.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">How often should I ask for a raise?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  At minimum once per year, aligned with your performance review cycle. If you take on significant new responsibilities, achieve a major milestone, or receive a promotion, do not wait for the annual cycle — request a conversation promptly. Companies rely on employee inertia to minimize compensation costs. Do not be inert.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">What if my manager says the budget is frozen?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Budget freezes are sometimes real and sometimes a negotiating tactic. Either way, respond with: &ldquo;I understand. When do you expect the budget to reopen, and can we agree to revisit this conversation at that point? I want to make sure this is on your radar.&rdquo; Then follow up as agreed. If the freeze is permanent, you have learned something important about your growth potential at this company.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Should I disclose my current salary?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  In many US states, it is now illegal for employers to ask about current salary. Even where it is legal, you are not required to share it. If asked, you can say: &ldquo;I prefer not to disclose my current salary, but I am targeting a range of [X] to [Y] based on the scope of this role and market research.&rdquo; Your current salary is often irrelevant to your market value — do not let it become the anchor for the new offer.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">What do I do after accepting an offer?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Get the full offer in writing (offer letter or email) including base salary, start date, sign-on bonus (if any), equity grant details, and benefits summary. Review it carefully against what was discussed verbally. Give proper notice to your current employer — typically two weeks, though some roles require more. Do not negotiate further after accepting in writing unless something material changes.
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
              href="/guides/how-to-set-freelance-rate"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Set Your Freelance Rate
              </h3>
              <p className="mt-1 text-sm text-muted">
                Formulas and market research strategies for freelance pricing.
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
                Everything self-employed workers need to know about tax obligations.
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
              href="/tools/paycheck-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Paycheck Calculator
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
