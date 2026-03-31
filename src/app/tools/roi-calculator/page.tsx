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
    q: "What is annualized ROI and why does it matter?",
    a: "Annualized ROI converts a total return over any time period into an equivalent annual rate, so you can compare investments with different durations fairly. For example, a 50% total ROI over 3 years is roughly 14.5% annualized — very different from 50% in one year. The formula uses compound annual growth rate (CAGR): ((1 + ROI/100) ^ (1/years) - 1) x 100.",
  },
  {
    q: "How does compound growth work in the investment calculator?",
    a: "Compound growth means your returns generate their own returns over time. If you invest $10,000 with a 10% annual return, after year 1 you have $11,000. In year 2, you earn 10% on $11,000 (not just the original $10,000), giving you $12,100. This snowball effect is why compound growth is so powerful over long periods. Our calculator shows you year-by-year growth including the compound effect.",
  },
  {
    q: "What is a good ROI percentage?",
    a: "A 'good' ROI depends on the context. For stock market investments, the historical average annual return of the S&P 500 is about 10%. For marketing campaigns, most businesses target a minimum 5:1 ROAS (500% return). For business projects, anything above your cost of capital (typically 8-15%) is generally considered positive. The key is comparing your ROI against your alternatives and industry benchmarks.",
  },
  {
    q: "Can I compare multiple scenarios at once?",
    a: "Yes! Use the Scenario Comparison feature in any mode. Enter up to 3 different sets of inputs and instantly see all results side by side in a comparison table. This is ideal for evaluating multiple investment options, comparing different marketing campaigns, or stress-testing projections.",
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
    name: "Break-Even Calculator",
    description: "Find exactly how many units you need to sell to cover all costs.",
    href: "/tools/break-even-calculator",
    icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z",
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

type Mode = "simple" | "marketing" | "investment";

const MODES: { key: Mode; label: string; description: string }[] = [
  { key: "simple", label: "Simple ROI", description: "Investment in, return out" },
  { key: "marketing", label: "Marketing ROI", description: "Ad spend, revenue & ROAS" },
  { key: "investment", label: "Investment Growth", description: "Compound growth over time" },
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
/*  Result Card                                                        */
/* ------------------------------------------------------------------ */

function ResultCard({
  label,
  value,
  color,
  sub,
}: {
  label: string;
  value: string;
  color: string;
  sub: string;
}) {
  return (
    <div className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-2xl font-bold tabular-nums" style={{ color }}>
        {value}
      </p>
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
        <svg
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && (
        <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{answer}</div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Scenario Comparison                                               */
/* ------------------------------------------------------------------ */

type SimpleScenario = {
  label: string;
  investment: string;
  returnAmt: string;
  years: string;
};

type MarketingScenario = {
  label: string;
  adSpend: string;
  revenue: string;
  cogs: string;
  conversions: string;
};

type InvestmentScenario = {
  label: string;
  initial: string;
  annualReturn: string;
  years: string;
};

function calcSimpleScenario(s: SimpleScenario) {
  const inv = parseFloat(s.investment) || 0;
  const ret = parseFloat(s.returnAmt) || 0;
  const yrs = parseFloat(s.years) || 0;
  const profit = ret - inv;
  const roi = inv > 0 ? (profit / inv) * 100 : 0;
  const annualized =
    yrs > 0 && inv > 0 && ret > 0
      ? (Math.pow(ret / inv, 1 / yrs) - 1) * 100
      : null;
  return { profit, roi, annualized };
}

function calcMarketingScenario(s: MarketingScenario) {
  const spend = parseFloat(s.adSpend) || 0;
  const rev = parseFloat(s.revenue) || 0;
  const cogs = parseFloat(s.cogs) || 0;
  const conv = parseFloat(s.conversions) || 0;
  const grossProfit = rev - cogs;
  const netProfit = grossProfit - spend;
  const roi = spend > 0 ? (netProfit / spend) * 100 : 0;
  const roas = spend > 0 ? rev / spend : 0;
  const cpa = conv > 0 ? spend / conv : 0;
  return { grossProfit, netProfit, roi, roas, cpa };
}

function calcInvestmentScenario(s: InvestmentScenario) {
  const initial = parseFloat(s.initial) || 0;
  const rate = parseFloat(s.annualReturn) || 0;
  const yrs = parseFloat(s.years) || 0;
  const finalValue = initial * Math.pow(1 + rate / 100, yrs);
  const totalGain = finalValue - initial;
  const totalROI = initial > 0 ? (totalGain / initial) * 100 : 0;
  return { finalValue, totalGain, totalROI };
}

/* ------------------------------------------------------------------ */
/*  Investment Growth Bar Chart                                        */
/* ------------------------------------------------------------------ */

function InvestmentBarChart({
  initial,
  annualReturn,
  years,
  compareEnabled,
  compInitial,
  compReturn,
  compYears,
}: {
  initial: number;
  annualReturn: number;
  years: number;
  compareEnabled: boolean;
  compInitial: number;
  compReturn: number;
  compYears: number;
}) {
  const rows: { year: number; valueA: number; valueB: number | null }[] = [];
  const maxYears = Math.max(years, compareEnabled ? compYears : 0);

  for (let i = 0; i <= maxYears; i++) {
    const valueA = i <= years ? initial * Math.pow(1 + annualReturn / 100, i) : 0;
    const valueB =
      compareEnabled && i <= compYears
        ? compInitial * Math.pow(1 + compReturn / 100, i)
        : null;
    rows.push({ year: i, valueA, valueB });
  }

  const maxVal = Math.max(
    ...rows.map((r) => Math.max(r.valueA, r.valueB ?? 0)),
    1
  );

  return (
    <div className="space-y-1.5 max-h-[440px] overflow-y-auto pr-1">
      {rows.map((row) => (
        <div key={row.year} className="flex items-center gap-3">
          <span className="w-12 text-right text-xs text-gray-500 tabular-nums shrink-0">
            Yr {row.year}
          </span>
          <div className="flex-1 flex flex-col gap-0.5">
            {row.valueA > 0 && (
              <div className="flex items-center gap-2">
                <div
                  className="h-4 rounded-sm transition-all duration-500 min-w-[2px]"
                  style={{
                    width: `${Math.max(1, (row.valueA / maxVal) * 100)}%`,
                    background: "linear-gradient(90deg, #7c6cf0, #9d90f5)",
                  }}
                />
                <span className="text-[10px] text-gray-500 tabular-nums whitespace-nowrap">
                  ${fmtInt(row.valueA)}
                </span>
              </div>
            )}
            {compareEnabled && row.valueB !== null && row.valueB > 0 && (
              <div className="flex items-center gap-2">
                <div
                  className="h-4 rounded-sm transition-all duration-500 min-w-[2px]"
                  style={{
                    width: `${Math.max(1, (row.valueB / maxVal) * 100)}%`,
                    background: "linear-gradient(90deg, #ff9100, #ffb74d)",
                  }}
                />
                <span className="text-[10px] text-gray-500 tabular-nums whitespace-nowrap">
                  ${fmtInt(row.valueB)}
                </span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Page Component                                                */
/* ------------------------------------------------------------------ */

export default function RoiCalculatorPage() {
  const [mode, setMode] = useState<Mode>("simple");
  const [showScenarios, setShowScenarios] = useState(false);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 placeholder-gray-500 outline-none focus:border-[#7c6cf0]/60 focus:ring-1 focus:ring-[#7c6cf0]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  /* -------- SIMPLE ROI state -------- */
  const [investmentAmount, setInvestmentAmount] = useState(10000);
  const [returnAmount, setReturnAmount] = useState(15000);
  const [simpleYears, setSimpleYears] = useState("");

  const simpleROI = useMemo(() => {
    const profit = returnAmount - investmentAmount;
    const roi = investmentAmount > 0 ? (profit / investmentAmount) * 100 : 0;
    const yrs = parseFloat(simpleYears) || 0;
    const annualized =
      yrs > 0 && investmentAmount > 0 && returnAmount > 0
        ? (Math.pow(returnAmount / investmentAmount, 1 / yrs) - 1) * 100
        : null;
    return { profit, roi, annualized };
  }, [investmentAmount, returnAmount, simpleYears]);

  /* Scenario state for Simple */
  const [simpleScenarios, setSimpleScenarios] = useState<SimpleScenario[]>([
    { label: "Scenario A", investment: "10000", returnAmt: "15000", years: "1" },
    { label: "Scenario B", investment: "10000", returnAmt: "13000", years: "1" },
    { label: "Scenario C", investment: "10000", returnAmt: "18000", years: "2" },
  ]);

  /* -------- MARKETING ROI state -------- */
  const [adSpend, setAdSpend] = useState(5000);
  const [revenue, setRevenue] = useState(25000);
  const [cogs, setCogs] = useState(8000);
  const [conversions, setConversions] = useState(50);

  const marketingData = useMemo(() => {
    const grossProfit = revenue - cogs;
    const netProfit = grossProfit - adSpend;
    const roi = adSpend > 0 ? (netProfit / adSpend) * 100 : 0;
    const roas = adSpend > 0 ? revenue / adSpend : 0;
    const cpa = conversions > 0 ? adSpend / conversions : 0;
    const revenuePerConversion = conversions > 0 ? revenue / conversions : 0;
    return { grossProfit, netProfit, roi, roas, cpa, revenuePerConversion };
  }, [adSpend, revenue, cogs, conversions]);

  /* Scenario state for Marketing */
  const [marketingScenarios, setMarketingScenarios] = useState<MarketingScenario[]>([
    { label: "Campaign A", adSpend: "5000", revenue: "25000", cogs: "8000", conversions: "50" },
    { label: "Campaign B", adSpend: "3000", revenue: "12000", cogs: "4000", conversions: "30" },
    { label: "Campaign C", adSpend: "8000", revenue: "40000", cogs: "14000", conversions: "80" },
  ]);

  /* -------- INVESTMENT GROWTH state -------- */
  const [initialInvestment, setInitialInvestment] = useState(10000);
  const [annualReturn, setAnnualReturn] = useState(10);
  const [years, setYears] = useState(10);
  const [showCompare, setShowCompare] = useState(false);
  const [compInitial, setCompInitial] = useState(10000);
  const [compReturn, setCompReturn] = useState(7);
  const [compYears, setCompYears] = useState(10);

  const investmentData = useMemo(() => {
    const finalValue = initialInvestment * Math.pow(1 + annualReturn / 100, years);
    const totalProfit = finalValue - initialInvestment;
    const totalROI = initialInvestment > 0 ? (totalProfit / initialInvestment) * 100 : 0;

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

  /* Scenario state for Investment */
  const [investmentScenarios, setInvestmentScenarios] = useState<InvestmentScenario[]>([
    { label: "Conservative", initial: "10000", annualReturn: "6", years: "10" },
    { label: "Moderate", initial: "10000", annualReturn: "10", years: "10" },
    { label: "Aggressive", initial: "10000", annualReturn: "15", years: "10" },
  ]);

  /* ---------------------------------------------------------------- */
  return (
    <>
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
            ROI{" "}
            <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
              Calculator
            </span>
          </h1>
          <p className="mt-2 text-gray-400 max-w-2xl">
            Calculate return on investment for any business decision. Three modes,
            scenario comparison, visual growth charts, and annualized ROI — all
            free, no signup required.
          </p>
        </header>

        <main className="mx-auto max-w-4xl px-4 pb-20">
          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => { setMode(m.key); setShowScenarios(false); }}
                className={`text-left rounded-xl border p-4 transition-all duration-200 ${
                  mode === m.key
                    ? "border-[#7c6cf0]/60 bg-[#7c6cf0]/10 shadow-[0_0_20px_rgba(124,108,240,0.12)]"
                    : "border-white/5 bg-[#1a1a26] hover:border-white/10"
                }`}
              >
                <span
                  className={`text-sm font-semibold ${
                    mode === m.key ? "text-[#7c6cf0]" : "text-gray-200"
                  }`}
                >
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
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className={labelCls}>Investment Amount ($)</label>
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      value={investmentAmount}
                      onChange={(e) => setInvestmentAmount(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Return Amount ($)</label>
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      value={returnAmount}
                      onChange={(e) => setReturnAmount(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Time Period (years) — optional</label>
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      step="0.5"
                      value={simpleYears}
                      onChange={(e) => setSimpleYears(e.target.value)}
                      placeholder="e.g. 2"
                    />
                  </div>
                </div>
              </section>

              {/* Results */}
              <div className={`grid gap-4 ${simpleROI.annualized !== null ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"}`}>
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
                {simpleROI.annualized !== null && (
                  <ResultCard
                    label="Annualized ROI"
                    value={`${fmtPct(simpleROI.annualized)}%`}
                    color={simpleROI.annualized >= 0 ? "#18ffff" : "#ff5252"}
                    sub={`per year over ${simpleYears} yrs`}
                  />
                )}
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
                          width: `${Math.min(
                            100,
                            returnAmount > 0
                              ? (investmentAmount / Math.max(investmentAmount, returnAmount)) * 100
                              : 100
                          )}%`,
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
                          width: `${Math.min(
                            100,
                            investmentAmount > 0
                              ? (returnAmount / Math.max(investmentAmount, returnAmount)) * 100
                              : 100
                          )}%`,
                          backgroundColor: simpleROI.profit >= 0 ? "#00e676" : "#ff5252",
                        }}
                      />
                    </div>
                  </div>
                  {simpleROI.profit > 0 && (
                    <div>
                      <div className="flex justify-between text-xs text-gray-400 mb-1">
                        <span>Profit</span>
                        <span>${fmt(simpleROI.profit)}</span>
                      </div>
                      <div className="h-8 rounded-lg bg-[#12121c] overflow-hidden">
                        <div
                          className="h-full rounded-lg transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100,
                              investmentAmount > 0
                                ? (simpleROI.profit / Math.max(investmentAmount, returnAmount)) * 100
                                : 0
                            )}%`,
                            background: "linear-gradient(90deg, #00e676, #69f0ae)",
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Scenario Comparison */}
              <div>
                <button
                  onClick={() => setShowScenarios(!showScenarios)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-center justify-between ${
                    showScenarios
                      ? "border-[#7c6cf0]/40 bg-[#7c6cf0]/5"
                      : "border-white/5 bg-[#1a1a26] hover:border-white/10"
                  }`}
                >
                  <div>
                    <span className="text-sm font-semibold text-gray-200">
                      Scenario Comparison
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Compare up to 3 ROI scenarios side by side
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${showScenarios ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showScenarios && (
                  <div className="mt-4 space-y-4">
                    {/* Scenario inputs */}
                    {simpleScenarios.map((sc, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{
                              backgroundColor: ["#7c6cf0", "#00e676", "#ff9100"][idx],
                            }}
                          />
                          <input
                            className="text-sm font-semibold text-gray-200 bg-transparent border-b border-white/10 focus:outline-none focus:border-[#7c6cf0]/60 pb-0.5 w-32"
                            value={sc.label}
                            onChange={(e) => {
                              const next = [...simpleScenarios];
                              next[idx] = { ...next[idx], label: e.target.value };
                              setSimpleScenarios(next);
                            }}
                          />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          <div>
                            <label className={labelCls}>Investment ($)</label>
                            <input
                              className={inputCls}
                              type="number"
                              min={0}
                              value={sc.investment}
                              onChange={(e) => {
                                const next = [...simpleScenarios];
                                next[idx] = { ...next[idx], investment: e.target.value };
                                setSimpleScenarios(next);
                              }}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Return ($)</label>
                            <input
                              className={inputCls}
                              type="number"
                              min={0}
                              value={sc.returnAmt}
                              onChange={(e) => {
                                const next = [...simpleScenarios];
                                next[idx] = { ...next[idx], returnAmt: e.target.value };
                                setSimpleScenarios(next);
                              }}
                            />
                          </div>
                          <div>
                            <label className={labelCls}>Years</label>
                            <input
                              className={inputCls}
                              type="number"
                              min={0}
                              step="0.5"
                              value={sc.years}
                              onChange={(e) => {
                                const next = [...simpleScenarios];
                                next[idx] = { ...next[idx], years: e.target.value };
                                setSimpleScenarios(next);
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Comparison Table */}
                    <div className="rounded-2xl border border-white/5 bg-[#12121c] overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">
                              Metric
                            </th>
                            {simpleScenarios.map((sc, idx) => (
                              <th
                                key={idx}
                                className="text-right px-5 py-3 text-xs font-semibold"
                                style={{
                                  color: ["#7c6cf0", "#00e676", "#ff9100"][idx],
                                }}
                              >
                                {sc.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(
                            [
                              { key: "roi", label: "ROI", fmt: (v: number) => `${fmtPct(v)}%` },
                              { key: "annualized", label: "Annualized ROI", fmt: (v: number | null) => v !== null ? `${fmtPct(v)}%` : "—" },
                              { key: "profit", label: "Net Profit", fmt: (v: number) => `$${fmt(v)}` },
                            ] as Array<{ key: string; label: string; fmt: (v: number | null) => string }>
                          ).map((row) => (
                            <tr key={row.key} className="border-b border-white/[0.03]">
                              <td className="px-5 py-3 text-gray-400">{row.label}</td>
                              {simpleScenarios.map((sc, idx) => {
                                const calc = calcSimpleScenario(sc);
                                const rawVal = calc[row.key as keyof typeof calc];
                                const val = typeof rawVal === "number" ? rawVal : null;
                                const isPositive = val === null ? null : val >= 0;
                                return (
                                  <td
                                    key={idx}
                                    className="px-5 py-3 text-right font-semibold tabular-nums"
                                    style={{
                                      color:
                                        row.key === "roi" || row.key === "profit" || row.key === "annualized"
                                          ? isPositive === null
                                            ? "#8888a0"
                                            : isPositive
                                            ? "#00e676"
                                            : "#ff5252"
                                          : "white",
                                    }}
                                  >
                                    {row.fmt(rawVal as number | null)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
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
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      value={adSpend}
                      onChange={(e) => setAdSpend(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Revenue Generated ($)</label>
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      value={revenue}
                      onChange={(e) => setRevenue(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Cost of Goods Sold ($)</label>
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      value={cogs}
                      onChange={(e) => setCogs(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Number of Conversions (optional)</label>
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      value={conversions}
                      onChange={(e) => setConversions(Math.max(0, Number(e.target.value)))}
                    />
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
                  value={conversions > 0 ? `$${fmt(marketingData.cpa)}` : "—"}
                  color="#18ffff"
                  sub="Per conversion"
                />
                <ResultCard
                  label="Revenue per Conversion"
                  value={conversions > 0 ? `$${fmt(marketingData.revenuePerConversion)}` : "—"}
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
                    {
                      label: "Net Profit",
                      value: marketingData.netProfit,
                      color: marketingData.netProfit >= 0 ? "#00e676" : "#ff5252",
                    },
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

              {/* Scenario Comparison — Marketing */}
              <div>
                <button
                  onClick={() => setShowScenarios(!showScenarios)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-center justify-between ${
                    showScenarios
                      ? "border-[#7c6cf0]/40 bg-[#7c6cf0]/5"
                      : "border-white/5 bg-[#1a1a26] hover:border-white/10"
                  }`}
                >
                  <div>
                    <span className="text-sm font-semibold text-gray-200">
                      Campaign Comparison
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Compare up to 3 marketing campaigns side by side
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${showScenarios ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showScenarios && (
                  <div className="mt-4 space-y-4">
                    {marketingScenarios.map((sc, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: ["#7c6cf0", "#00e676", "#ff9100"][idx] }}
                          />
                          <input
                            className="text-sm font-semibold text-gray-200 bg-transparent border-b border-white/10 focus:outline-none focus:border-[#7c6cf0]/60 pb-0.5 w-36"
                            value={sc.label}
                            onChange={(e) => {
                              const next = [...marketingScenarios];
                              next[idx] = { ...next[idx], label: e.target.value };
                              setMarketingScenarios(next);
                            }}
                          />
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {(
                            [
                              { key: "adSpend", label: "Ad Spend ($)" },
                              { key: "revenue", label: "Revenue ($)" },
                              { key: "cogs", label: "COGS ($)" },
                              { key: "conversions", label: "Conversions" },
                            ] as Array<{ key: keyof MarketingScenario; label: string }>
                          ).map((field) => (
                            <div key={field.key}>
                              <label className={labelCls}>{field.label}</label>
                              <input
                                className={inputCls}
                                type="number"
                                min={0}
                                value={sc[field.key]}
                                onChange={(e) => {
                                  const next = [...marketingScenarios];
                                  next[idx] = { ...next[idx], [field.key]: e.target.value };
                                  setMarketingScenarios(next);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="rounded-2xl border border-white/5 bg-[#12121c] overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">
                              Metric
                            </th>
                            {marketingScenarios.map((sc, idx) => (
                              <th
                                key={idx}
                                className="text-right px-5 py-3 text-xs font-semibold"
                                style={{ color: ["#7c6cf0", "#00e676", "#ff9100"][idx] }}
                              >
                                {sc.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(
                            [
                              { key: "roi", label: "ROI", f: (v: number) => `${fmtPct(v)}%`, profit: true },
                              { key: "roas", label: "ROAS", f: (v: number) => `${fmtPct(v)}x`, profit: false },
                              { key: "netProfit", label: "Net Profit", f: (v: number) => `$${fmt(v)}`, profit: true },
                              { key: "cpa", label: "CPA", f: (v: number) => `$${fmt(v)}`, profit: false },
                            ] as Array<{ key: string; label: string; f: (v: number) => string; profit: boolean }>
                          ).map((row) => (
                            <tr key={row.key} className="border-b border-white/[0.03]">
                              <td className="px-5 py-3 text-gray-400">{row.label}</td>
                              {marketingScenarios.map((sc, idx) => {
                                const calc = calcMarketingScenario(sc);
                                const val = calc[row.key as keyof typeof calc] as number;
                                return (
                                  <td
                                    key={idx}
                                    className="px-5 py-3 text-right font-semibold tabular-nums"
                                    style={{
                                      color: row.profit
                                        ? val >= 0
                                          ? "#00e676"
                                          : "#ff5252"
                                        : "#e0e0ea",
                                    }}
                                  >
                                    {row.f(val)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ==================== INVESTMENT GROWTH ==================== */}
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
                    <label className={labelCls}>Initial Amount ($)</label>
                    <input
                      className={inputCls}
                      type="number"
                      min={0}
                      value={initialInvestment}
                      onChange={(e) => setInitialInvestment(Math.max(0, Number(e.target.value)))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Annual Return (%)</label>
                    <input
                      className={inputCls}
                      type="number"
                      step="0.1"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(Number(e.target.value))}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>Number of Years</label>
                    <input
                      className={inputCls}
                      type="number"
                      min={1}
                      max={50}
                      value={years}
                      onChange={(e) => setYears(Math.max(1, Math.min(50, Number(e.target.value))))}
                    />
                  </div>
                </div>
              </section>

              {showCompare && (
                <section className="rounded-2xl border border-[#ff9100]/20 bg-[#1a1a26] p-5">
                  <h2 className="text-lg font-semibold mb-4 text-[#ff9100]">Investment B</h2>
                  <div className="grid sm:grid-cols-3 gap-4">
                    <div>
                      <label className={labelCls}>Initial Amount ($)</label>
                      <input
                        className={inputCls}
                        type="number"
                        min={0}
                        value={compInitial}
                        onChange={(e) => setCompInitial(Math.max(0, Number(e.target.value)))}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Annual Return (%)</label>
                      <input
                        className={inputCls}
                        type="number"
                        step="0.1"
                        value={compReturn}
                        onChange={(e) => setCompReturn(Number(e.target.value))}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>Number of Years</label>
                      <input
                        className={inputCls}
                        type="number"
                        min={1}
                        max={50}
                        value={compYears}
                        onChange={(e) => setCompYears(Math.max(1, Math.min(50, Number(e.target.value))))}
                      />
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
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Final Value</span>
                          <span className="text-white font-semibold">
                            ${fmtInt(investmentData.finalValue)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total Gain</span>
                          <span
                            className="font-semibold"
                            style={{ color: investmentData.totalProfit >= 0 ? "#00e676" : "#ff5252" }}
                          >
                            ${fmtInt(investmentData.totalProfit)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total ROI</span>
                          <span
                            className="font-semibold"
                            style={{ color: investmentData.totalROI >= 0 ? "#00e676" : "#ff5252" }}
                          >
                            {fmtPct(investmentData.totalROI)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="rounded-2xl border border-[#ff9100]/20 bg-[#1a1a26] p-5">
                      <h3 className="text-sm font-medium text-[#ff9100] mb-3">Investment B</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Final Value</span>
                          <span className="text-white font-semibold">
                            ${fmtInt(investmentData.compFinalValue)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total Gain</span>
                          <span
                            className="font-semibold"
                            style={{
                              color: investmentData.compTotalProfit >= 0 ? "#00e676" : "#ff5252",
                            }}
                          >
                            ${fmtInt(investmentData.compTotalProfit)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Total ROI</span>
                          <span
                            className="font-semibold"
                            style={{
                              color: investmentData.compTotalROI >= 0 ? "#00e676" : "#ff5252",
                            }}
                          >
                            {fmtPct(investmentData.compTotalROI)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <ResultCard
                      label="Final Value"
                      value={`$${fmtInt(investmentData.finalValue)}`}
                      color="#7c6cf0"
                      sub={`After ${years} years`}
                    />
                    <ResultCard
                      label="Total Gain"
                      value={`$${fmtInt(investmentData.totalProfit)}`}
                      color={investmentData.totalProfit >= 0 ? "#00e676" : "#ff5252"}
                      sub="Net gain from initial"
                    />
                    <ResultCard
                      label="Total ROI"
                      value={`${fmtPct(investmentData.totalROI)}%`}
                      color={investmentData.totalROI >= 0 ? "#00e676" : "#ff5252"}
                      sub={`${fmtPct(annualReturn)}% annual compound`}
                    />
                  </>
                )}
              </div>

              {/* Visual Growth Bar Chart */}
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-gray-400">
                    Year-by-Year Growth Chart
                  </h3>
                  {showCompare && (
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block h-2.5 w-6 rounded-sm bg-[#7c6cf0]" />
                        Investment A
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="inline-block h-2.5 w-6 rounded-sm bg-[#ff9100]" />
                        Investment B
                      </span>
                    </div>
                  )}
                </div>
                <InvestmentBarChart
                  initial={initialInvestment}
                  annualReturn={annualReturn}
                  years={years}
                  compareEnabled={showCompare}
                  compInitial={compInitial}
                  compReturn={compReturn}
                  compYears={compYears}
                />
              </section>

              {/* Year-by-Year Table */}
              <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5 overflow-x-auto">
                <h3 className="text-sm font-medium text-gray-400 mb-4">
                  Year-by-Year Breakdown
                </h3>
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left pb-2 text-gray-400 font-medium">Year</th>
                      <th className="text-right pb-2 text-gray-400 font-medium">
                        Value {showCompare ? "(A)" : ""}
                      </th>
                      {showCompare && (
                        <th className="text-right pb-2 text-gray-400 font-medium">Value (B)</th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {investmentData.rows.map((row) => (
                      <tr key={row.year} className="border-b border-white/[0.02]">
                        <td className="py-1.5 text-gray-300">{row.year}</td>
                        <td className="py-1.5 text-right text-gray-200 tabular-nums">
                          {row.value > 0 ? `$${fmtInt(row.value)}` : "-"}
                        </td>
                        {showCompare && (
                          <td className="py-1.5 text-right text-gray-200 tabular-nums">
                            {row.compValue && row.compValue > 0
                              ? `$${fmtInt(row.compValue)}`
                              : "-"}
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </section>

              {/* Scenario Comparison — Investment */}
              <div>
                <button
                  onClick={() => setShowScenarios(!showScenarios)}
                  className={`w-full text-left rounded-xl border p-4 transition-all duration-200 flex items-center justify-between ${
                    showScenarios
                      ? "border-[#7c6cf0]/40 bg-[#7c6cf0]/5"
                      : "border-white/5 bg-[#1a1a26] hover:border-white/10"
                  }`}
                >
                  <div>
                    <span className="text-sm font-semibold text-gray-200">
                      Scenario Comparison
                    </span>
                    <p className="text-xs text-gray-500 mt-0.5">
                      Compare conservative, moderate, and aggressive growth scenarios
                    </p>
                  </div>
                  <svg
                    className={`w-5 h-5 text-gray-500 transition-transform ${showScenarios ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {showScenarios && (
                  <div className="mt-4 space-y-4">
                    {investmentScenarios.map((sc, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5"
                      >
                        <div className="flex items-center gap-3 mb-4">
                          <div
                            className="w-3 h-3 rounded-full shrink-0"
                            style={{ backgroundColor: ["#7c6cf0", "#00e676", "#ff9100"][idx] }}
                          />
                          <input
                            className="text-sm font-semibold text-gray-200 bg-transparent border-b border-white/10 focus:outline-none focus:border-[#7c6cf0]/60 pb-0.5 w-36"
                            value={sc.label}
                            onChange={(e) => {
                              const next = [...investmentScenarios];
                              next[idx] = { ...next[idx], label: e.target.value };
                              setInvestmentScenarios(next);
                            }}
                          />
                        </div>
                        <div className="grid sm:grid-cols-3 gap-4">
                          {(
                            [
                              { key: "initial", label: "Initial Amount ($)" },
                              { key: "annualReturn", label: "Annual Return (%)" },
                              { key: "years", label: "Years" },
                            ] as Array<{ key: keyof InvestmentScenario; label: string }>
                          ).map((field) => (
                            <div key={field.key}>
                              <label className={labelCls}>{field.label}</label>
                              <input
                                className={inputCls}
                                type="number"
                                min={0}
                                step={field.key === "annualReturn" ? "0.1" : "1"}
                                value={sc[field.key]}
                                onChange={(e) => {
                                  const next = [...investmentScenarios];
                                  next[idx] = { ...next[idx], [field.key]: e.target.value };
                                  setInvestmentScenarios(next);
                                }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}

                    <div className="rounded-2xl border border-white/5 bg-[#12121c] overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-white/5">
                            <th className="text-left px-5 py-3 text-xs text-gray-500 font-medium">
                              Metric
                            </th>
                            {investmentScenarios.map((sc, idx) => (
                              <th
                                key={idx}
                                className="text-right px-5 py-3 text-xs font-semibold"
                                style={{ color: ["#7c6cf0", "#00e676", "#ff9100"][idx] }}
                              >
                                {sc.label}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {(
                            [
                              { key: "finalValue", label: "Final Value", f: (v: number) => `$${fmtInt(v)}`, profit: false },
                              { key: "totalGain", label: "Total Gain", f: (v: number) => `$${fmtInt(v)}`, profit: true },
                              { key: "totalROI", label: "Total ROI", f: (v: number) => `${fmtPct(v)}%`, profit: true },
                            ] as Array<{ key: string; label: string; f: (v: number) => string; profit: boolean }>
                          ).map((row) => (
                            <tr key={row.key} className="border-b border-white/[0.03]">
                              <td className="px-5 py-3 text-gray-400">{row.label}</td>
                              {investmentScenarios.map((sc, idx) => {
                                const calc = calcInvestmentScenario(sc);
                                const val = calc[row.key as keyof typeof calc] as number;
                                return (
                                  <td
                                    key={idx}
                                    className="px-5 py-3 text-right font-semibold tabular-nums"
                                    style={{
                                      color: row.profit
                                        ? val >= 0
                                          ? "#00e676"
                                          : "#ff5252"
                                        : "white",
                                    }}
                                  >
                                    {row.f(val)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
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
              {
                step: "1",
                title: "Choose a Mode",
                desc: "Select Simple ROI for quick profit/loss calculations, Marketing ROI for ad campaign analysis with ROAS, or Investment Growth for compound growth projections over time.",
              },
              {
                step: "2",
                title: "Enter Your Numbers",
                desc: "Fill in investment amounts, returns, annual rates, time periods, or ad spend. All calculations update instantly. Add an optional time period to get annualized ROI.",
              },
              {
                step: "3",
                title: "Compare Scenarios",
                desc: "Toggle Scenario Comparison in any mode to see up to 3 sets of inputs in a side-by-side table. Use Investment Growth's bar chart to visualize compound growth year by year.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="relative rounded-2xl border border-white/5 bg-[#1a1a26] p-6 text-center"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c6cf0]/15 text-[#7c6cf0] text-xl font-bold">
                  {item.step}
                </div>
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
          <p className="text-gray-400 text-center mb-10">
            More free business tools to help you get things done.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <a
                key={tool.name}
                href={tool.href}
                className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-5 hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]"
              >
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c6cf0]/10">
                  <svg
                    className="h-5 w-5 text-[#7c6cf0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#7c6cf0] transition-colors">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
