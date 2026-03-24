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
      <span className="text-[#f0f0f5]">Break Even Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is the break-even point?",
    answer:
      "The break-even point is the number of units you need to sell (or revenue you need to earn) so that total revenue exactly equals total costs — meaning you have zero profit and zero loss. Any sales beyond this point generate profit, and any sales below result in a loss. It's a critical metric for pricing strategy and business planning.",
  },
  {
    question: "How is break-even point calculated?",
    answer:
      "Break-even point in units = Fixed Costs / (Price Per Unit - Variable Cost Per Unit). The denominator (Price - Variable Cost) is called the contribution margin — it's how much each unit sold contributes toward covering fixed costs. Break-even revenue = Break-even units multiplied by the price per unit.",
  },
  {
    question: "What are fixed costs vs. variable costs?",
    answer:
      "Fixed costs remain the same regardless of how many units you produce — examples include rent, salaries, insurance, and loan payments. Variable costs change with production volume — examples include raw materials, packaging, shipping per unit, and sales commissions. Understanding the distinction is essential for accurate break-even analysis.",
  },
  {
    question: "What is contribution margin?",
    answer:
      "Contribution margin is the amount each unit sale contributes toward covering fixed costs and eventually generating profit. It's calculated as Price Per Unit minus Variable Cost Per Unit. The contribution margin ratio (contribution margin divided by price) tells you what percentage of each dollar of revenue goes toward fixed costs and profit.",
  },
  {
    question: "How can I lower my break-even point?",
    answer:
      "You can lower your break-even point by: (1) Reducing fixed costs — negotiate lower rent, reduce overhead, automate processes. (2) Reducing variable costs — find cheaper suppliers, optimize production efficiency. (3) Increasing prices — if the market supports it. (4) Improving product mix — focus on higher-margin products. Any combination of these strategies will lower the number of units needed to break even.",
  },
  {
    question: "What are the limitations of break-even analysis?",
    answer:
      "Break-even analysis assumes: costs are strictly fixed or variable (in reality, some are semi-variable), price per unit stays constant regardless of volume, all units produced are sold, and costs remain linear. It also doesn't account for time value of money, competition, market demand constraints, or economies of scale. Use it as one tool among many for business planning, not as the sole decision-making metric.",
  },
];

/* ------------------------------------------------------------------ */
/*  Profit/Loss Chart                                                   */
/* ------------------------------------------------------------------ */

function ProfitLossChart({
  fixedCosts,
  variableCostPerUnit,
  pricePerUnit,
  breakEvenUnits,
}: {
  fixedCosts: number;
  variableCostPerUnit: number;
  pricePerUnit: number;
  breakEvenUnits: number;
}) {
  if (breakEvenUnits <= 0 || !isFinite(breakEvenUnits)) return null;

  // Generate data points from 0 to 2x break-even
  const maxUnits = Math.ceil(breakEvenUnits * 2);
  const steps = 8;
  const stepSize = Math.max(1, Math.ceil(maxUnits / steps));
  const dataPoints: { units: number; revenue: number; totalCost: number; profit: number }[] = [];

  for (let i = 0; i <= steps; i++) {
    const units = i * stepSize;
    const revenue = units * pricePerUnit;
    const totalCost = fixedCosts + units * variableCostPerUnit;
    const profit = revenue - totalCost;
    dataPoints.push({ units, revenue, totalCost, profit });
  }

  const maxValue = Math.max(
    ...dataPoints.map((d) => Math.max(d.revenue, d.totalCost))
  );
  const minProfit = Math.min(...dataPoints.map((d) => d.profit));
  const maxProfit = Math.max(...dataPoints.map((d) => d.profit));
  const profitRange = Math.max(Math.abs(minProfit), Math.abs(maxProfit));

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  return (
    <div className="space-y-6">
      {/* Revenue vs Cost Bars */}
      <div>
        <h3 className="text-sm font-semibold text-[#c0c0d0] mb-4">
          Revenue vs. Total Cost by Volume
        </h3>
        <div className="space-y-3">
          {dataPoints.map((d, i) => (
            <div key={i} className="space-y-1">
              <div className="flex items-center justify-between text-xs text-[#8888a0]">
                <span>{fmt(d.units)} units</span>
                <span
                  className={
                    d.profit >= 0 ? "text-[#00e676] font-semibold" : "text-[#ff5252] font-semibold"
                  }
                >
                  {d.profit >= 0 ? "+" : ""}${fmt(d.profit)}
                </span>
              </div>
              <div className="flex gap-1">
                {/* Revenue bar */}
                <div className="flex-1 h-5 bg-[#0a0a0f] rounded overflow-hidden relative">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{
                      width: maxValue > 0 ? `${Math.max((d.revenue / maxValue) * 100, 1)}%` : "0%",
                      background: "linear-gradient(90deg, #00e676, #00c853)",
                    }}
                  />
                  <span className="absolute inset-0 flex items-center px-2 text-[10px] text-white font-medium drop-shadow-sm">
                    Rev: ${fmt(d.revenue)}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                {/* Cost bar */}
                <div className="flex-1 h-5 bg-[#0a0a0f] rounded overflow-hidden relative">
                  <div
                    className="h-full rounded transition-all duration-500"
                    style={{
                      width: maxValue > 0 ? `${Math.max((d.totalCost / maxValue) * 100, 1)}%` : "0%",
                      background: "linear-gradient(90deg, #ff5252, #d32f2f)",
                    }}
                  />
                  <span className="absolute inset-0 flex items-center px-2 text-[10px] text-white font-medium drop-shadow-sm">
                    Cost: ${fmt(d.totalCost)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Profit/Loss Bars */}
      <div>
        <h3 className="text-sm font-semibold text-[#c0c0d0] mb-4">
          Profit / Loss at Each Volume
        </h3>
        <div className="space-y-2">
          {dataPoints.map((d, i) => {
            const pct = profitRange > 0 ? (Math.abs(d.profit) / profitRange) * 50 : 0;
            return (
              <div key={i} className="flex items-center gap-3">
                <div className="w-20 text-right text-xs text-[#8888a0]">
                  {fmt(d.units)} units
                </div>
                <div className="flex-1 h-6 relative">
                  {/* Center line */}
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1e1e2e]" />
                  {d.profit >= 0 ? (
                    <div
                      className="absolute top-0 h-full rounded-r transition-all duration-500"
                      style={{
                        left: "50%",
                        width: `${Math.max(pct, 1)}%`,
                        background: "linear-gradient(90deg, #00e676, #00c853)",
                      }}
                    />
                  ) : (
                    <div
                      className="absolute top-0 h-full rounded-l transition-all duration-500"
                      style={{
                        right: "50%",
                        width: `${Math.max(pct, 1)}%`,
                        background: "linear-gradient(270deg, #ff5252, #d32f2f)",
                      }}
                    />
                  )}
                </div>
                <div
                  className={`w-24 text-right text-xs font-semibold ${
                    d.profit >= 0 ? "text-[#00e676]" : "text-[#ff5252]"
                  }`}
                >
                  {d.profit >= 0 ? "+" : ""}${fmt(d.profit)}
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex justify-between text-[10px] text-[#555566] mt-1 px-24">
          <span>Loss</span>
          <span>Break Even</span>
          <span>Profit</span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BreakEvenCalculatorPage() {
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [price, setPrice] = useState("");

  const results = useMemo(() => {
    const fc = parseFloat(fixedCosts) || 0;
    const vc = parseFloat(variableCost) || 0;
    const p = parseFloat(price) || 0;

    const contributionMargin = p - vc;
    const contributionMarginRatio = p > 0 ? contributionMargin / p : 0;
    const breakEvenUnits = contributionMargin > 0 ? fc / contributionMargin : 0;
    const breakEvenRevenue = breakEvenUnits * p;

    return {
      fixedCosts: fc,
      variableCost: vc,
      price: p,
      contributionMargin,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenRevenue,
    };
  }, [fixedCosts, variableCost, price]);

  const fmt = (n: number, decimals = 0) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Break Even Calculator",
    description:
      "Calculate your break-even point in units and revenue. Enter fixed costs, variable cost per unit, and price per unit for instant break-even analysis.",
    url: "https://prestokit.com/tools/break-even-calculator",
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Break Even{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate your break-even point in units and revenue. See how many
              units you need to sell to cover all costs, plus a profit/loss chart
              at different volumes.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <div className="space-y-6">
                {/* Fixed Costs */}
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Total Fixed Costs
                  </label>
                  <p className="text-xs text-[#555566] mb-2">
                    Rent, salaries, insurance, loan payments, etc.
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="100"
                      value={fixedCosts}
                      onChange={(e) => setFixedCosts(e.target.value)}
                      placeholder="e.g. 10,000"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>

                {/* Variable Cost Per Unit */}
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Variable Cost Per Unit
                  </label>
                  <p className="text-xs text-[#555566] mb-2">
                    Materials, packaging, shipping, commissions per unit
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={variableCost}
                      onChange={(e) => setVariableCost(e.target.value)}
                      placeholder="e.g. 15"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>

                {/* Price Per Unit */}
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Selling Price Per Unit
                  </label>
                  <p className="text-xs text-[#555566] mb-2">
                    The price you charge customers per unit
                  </p>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      placeholder="e.g. 40"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>

                {/* Warning if price <= variable cost */}
                {results.price > 0 &&
                  results.variableCost > 0 &&
                  results.contributionMargin <= 0 && (
                    <div className="rounded-xl border border-[#ff5252]/30 bg-[#ff5252]/10 p-4">
                      <p className="text-sm text-[#ff5252]">
                        Your selling price must be higher than your variable cost per
                        unit to break even. Currently each unit sold loses money.
                      </p>
                    </div>
                  )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Break-Even Analysis
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Break-Even Point
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {results.contributionMargin > 0
                        ? `${fmt(Math.ceil(results.breakEvenUnits))} units`
                        : "\u2014"}
                    </div>
                    {results.contributionMargin > 0 && (
                      <div className="text-xs text-[#555566] mt-1">
                        Exact: {results.breakEvenUnits.toFixed(1)} units
                      </div>
                    )}
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Break-Even Revenue
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      {results.contributionMargin > 0
                        ? `$${fmt(results.breakEvenRevenue)}`
                        : "\u2014"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Contribution Margin
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${fmt(results.contributionMargin, 2)}
                      </div>
                      <div className="text-xs text-[#555566] mt-1">per unit</div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        CM Ratio
                      </div>
                      <div className="text-2xl font-bold text-[#9d90f5]">
                        {(results.contributionMarginRatio * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-[#555566] mt-1">of revenue</div>
                    </div>
                  </div>

                  {/* Profit at different volumes */}
                  {results.contributionMargin > 0 && (
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                        Profit at Common Volumes
                      </div>
                      <div className="space-y-2 text-sm">
                        {[0.5, 1, 1.5, 2, 3].map((multiplier) => {
                          const units = Math.ceil(results.breakEvenUnits * multiplier);
                          const profit =
                            units * results.price -
                            (results.fixedCosts + units * results.variableCost);
                          return (
                            <div
                              key={multiplier}
                              className="flex justify-between py-1 border-b border-[#1e1e2e]/60 last:border-0"
                            >
                              <span className="text-[#c0c0d0]">
                                {fmt(units)} units
                              </span>
                              <span
                                className={`font-semibold ${
                                  profit >= 0 ? "text-[#00e676]" : "text-[#ff5252]"
                                }`}
                              >
                                {profit >= 0 ? "+" : ""}${fmt(profit)}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Profit/Loss Chart */}
          {results.contributionMargin > 0 && results.breakEvenUnits > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                Profit / Loss Chart
              </h2>
              <ProfitLossChart
                fixedCosts={results.fixedCosts}
                variableCostPerUnit={results.variableCost}
                pricePerUnit={results.price}
                breakEvenUnits={results.breakEvenUnits}
              />
            </div>
          )}

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="break-even-calculator-pro" />

          {/* How It Works */}
          <div className="mb-16 mt-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Costs",
                  description:
                    "Input your total fixed costs (rent, salaries, etc.) and the variable cost to produce each unit (materials, shipping, etc.).",
                },
                {
                  step: "2",
                  title: "Set Your Price",
                  description:
                    "Enter the selling price per unit. This determines your contribution margin — the profit each unit contributes toward covering fixed costs.",
                },
                {
                  step: "3",
                  title: "See Break-Even Results",
                  description:
                    "Instantly see how many units you need to sell to break even, plus a visual profit/loss chart at various sales volumes.",
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
                    "Calculate profit margins, markups, and see the relationship between cost, revenue, and profit.",
                  href: "/tools/profit-margin-calculator",
                },
                {
                  title: "ROI Calculator",
                  description:
                    "Calculate return on investment for any project or business decision.",
                  href: "/tools/roi-calculator",
                },
                {
                  title: "Invoice Generator",
                  description:
                    "Create professional invoices for your business in seconds.",
                  href: "/tools/invoice-generator",
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
