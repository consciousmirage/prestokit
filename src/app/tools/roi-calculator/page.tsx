"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "What is ROI and how is it calculated?",
    a: "ROI (Return on Investment) measures the profitability of an investment as a percentage. The basic formula is: ROI = ((Net Profit) / Investment Cost) x 100. For example, if you invest $10,000 and earn $15,000 in return, your net profit is $5,000 and your ROI is 50%. A positive ROI means you made money; a negative ROI means you lost money.",
  },
  {
    q: "What is the difference between ROI and ROAS?",
    a: "ROI (Return on Investment) measures overall profitability including all costs, while ROAS (Return on Ad Spend) specifically measures revenue generated per dollar of advertising spend. ROAS = Revenue / Ad Spend. For example, if you spend $1,000 on ads and generate $5,000 in revenue, your ROAS is 5x (or 500%). ROAS does not account for cost of goods or other expenses, making it a top-line metric rather than a profitability metric.",
  },
  {
    q: "How does compound growth work in the investment calculator?",
    a: "Compound growth means your returns generate their own returns over time. If you invest $10,000 with a 10% annual return, after year 1 you have $11,000. In year 2, you earn 10% on $11,000 (not just the original $10,000), giving you $12,100. This snowball effect is why compound growth is so powerful over long periods. Our calculator shows you year-by-year growth including the compound effect.",
  },
  {
    q: "What is a good ROI percentage?",
    a: "A \"good\" ROI depends on the context. For stock market investments, the historical average annual return of the S&P 500 is about 10%. For marketing campaigns, most businesses target a minimum 5:1 ROAS (500% return). For business projects, anything above your cost of capital (typically 8-15%) is generally considered positive. The key is comparing your ROI against your alternatives and industry benchmarks.",
  },
  {
    q: "Is the ROI calculator free to use?",
    a: "Yes, the PrestoKit ROI calculator is 100% free with no signup required. It runs entirely in your browser, so your financial data never leaves your device. Use the Simple ROI, Investment Over Time, or Marketing ROI modes as many times as you need.",
  },
  {
    q: "Can I compare two investments side by side?",
    a: "Yes! The Investment Over Time mode includes a comparison feature. Enter the details for two different investments — including initial amount, annual return rate, and time period — and the calculator will display both investments side by side with a visual bar chart showing growth over time. This makes it easy to see which investment performs better.",
  },
];

const RELATED_TOOLS = [
  {
    name: "Profit Margin Calculator",
    description: "Calculate profit margins, markups, and break-even points.",
    href: "/tools/profit-margin-calculator",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "Percentage Calculator",
    description: "Calculate percentages, changes, increases, and decreases.",
    href: "/tools/percentage-calculator",
    icon: "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z",
  },
  {
    name: "Mortgage Calculator",
    description: "Calculate monthly payments, total interest, and amortization.",
    href: "/tools/mortgage-calculator",
    icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6",
  },
  {
    name: "Salary Calculator",
    description: "Convert between salary, hourly, daily, and monthly rates.",
    href: "/tools/salary-calculator",
    icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z",
  },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Mode = "simple" | "investment" | "marketing";

const MODES: { key: Mode; label: string; description: string }[] = [
  { key: "simple", label: "Simple ROI", description: "Investment in, return out" },
  { key: "investment", label: "Investment Over Time", description: "Compound growth year by year" },
  { key: "marketing", label: "Marketing ROI", description: "Ad spend, revenue & ROAS" },
];

/* ------------------------------------------------------------------ */
/*  Formatting helpers                                                 */
/* ------------------------------------------------------------------ */

function fmt(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

function fmtPct(n: number): string {
  return n.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
}

function fmtInt(n: number): string {
  return Math.round(n).toLocaleString("en-US");
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function RoiCalculatorPage() {
  const [mode, setMode] = useState<Mode>("simple");

  // Simple ROI
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [returnAmount, setReturnAmount] = useState(15000);

  // Investment Over Time
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [years, setYears] = useState(10);
  const [showCompare, setShowCompare] = useState(false);
  const [compInitial, setCompInitial] = useState(10000);
  const [compReturn, setCompReturn] = useState(7);
  const [compYears, setCompYears] = useState(10);

  // Marketing ROI
  const [adSpend, setAdSpend] = useState(5000);
  const [revenue, setRevenue] = useState(25000);
  const [cogs, setCogs] = useState(8000);
  const [conversions, setConversions] = useState(50);

  /* ------ Simple ROI Calc ------ */
  const simpleROI = useMemo(() => {
    const profit = returnAmount - investmentAmount;
    const roi = investmentAmount > 0 ? (profit / investmentAmount) * 100 : 0;
    return { profit, roi };
  }, [investmentAmount, returnAmount]);

  /* ------ Investment Over Time Calc ------ */
  const investmentData = useMemo(() => {
    const rows: { year: number; value: number; compValue?: number }[] = [];
    let val = initialInvestment;
    let compVal = compInitial;
    const maxYears = Math.max(years, showCompare ? compYears : 0);

    for (let i = 0; i <= maxYears; i++) {
      const row: { year: number; value: number; compValue?: number } = {
        year: i,
        value: i <= years ? val : 0,
      };
      if (showCompare) {
        row.compValue = i <= compYears ? compVal : 0;
      }
      rows.push(row);
      if (i < years) val *= 1 + annualReturn / 100;
      if (showCompare && i < compYears) compVal *= 1 + compReturn / 100;
    }

    const finalValue = initialInvestment * Math.pow(1 + annualReturn / 100, years);
    const totalProfit = finalValue - initialInvestment;
    const totalROI = initialInvestment > 0 ? (totalProfit / initialInvestment) * 100 : 0;

    let compFinalValue = 0;
    let compTotalProfit = 0;
    let compTotalROI = 0;
    if (showCompare) {
      compFinalValue = compInitial * Math.pow(1 + compReturn / 100, compYears);
      compTotalProfit = compFinalValue - compInitial;
      compTotalROI = compInitial > 0 ? (compTotalProfit / compInitial) * 100 : 0;
    }

    return { rows, finalValue, totalProfit, totalROI, compFinalValue, compTotalProfit, compTotalROI };
  }, [initialInvestment, annualReturn, years, showCompare, compInitial, compReturn, compYears]);

  /* ------ Marketing ROI Calc ------ */
  const marketingData = useMemo(() => {
    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - adSpend;
    const roi = adSpend > 0 ? (netProfit / adSpend) * 100 : 0;
    const roas = adSpend > 0 ? revenue / adSpend : 0;
    const cpa = conversions > 0 ? adSpend / conversions : 0;
    const revenuePerConversion = conversions > 0 ? revenue / conversions : 0;
    return { grossProfit, netProfit, roi, roas, cpa, revenuePerConversion };
  }, [adSpend, revenue, cogs, conversions]);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#7c6cf0]/60 focus:ring-1 focus:ring-[#7c6cf0]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  /* ------ Max bar value for chart ------ */
  const maxBarValue = useMemo(() => {
    if (investmentData.rows.length === 0) return 1;
    let max = 0;
    for (const row of investmentData.rows) {
      if (row.value > max) max = row.value;
      if (row.compValue && row.compValue > max) max = row.compValue;
    }
    return max || 1;
  }, [investmentData.rows]);

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)]">
        {/* Breadcrumb */}
        <nav className="border-b border-white/5 bg-[#0e0e18]">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#7c6cf0] transition">PrestoKit</a>
            <span>/</span>
            <a href="/tools" className="hover:text-[#7c6cf0] transition">Tools</a>
            <span>/</span>
            <span className="text-gray-300">ROI Calculator</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mx-auto max-w-4xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            ROI Calculator
          </h1>
          <p className="mt-2 text-gray-400 max-w-2xl">
            Calculate return on investment for any business decision. Simple ROI, compound investment growth, and marketing ROI with ROAS. Visual charts and comparison mode included.
          </p>
        </header>

        <main className="mx-auto max-w-4xl px-4 pb-20">
          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`text-left rounded-xl border p-4 transition-all duration-200 ${
                  mode === m.key
                    ? "border-[#7c6cf0]/60 bg-[#7c6cf0]/10 shadow-[0_0_20px_rgba(124,108,240,0.1)]"
                    : "border-white/5 bg-[#1a1a26] hover:border-white/10"
                }`}
              >
                <span className={`text-sm font-semibold ${mode === m.key ? "text-[#7c6cf0]" : "text-gray-200"}`}>
                  {m.label}
                </span>
                <p className="text-xs text-gray-500 mt-0.5">{m.description}</p>
              </button>
            ))}
          </div>

          {/* ==================== SIMPLE ROI ==================== */}
          {mode === "simple" && (
            <div className="space-y-6">
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <h2 className="text-lg font-semibold mb-4 text-gray-200">Simple ROI</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Investment Amount ($)</label>
                    <input className={inputCls} type="number" min={0} value={investmentAmount} onChange={(e) => setInvestmentAmount(Math.max(0, Number(e.target.value)))} />
                  </div>
                  <div>
                    <label className={labelCls}>Return Amount ($)</label>
                    <input className={inputCls} type="number" min={0} value={returnAmount} onChange={(e) => setReturnAmount(Math.max(0, Number(e.target.value)))} />
                  </div>
                </div>
              </section>

              {/* Results */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ResultCard
                  label="ROI"
                  value={`${fmtPct(simpleROI.roi)}%`}
                  color={simpleROI.roi >= 0 ? "#00e676" : "#ff5252"}
                  sub={simpleROI.roi >= 0 ? "Positive return" : "Negative return"}
                />
                <ResultCard
                  label="Net Profit"
                  value={`$${fmt(simpleROI.profit)}`}
                  color={simpleROI.profit >= 0 ? "#00e676" : "#ff5252"}
                  sub={simpleROI.profit >= 0 ? "Gain" : "Loss"}
                />
                <ResultCard
                  label="Return Amount"
                  value={`$${fmt(returnAmount)}`}
                  color="#7c6cf0"
                  sub={`on $${fmt(investmentAmount)} invested`}
                />
              </div>

              {/* Visual Bar */}
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Investment vs Return</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Investment</span>
                      <span>${fmt(investmentAmount)}</span>
                    </div>
                    <div className="h-8 rounded-lg bg-[#12121c] overflow-hidden">
                      <div
                        className="h-full rounded-lg transition-all duration-500"
                        style={{
                          width: `${Math.min(100, returnAmount > 0 ? (investmentAmount / Math.max(investmentAmount, returnAmount)) * 100 : 100)}%`,
                          backgroundColor: "#7c6cf0",
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Return</span>
                      <span>${fmt(returnAmount)}</span>
                    </div>
                    <div className="h-8 rounded-lg bg-[#12121c] overflow-hidden">
                      <div
                        className="h-full rounded-lg transition-all duration-500"
                        style={{
                          width: `${Math.min(100, investmentAmount > 0 ? (returnAmount / Math.max(investmentAmount, returnAmount)) * 100 : 100)}%`,
                          backgroundColor: simpleROI.profit >= 0 ? "#00e676" : "#ff5252",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* ==================== INVESTMENT OVER TIME ==================== */}
          {mode === "investment" && (
            <div className="space-y-6">
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-200">Investment A</h2>
                  <button
                    onClick={() => setShowCompare(!showCompare)}
                    className={`text-xs font-medium rounded-lg px-3 py-1.5 transition ${
                      showCompare
                        ? "bg-[#7c6cf0]/20 text-[#7c6cf0] border border-[#7c6cf0]/40"
                        : "bg-[#12121c] text-gray-400 border border-white/5 hover:text-white"
                    }`}
                  >
                    {showCompare ? "Hide Comparison" : "Compare Two Investments"}
                  </button>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelCls}>Initial Investment ($)</label>
                    <input className={inputCls} type="number" min={0} value={initialInvestment} onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))} />
                  </div>
                  <div>
                    <label className={labelCls}>Annual Return (%)</label>
                    <input className={inputCls} type="number" step="0.1" value={annualReturn} onChange={(e) => setAnnualReturn(Number(e.target.value))} />
                  </div>
                  <div>
                    <label className={labelCls}>Number of Years</label>
                    <input className={inputCls} type="number" min={1} max={50} value={years} onChange={(e) => setYears(Math.max(1, Math.min(50, Number(e.target.value))))} />
                  </div>
                </div>
              </section>

              {/* Compare Investment B */}
              {showCompare && (
                <section className="rounded-2xl border border-[#ff9100]/20 bg-[#1a1a26] p-5">
                  <h2 className="text-lg font-semibold mb-4 text-[#ff9100]">Investment B</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelCls}>Initial Investment ($)</label>
                      <input className={inputCls} type="number" min={0} value={compInitial} onChange={(e) => setCompInitial(Math.max(0, Number(e.target.value)))} />
                    </div>
                    <div>
                      <label className={labelCls}>Annual Return (%)</label>
                      <input className={inputCls} type="number" step="0.1" value={compReturn} onChange={(e) => setCompReturn(Number(e.target.value))} />
                    </div>
                    <div>
                      <label className={labelCls}>Number of Years</label>
                      <input className={inputCls} type="number" min={1} max={50} value={compYears} onChange={(e) => setCompYears(Math.max(1, Math.min(50, Number(e.target.value))))} />
                    </div>
                  </div>
                </section>
              )}

              {/* Summary Cards */}
              <div className={`grid gap-4 ${showCompare ? "grid-cols-1 sm:grid-cols-2" : "grid-cols-1 sm:grid-cols-3"}`}>
                {showCompare ? (
                  <>
                    <div className="rounded-2xl border border-[#7c6cf0]/20 bg-[#1a1a26] p-5">
                      <h3 className="text-sm font-medium text-[#7c6cf0] mb-3">Investment A</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-gray-400">Final Value</span><span className="text-white font-semibold">${fmtInt(investmentData.finalValue)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-400">Total Profit</span><span className="font-semibold" style={{ color: investmentData.totalProfit >= 0 ? "#00e676" : "#ff5252" }}>${fmtInt(investmentData.totalProfit)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-400">Total ROI</span><span className="font-semibold" style={{ color: investmentData.totalROI >= 0 ? "#00e676" : "#ff5252" }}>{fmtPct(investmentData.totalROI)}%</span></div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[#ff9100]/20 bg-[#1a1a26] p-5">
                      <h3 className="text-sm font-medium text-[#ff9100] mb-3">Investment B</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-gray-400">Final Value</span><span className="text-white font-semibold">${fmtInt(investmentData.compFinalValue)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-400">Total Profit</span><span className="font-semibold" style={{ color: investmentData.compTotalProfit >= 0 ? "#00e676" : "#ff5252" }}>${fmtInt(investmentData.compTotalProfit)}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-gray-400">Total ROI</span><span className="font-semibold" style={{ color: investmentData.compTotalROI >= 0 ? "#00e676" : "#ff5252" }}>{fmtPct(investmentData.compTotalROI)}%</span></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ResultCard label="Final Value" value={`$${fmtInt(investmentData.finalValue)}`} color="#7c6cf0" sub={`After ${years} years`} />
                    <ResultCard label="Total Profit" value={`$${fmtInt(investmentData.totalProfit)}`} color={investmentData.totalProfit >= 0 ? "#00e676" : "#ff5252"} sub="Net gain" />
                    <ResultCard label="Total ROI" value={`${fmtPct(investmentData.totalROI)}%`} color={investmentData.totalROI >= 0 ? "#00e676" : "#ff5252"} sub={`${fmtPct(annualReturn)}% annual`} />
                  </>
                )}
              </div>

              {/* Growth Chart (CSS bars) */}
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <h3 className="text-sm font-medium text-gray-400 mb-4">
                  Growth Over Time
                  {showCompare && (
                    <span className="ml-3">
                      <span className="inline-block h-2 w-6 rounded-sm bg-[#7c6cf0] mr-1 align-middle" /> A
                      <span className="inline-block h-2 w-6 rounded-sm bg-[#ff9100] mr-1 ml-3 align-middle" /> B
                    </span>
                  )}
                </h3>
                <div className="space-y-1.5 max-h-[400px] overflow-y-auto">
                  {investmentData.rows.map((row) => (
                    <div key={row.year} className="flex items-center gap-3">
                      <span className="w-12 text-right text-xs text-gray-500 tabular-nums shrink-0">
                        Yr {row.year}
                      </span>
                      <div className="flex-1 flex flex-col gap-0.5">
                        {row.value > 0 && (
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 rounded-sm transition-all duration-500"
                              style={{
                                width: `${Math.max(2, (row.value / maxBarValue) * 100)}%`,
                                backgroundColor: "#7c6cf0",
                              }}
                            />
                            <span className="text-[10px] text-gray-500 tabular-nums whitespace-nowrap">${fmtInt(row.value)}</span>
                          </div>
                        )}
                        {showCompare && row.compValue !== undefined && row.compValue > 0 && (
                          <div className="flex items-center gap-2">
                            <div
                              className="h-4 rounded-sm transition-all duration-500"
                              style={{
                                width: `${Math.max(2, (row.compValue / maxBarValue) * 100)}%`,
                                backgroundColor: "#ff9100",
                              }}
                            />
                            <span className="text-[10px] text-gray-500 tabular-nums whitespace-nowrap">${fmtInt(row.compValue)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* Year-by-Year Table */}
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5 overflow-x-auto">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Year-by-Year Breakdown</h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left pb-2 text-gray-400 font-medium">Year</th>
                      <th className="text-right pb-2 text-gray-400 font-medium">Value (A)</th>
                      {showCompare && <th className="text-right pb-2 text-gray-400 font-medium">Value (B)</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {investmentData.rows.map((row) => (
                      <tr key={row.year} className="border-b border-white/[0.02]">
                        <td className="py-1.5 text-gray-300">{row.year}</td>
                        <td className="py-1.5 text-right text-gray-200 tabular-nums">{row.value > 0 ? `$${fmtInt(row.value)}` : "-"}</td>
                        {showCompare && (
                          <td className="py-1.5 text-right text-gray-200 tabular-nums">{row.compValue && row.compValue > 0 ? `$${fmtInt(row.compValue)}` : "-"}</td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>
            </div>
          )}

          {/* ==================== MARKETING ROI ==================== */}
          {mode === "marketing" && (
            <div className="space-y-6">
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <h2 className="text-lg font-semibold mb-4 text-gray-200">Marketing ROI</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={labelCls}>Ad Spend ($)</label>
                    <input className={inputCls} type="number" min={0} value={adSpend} onChange={(e) => setAdSpend(Math.max(0, Number(e.target.value)))} />
                  </div>
                  <div>
                    <label className={labelCls}>Revenue Generated ($)</label>
                    <input className={inputCls} type="number" min={0} value={revenue} onChange={(e) => setRevenue(Math.max(0, Number(e.target.value)))} />
                  </div>
                  <div>
                    <label className={labelCls}>Cost of Goods Sold ($)</label>
                    <input className={inputCls} type="number" min={0} value={cogs} onChange={(e) => setCogs(Math.max(0, Number(e.target.value)))} />
                  </div>
                  <div>
                    <label className={labelCls}>Number of Conversions</label>
                    <input className={inputCls} type="number" min={0} value={conversions} onChange={(e) => setConversions(Math.max(0, Number(e.target.value)))} />
                  </div>
                </div>
              </section>

              {/* Results Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <ResultCard
                  label="Marketing ROI"
                  value={`${fmtPct(marketingData.roi)}%`}
                  color={marketingData.roi >= 0 ? "#00e676" : "#ff5252"}
                  sub={marketingData.roi >= 0 ? "Profitable" : "Unprofitable"}
                />
                <ResultCard
                  label="ROAS"
                  value={`${fmtPct(marketingData.roas)}x`}
                  color="#7c6cf0"
                  sub="Return on ad spend"
                />
                <ResultCard
                  label="Net Profit"
                  value={`$${fmt(marketingData.netProfit)}`}
                  color={marketingData.netProfit >= 0 ? "#00e676" : "#ff5252"}
                  sub="After COGS & ad spend"
                />
                <ResultCard
                  label="Cost per Acquisition"
                  value={`$${fmt(marketingData.cpa)}`}
                  color="#18ffff"
                  sub="Per conversion"
                />
                <ResultCard
                  label="Revenue per Conversion"
                  value={`$${fmt(marketingData.revenuePerConversion)}`}
                  color="#ffd740"
                  sub="Avg revenue each"
                />
                <ResultCard
                  label="Gross Profit"
                  value={`$${fmt(marketingData.grossProfit)}`}
                  color="#64ffda"
                  sub="Revenue minus COGS"
                />
              </div>

              {/* Visual Breakdown */}
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <h3 className="text-sm font-medium text-gray-400 mb-4">Revenue Breakdown</h3>
                <div className="space-y-3">
                  {[
                    { label: "Revenue", value: revenue, color: "#7c6cf0" },
                    { label: "Cost of Goods", value: cogs, color: "#ff9100" },
                    { label: "Ad Spend", value: adSpend, color: "#18ffff" },
                    { label: "Net Profit", value: marketingData.netProfit, color: marketingData.netProfit >= 0 ? "#00e676" : "#ff5252" },
                  ].map((item) => {
                    const maxVal = Math.max(revenue, 1);
                    return (
                      <div key={item.label}>
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{item.label}</span>
                          <span>${fmt(item.value)}</span>
                        </div>
                        <div className="h-6 rounded-lg bg-[#12121c] overflow-hidden">
                          <div
                            className="h-full rounded-lg transition-all duration-500"
                            style={{
                              width: `${Math.max(1, (Math.abs(item.value) / maxVal) * 100)}%`,
                              backgroundColor: item.color,
                            }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Formula Reference */}
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <h3 className="text-sm font-medium text-gray-400 mb-3">Formulas Used</h3>
                <div className="grid sm:grid-cols-2 gap-3 text-xs text-gray-500">
                  <div className="rounded-lg bg-[#12121c] px-3 py-2">
                    <span className="text-gray-300 font-medium">Marketing ROI</span>
                    <p className="mt-1">((Revenue - COGS - Ad Spend) / Ad Spend) x 100</p>
                  </div>
                  <div className="rounded-lg bg-[#12121c] px-3 py-2">
                    <span className="text-gray-300 font-medium">ROAS</span>
                    <p className="mt-1">Revenue / Ad Spend</p>
                  </div>
                  <div className="rounded-lg bg-[#12121c] px-3 py-2">
                    <span className="text-gray-300 font-medium">Cost per Acquisition</span>
                    <p className="mt-1">Ad Spend / Number of Conversions</p>
                  </div>
                  <div className="rounded-lg bg-[#12121c] px-3 py-2">
                    <span className="text-gray-300 font-medium">Gross Profit</span>
                    <p className="mt-1">Revenue - Cost of Goods Sold</p>
                  </div>
                </div>
              </section>
            </div>
          )}
        </main>

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Calculate ROI for any type of investment in three steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Choose a Mode", desc: "Select Simple ROI for quick calculations, Investment Over Time for compound growth analysis, or Marketing ROI for advertising performance metrics." },
              { step: "2", title: "Enter Your Numbers", desc: "Fill in investment amounts, returns, annual rates, time periods, or ad spend. All calculations update instantly as you type." },
              { step: "3", title: "Analyze Results", desc: "View ROI percentages, profit amounts, visual bar charts, and year-by-year breakdowns. Use comparison mode to evaluate two investments side by side." },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-white/5 bg-[#1a1a26] p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c6cf0]/15 text-[#7c6cf0] text-xl font-bold">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
            Everything you need to know about calculating return on investment.
          </p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="mx-auto max-w-7xl px-4 py-16 border-t border-white/5">
          <h2 className="text-2xl font-bold text-center mb-2">Related Tools</h2>
          <p className="text-gray-400 text-center mb-10">More free business tools to help you get things done.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <a key={tool.name} href={tool.href} className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-5 hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c6cf0]/10">
                  <svg className="h-5 w-5 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#7c6cf0] transition-colors">{tool.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  Result Card                                                        */
/* ------------------------------------------------------------------ */

function ResultCard({ label, value, color, sub }: { label: string; value: string; color: string; sub: string }) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold tabular-nums" style={{ color }}>{value}</p>
      <p className="text-xs text-gray-600 mt-1">{sub}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/5 bg-[#1a1a26] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1e1e2e] transition-colors"
      >
        <span className="text-sm font-medium text-gray-200 pr-4">{question}</span>
        <svg className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{answer}</div>}
    </div>
  );
}
