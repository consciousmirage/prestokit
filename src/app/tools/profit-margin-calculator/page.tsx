"use client";

import { useState, useMemo } from "react";

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type CalcMode = "margin" | "markup" | "target" | "breakeven";

const MODES: { key: CalcMode; label: string; description: string }[] = [
  {
    key: "margin",
    label: "Margin Calculator",
    description: "Enter cost & selling price",
  },
  {
    key: "markup",
    label: "Markup Calculator",
    description: "Enter cost & markup %",
  },
  {
    key: "target",
    label: "Target Margin",
    description: "Enter cost & desired margin %",
  },
  {
    key: "breakeven",
    label: "Break-Even",
    description: "Find your break-even point",
  },
];

const CURRENCIES = [
  { symbol: "$", label: "USD ($)" },
  { symbol: "\u20AC", label: "EUR (\u20AC)" },
  { symbol: "\u00A3", label: "GBP (\u00A3)" },
  { symbol: "\u00A5", label: "JPY (\u00A5)" },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function fmt(n: number, decimals = 2): string {
  if (!isFinite(n) || isNaN(n)) return "--";
  return n.toFixed(decimals);
}

function fmtCur(n: number, sym: string): string {
  if (!isFinite(n) || isNaN(n)) return "--";
  const sign = n < 0 ? "-" : "";
  return `${sign}${sym}${Math.abs(n).toFixed(2)}`;
}

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
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
      <span className="text-[#f0f0f5]">Profit Margin Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Visual Bar                                                         */
/* ------------------------------------------------------------------ */

function ProfitBar({ cost, profit }: { cost: number; profit: number }) {
  const total = cost + profit;
  if (total <= 0 || !isFinite(total)) return null;

  const costPct = Math.max(0, Math.min(100, (cost / total) * 100));
  const profitPct = 100 - costPct;
  const isNeg = profit < 0;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between text-xs text-[#8888a0] mb-2">
        <span>Cost ({fmt(costPct, 1)}%)</span>
        <span>{isNeg ? "Loss" : "Profit"} ({fmt(profitPct, 1)}%)</span>
      </div>
      <div className="w-full h-4 rounded-full overflow-hidden flex bg-[#0a0a0f]">
        <div
          className="h-full bg-[#7c6cf0] transition-all duration-300"
          style={{ width: `${costPct}%` }}
        />
        <div
          className={`h-full transition-all duration-300 ${
            isNeg ? "bg-red-500" : "bg-[#00e676]"
          }`}
          style={{ width: `${profitPct}%` }}
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result Card                                                        */
/* ------------------------------------------------------------------ */

function ResultCard({
  label,
  value,
  color = "white",
}: {
  label: string;
  value: string;
  color?: "white" | "green" | "red" | "purple";
}) {
  const colorMap = {
    white: "text-white",
    green: "text-[#00e676]",
    red: "text-red-400",
    purple: "text-[#9d90f5]",
  };

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-4 text-center">
      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={`text-xl sm:text-2xl font-bold ${colorMap[color]}`}>
        {value}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Input Field                                                        */
/* ------------------------------------------------------------------ */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  prefix,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  prefix?: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
        {label}
      </label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 text-sm text-white placeholder-[#555] focus:outline-none focus:border-[#7c6cf0] transition-colors ${
            prefix ? "pl-9 pr-4" : "px-4"
          } ${suffix ? "pr-10" : ""}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ProfitMarginCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("margin");
  const [currency, setCurrency] = useState("$");

  // Margin mode
  const [costPrice, setCostPrice] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");

  // Markup mode
  const [markupCost, setMarkupCost] = useState("");
  const [markupPct, setMarkupPct] = useState("");

  // Target margin mode
  const [targetCost, setTargetCost] = useState("");
  const [targetMarginPct, setTargetMarginPct] = useState("");

  // Break-even mode
  const [fixedCosts, setFixedCosts] = useState("");
  const [variableCost, setVariableCost] = useState("");
  const [beSellingPrice, setBeSellingPrice] = useState("");

  /* ---- Swap for margin mode ---- */
  const handleSwap = () => {
    const temp = costPrice;
    setCostPrice(sellingPrice);
    setSellingPrice(temp);
  };

  /* ---- Calculations ---- */

  const marginResults = useMemo(() => {
    const cost = parseNum(costPrice);
    const sell = parseNum(sellingPrice);
    if (!cost && !sell) return null;
    const profit = sell - cost;
    const marginPct = sell !== 0 ? (profit / sell) * 100 : 0;
    const markupPct = cost !== 0 ? (profit / cost) * 100 : 0;
    return { revenue: sell, cost, profit, marginPct, markupPct };
  }, [costPrice, sellingPrice]);

  const markupResults = useMemo(() => {
    const cost = parseNum(markupCost);
    const markup = parseNum(markupPct);
    if (!cost && !markup) return null;
    const profit = cost * (markup / 100);
    const sell = cost + profit;
    const marginPct = sell !== 0 ? (profit / sell) * 100 : 0;
    return { revenue: sell, cost, profit, marginPct, markupPct: markup };
  }, [markupCost, markupPct]);

  const targetResults = useMemo(() => {
    const cost = parseNum(targetCost);
    const margin = parseNum(targetMarginPct);
    if (!cost && !margin) return null;
    const sell = margin !== 100 ? cost / (1 - margin / 100) : 0;
    const profit = sell - cost;
    const markupPctCalc = cost !== 0 ? (profit / cost) * 100 : 0;
    return {
      revenue: sell,
      cost,
      profit,
      marginPct: margin,
      markupPct: markupPctCalc,
    };
  }, [targetCost, targetMarginPct]);

  const breakevenResults = useMemo(() => {
    const fc = parseNum(fixedCosts);
    const vc = parseNum(variableCost);
    const sp = parseNum(beSellingPrice);
    if (!fc && !vc && !sp) return null;
    const contribution = sp - vc;
    const units = contribution > 0 ? Math.ceil(fc / contribution) : 0;
    const revenue = units * sp;
    return { units, revenue, contribution };
  }, [fixedCosts, variableCost, beSellingPrice]);

  /* ---- Shared select classes ---- */
  const inputSectionClasses =
    "rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8";

  return (
    <>
      <head>
        <title>Free Profit Margin Calculator — PrestoKit</title>
        <meta
          name="description"
          content="Calculate profit margins, markups, and break-even points for your products and services. Free, instant, no sign-up."
        />
      </head>

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              <span className="text-gradient-primary">Profit Margin</span>{" "}
              Calculator
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate profit margins, markups, and break-even points instantly.
              All calculations happen in real time as you type.
            </p>
          </div>

          {/* Currency Selector */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-sm text-[#8888a0]">Currency:</span>
            <div className="flex gap-1">
              {CURRENCIES.map((c) => (
                <button
                  key={c.symbol}
                  onClick={() => setCurrency(c.symbol)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-medium border transition-all ${
                    currency === c.symbol
                      ? "border-[#7c6cf0] bg-[#7c6cf0]/15 text-[#9d90f5]"
                      : "border-[#1e1e2e] bg-[#12121a] text-[#8888a0] hover:border-[#7c6cf0]/40"
                  }`}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  mode === m.key
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 shadow-[0_0_20px_rgba(124,108,240,0.1)]"
                    : "border-[#1e1e2e] bg-[#12121a] hover:border-[#7c6cf0]/40"
                }`}
              >
                <div
                  className={`text-sm font-semibold mb-0.5 ${
                    mode === m.key ? "text-[#9d90f5]" : "text-white"
                  }`}
                >
                  {m.label}
                </div>
                <div className="text-xs text-[#8888a0]">{m.description}</div>
              </button>
            ))}
          </div>

          {/* ==================== MARGIN MODE ==================== */}
          {mode === "margin" && (
            <div className={inputSectionClasses}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="Cost Price"
                  value={costPrice}
                  onChange={setCostPrice}
                  placeholder="0.00"
                  prefix={currency}
                />
                <InputField
                  label="Selling Price"
                  value={sellingPrice}
                  onChange={setSellingPrice}
                  placeholder="0.00"
                  prefix={currency}
                />
              </div>

              {/* Swap button */}
              <button
                onClick={handleSwap}
                className="flex items-center gap-2 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-2 text-xs font-medium text-[#8888a0] hover:text-white hover:border-[#7c6cf0]/50 transition-all mb-6"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                </svg>
                Swap Cost &amp; Selling Price
              </button>

              {/* Results */}
              {marginResults && (costPrice || sellingPrice) && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <ResultCard
                      label="Revenue"
                      value={fmtCur(marginResults.revenue, currency)}
                    />
                    <ResultCard
                      label="Cost"
                      value={fmtCur(marginResults.cost, currency)}
                    />
                    <ResultCard
                      label="Profit"
                      value={fmtCur(marginResults.profit, currency)}
                      color={marginResults.profit >= 0 ? "green" : "red"}
                    />
                    <ResultCard
                      label="Margin %"
                      value={`${fmt(marginResults.marginPct)}%`}
                      color={marginResults.marginPct >= 0 ? "green" : "red"}
                    />
                    <ResultCard
                      label="Markup %"
                      value={`${fmt(marginResults.markupPct)}%`}
                      color="purple"
                    />
                  </div>
                  <ProfitBar
                    cost={marginResults.cost}
                    profit={marginResults.profit}
                  />
                </>
              )}
            </div>
          )}

          {/* ==================== MARKUP MODE ==================== */}
          {mode === "markup" && (
            <div className={inputSectionClasses}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="Cost Price"
                  value={markupCost}
                  onChange={setMarkupCost}
                  placeholder="0.00"
                  prefix={currency}
                />
                <InputField
                  label="Desired Markup %"
                  value={markupPct}
                  onChange={setMarkupPct}
                  placeholder="e.g. 50"
                  suffix="%"
                />
              </div>

              {markupResults && (markupCost || markupPct) && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <ResultCard
                      label="Selling Price"
                      value={fmtCur(markupResults.revenue, currency)}
                      color="purple"
                    />
                    <ResultCard
                      label="Cost"
                      value={fmtCur(markupResults.cost, currency)}
                    />
                    <ResultCard
                      label="Profit"
                      value={fmtCur(markupResults.profit, currency)}
                      color={markupResults.profit >= 0 ? "green" : "red"}
                    />
                    <ResultCard
                      label="Margin %"
                      value={`${fmt(markupResults.marginPct)}%`}
                      color={markupResults.marginPct >= 0 ? "green" : "red"}
                    />
                    <ResultCard
                      label="Markup %"
                      value={`${fmt(markupResults.markupPct)}%`}
                      color="purple"
                    />
                  </div>
                  <ProfitBar
                    cost={markupResults.cost}
                    profit={markupResults.profit}
                  />
                </>
              )}
            </div>
          )}

          {/* ==================== TARGET MARGIN MODE ==================== */}
          {mode === "target" && (
            <div className={inputSectionClasses}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="Cost Price"
                  value={targetCost}
                  onChange={setTargetCost}
                  placeholder="0.00"
                  prefix={currency}
                />
                <InputField
                  label="Desired Margin %"
                  value={targetMarginPct}
                  onChange={setTargetMarginPct}
                  placeholder="e.g. 40"
                  suffix="%"
                />
              </div>

              {targetResults && (targetCost || targetMarginPct) && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    <ResultCard
                      label="Required Price"
                      value={fmtCur(targetResults.revenue, currency)}
                      color="purple"
                    />
                    <ResultCard
                      label="Cost"
                      value={fmtCur(targetResults.cost, currency)}
                    />
                    <ResultCard
                      label="Profit"
                      value={fmtCur(targetResults.profit, currency)}
                      color={targetResults.profit >= 0 ? "green" : "red"}
                    />
                    <ResultCard
                      label="Margin %"
                      value={`${fmt(targetResults.marginPct)}%`}
                      color={targetResults.marginPct >= 0 ? "green" : "red"}
                    />
                    <ResultCard
                      label="Markup %"
                      value={`${fmt(targetResults.markupPct)}%`}
                      color="purple"
                    />
                  </div>
                  <ProfitBar
                    cost={targetResults.cost}
                    profit={targetResults.profit}
                  />
                </>
              )}
            </div>
          )}

          {/* ==================== BREAK-EVEN MODE ==================== */}
          {mode === "breakeven" && (
            <div className={inputSectionClasses}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <InputField
                  label="Fixed Costs"
                  value={fixedCosts}
                  onChange={setFixedCosts}
                  placeholder="e.g. 5000"
                  prefix={currency}
                />
                <InputField
                  label="Variable Cost / Unit"
                  value={variableCost}
                  onChange={setVariableCost}
                  placeholder="e.g. 12"
                  prefix={currency}
                />
                <InputField
                  label="Selling Price / Unit"
                  value={beSellingPrice}
                  onChange={setBeSellingPrice}
                  placeholder="e.g. 25"
                  prefix={currency}
                />
              </div>

              {breakevenResults &&
                (fixedCosts || variableCost || beSellingPrice) && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <ResultCard
                      label="Break-Even Units"
                      value={
                        breakevenResults.units > 0
                          ? breakevenResults.units.toLocaleString()
                          : "--"
                      }
                      color="purple"
                    />
                    <ResultCard
                      label="Break-Even Revenue"
                      value={
                        breakevenResults.revenue > 0
                          ? fmtCur(breakevenResults.revenue, currency)
                          : "--"
                      }
                      color="green"
                    />
                    <ResultCard
                      label="Contribution / Unit"
                      value={
                        breakevenResults.contribution > 0
                          ? fmtCur(breakevenResults.contribution, currency)
                          : "--"
                      }
                      color={
                        breakevenResults.contribution > 0 ? "green" : "red"
                      }
                    />
                  </div>
                )}
            </div>
          )}

          {/* Margin vs Markup Explainer */}
          <div className="mt-10 rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Margin vs. Markup: What&apos;s the Difference?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-[#c0c0d0] leading-relaxed">
              <div>
                <h3 className="text-[#9d90f5] font-medium mb-2">
                  Profit Margin
                </h3>
                <p className="mb-2">
                  Margin is the percentage of the <strong className="text-white">selling price</strong> that
                  is profit. It tells you how much of every dollar earned is
                  actual profit.
                </p>
                <div className="rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-3 font-mono text-xs text-[#8888a0]">
                  Margin = (Selling Price - Cost) / Selling Price x 100
                </div>
              </div>
              <div>
                <h3 className="text-[#00e676] font-medium mb-2">Markup</h3>
                <p className="mb-2">
                  Markup is the percentage of the <strong className="text-white">cost</strong> that you add
                  on top to get the selling price. It tells you how much
                  you&apos;re charging above cost.
                </p>
                <div className="rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-3 font-mono text-xs text-[#8888a0]">
                  Markup = (Selling Price - Cost) / Cost x 100
                </div>
              </div>
            </div>
            <div className="mt-5 rounded-lg bg-[#7c6cf0]/10 border border-[#7c6cf0]/20 p-4">
              <p className="text-sm text-[#c0c0d0]">
                <strong className="text-[#9d90f5]">Example:</strong> A product
                costs {currency}40 and sells for {currency}100. The profit is{" "}
                {currency}60. The <strong className="text-white">margin</strong> is 60% (60/100), but the{" "}
                <strong className="text-white">markup</strong> is 150% (60/40). Same product, same
                profit, different percentages.
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
