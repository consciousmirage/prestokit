"use client";

import { useState, useMemo } from "react";
import PromoBar from "@/components/PromoBar";

/* ------------------------------------------------------------------ */
/*  FAQ Accordion                                                      */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#1e1e2e] rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-[#1a1a26]/60 transition-colors"
      >
        <span className="text-[#e0e0ea] font-medium text-sm sm:text-base pr-4">
          {question}
        </span>
        <svg
          className={`w-5 h-5 shrink-0 text-[#7c6cf0] transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-6 pb-5 text-sm text-[#a0a0b8] leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Breadcrumb                                                         */
/* ------------------------------------------------------------------ */

function Breadcrumb() {
  return (
    <nav className="flex items-center gap-2 text-sm text-[#8888a0] mb-8">
      <a href="/" className="hover:text-[#7c6cf0] transition-colors">
        PrestoKit
      </a>
      <span>/</span>
      <a href="/tools" className="hover:text-[#7c6cf0] transition-colors">
        Tools
      </a>
      <span>/</span>
      <span className="text-[#f0f0f5]">Markup Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is markup and how is it calculated?",
    answer:
      "Markup is the amount added to the cost of a product to determine its selling price. It is expressed as a percentage of cost. The formula is: Markup % = ((Selling Price - Cost) / Cost) x 100. For example, if an item costs $50 and you sell it for $75, the markup is 50%. Markup is always calculated on cost, not on selling price.",
  },
  {
    question: "What is the difference between markup and margin?",
    answer:
      "Markup and margin both describe the relationship between cost and price, but from different perspectives. Markup is calculated as a percentage of cost: Markup % = (Profit / Cost) x 100. Margin is calculated as a percentage of selling price: Margin % = (Profit / Selling Price) x 100. A 50% markup results in a 33.3% margin — they are never the same number (unless both are 0%). Margin is always lower than markup for the same product.",
  },
  {
    question: "How do I convert markup to margin?",
    answer:
      "To convert markup percentage to gross margin percentage: Margin % = Markup % / (100 + Markup %) x 100. For example, a 50% markup gives a margin of 50 / 150 x 100 = 33.3%. To go the other way: Markup % = Margin % / (100 - Margin %) x 100.",
  },
  {
    question: "What markup percentage should I use?",
    answer:
      "There is no universal right answer — it depends on your industry, competition, and cost structure. Common benchmarks: retail typically uses 50-100% (keystone pricing at 100% markup = 50% margin), restaurants 200-400%, software and digital goods often 500%+. The key is ensuring your markup covers all overhead and generates sufficient net profit after operating expenses.",
  },
  {
    question: "What is keystone pricing?",
    answer:
      "Keystone pricing is a retail pricing strategy where you double the wholesale cost to set the retail price — a 100% markup, which results in a 50% gross margin. It is a simple, industry-standard rule of thumb in many retail sectors. For example, if a product costs $20 wholesale, keystone pricing sets the retail price at $40.",
  },
  {
    question: "Does markup account for overhead and other expenses?",
    answer:
      "Markup covers the difference between your direct cost and selling price. However, it does not directly account for overhead expenses like rent, wages, and utilities unless those are factored into your cost. To ensure profitability, you should calculate your total cost per unit (including a portion of overhead) before applying your markup. Otherwise, you may have a high gross margin but still operate at a loss.",
  },
  {
    question: "Is this markup calculator free?",
    answer:
      "Yes — completely free, no account required. All calculations run instantly in your browser. No data is stored or sent to any server. Bookmark it for quick pricing decisions any time.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quick Reference Table Data                                         */
/* ------------------------------------------------------------------ */

const MARKUP_TABLE = [
  { markup: 10 },
  { markup: 20 },
  { markup: 25 },
  { markup: 33 },
  { markup: 50 },
  { markup: 67 },
  { markup: 75 },
  { markup: 100 },
  { markup: 150 },
  { markup: 200 },
  { markup: 300 },
  { markup: 500 },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

type CalcMode = "find-price" | "find-markup";

export default function MarkupCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("find-price");

  // Mode 1: find selling price from cost + markup%
  const [cost1, setCost1] = useState("");
  const [markupPct1, setMarkupPct1] = useState("");

  // Mode 2: find markup% from cost + selling price
  const [cost2, setCost2] = useState("");
  const [sellingPrice2, setSellingPrice2] = useState("");

  const results = useMemo(() => {
    if (mode === "find-price") {
      const cost = parseFloat(cost1) || 0;
      const markup = parseFloat(markupPct1) || 0;
      if (cost <= 0 || markup < 0) return null;
      const markupAmount = cost * (markup / 100);
      const sellingPrice = cost + markupAmount;
      const grossMargin = sellingPrice > 0 ? (markupAmount / sellingPrice) * 100 : 0;
      return {
        cost,
        markupPct: markup,
        markupAmount,
        sellingPrice,
        grossMargin,
      };
    } else {
      const cost = parseFloat(cost2) || 0;
      const sellingPrice = parseFloat(sellingPrice2) || 0;
      if (cost <= 0 || sellingPrice <= 0) return null;
      const markupAmount = sellingPrice - cost;
      const markupPct = (markupAmount / cost) * 100;
      const grossMargin = sellingPrice > 0 ? (markupAmount / sellingPrice) * 100 : 0;
      return {
        cost,
        markupPct,
        markupAmount,
        sellingPrice,
        grossMargin,
      };
    }
  }, [mode, cost1, markupPct1, cost2, sellingPrice2]);

  const fmt2 = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Markup Calculator",
    description:
      "Calculate markup percentage from cost and selling price, or find your selling price from cost and markup %. Includes markup vs margin reference table.",
    url: "https://prestokit.com/tools/markup-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <PromoBar type="pro" dismissKey="markup-calculator-pro" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Markup{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate your selling price from cost and markup %, or find the
              markup % from cost and selling price. Instantly see markup amount,
              gross margin, and more.
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMode("find-price")}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                mode === "find-price"
                  ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                  : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
              }`}
            >
              Cost + Markup % → Selling Price
            </button>
            <button
              onClick={() => setMode("find-markup")}
              className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                mode === "find-markup"
                  ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                  : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
              }`}
            >
              Cost + Selling Price → Markup %
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {mode === "find-price" ? (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Cost Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={cost1}
                        onChange={(e) => setCost1(e.target.value)}
                        placeholder="e.g. 50.00"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Markup Percentage
                    </label>
                    <div className="relative">
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={markupPct1}
                        onChange={(e) => setMarkupPct1(e.target.value)}
                        placeholder="e.g. 50"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-4 pr-10 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                        %
                      </span>
                    </div>
                  </div>
                  {/* Quick markup buttons */}
                  <div>
                    <div className="text-xs text-[#555566] mb-2">Quick Select</div>
                    <div className="flex flex-wrap gap-2">
                      {[20, 25, 33, 50, 67, 100].map((pct) => (
                        <button
                          key={pct}
                          onClick={() => setMarkupPct1(pct.toString())}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            markupPct1 === pct.toString()
                              ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                              : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                          }`}
                        >
                          {pct}%
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Cost Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={cost2}
                        onChange={(e) => setCost2(e.target.value)}
                        placeholder="e.g. 50.00"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Selling Price
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                        $
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={sellingPrice2}
                        onChange={(e) => setSellingPrice2(e.target.value)}
                        placeholder="e.g. 75.00"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                  </div>
                  {sellingPrice2 && cost2 && parseFloat(sellingPrice2) < parseFloat(cost2) && (
                    <div className="rounded-xl border border-[#ff5252]/30 bg-[#ff5252]/10 p-4">
                      <p className="text-sm text-[#ff5252]">
                        Selling price is lower than cost — you are selling at a loss.
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Results */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">Results</h2>
              {results ? (
                <div className="space-y-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Cost Price
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${fmt2(results.cost)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Markup Amount
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      +${fmt2(results.markupAmount)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      {mode === "find-price" ? "Selling Price" : "Selling Price"}
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${fmt2(results.sellingPrice)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Markup %
                      </div>
                      <div className="text-2xl font-bold text-[#9d90f5]">
                        {results.markupPct.toFixed(2)}%
                      </div>
                      <div className="text-xs text-[#555566] mt-1">of cost</div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Gross Margin
                      </div>
                      <div className="text-2xl font-bold text-[#7c6cf0]">
                        {results.grossMargin.toFixed(2)}%
                      </div>
                      <div className="text-xs text-[#555566] mt-1">of revenue</div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center h-48">
                  <p className="text-[#555566] text-sm text-center">
                    Enter your values to see results
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Markup vs Margin Reference Table */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-2">
              Markup % vs Gross Margin % — Quick Reference
            </h2>
            <p className="text-sm text-[#8888a0] mb-5">
              Markup is calculated on cost; margin is calculated on selling price.
              They are never the same number.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="text-left text-[#8888a0] font-medium pb-3 pr-6">
                      Markup %
                    </th>
                    <th className="text-left text-[#8888a0] font-medium pb-3 pr-6">
                      Gross Margin %
                    </th>
                    <th className="text-left text-[#8888a0] font-medium pb-3 pr-6">
                      Example: $100 Cost
                    </th>
                    <th className="text-left text-[#8888a0] font-medium pb-3">
                      Selling Price
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MARKUP_TABLE.map(({ markup }) => {
                    const margin = (markup / (100 + markup)) * 100;
                    const sellingPrice = 100 * (1 + markup / 100);
                    return (
                      <tr key={markup} className="border-b border-[#1e1e2e]/60">
                        <td className="py-3 pr-6 font-semibold text-[#9d90f5]">
                          {markup}%
                        </td>
                        <td className="py-3 pr-6 text-[#c0c0d0]">
                          {margin.toFixed(1)}%
                        </td>
                        <td className="py-3 pr-6 text-[#8888a0]">$100.00</td>
                        <td className="py-3 font-semibold text-[#00e676]">
                          ${sellingPrice.toFixed(2)}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose a Mode",
                  description:
                    "Use Mode 1 to find your selling price from cost and markup %, or Mode 2 to find the markup % from cost and selling price.",
                },
                {
                  step: "2",
                  title: "Enter Your Numbers",
                  description:
                    "Type in your cost and either your target markup % or your actual selling price. Results appear instantly as you type.",
                },
                {
                  step: "3",
                  title: "See Markup & Margin",
                  description:
                    "View markup amount, selling price, markup %, and gross margin % side by side so you can make informed pricing decisions.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-[#8888a0] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* FAQ */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Frequently Asked Questions
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {FAQ_DATA.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Profit Margin Calculator",
                  description:
                    "Calculate gross margin, net margin, and break-even points for your business.",
                  href: "/tools/profit-margin-calculator",
                },
                {
                  title: "Break-Even Calculator",
                  description:
                    "Find how many units you need to sell to cover all costs and start making profit.",
                  href: "/tools/break-even-calculator",
                },
                {
                  title: "Discount Calculator",
                  description:
                    "Calculate sale prices, percentage off, and savings on any purchase.",
                  href: "/tools/discount-calculator",
                },
              ].map((tool) => (
                <a
                  key={tool.title}
                  href={tool.href}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 hover:border-[#7c6cf0]/40 transition-all group"
                >
                  <h3 className="text-white font-semibold mb-2 group-hover:text-[#7c6cf0] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-sm text-[#8888a0]">{tool.description}</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
