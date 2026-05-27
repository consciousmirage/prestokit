"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtD(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(n: number, decimals = 2): string {
  return n.toLocaleString("en-US", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

/* ------------------------------------------------------------------ */
/*  Expense row type                                                   */
/* ------------------------------------------------------------------ */

interface ExpenseRow {
  id: string;
  label: string;
  annual: string;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "What is cap rate?",
    a: "Cap rate (capitalization rate) is the ratio of a property's net operating income (NOI) to its current market value. It tells you what annual return you'd earn on the property if you paid all cash (no mortgage). Formula: Cap Rate = NOI / Property Value.",
  },
  {
    q: "What is a good cap rate?",
    a: "It depends on the market. In primary markets like NYC or LA, 4–6% is typical because demand is high and values are inflated. In secondary markets, 6–10% is common. Rural or higher-risk markets may see 10%+. A higher cap rate means more return but often more risk or a less desirable location.",
  },
  {
    q: "What is gross rent multiplier (GRM)?",
    a: "GRM is property value divided by gross annual rent. It gives a rough sense of how many years of gross rent it takes to equal the property price. Lower is generally better. GRM does not account for expenses, so it's a quick screening metric — not a substitute for full NOI analysis.",
  },
  {
    q: "What is cash-on-cash return?",
    a: "Cash-on-cash return measures the annual pre-tax cash flow you receive relative to the actual cash you invested (down payment + closing costs). Unlike cap rate, it accounts for your mortgage payment, making it more relevant when financing is involved. Formula: Annual Cash Flow / Total Cash Invested.",
  },
  {
    q: "What expenses are included in NOI?",
    a: "Net Operating Income = Gross Rental Income minus Vacancy losses minus all Operating Expenses. Operating expenses include property taxes, insurance, maintenance, property management fees, HOA, utilities (if landlord-paid), and reserves for repairs. NOI does NOT include mortgage payments — those are a financing cost, not an operating expense.",
  },
  {
    q: "What is vacancy rate and how does it affect NOI?",
    a: "Vacancy rate is the percentage of time your unit is unoccupied and not generating rent. A 5% vacancy rate means you're budgeting for the unit to be empty about 2.5 weeks per year. Higher vacancy reduces your effective gross income and therefore your NOI and cap rate.",
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
    name: "Home Sale Net Proceeds",
    description: "See exactly what you'll walk away with after selling.",
    href: "/tools/home-sale-net-proceeds-calculator",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
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

export default function CapRateCalculatorPage() {
  const [propertyValue, setPropertyValue] = useState(500000);
  const [grossMonthlyRent, setGrossMonthlyRent] = useState(2800);
  const [vacancyRate, setVacancyRate] = useState(5);
  const [monthlyMortgage, setMonthlyMortgage] = useState(2200);
  const [useMortgage, setUseMortgage] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Itemized expenses
  const [expenses, setExpenses] = useState<ExpenseRow[]>([
    { id: "1", label: "Property Taxes", annual: "4800" },
    { id: "2", label: "Insurance", annual: "1800" },
    { id: "3", label: "Maintenance / Repairs", annual: "2400" },
    { id: "4", label: "Property Management (8%)", annual: "" },
  ]);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#f59e0b]/60 focus:ring-1 focus:ring-[#f59e0b]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  const addExpenseRow = () => {
    setExpenses((prev) => [
      ...prev,
      { id: Date.now().toString(), label: "Other Expense", annual: "0" },
    ]);
  };

  const removeExpenseRow = (id: string) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  const updateExpense = (id: string, field: "label" | "annual", value: string) => {
    setExpenses((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: value } : e))
    );
  };

  const results = useMemo(() => {
    const grossAnnualRent = grossMonthlyRent * 12;
    const vacancyLoss = (grossAnnualRent * vacancyRate) / 100;
    const effectiveGrossIncome = grossAnnualRent - vacancyLoss;

    // Sum itemized expenses — for management row, if blank, auto-calc 8%
    let totalOperatingExpenses = 0;
    expenses.forEach((exp) => {
      if (exp.label.toLowerCase().includes("management") && exp.annual === "") {
        totalOperatingExpenses += effectiveGrossIncome * 0.08;
      } else {
        totalOperatingExpenses += parseFloat(exp.annual) || 0;
      }
    });

    const noi = effectiveGrossIncome - totalOperatingExpenses;
    const capRate = propertyValue > 0 ? (noi / propertyValue) * 100 : 0;
    const grossYield = propertyValue > 0 ? (grossAnnualRent / propertyValue) * 100 : 0;
    const grm = grossAnnualRent > 0 ? propertyValue / grossAnnualRent : 0;

    // Cash-on-cash (assumes 25% down + 2% closing costs as invested cash)
    const annualMortgagePayment = monthlyMortgage * 12;
    const annualCashFlow = noi - annualMortgagePayment;
    const assumedDownPct = 0.25;
    const closingCostAssumption = 0.02;
    const cashInvested = propertyValue * (assumedDownPct + closingCostAssumption);
    const cashOnCash = cashInvested > 0 ? (annualCashFlow / cashInvested) * 100 : 0;

    return {
      grossAnnualRent,
      vacancyLoss,
      effectiveGrossIncome,
      totalOperatingExpenses,
      noi,
      capRate,
      grossYield,
      grm,
      annualMortgagePayment,
      annualCashFlow,
      cashInvested,
      cashOnCash,
    };
  }, [propertyValue, grossMonthlyRent, vacancyRate, expenses, monthlyMortgage]);

  const capRateColor =
    results.capRate >= 8
      ? "#22c55e"
      : results.capRate >= 5
      ? "#f59e0b"
      : results.capRate >= 3
      ? "#f97316"
      : "#ef4444";

  const cashOnCashColor = results.cashOnCash >= 8 ? "#22c55e" : results.cashOnCash >= 4 ? "#f59e0b" : "#ef4444";

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)]">
      {/* Breadcrumb */}
      <nav className="border-b border-white/5 bg-[#0e0e18]">
        <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
          <a href="/" className="hover:text-[#f59e0b] transition">PrestoKit</a>
          <span>/</span>
          <a href="/tools" className="hover:text-[#f59e0b] transition">Tools</a>
          <span>/</span>
          <span className="text-gray-300">Cap Rate Calculator</span>
        </div>
      </nav>

      {/* Header */}
      <header className="mx-auto max-w-4xl px-4 pt-10 pb-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/20 bg-[#f59e0b]/10 px-3 py-1 text-xs font-medium text-[#f59e0b] mb-4">
          Real Estate Tools
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Cap Rate{" "}
          <span className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] bg-clip-text text-transparent">
            Calculator
          </span>
        </h1>
        <p className="mt-2 text-gray-400 max-w-2xl">
          Calculate capitalization rate, gross rent multiplier, NOI, and cash-on-cash return for any
          rental property. Itemized expense inputs with instant live results.
        </p>
      </header>

      <main className="mx-auto max-w-4xl px-4 pb-20 space-y-6">
        {/* Inputs */}
        <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
          <h2 className="text-lg font-semibold mb-4 text-gray-200">Property Details</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            <div>
              <label className={labelCls}>Property Value ($)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                step={5000}
                value={propertyValue}
                onChange={(e) => setPropertyValue(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className={labelCls}>Gross Monthly Rent ($)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                step={50}
                value={grossMonthlyRent}
                onChange={(e) => setGrossMonthlyRent(Math.max(0, Number(e.target.value)))}
              />
            </div>
            <div>
              <label className={labelCls}>Vacancy Rate (%)</label>
              <input
                className={inputCls}
                type="number"
                min={0}
                max={100}
                step={0.5}
                value={vacancyRate}
                onChange={(e) =>
                  setVacancyRate(Math.min(100, Math.max(0, Number(e.target.value))))
                }
              />
              <p className="text-[10px] text-gray-600 mt-1">Default 5% — national average</p>
            </div>
          </div>
        </section>

        {/* Itemized Expenses */}
        <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-200">Annual Operating Expenses</h2>
            <button
              onClick={addExpenseRow}
              className="text-xs font-medium rounded-lg px-3 py-1.5 bg-[#f59e0b]/10 text-[#f59e0b] border border-[#f59e0b]/20 hover:bg-[#f59e0b]/20 transition"
            >
              + Add Expense
            </button>
          </div>
          <div className="space-y-2">
            {expenses.map((exp) => (
              <div key={exp.id} className="flex items-center gap-3">
                <input
                  className="flex-1 rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#f59e0b]/60 focus:ring-1 focus:ring-[#f59e0b]/40 transition"
                  type="text"
                  value={exp.label}
                  onChange={(e) => updateExpense(exp.id, "label", e.target.value)}
                  placeholder="Expense name"
                />
                <input
                  className="w-32 rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#f59e0b]/60 focus:ring-1 focus:ring-[#f59e0b]/40 transition"
                  type="number"
                  min={0}
                  value={exp.annual}
                  onChange={(e) => updateExpense(exp.id, "annual", e.target.value)}
                  placeholder={
                    exp.label.toLowerCase().includes("management") ? "Auto (8%)" : "Annual $"
                  }
                />
                <button
                  onClick={() => removeExpenseRow(exp.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition flex-shrink-0"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-sm border-t border-white/5 pt-3">
            <span className="text-gray-400">Total Annual Expenses</span>
            <span className="font-semibold text-white tabular-nums">
              ${fmt(results.totalOperatingExpenses)}
            </span>
          </div>
        </section>

        {/* Mortgage (optional) */}
        <div>
          <button
            onClick={() => setUseMortgage(!useMortgage)}
            className={`w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-center justify-between ${
              useMortgage
                ? "border-[#f59e0b]/40 bg-[#f59e0b]/5"
                : "border-white/5 bg-[#1a1a26] hover:border-white/10"
            }`}
          >
            <div>
              <span className="text-sm font-semibold text-gray-200">
                Include Mortgage Payment
              </span>
              <p className="text-xs text-gray-500 mt-0.5">
                Enables cash-on-cash return calculation (assumes 25% down + 2% closing)
              </p>
            </div>
            <svg
              className={`w-5 h-5 text-gray-500 transition-transform ${useMortgage ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {useMortgage && (
            <div className="mt-3 rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <div className="max-w-xs">
                <label className={labelCls}>Monthly Mortgage Payment ($)</label>
                <input
                  className={inputCls}
                  type="number"
                  min={0}
                  step={50}
                  value={monthlyMortgage}
                  onChange={(e) => setMonthlyMortgage(Math.max(0, Number(e.target.value)))}
                />
                <p className="text-[10px] text-gray-600 mt-1">Principal + interest + escrow</p>
              </div>
            </div>
          )}
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
            <p className="text-xs text-gray-500 mb-1">Cap Rate</p>
            <p className="text-3xl font-bold tabular-nums" style={{ color: capRateColor }}>
              {fmtPct(results.capRate)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">NOI / Property Value</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
            <p className="text-xs text-gray-500 mb-1">Gross Yield</p>
            <p className="text-3xl font-bold text-[#f59e0b] tabular-nums">
              {fmtPct(results.grossYield)}%
            </p>
            <p className="text-xs text-gray-600 mt-1">Gross rent / value</p>
          </div>
          <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
            <p className="text-xs text-gray-500 mb-1">GRM</p>
            <p className="text-3xl font-bold text-gray-100 tabular-nums">
              {fmtPct(results.grm, 1)}x
            </p>
            <p className="text-xs text-gray-600 mt-1">Gross Rent Multiplier</p>
          </div>
          {useMortgage ? (
            <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <p className="text-xs text-gray-500 mb-1">Cash-on-Cash</p>
              <p className="text-3xl font-bold tabular-nums" style={{ color: cashOnCashColor }}>
                {fmtPct(results.cashOnCash)}%
              </p>
              <p className="text-xs text-gray-600 mt-1">Annual cash flow / cash in</p>
            </div>
          ) : (
            <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5 flex items-center justify-center">
              <p className="text-xs text-gray-600 text-center">
                Enable mortgage above to see cash-on-cash return
              </p>
            </div>
          )}
        </div>

        {/* NOI Waterfall */}
        <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
          <h2 className="text-sm font-medium text-gray-400 mb-4">NOI Breakdown</h2>
          <div className="space-y-3">
            {[
              { label: "Gross Annual Rent", value: results.grossAnnualRent, color: "#f59e0b", deduction: false },
              { label: `Vacancy Loss (${fmtPct(vacancyRate, 1)}%)`, value: results.vacancyLoss, color: "#94a3b8", deduction: true },
              { label: "Effective Gross Income", value: results.effectiveGrossIncome, color: "#d97706", deduction: false },
              { label: "Total Operating Expenses", value: results.totalOperatingExpenses, color: "#ef4444", deduction: true },
              { label: "Net Operating Income (NOI)", value: results.noi, color: results.noi >= 0 ? "#22c55e" : "#ef4444", deduction: false },
            ].map((item) => {
              const maxVal = Math.max(results.grossAnnualRent, 1);
              const barPct = Math.max(1, (Math.abs(item.value) / maxVal) * 100);
              return (
                <div key={item.label}>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span className="flex items-center gap-1">
                      {item.deduction && <span className="text-gray-600">−</span>}
                      {item.label}
                    </span>
                    <span className="font-semibold tabular-nums" style={{ color: item.color }}>
                      {item.deduction ? "−" : ""}${fmt(Math.abs(item.value))}
                    </span>
                  </div>
                  <div className="h-5 rounded-lg bg-[#12121c] overflow-hidden">
                    <div
                      className="h-full rounded-lg transition-all duration-500"
                      style={{ width: `${barPct}%`, backgroundColor: item.color }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {useMortgage && (
            <div className="mt-4 pt-4 border-t border-white/5 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">NOI</span>
                <span className="font-semibold tabular-nums text-[#22c55e]">${fmt(results.noi)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Annual Mortgage</span>
                <span className="font-semibold tabular-nums text-red-400">−${fmt(results.annualMortgagePayment)}</span>
              </div>
              <div className="flex justify-between text-sm border-t border-white/5 pt-2">
                <span className="text-gray-200 font-medium">Annual Cash Flow</span>
                <span
                  className="font-bold tabular-nums text-base"
                  style={{ color: results.annualCashFlow >= 0 ? "#22c55e" : "#ef4444" }}
                >
                  {results.annualCashFlow < 0 ? "−" : ""}${fmt(Math.abs(results.annualCashFlow))}
                </span>
              </div>
            </div>
          )}
        </section>

        {/* Industry Benchmarks */}
        <section className="rounded-2xl border border-[#f59e0b]/15 bg-[#f59e0b]/5 p-5">
          <h2 className="text-sm font-semibold text-[#f59e0b] mb-4">Industry Cap Rate Benchmarks</h2>
          <div className="grid sm:grid-cols-3 gap-3">
            {[
              {
                market: "Primary Markets",
                example: "NYC, LA, SF, Miami",
                range: "4–6%",
                note: "Low cap rate, high appreciation potential, lower risk",
                color: "#3b82f6",
              },
              {
                market: "Secondary Markets",
                example: "Phoenix, Denver, Austin",
                range: "6–10%",
                note: "Balanced return and risk, strong rental demand",
                color: "#f59e0b",
              },
              {
                market: "Rural / High-Risk",
                example: "Rural towns, C-class areas",
                range: "10%+",
                note: "High yield but more vacancy risk and lower appreciation",
                color: "#ef4444",
              },
            ].map((b) => (
              <div
                key={b.market}
                className={`rounded-xl border p-4 ${
                  results.capRate >= parseFloat(b.range.split("–")[0]) &&
                  results.capRate < parseFloat(b.range.split("–")[1] || "100")
                    ? "border-[#f59e0b]/40 bg-[#f59e0b]/10"
                    : "border-white/5 bg-[#12121c]"
                }`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-lg font-bold tabular-nums"
                    style={{ color: b.color }}
                  >
                    {b.range}
                  </span>
                </div>
                <p className="text-xs font-medium text-gray-200">{b.market}</p>
                <p className="text-[10px] text-gray-500 mt-0.5">{b.example}</p>
                <p className="text-[10px] text-gray-600 mt-2 leading-relaxed">{b.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-gray-600">
            Your property cap rate:{" "}
            <span className="font-semibold" style={{ color: capRateColor }}>
              {fmtPct(results.capRate)}%
            </span>{" "}
            — benchmarks are illustrative and vary by asset class, submarket, and current interest rates.
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
          Everything you need to know about cap rate and rental property analysis.
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
