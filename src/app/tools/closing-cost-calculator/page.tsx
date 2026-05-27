"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type PartyView = "buyer" | "seller";
type LoanType = "conventional" | "fha" | "va";

interface StateData {
  label: string;
  transferTaxPct: number;
}

const STATES: Record<string, StateData> = {
  CA: { label: "California", transferTaxPct: 0.11 },
  FL: { label: "Florida", transferTaxPct: 0.7 },
  TX: { label: "Texas", transferTaxPct: 0 },
  NY: { label: "New York", transferTaxPct: 0.4 },
  AZ: { label: "Arizona", transferTaxPct: 0 },
  CO: { label: "Colorado", transferTaxPct: 0.01 },
  GA: { label: "Georgia", transferTaxPct: 0.1 },
  IL: { label: "Illinois", transferTaxPct: 0.1 },
  NV: { label: "Nevada", transferTaxPct: 0.51 },
  WA: { label: "Washington", transferTaxPct: 1.28 },
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtD(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "How much are closing costs for a buyer?",
    a: "Buyer closing costs typically range from 2% to 5% of the loan amount. On a $400,000 home with a $320,000 loan, expect to pay roughly $6,400 to $16,000 at closing. The exact amount depends on your state, lender, loan type, and the specific terms of your purchase.",
  },
  {
    q: "How much are closing costs for a seller?",
    a: "Seller closing costs typically range from 6% to 10% of the sale price, with agent commissions being the largest portion (usually 5–6%). Other seller costs include transfer taxes, title fees, attorney fees, and prorated property taxes.",
  },
  {
    q: "What states have the highest transfer taxes?",
    a: "Washington state has one of the highest rates at 1.28%. Florida charges 0.7% and Nevada 0.51%. Texas and Arizona have no state-level transfer tax, though local municipalities may add small fees.",
  },
  {
    q: "Can closing costs be rolled into the loan?",
    a: "In most cases, no — closing costs must be paid in cash at closing. However, some loan programs allow sellers to contribute toward buyer closing costs (seller concessions), and certain loan types allow rolling specific fees into the loan balance.",
  },
  {
    q: "What is title insurance and do I need it?",
    a: "Title insurance protects you against claims or disputes over property ownership. Lender's title insurance is required by most mortgage lenders. Owner's title insurance is optional but highly recommended — it protects you if a prior lien or ownership dispute surfaces after purchase.",
  },
];

const RELATED_TOOLS = [
  {
    name: "Real Estate Commission Calculator",
    description: "Calculate listing agent and buyer's agent split.",
    href: "/tools/real-estate-commission-calculator",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Home Sale Net Proceeds",
    description: "See exactly what you'll walk away with after selling.",
    href: "/tools/home-sale-net-proceeds-calculator",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Cap Rate Calculator",
    description: "Calculate NOI, cap rate, and cash-on-cash return.",
    href: "/tools/cap-rate-calculator",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
  },
  {
    name: "ROI Calculator",
    description: "Calculate return on any investment decision.",
    href: "/tools/roi-calculator",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function ClosingCostPage() {
  const [view, setView] = useState<PartyView>("buyer");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Buyer state
  const [buyerHomePrice, setBuyerHomePrice] = useState(450000);
  const [buyerLoanAmount, setBuyerLoanAmount] = useState(360000);
  const [buyerState, setBuyerState] = useState("CA");
  const [buyerLoanType, setBuyerLoanType] = useState<LoanType>("conventional");

  // Seller state
  const [sellerSalePrice, setSellerSalePrice] = useState(450000);
  const [sellerMortgagePayoff, setSellerMortgagePayoff] = useState(200000);
  const [sellerState, setSellerState] = useState("CA");
  const [sellerCommissionPct, setSellerCommissionPct] = useState(5.5);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#f59e0b]/60 focus:ring-1 focus:ring-[#f59e0b]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  /* Buyer Calculations */
  const buyerResults = useMemo(() => {
    const price = buyerHomePrice;
    const loan = buyerLoanAmount;

    // Loan origination: 0.5-1% of loan amount (use 0.75% midpoint, FHA slightly higher)
    const originationRate = buyerLoanType === "fha" ? 0.01 : 0.0075;
    const loanOrigination = loan * originationRate;

    // Appraisal
    const appraisal = price < 300000 ? 400 : price < 600000 ? 500 : 600;

    // Title insurance scales with price
    const titleInsurance =
      price < 200000 ? 500 : price < 400000 ? 900 : price < 700000 ? 1400 : 2000;

    // Escrow / attorney
    const escrow = price < 300000 ? 800 : 1000;

    // Prepaid interest (assume 15 days avg, current rate ~7%)
    const dailyInterest = (loan * 0.07) / 365;
    const prepaidInterest = dailyInterest * 15;

    // Recording fees
    const recordingFees = 175;

    // FHA MIP upfront
    const fhaMIP = buyerLoanType === "fha" ? loan * 0.0175 : 0;

    // VA funding fee (first use, 0% down equivalent ~2.15%)
    const vaFundingFee = buyerLoanType === "va" ? loan * 0.0215 : 0;

    const subtotal =
      loanOrigination +
      appraisal +
      titleInsurance +
      escrow +
      prepaidInterest +
      recordingFees +
      fhaMIP +
      vaFundingFee;

    const totalPct = price > 0 ? (subtotal / price) * 100 : 0;

    return {
      loanOrigination,
      appraisal,
      titleInsurance,
      escrow,
      prepaidInterest,
      recordingFees,
      fhaMIP,
      vaFundingFee,
      subtotal,
      totalPct,
    };
  }, [buyerHomePrice, buyerLoanAmount, buyerLoanType]);

  /* Seller Calculations */
  const sellerResults = useMemo(() => {
    const price = sellerSalePrice;
    const stateData = STATES[sellerState];

    const agentCommission = (price * sellerCommissionPct) / 100;
    const transferTax = (price * stateData.transferTaxPct) / 100;
    const titleFees = price < 300000 ? 700 : price < 600000 ? 1000 : 1400;
    const escrow = 900;
    const attorneyFee = 500;

    const totalCosts =
      agentCommission + transferTax + titleFees + escrow + attorneyFee + sellerMortgagePayoff;
    const netProceeds = price - (agentCommission + transferTax + titleFees + escrow + attorneyFee);
    const cashAfterPayoff = netProceeds - sellerMortgagePayoff;
    const costPct = price > 0 ? ((totalCosts - sellerMortgagePayoff) / price) * 100 : 0;

    return {
      agentCommission,
      transferTax,
      titleFees,
      escrow,
      attorneyFee,
      totalCosts,
      netProceeds,
      cashAfterPayoff,
      costPct,
      stateTransferTaxRate: stateData.transferTaxPct,
    };
  }, [sellerSalePrice, sellerMortgagePayoff, sellerState, sellerCommissionPct]);

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Breadcrumb */}
      <nav className="border-b border-white/5 bg-[#0e0e18]">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-[#f59e0b] transition">PrestoKit</a>
          <span>/</span>
          <a href="/tools" className="hover:text-[#f59e0b] transition">Tools</a>
          <span>/</span>
          <span className="text-gray-300">Closing Cost Calculator</span>
        </div>
      </nav>

      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 pt-10 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/10 px-3 py-1 text-xs font-medium text-[#f59e0b] mb-4">
          Real Estate Tools
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Closing{" "}
          <span className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
            Cost Calculator
          </span>
        </h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Estimate closing costs for buyers and sellers. State-specific transfer taxes, loan
          type adjustments, and itemized breakdowns — free, no signup required.
        </p>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-20 space-y-6">
        {/* View Toggle */}
        <div className="grid grid-cols-2 gap-3">
          {(["buyer", "seller"] as PartyView[]).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              className={`rounded-xl border p-4 text-left transition-all duration-200 ${
                view === v
                  ? "border-[#f59e0b]/60 bg-[#f59e0b]/10 shadow-[0_0_20px_rgba(245,158,11,0.12)]"
                  : "border-white/5 bg-[#1a1a26] hover:border-white/10"
              }`}
            >
              <span
                className={`text-sm font-semibold ${view === v ? "text-[#f59e0b]" : "text-gray-200"}`}
              >
                {v === "buyer" ? "Buyer Closing Costs" : "Seller Closing Costs"}
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                {v === "buyer"
                  ? "Estimate what you'll pay at closing"
                  : "Estimate your costs and net proceeds"}
              </p>
            </button>
          ))}
        </div>

        {/* ==================== BUYER VIEW ==================== */}
        {view === "buyer" && (
          <>
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Buyer Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Home Price ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step={5000}
                    value={buyerHomePrice}
                    onChange={(e) => setBuyerHomePrice(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Loan Amount ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step={5000}
                    value={buyerLoanAmount}
                    onChange={(e) => setBuyerLoanAmount(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className={labelCls}>State</label>
                  <select
                    className={inputCls}
                    value={buyerState}
                    onChange={(e) => setBuyerState(e.target.value)}
                  >
                    {Object.entries(STATES).map(([code, data]) => (
                      <option key={code} value={code}>
                        {data.label} ({code})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Loan Type</label>
                  <select
                    className={inputCls}
                    value={buyerLoanType}
                    onChange={(e) => setBuyerLoanType(e.target.value as LoanType)}
                  >
                    <option value="conventional">Conventional</option>
                    <option value="fha">FHA</option>
                    <option value="va">VA</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Buyer Results */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label: "Loan Origination", value: buyerResults.loanOrigination },
                { label: "Appraisal Fee", value: buyerResults.appraisal },
                { label: "Title Insurance", value: buyerResults.titleInsurance },
                { label: "Escrow / Attorney", value: buyerResults.escrow },
                { label: "Prepaid Interest (15 days)", value: buyerResults.prepaidInterest },
                { label: "Recording Fees", value: buyerResults.recordingFees },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-white/5 bg-[#1a1a26] p-4">
                  <p className="text-xs text-gray-500 mb-1">{item.label}</p>
                  <p className="text-lg font-bold text-gray-100 tabular-nums">
                    ${fmt(item.value)}
                  </p>
                </div>
              ))}
            </div>

            {buyerLoanType === "fha" && (
              <div className="rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 px-4 py-3 text-sm text-gray-400">
                <span className="text-[#f59e0b] font-medium">FHA Upfront MIP:</span>{" "}
                ${fmt(buyerResults.fhaMIP)} (1.75% of loan, usually rolled into loan balance)
              </div>
            )}
            {buyerLoanType === "va" && (
              <div className="rounded-xl border border-[#f59e0b]/20 bg-[#f59e0b]/5 px-4 py-3 text-sm text-gray-400">
                <span className="text-[#f59e0b] font-medium">VA Funding Fee:</span>{" "}
                ${fmt(buyerResults.vaFundingFee)} (2.15% for first use, can be financed)
              </div>
            )}

            {/* Buyer Total */}
            <div className="rounded-2xl border border-[#f59e0b]/30 bg-[#f59e0b]/10 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div>
                <p className="text-xs text-gray-400">Total Estimated Closing Costs</p>
                <p className="text-3xl font-bold text-[#f59e0b] tabular-nums mt-1">
                  ${fmt(buyerResults.subtotal)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {fmtPct(buyerResults.totalPct)}% of home price · typical range is 2–5%
                </p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Down Payment + Closing</p>
                <p className="text-xl font-semibold text-white tabular-nums mt-1">
                  ${fmt(buyerHomePrice - buyerLoanAmount + buyerResults.subtotal)}
                </p>
                <p className="text-xs text-gray-600">Total cash needed at closing</p>
              </div>
            </div>
          </>
        )}

        {/* ==================== SELLER VIEW ==================== */}
        {view === "seller" && (
          <>
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Seller Details</h2>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Sale Price ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step={5000}
                    value={sellerSalePrice}
                    onChange={(e) => setSellerSalePrice(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className={labelCls}>Mortgage Payoff Amount ($)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    step={1000}
                    value={sellerMortgagePayoff}
                    onChange={(e) => setSellerMortgagePayoff(Math.max(0, Number(e.target.value)))}
                  />
                </div>
                <div>
                  <label className={labelCls}>State</label>
                  <select
                    className={inputCls}
                    value={sellerState}
                    onChange={(e) => setSellerState(e.target.value)}
                  >
                    {Object.entries(STATES).map(([code, data]) => (
                      <option key={code} value={code}>
                        {data.label} ({code}) — {data.transferTaxPct}% transfer tax
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className={labelCls}>Agent Commission (%)</label>
                  <input
                    className={inputCls}
                    type="number"
                    min={0}
                    max={20}
                    step={0.1}
                    value={sellerCommissionPct}
                    onChange={(e) =>
                      setSellerCommissionPct(Math.min(20, Math.max(0, Number(e.target.value))))
                    }
                  />
                </div>
              </div>
            </section>

            {/* Seller Cost Breakdown */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-sm font-medium text-gray-400 mb-4">Cost Breakdown</h2>
              <div className="space-y-3">
                {[
                  {
                    label: "Agent Commission",
                    value: sellerResults.agentCommission,
                    sub: `${fmtPct(sellerCommissionPct)}% of sale`,
                    color: "#ef4444",
                  },
                  {
                    label: `Transfer Tax (${STATES[sellerState].label}: ${STATES[sellerState].transferTaxPct}%)`,
                    value: sellerResults.transferTax,
                    sub:
                      STATES[sellerState].transferTaxPct === 0
                        ? "No state transfer tax"
                        : `${fmtPct(STATES[sellerState].transferTaxPct)}% of sale`,
                    color: "#f97316",
                  },
                  { label: "Title Fees", value: sellerResults.titleFees, sub: "Estimated", color: "#eab308" },
                  { label: "Escrow Fee", value: sellerResults.escrow, sub: "Estimated", color: "#a855f7" },
                  { label: "Attorney / Closing Fee", value: sellerResults.attorneyFee, sub: "Estimated", color: "#6366f1" },
                  {
                    label: "Mortgage Payoff",
                    value: sellerMortgagePayoff,
                    sub: "Outstanding balance",
                    color: "#64748b",
                  },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-2 border-b border-white/[0.04]">
                    <div className="flex items-center gap-2">
                      <span
                        className="inline-block w-2.5 h-2.5 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />
                      <div>
                        <p className="text-sm text-gray-200">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.sub}</p>
                      </div>
                    </div>
                    <p className="text-sm font-semibold tabular-nums" style={{ color: item.color }}>
                      ${fmt(item.value)}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Seller Net Summary */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <p className="text-xs text-gray-500 mb-1">Net Proceeds (before mortgage payoff)</p>
                <p className="text-2xl font-bold text-[#f59e0b] tabular-nums">
                  ${fmt(sellerResults.netProceeds)}
                </p>
                <p className="text-xs text-gray-600 mt-1">Sale price minus all selling costs</p>
              </div>
              <div className="rounded-2xl border border-[#10b981]/20 bg-[#10b981]/5 p-5">
                <p className="text-xs text-gray-500 mb-1">Cash in Hand (after mortgage payoff)</p>
                <p
                  className="text-2xl font-bold tabular-nums"
                  style={{ color: sellerResults.cashAfterPayoff >= 0 ? "#10b981" : "#ef4444" }}
                >
                  {sellerResults.cashAfterPayoff < 0 ? "−" : ""}$
                  {fmt(Math.abs(sellerResults.cashAfterPayoff))}
                </p>
                <p className="text-xs text-gray-600 mt-1">
                  {sellerResults.cashAfterPayoff < 0
                    ? "Short sale — you owe more than you net"
                    : "What you walk away with"}
                </p>
              </div>
            </div>
          </>
        )}

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
          Common questions about closing costs for buyers and sellers.
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
