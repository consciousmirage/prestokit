"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function ResultCard({
  label,
  value,
  sub,
  accent = false,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p
        className="text-2xl font-bold tabular-nums"
        style={{ color: accent ? "#f59e0b" : "#e2e8f0" }}
      >
        {value}
      </p>
      <p className="text-xs text-gray-600 mt-1">{sub}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "Who pays real estate commission?",
    a: "Traditionally, the seller pays both the listing agent's and buyer's agent's commission out of the sale proceeds. However, following the 2024 NAR settlement, commission structures have become more flexible. Buyers may now need to negotiate and pay their own agent separately, while sellers still pay the listing agent.",
  },
  {
    q: "What is the average real estate commission rate?",
    a: "The national average real estate commission has historically been around 5–6% of the sale price, typically split between the listing agent and buyer's agent (e.g., 2.5–3% each). After the 2024 NAR rule changes, rates are increasingly negotiable and vary widely by market.",
  },
  {
    q: "Can I negotiate the commission rate?",
    a: "Yes. Commission rates are always negotiable. Many agents will accept lower rates for higher-priced homes or in competitive markets. Discount brokers and flat-fee MLS services offer alternatives to traditional full-service commissions.",
  },
  {
    q: "Does the agent keep the full commission?",
    a: "No. The agent typically splits their commission with their brokerage. For example, if an agent earns 2.75%, they may keep 60–70% of that and pay the rest to their broker, depending on their split agreement.",
  },
  {
    q: "What does seller net proceeds mean?",
    a: "Net proceeds is the amount the seller actually receives after paying agent commissions and closing costs. It does not account for mortgage payoff. If you still have a mortgage, you'll subtract that balance from net proceeds to find your actual cash in hand.",
  },
];

const RELATED_TOOLS = [
  {
    name: "Closing Cost Calculator",
    description: "Estimate buyer and seller closing costs by state.",
    href: "/tools/closing-cost-calculator",
    icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
  },
  {
    name: "Home Sale Net Proceeds",
    description: "See your complete take-home after all deductions.",
    href: "/tools/home-sale-net-proceeds-calculator",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Cap Rate Calculator",
    description: "Evaluate rental property returns and NOI.",
    href: "/tools/cap-rate-calculator",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "ROI Calculator",
    description: "Calculate return on investment for any decision.",
    href: "/tools/roi-calculator",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function RealEstateCommissionPage() {
  const [salePrice, setSalePrice] = useState(500000);
  const [totalCommissionPct, setTotalCommissionPct] = useState(5.5);
  const [listingAgentSplitPct, setListingAgentSplitPct] = useState(50);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const results = useMemo(() => {
    const totalCommission = (salePrice * totalCommissionPct) / 100;
    const listingAgentCommission = (totalCommission * listingAgentSplitPct) / 100;
    const buyersAgentCommission = totalCommission - listingAgentCommission;
    const sellerNetProceeds = salePrice - totalCommission;

    const totalCommissionPctOfSale = salePrice > 0 ? (totalCommission / salePrice) * 100 : 0;
    const listingPctOfSale = salePrice > 0 ? (listingAgentCommission / salePrice) * 100 : 0;
    const buyersPctOfSale = salePrice > 0 ? (buyersAgentCommission / salePrice) * 100 : 0;
    const netPctOfSale = salePrice > 0 ? (sellerNetProceeds / salePrice) * 100 : 0;

    return {
      totalCommission,
      listingAgentCommission,
      buyersAgentCommission,
      sellerNetProceeds,
      totalCommissionPctOfSale,
      listingPctOfSale,
      buyersPctOfSale,
      netPctOfSale,
    };
  }, [salePrice, totalCommissionPct, listingAgentSplitPct]);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#f59e0b]/60 focus:ring-1 focus:ring-[#f59e0b]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  const breakdownItems = [
    {
      label: "Sale Price",
      amount: salePrice,
      pct: 100,
      color: "#f59e0b",
      isTotal: true,
    },
    {
      label: "Listing Agent Commission",
      amount: -results.listingAgentCommission,
      pct: results.listingPctOfSale,
      color: "#ef4444",
      isTotal: false,
    },
    {
      label: "Buyer's Agent Commission",
      amount: -results.buyersAgentCommission,
      pct: results.buyersPctOfSale,
      color: "#f97316",
      isTotal: false,
    },
    {
      label: "Seller Net Proceeds",
      amount: results.sellerNetProceeds,
      pct: results.netPctOfSale,
      color: "#10b981",
      isTotal: true,
    },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Breadcrumb */}
      <nav className="border-b border-white/5 bg-[#0e0e18]">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-[#f59e0b] transition">PrestoKit</a>
          <span>/</span>
          <a href="/tools" className="hover:text-[#f59e0b] transition">Tools</a>
          <span>/</span>
          <span className="text-gray-300">Real Estate Commission Calculator</span>
        </div>
      </nav>

      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 pt-10 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/10 px-3 py-1 text-xs font-medium text-[#f59e0b] mb-4">
          Real Estate Tools
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Real Estate{" "}
          <span className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
            Commission Calculator
          </span>
        </h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Calculate agent commission splits and seller net proceeds instantly. Enter your
          sale price and commission rate to see exactly where every dollar goes.
        </p>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-20 space-y-6">
        {/* Inputs */}
        <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Commission Details</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Sale Price ($)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                step={1000}
                value={salePrice}
                onChange={(e) => setSalePrice(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className={labelCls}>Total Commission (%)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                max={20}
                step={0.1}
                value={totalCommissionPct}
                onChange={(e) =>
                  setTotalCommissionPct(Math.min(20, Math.max(0, Number(e.target.value))))
                }
              />
              <p className="text-[10px] text-gray-600 mt-1">Default 5.5% — national average</p>
            </div>
            <div>
              <label className={labelCls}>Listing Agent Split (%)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                max={100}
                step={1}
                value={listingAgentSplitPct}
                onChange={(e) =>
                  setListingAgentSplitPct(Math.min(100, Math.max(0, Number(e.target.value))))
                }
              />
              <p className="text-[10px] text-gray-600 mt-1">
                Buyer gets {100 - listingAgentSplitPct}%
              </p>
            </div>
          </div>
        </section>

        {/* Result Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <ResultCard
            label="Total Commission"
            value={`$${fmt(results.totalCommission)}`}
            sub={`${fmtPct(results.totalCommissionPctOfSale)}% of sale`}
          />
          <ResultCard
            label="Listing Agent"
            value={`$${fmt(results.listingAgentCommission)}`}
            sub={`${fmtPct(results.listingPctOfSale)}% of sale`}
          />
          <ResultCard
            label="Buyer's Agent"
            value={`$${fmt(results.buyersAgentCommission)}`}
            sub={`${fmtPct(results.buyersPctOfSale)}% of sale`}
          />
          <ResultCard
            label="Seller Net Proceeds"
            value={`$${fmt(results.sellerNetProceeds)}`}
            sub={`${fmtPct(results.netPctOfSale)}% of sale`}
            accent
          />
        </div>

        {/* Breakdown Table */}
        <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
          <h2 className="text-sm font-medium text-gray-400 mb-4">Full Breakdown</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/5">
                  <th className="text-left pb-3 text-xs text-gray-500 font-medium">Item</th>
                  <th className="text-right pb-3 text-xs text-gray-500 font-medium">Amount</th>
                  <th className="text-right pb-3 text-xs text-gray-500 font-medium pr-2">% of Sale</th>
                </tr>
              </thead>
              <tbody>
                {breakdownItems.map((item) => (
                  <tr key={item.label} className="border-b border-white/[0.03]">
                    <td className="py-3 text-gray-300 flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      {item.label}
                    </td>
                    <td
                      className="py-3 text-right font-semibold tabular-nums"
                      style={{ color: item.color }}
                    >
                      {item.amount >= 0 ? "" : "−"}${fmt(Math.abs(item.amount))}
                    </td>
                    <td className="py-3 text-right text-gray-400 tabular-nums pr-2">
                      {fmtPct(item.pct)}%
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Visual bar */}
          <div className="mt-5 space-y-2">
            <div className="text-xs text-gray-500 mb-2">Visual split</div>
            <div className="h-8 rounded-lg bg-[#12121c] overflow-hidden flex">
              <div
                style={{
                  width: `${results.listingPctOfSale}%`,
                  backgroundColor: "#ef4444",
                }}
                className="h-full transition-all duration-500"
                title={`Listing Agent: ${fmtPct(results.listingPctOfSale)}%`}
              />
              <div
                style={{
                  width: `${results.buyersPctOfSale}%`,
                  backgroundColor: "#f97316",
                }}
                className="h-full transition-all duration-500"
                title={`Buyer's Agent: ${fmtPct(results.buyersPctOfSale)}%`}
              />
              <div
                style={{
                  width: `${results.netPctOfSale}%`,
                  backgroundColor: "#10b981",
                }}
                className="h-full transition-all duration-500"
                title={`Seller Net: ${fmtPct(results.netPctOfSale)}%`}
              />
            </div>
            <div className="flex items-center gap-4 text-[10px] text-gray-500 flex-wrap">
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-4 rounded-sm bg-[#ef4444]" /> Listing Agent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-4 rounded-sm bg-[#f97316]" /> Buyer&apos;s Agent
              </span>
              <span className="flex items-center gap-1.5">
                <span className="inline-block h-2 w-4 rounded-sm bg-[#10b981]" /> Seller Net
              </span>
            </div>
          </div>
        </section>

        {/* Who Pays Commission info */}
        <section className="rounded-2xl border border-[#f59e0b]/15 bg-[#f59e0b]/5 p-5">
          <h2 className="text-sm font-semibold text-[#f59e0b] mb-3">Who Pays Commission?</h2>
          <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <p>
              <span className="text-gray-200 font-medium">Traditionally:</span> The seller pays
              both the listing agent and buyer&apos;s agent commission from sale proceeds. This amount
              is subtracted before the seller receives their net check.
            </p>
            <p>
              <span className="text-gray-200 font-medium">Post-2024 NAR settlement:</span> Buyers
              must now negotiate and sign a buyer-broker agreement before touring homes. Sellers are
              no longer required to offer buyer-side compensation, though many still do to attract
              offers.
            </p>
            <p>
              <span className="text-gray-200 font-medium">The agent&apos;s cut:</span> The commission
              listed here goes to the agent&apos;s brokerage. Individual agents typically keep 50–80%
              of their side, depending on their brokerage split agreement.
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

      {/* FAQ Section */}
      <section className="mx-auto max-w-3xl px-4 py-16">
        <h2 className="text-2xl font-bold text-center mb-2">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
          Everything you need to know about real estate commissions.
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
        <p className="text-gray-400 text-center mb-10">
          More free real estate and business tools.
        </p>
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
