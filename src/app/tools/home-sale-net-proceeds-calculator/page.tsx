"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtPct(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "What are net proceeds from a home sale?",
    a: "Net proceeds is the amount you actually receive after subtracting all costs from the sale price. This includes agent commissions, closing costs, mortgage payoff, and any repair or staging expenses. It is your true take-home amount from the transaction.",
  },
  {
    q: "Do I have to pay taxes on my home sale profit?",
    a: "Not necessarily. The IRS allows a $250,000 capital gains exclusion for single filers and $500,000 for married filing jointly, provided you owned and lived in the home for at least 2 of the last 5 years. If your gain exceeds these thresholds, the excess is taxed at capital gains rates (0%, 15%, or 20% depending on income).",
  },
  {
    q: "What is included in closing costs for sellers?",
    a: "Seller closing costs typically include transfer taxes, title insurance, escrow or attorney fees, prorated property taxes, and any outstanding HOA fees. These typically add up to 1–3% of the sale price, not counting the agent commission.",
  },
  {
    q: "How does my mortgage balance affect net proceeds?",
    a: "Your outstanding mortgage balance is paid off directly from the sale proceeds at closing. If you owe $300,000 and net $350,000 after all costs, you walk away with $50,000 in cash. If your mortgage balance exceeds your net proceeds, you would need to cover the difference — this is called a short sale.",
  },
  {
    q: "What if I still owe more than my home is worth?",
    a: "If your mortgage balance plus selling costs exceed the sale price, you have negative equity. In this situation, a traditional sale would require you to bring cash to closing. Alternatives include a short sale (with lender approval) or staying in the home until equity improves.",
  },
];

const RELATED_TOOLS = [
  {
    name: "Real Estate Commission Calculator",
    description: "Calculate listing agent and buyer's agent commission split.",
    href: "/tools/real-estate-commission-calculator",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Closing Cost Calculator",
    description: "Estimate buyer and seller closing costs by state.",
    href: "/tools/closing-cost-calculator",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Cap Rate Calculator",
    description: "Evaluate rental property returns and NOI.",
    href: "/tools/cap-rate-calculator",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "ROI Calculator",
    description: "Calculate return on any investment.",
    href: "/tools/roi-calculator",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function HomeSaleNetProceedsPage() {
  const [salePrice, setSalePrice] = useState(650000);
  const [mortgageBalance, setMortgageBalance] = useState(300000);
  const [commissionPct, setCommissionPct] = useState(5.5);
  const [closingCostPct, setClosingCostPct] = useState(1.0);
  const [repairsBudget, setRepairsBudget] = useState(5000);
  const [originalPurchasePrice, setOriginalPurchasePrice] = useState(400000);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#f59e0b]/60 focus:ring-1 focus:ring-[#f59e0b]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  const results = useMemo(() => {
    const agentCommission = (salePrice * commissionPct) / 100;
    const closingCosts = (salePrice * closingCostPct) / 100;
    const grossProceeds = salePrice;
    const netProceeds = grossProceeds - agentCommission - closingCosts - repairsBudget;
    const cashAfterMortgage = netProceeds - mortgageBalance;
    const capitalGain = cashAfterMortgage - originalPurchasePrice;
    // For display purposes: how much equity was created if gain above 0
    const effectiveGain = netProceeds - originalPurchasePrice;

    return {
      grossProceeds,
      agentCommission,
      closingCosts,
      repairsBudget,
      netProceeds,
      mortgageBalance,
      cashAfterMortgage,
      capitalGain,
      effectiveGain,
    };
  }, [salePrice, mortgageBalance, commissionPct, closingCostPct, repairsBudget, originalPurchasePrice]);

  // Waterfall items for the visual breakdown
  const waterfallItems = [
    {
      label: "Sale Price",
      amount: results.grossProceeds,
      deduction: false,
      color: "#f59e0b",
    },
    {
      label: `Agent Commission (${fmtPct(commissionPct)}%)`,
      amount: results.agentCommission,
      deduction: true,
      color: "#ef4444",
    },
    {
      label: `Closing Costs (${fmtPct(closingCostPct)}%)`,
      amount: results.closingCosts,
      deduction: true,
      color: "#f97316",
    },
    {
      label: "Repairs / Staging",
      amount: results.repairsBudget,
      deduction: true,
      color: "#eab308",
    },
    {
      label: "Net Proceeds",
      amount: results.netProceeds,
      deduction: false,
      color: "#10b981",
    },
    {
      label: "Mortgage Payoff",
      amount: results.mortgageBalance,
      deduction: true,
      color: "#64748b",
    },
    {
      label: "Cash in Hand",
      amount: results.cashAfterMortgage,
      deduction: false,
      color: results.cashAfterMortgage >= 0 ? "#22c55e" : "#ef4444",
    },
  ];

  const maxAbsValue = Math.max(...waterfallItems.map((i) => Math.abs(i.amount)), 1);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Breadcrumb */}
      <nav className="border-b border-white/5 bg-[#0e0e18]">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-[#f59e0b] transition">PrestoKit</a>
          <span>/</span>
          <a href="/tools" className="hover:text-[#f59e0b] transition">Tools</a>
          <span>/</span>
          <span className="text-gray-300">Home Sale Net Proceeds Calculator</span>
        </div>
      </nav>

      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 pt-10 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/10 px-3 py-1 text-xs font-medium text-[#f59e0b] mb-4">
          Real Estate Tools
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Home Sale{" "}
          <span className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
            Net Proceeds
          </span>
        </h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Calculate exactly how much you will walk away with after selling your home. Includes
          agent commissions, closing costs, mortgage payoff, and repairs — all in one waterfall view.
        </p>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-20 space-y-6">
        {/* Inputs */}
        <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Your Sale Details</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Sale Price ($)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                step={5000}
                value={salePrice}
                onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className={labelCls}>Mortgage Balance Remaining ($)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                step={1000}
                value={mortgageBalance}
                onChange={(e) => setMortgageBalance(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className={labelCls}>Agent Commission (%)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                max={20}
                step={0.1}
                value={commissionPct}
                onChange={(e) =>
                  setCommissionPct(Math.min(20, Math.max(0, Number(e.target.value))))
                }
              />
            </div>
            <div>
              <label className={labelCls}>Estimated Closing Costs (%)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                max={10}
                step={0.1}
                value={closingCostPct}
                onChange={(e) =>
                  setClosingCostPct(Math.min(10, Math.max(0, Number(e.target.value))))
                }
              />
              <p className="text-[10px] text-gray-600 mt-1">Excludes agent commission</p>
            </div>
            <div>
              <label className={labelCls}>Repairs / Staging Budget ($)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                step={500}
                value={repairsBudget}
                onChange={(e) => setRepairsBudget(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className={labelCls}>Original Purchase Price ($)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                step={1000}
                value={originalPurchasePrice}
                onChange={(e) => setOriginalPurchasePrice(Math.max(0, Number(e.target.value)))}
              />
              <p className="text-[10px] text-gray-600 mt-1">Used for capital gain estimate</p>
            </div>
          </div>
        </section>

        {/* Key Result Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
            <p className="text-xs text-gray-500 mb-1">Net Proceeds</p>
            <p className="text-2xl font-bold text-[#f59e0b] tabular-nums">
              ${fmt(results.netProceeds)}
            </p>
            <p className="text-xs text-gray-600 mt-1">Before mortgage payoff</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
            <p className="text-xs text-gray-500 mb-1">Cash in Hand</p>
            <p
              className="text-2xl font-bold tabular-nums"
              style={{ color: results.cashAfterMortgage >= 0 ? "#22c55e" : "#ef4444" }}
            >
              {results.cashAfterMortgage < 0 ? "−" : ""}$
              {fmt(Math.abs(results.cashAfterMortgage))}
            </p>
            <p className="text-xs text-gray-600 mt-1">After mortgage payoff</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5 col-span-2 sm:col-span-1">
            <p className="text-xs text-gray-500 mb-1">Estimated Capital Gain</p>
            <p
              className="text-2xl font-bold tabular-nums"
              style={{ color: results.effectiveGain >= 0 ? "#a78bfa" : "#ef4444" }}
            >
              {results.effectiveGain < 0 ? "−" : ""}$
              {fmt(Math.abs(results.effectiveGain))}
            </p>
            <p className="text-xs text-gray-600 mt-1">Net proceeds vs. purchase price</p>
          </div>
        </div>

        {/* Waterfall Visual Breakdown */}
        <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
          <h2 className="text-sm font-medium text-gray-400 mb-5">Waterfall Breakdown</h2>
          <div className="space-y-3">
            {waterfallItems.map((item) => {
              const barWidth = Math.max(2, (Math.abs(item.amount) / maxAbsValue) * 100);
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span className="flex items-center gap-1.5">
                      {item.deduction && (
                        <span className="text-gray-600 font-medium">−</span>
                      )}
                      {item.label}
                    </span>
                    <span
                      className="font-semibold tabular-nums"
                      style={{ color: item.color }}
                    >
                      {item.amount < 0 ? "−" : item.deduction ? "−" : ""}$
                      {fmt(Math.abs(item.amount))}
                    </span>
                  </div>
                  <div className="h-6 rounded-lg bg-[#12121c] overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-500"
                      style={{ width: `${barWidth}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Capital Gains Info */}
        <section className="rounded-2xl border border-[#a78bfa]/20 bg-[#a78bfa]/5 p-5">
          <h2 className="text-sm font-semibold text-[#a78bfa] mb-3">Capital Gains Tax Note</h2>
          <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <p>
              Your estimated capital gain is{" "}
              <span
                className="font-semibold"
                style={{ color: results.effectiveGain >= 0 ? "#a78bfa" : "#ef4444" }}
              >
                {results.effectiveGain < 0 ? "−" : ""}${fmt(Math.abs(results.effectiveGain))}
              </span>{" "}
              (net proceeds minus original purchase price).
            </p>
            <p>
              <span className="text-gray-200 font-medium">IRS Primary Residence Exclusion:</span>{" "}
              If you owned and lived in the home for 2 of the last 5 years, you can exclude up to
              $250,000 of gain (single) or $500,000 (married filing jointly) from capital gains tax.
            </p>
            {results.effectiveGain > 500000 && (
              <p className="text-[#f59e0b]">
                Your estimated gain exceeds the $500,000 married exclusion. Consult a tax
                professional about your capital gains tax liability on the excess amount.
              </p>
            )}
            <p className="text-xs text-gray-600">
              This is an estimate only. Actual capital gains may differ based on improvements,
              depreciation recapture, and other factors. Consult a CPA or tax advisor.
            </p>
          </div>
        </section>

        {/* ListingAI CTA */}
        <section className="rounded-2xl border border-[#10b981]/25 bg-[#10b981]/8 p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#10b981]">Are you a real estate agent?</p>
            <p className="text-sm text-gray-400 mt-0.5">
              Write MLS-ready listing descriptions in 30 seconds with ListingAI.
            </p>
          </div>
          <a
            href="/listing-ai"
            className="flex-shrink-0 rounded-lg bg-[#10b981] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#059669] transition-colors whitespace-nowrap"
          >
            Try ListingAI Free →
          </a>
        </section>
      </main>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
          What you need to know about home sale net proceeds and capital gains.
        </p>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-[#1a1a26] overflow-hidden">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1e1e2e] transition-colors"
              >
                <span className="text-sm font-medium text-gray-200 pr-4">{faq.q}</span>
                <svg
                  className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${openFaq === i ? "rotate-180" : ""}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Related Tools */}
      <section className="mx-auto max-w-7xl px-4 py-16 border-t border-white/5">
        <h2 className="text-2xl font-bold text-center mb-2">Related Tools</h2>
        <p className="text-gray-400 text-center mb-10">More free real estate and business tools.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {RELATED_TOOLS.map((tool) => (
            <a
              key={tool.name}
              href={tool.href}
              className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-5 hover:border-[#f59e0b]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(245,158,11,0.08)]"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#f59e0b]/10">
                <svg
                  className="h-5 w-5 text-[#f59e0b]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white group-hover:text-[#f59e0b] transition-colors">
                {tool.name}
              </h3>
              <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
            </a>
          ))}
        </div>
      </section>
    </div>
  );
}
