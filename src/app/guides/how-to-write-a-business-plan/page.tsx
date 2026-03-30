import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How to Write a Business Plan (Step-by-Step Guide + Free Template)",
  description:
    "Learn how to write a business plan from scratch. Covers every section: executive summary, market analysis, financial projections, and more. Includes a one-page business plan template.",
  keywords: [
    "how to write a business plan",
    "business plan template",
    "business plan example",
    "executive summary",
    "market analysis business plan",
    "business plan financial projections",
    "small business plan",
    "startup business plan",
    "one page business plan",
    "how to write a business plan for a small business",
  ],
  openGraph: {
    title: "How to Write a Business Plan (Step-by-Step Guide + Free Template)",
    description:
      "A complete guide to writing a business plan. Every section explained with examples, plus a one-page template you can use today.",
    type: "article",
    url: "https://prestokit.com/guides/how-to-write-a-business-plan",
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Write a Business Plan | PrestoKit",
    description:
      "Step-by-step guide to writing a business plan. Every section explained with real examples and a free template.",
  },
  alternates: {
    canonical: "https://prestokit.com/guides/how-to-write-a-business-plan",
  },
};

const tocItems = [
  { id: "what-is-a-business-plan", label: "What Is a Business Plan?" },
  { id: "executive-summary", label: "Executive Summary" },
  { id: "company-description", label: "Company Description" },
  { id: "market-analysis", label: "Market Analysis" },
  { id: "organization-management", label: "Organization & Management" },
  { id: "products-services", label: "Products & Services" },
  { id: "marketing-strategy", label: "Marketing Strategy" },
  { id: "financial-projections", label: "Financial Projections" },
  { id: "appendix", label: "Appendix" },
  { id: "one-page-template", label: "One-Page Business Plan Template" },
  { id: "faq", label: "Frequently Asked Questions" },
];

export default function HowToWriteABusinessPlanPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "How to Write a Business Plan (Step-by-Step Guide + Free Template)",
    description:
      "Learn how to write a business plan from scratch. Covers every section with examples and a one-page template.",
    author: { "@type": "Organization", name: "PrestoKit" },
    publisher: { "@type": "Organization", name: "PrestoKit", url: "https://prestokit.com" },
    datePublished: "2026-03-30",
    dateModified: "2026-03-30",
    mainEntityOfPage: "https://prestokit.com/guides/how-to-write-a-business-plan",
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
            <span className="text-muted-light">Business Plan</span>
          </nav>

          <h1 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            How to Write a Business Plan
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-light">
            A business plan is not just a document for investors. It is your clearest thinking about what you are building, who you are serving, and how you will make money. This guide walks through every section with concrete examples, then gives you a one-page template you can complete in an afternoon.
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
          <section id="what-is-a-business-plan" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              What Is a Business Plan?
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              A business plan is a written document that describes your business, its objectives, the strategies you will use to achieve them, the market you are targeting, and the financial forecasts for future performance. Think of it as the operating manual for your business before you have a business.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Business plans serve two purposes. The first is internal: writing one forces you to stress-test your assumptions, identify gaps in your thinking, and make decisions before they are urgent. The second is external: lenders, investors, and some partners require one before they will work with you.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              The length and formality of your plan depends on who will read it. A solo freelancer or small service business might need nothing more than the one-page template at the bottom of this guide. A startup seeking venture funding needs a full 20-40 page document with detailed financial models. This guide covers the full version, but every section is scalable to your situation.
            </p>
            <div className="rounded-xl border border-accent/30 bg-accent/5 p-5">
              <p className="text-sm text-muted-light leading-relaxed">
                <strong className="text-white">Important:</strong> A business plan is a living document. The best plan gets reviewed and updated quarterly as you learn what actually works. Do not treat it as something you write once and file away.
              </p>
            </div>
          </section>

          <section id="executive-summary" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Executive Summary
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The executive summary is the most important section of your business plan. It is the first thing investors and lenders read, and it often determines whether they read anything else. Despite appearing first, write it last — after you have completed every other section.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              A strong executive summary answers six questions in one to two pages:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">What does your business do?</strong> One clear sentence. Avoid jargon.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">What problem does it solve?</strong> The specific pain point your target customer experiences.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Who is your target market?</strong> A brief description of your customer and the size of the opportunity.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">What is your competitive advantage?</strong> Why will customers choose you over alternatives?</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">What are your financial highlights?</strong> Revenue projections and, if seeking funding, how much you need and what it will be used for.</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span><strong className="text-white">Who is the team?</strong> Why are you and your co-founders the right people to execute this plan?</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              Keep it concise. Two pages maximum. If you cannot summarize your business clearly in two pages, your thinking is not clear enough yet. That is useful information — it means you need to sharpen your focus before writing anything else.
            </p>
          </section>

          <section id="company-description" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Company Description
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The company description gives context about your business that goes beyond the executive summary. It should cover:
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Business Overview</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Your legal business name, location, business structure (LLC, S-Corp, sole proprietorship), and when the business was (or will be) formed. Include your mission statement — one or two sentences that explain why the company exists and what it stands for.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">The Problem and Your Solution</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Describe the specific problem your target customers experience. Be precise. Vague problems like &ldquo;businesses need better marketing&rdquo; are not compelling. Specific problems like &ldquo;restaurants with fewer than ten employees have no affordable way to manage online ordering across multiple delivery platforms&rdquo; are. Then describe how your product or service solves that specific problem.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Your Unique Value Proposition</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              What makes you different? This could be price, speed, quality, specialization, technology, or a combination. Be honest about this. &ldquo;Best customer service&rdquo; is not a unique value proposition. &ldquo;Same-day installation with a two-hour guaranteed response time, backed by a satisfaction guarantee&rdquo; is.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Business Goals</h3>
            <p className="text-muted-light leading-relaxed">
              Short-term goals (6-12 months) and long-term goals (3-5 years). Make them specific and measurable. &ldquo;Grow revenue&rdquo; is not a goal. &ldquo;Reach $30,000 in monthly recurring revenue by Q4 2026&rdquo; is.
            </p>
          </section>

          <section id="market-analysis" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Market Analysis
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The market analysis section demonstrates that you understand your industry and the opportunity you are pursuing. Investors pay close attention to this section because it shows whether you have done your homework.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Industry Overview</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Describe the industry you are entering. How large is it? Is it growing or shrinking? What are the major trends? Use credible sources — industry reports, government statistics, trade publications. Cite your sources in the appendix.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Target Market</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Define your ideal customer with specificity. Demographics (age, income, location), psychographics (values, interests, lifestyle), and behavioral characteristics (how they buy, how often, what they are currently using instead of your product). Estimate the total addressable market (TAM) and the realistic segment you can capture.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Competitive Analysis</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              List your direct and indirect competitors. For each, note their strengths, weaknesses, pricing, and market position. A simple comparison table works well here. The goal is not to dismiss competitors but to demonstrate you understand the landscape and have a clear reason customers will choose you.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Market Opportunity</h3>
            <p className="text-muted-light leading-relaxed">
              Synthesize your market research into a clear argument for why now is the right time for your business to exist. Point to specific trends, technology shifts, regulatory changes, or demographic movements that create a window of opportunity.
            </p>
          </section>

          {/* Mid-article CTA */}
          <div className="my-12 rounded-2xl border border-primary/30 bg-primary/5 p-6 sm:p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-2">
              Run your business plan numbers in seconds.
            </h3>
            <p className="text-sm text-muted-light mb-5">
              PrestoKit&rsquo;s free Profit Margin Calculator and ROI Calculator help you validate your financial projections before putting them in your plan.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                href="/tools/profit-margin-calculator"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-primary-light hover:shadow-lg hover:shadow-primary/20"
              >
                Profit Margin Calculator
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14" /><path d="M12 5l7 7-7 7" />
                </svg>
              </Link>
              <Link
                href="/tools/roi-calculator"
                className="inline-flex items-center gap-2 rounded-xl border border-brand-border bg-brand-card px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-brand-card/80"
              >
                ROI Calculator
              </Link>
            </div>
          </div>

          <section id="organization-management" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Organization &amp; Management
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              This section describes your business&rsquo;s structure and the team that will execute the plan. For solopreneurs, this can be brief. For businesses with multiple founders, employees, or advisors, this section carries significant weight with investors.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Organizational Structure</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Describe the legal structure of your business and how it is organized internally. If you have co-founders, explain how ownership is divided. If you have or plan to have employees, include an organizational chart showing reporting relationships.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Management Team</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              For each key person, include a brief bio covering their relevant experience, their role in the business, and why their background makes them qualified to execute the plan. Be honest about gaps. If you are missing a key skill set (technical, sales, operations), acknowledge it and explain how you plan to address it.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Advisors and Board Members</h3>
            <p className="text-muted-light leading-relaxed">
              If you have advisors, mentors, or a board of directors, include them here. Experienced advisors with relevant industry connections add credibility, especially when the management team is thin on track record.
            </p>
          </section>

          <section id="products-services" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Products &amp; Services
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              This section details exactly what you are selling and how it creates value for your customers. It should go deeper than the executive summary and company description.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Product or Service Description</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Describe each product or service you offer in concrete terms. Avoid buzzwords and focus on what the customer actually gets. If you have a physical product, describe its features, materials, and how it is manufactured. If you offer a service, describe exactly what is included, how it is delivered, and how long it takes.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Pricing Strategy</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              How will you price your product or service? Is your pricing strategy cost-plus (add a margin to your cost), value-based (priced relative to the value delivered), or competitive (priced relative to competitors)? Explain your reasoning. Connect your pricing back to your financial projections.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Intellectual Property</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              If you have patents, trademarks, copyrights, or proprietary processes that give you a competitive advantage, describe them here. If you are still developing IP, note where you are in the process.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Development Roadmap</h3>
            <p className="text-muted-light leading-relaxed">
              If your product or service is not yet fully developed, describe the current stage and the timeline to market. What milestones need to be hit? What resources are required? A clear development roadmap is essential for any pre-revenue business seeking investment.
            </p>
          </section>

          <section id="marketing-strategy" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Marketing Strategy
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Your marketing strategy explains how you will attract and retain customers. Be specific. &ldquo;We will use social media and word of mouth&rdquo; is not a strategy. A real strategy names the channels, the content approach, the budget, and the metrics you will use to measure success.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Customer Acquisition</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              For each acquisition channel you plan to use, describe the tactic, estimated cost per acquisition, and expected volume. Common channels include paid search (Google Ads), social media advertising, SEO and content marketing, cold outreach (email, LinkedIn), partnerships, and referral programs.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Sales Process</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Describe the journey from first contact to signed contract or completed purchase. How long is the typical sales cycle? How many touchpoints does it take to close a customer? Who handles sales, and what tools will they use?
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Customer Retention</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Acquiring a new customer costs five to seven times more than retaining an existing one. Describe how you will keep customers coming back. Loyalty programs, regular check-ins, upsells, and exceptional service are all valid strategies.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Brand and Positioning</h3>
            <p className="text-muted-light leading-relaxed">
              How do you want your brand to be perceived? Premium, affordable, innovative, reliable, local, global? Your brand positioning should be consistent across all touchpoints: website, social media, packaging, customer service, and sales conversations.
            </p>
          </section>

          <section id="financial-projections" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Financial Projections
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              Financial projections are the most scrutinized section of any business plan. They need to be realistic, well-supported, and internally consistent. Overly optimistic projections are a red flag to investors and lenders. Ground your numbers in assumptions you can defend.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Revenue Projections (3 Years)</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Build your revenue projections from the bottom up, not the top down. Instead of saying &ldquo;we will capture 1% of a $1 billion market,&rdquo; model the number of customers you expect to acquire each month, multiplied by your average revenue per customer. This approach forces you to think realistically about your acquisition capacity.
            </p>
            <p className="text-muted-light leading-relaxed mb-4">
              Include three scenarios: conservative, base case, and optimistic. Your base case should be what you genuinely expect to happen. Your conservative case should be survivable. Your optimistic case should require everything to go right.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Profit and Loss Statement</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Project your income (revenue), your costs (cost of goods sold, operating expenses, salaries, rent, marketing), and your resulting profit or loss for each of the next three years. Be thorough with your cost estimates. Most new businesses underestimate expenses, especially for things like insurance, software, professional services, and taxes.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Cash Flow Statement</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Profit on paper does not keep the lights on. Cash flow does. A business can be profitable on an accrual basis while simultaneously running out of cash. Project your monthly cash inflows and outflows for at least the first 12 months, and identify any months where you will need a cash cushion or line of credit.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Break-Even Analysis</h3>
            <p className="text-muted-light leading-relaxed mb-4">
              Calculate the exact revenue you need each month to cover all your costs. This is your break-even point. Knowing this number tells you how many units you need to sell, how many clients you need to serve, or how many hours you need to bill to keep the business alive. Use PrestoKit&rsquo;s{" "}
              <Link href="/tools/profit-margin-calculator" className="text-primary-light hover:underline">
                Profit Margin Calculator
              </Link>{" "}
              to run these numbers quickly.
            </p>

            <h3 className="text-lg font-semibold text-white mb-3">Funding Requirements</h3>
            <p className="text-muted-light leading-relaxed">
              If you are seeking outside funding, state exactly how much you need, what it will be used for (with a breakdown), and how it will be repaid or what return investors can expect. Vagueness here kills credibility. Be specific about how each dollar of funding translates into revenue growth.
            </p>
          </section>

          <section id="appendix" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              Appendix
            </h2>
            <p className="text-muted-light leading-relaxed mb-4">
              The appendix is where you put supporting documents that are referenced in the main plan but would interrupt the flow if included inline. Common appendix materials include:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Resumes of key team members</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Letters of intent from potential customers or partners</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Detailed financial model spreadsheets</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Market research data and sources</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Patent applications or intellectual property documentation</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Product photos, mockups, or prototypes</span>
              </li>
              <li className="flex items-start gap-3 text-muted-light">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-light" />
                <span>Customer survey results or testimonials</span>
              </li>
            </ul>
            <p className="text-muted-light leading-relaxed">
              Only include materials that are directly relevant and add credibility. Do not pad the appendix. Every document in it should serve a specific purpose.
            </p>
          </section>

          <section id="one-page-template" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-4">
              One-Page Business Plan Template
            </h2>
            <p className="text-muted-light leading-relaxed mb-6">
              For most early-stage businesses, a one-page plan is both sufficient and more likely to actually get completed. Use this template to capture your most essential thinking. Answer each prompt in two to four sentences.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Business Overview</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Business name: _______ | Structure: _______ | Founded: _______ | Location: _______
                </p>
                <p className="text-sm text-muted-light leading-relaxed mt-2">
                  Mission statement: In one sentence, why does this company exist?
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">The Problem &amp; Solution</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Problem: What specific pain does your target customer experience? Be concrete — a problem you can describe in one sentence is a problem you can solve.
                </p>
                <p className="text-sm text-muted-light leading-relaxed mt-2">
                  Solution: How does your product or service solve that problem better than anything currently available?
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Target Customer</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Who is your ideal customer? (Demographics, industry, company size, location.) How many of them exist? What are they currently using instead of your solution?
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Revenue Model</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  How will you make money? List your products/services and their price points. What is your average revenue per customer per year? What is your gross margin?
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Marketing &amp; Sales</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  How will you find customers? (Channels: ads, SEO, cold outreach, referrals, partnerships.) What is your estimated cost to acquire one customer? What is your sales process?
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">Financial Summary</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Monthly expenses: $_______ | Break-even revenue: $_______ | Year 1 revenue goal: $_______ | Startup costs needed: $_______
                </p>
              </div>

              <div className="rounded-xl border border-brand-border bg-brand-card/30 p-5">
                <h3 className="text-base font-semibold text-white mb-2">90-Day Goals</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  List three to five specific, measurable outcomes you will achieve in the next 90 days. These become your operating priorities.
                </p>
              </div>
            </div>
          </section>

          {/* Tools CTA */}
          <div className="my-12 grid gap-4 sm:grid-cols-2">
            <Link
              href="/tools/profit-margin-calculator"
              className="group flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-card/40 p-5 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl" style={{ backgroundColor: "#4caf5015" }}>
                {"\uD83D\uDCCA"}
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-primary-light transition-colors">
                  Profit Margin Calculator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Calculate gross and net margin for your business plan projections.
                </p>
              </div>
            </Link>
            <Link
              href="/tools/roi-calculator"
              className="group flex items-start gap-4 rounded-2xl border border-brand-border bg-brand-card/40 p-5 transition-all hover:bg-brand-card hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10"
            >
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl text-2xl" style={{ backgroundColor: "#7c6cf015" }}>
                {"\uD83D\uDCC8"}
              </div>
              <div>
                <h3 className="font-semibold text-white group-hover:text-primary-light transition-colors">
                  ROI Calculator
                </h3>
                <p className="mt-1 text-sm text-muted-light">
                  Evaluate the return on any business investment or expense.
                </p>
              </div>
            </Link>
          </div>

          <section id="faq" className="scroll-mt-24 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Frequently Asked Questions
            </h2>

            <div className="space-y-6">
              <div>
                <h3 className="text-base font-semibold text-white mb-2">How long should a business plan be?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  It depends on the purpose. For internal use or a small business, a one-page plan is often enough. For a bank loan, 10-15 pages is typical. For venture capital, 20-30 pages with detailed financial models is the norm. Focus on quality over length — a clear, well-supported 15-page plan beats a padded 40-page one every time.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Do I need a business plan if I am not seeking funding?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Yes, but it can be much simpler. The primary value of a business plan is not for outsiders — it is for you. Writing one forces you to clarify your thinking, stress-test your assumptions, and make explicit decisions about strategy that you might otherwise leave vague. Even a one-page plan makes you a more deliberate operator.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">How do I write financial projections if I have no revenue yet?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Build projections from assumptions, and document every assumption. How many customers do you expect to acquire per month? What is your average sale price? What are your costs? Start with what you know (expenses) and work forward from realistic customer acquisition estimates. Talk to people in similar businesses to validate your assumptions before baking them into the plan.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">What is the difference between a business plan and a pitch deck?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A pitch deck is a visual, 10-15 slide presentation designed to tell your story quickly in a meeting with investors. A business plan is a written, detailed document that supports the pitch deck with more depth. Most investors want to see your pitch deck first. If they are interested, they will ask for the full plan.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">How often should I update my business plan?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Review it quarterly. Update the financial projections with actual numbers and revise your strategy based on what you have learned. Major updates (new product, new market, seeking funding) warrant a full rewrite. Most operating businesses maintain a living document that evolves continuously rather than a static plan they wrote once.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">What is a lean business plan?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  A lean business plan is a condensed, one-to-two page format that covers the essentials: your value proposition, target market, revenue model, key metrics, and major milestones. It is derived from the lean startup methodology and prioritizes speed and iteration over comprehensiveness. It is ideal for early-stage companies that are still discovering their business model.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Do banks require a business plan for a small business loan?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Most traditional banks and SBA lenders require a full business plan for loans above $50,000. For smaller loans, some lenders use alternative underwriting (personal credit, bank statements, revenue history) and do not require a formal plan. Check with your specific lender — requirements vary significantly.
                </p>
              </div>

              <div>
                <h3 className="text-base font-semibold text-white mb-2">Should I hire someone to write my business plan?</h3>
                <p className="text-sm text-muted-light leading-relaxed">
                  Write it yourself, at least the first draft. A hired writer cannot know your business, your assumptions, or your vision as well as you do. Investors and lenders are evaluating whether you understand your own business — a plan written by someone else undermines that. You can hire a consultant to review, improve, and format the financial section, but the core content should come from you.
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
              href="/guides/how-to-start-business"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Start a Small Business
              </h3>
              <p className="mt-1 text-sm text-muted">
                Complete step-by-step guide from idea to first customer.
              </p>
            </Link>
            <Link
              href="/guides/how-to-register-an-llc"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-5 transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-3 font-semibold text-white group-hover:text-primary-light transition-colors">
                How to Register an LLC
              </h3>
              <p className="mt-1 text-sm text-muted">
                Step-by-step LLC formation guide with costs by state.
              </p>
            </Link>
          </div>
        </section>

        {/* Related Tools */}
        <section className="mt-12 border-t border-brand-border pt-12">
          <h2 className="text-xl font-bold text-white mb-6">Related Tools</h2>
          <div className="grid gap-4 sm:grid-cols-3">
            <Link
              href="/tools/profit-margin-calculator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Profit Margin Calculator
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
            <Link
              href="/tools/invoice-generator"
              className="group rounded-xl border border-brand-border bg-brand-card/30 p-4 text-center transition-all hover:bg-brand-card hover:border-brand-border-hover"
            >
              <h3 className="mt-2 text-sm font-semibold text-white group-hover:text-primary-light transition-colors">
                Invoice Generator
              </h3>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
