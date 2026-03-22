"use client";

import { useState, useMemo } from "react";
import PromoBar from "@/components/PromoBar";

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
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

          {/* ==================== PROMO BANNERS ==================== */}
          <div className="mt-10">
            <PromoBar
              type="gumroad"
              dismissKey="profit-margin-gumroad"
              product={{
                name: "Freelancer Pricing Calculator",
                price: "$9",
                description: "Spreadsheet tool that calculates your ideal hourly rate, project pricing, and profit margins based on your expenses and income goals.",
                url: "/products/freelancer-pricing-calculator.html",
              }}
            />
            <PromoBar
              type="pro"
              dismissKey="profit-margin-pro"
            />
          </div>

          {/* ==================== HOW IT WORKS ==================== */}
          <section className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              How It <span className="text-[#9d90f5]">Works</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose Your Calculation",
                  desc: "Select from four modes: standard margin, markup, target margin, or break-even analysis. Pick the one that matches the numbers you already have.",
                },
                {
                  step: "2",
                  title: "Enter Your Numbers",
                  desc: "Type in your cost price, selling price, markup percentage, or fixed costs. Results update in real time as you type -- no buttons to click.",
                },
                {
                  step: "3",
                  title: "Get Instant Results",
                  desc: "See your profit margin, markup percentage, profit amount, and visual cost-vs-profit breakdown instantly. Use the insights to price with confidence.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 border border-[#7c6cf0]/40 flex items-center justify-center text-[#9d90f5] font-bold text-lg mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold text-base mb-2">
                    {item.title}
                  </h3>
                  <p className="text-[#8888a0] text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* ==================== FAQ SECTION ==================== */}
          <section className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              Frequently Asked <span className="text-[#9d90f5]">Questions</span>
            </h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              <FAQItem
                question="What is profit margin and how is it calculated?"
                answer="Profit margin is the percentage of revenue that remains as profit after all costs are subtracted. It is calculated by dividing the profit (selling price minus cost) by the selling price, then multiplying by 100. For example, if you sell a product for $100 and it costs you $60, your profit is $40 and your profit margin is 40%. Profit margin is one of the most important metrics for any business because it tells you how efficiently you are turning revenue into actual profit. A higher margin means more of every dollar you earn stays in your pocket."
              />
              <FAQItem
                question="What's the difference between profit margin and markup?"
                answer="Profit margin and markup both measure profitability, but they use different bases for the calculation. Margin is calculated as a percentage of the selling price, while markup is calculated as a percentage of the cost. For example, if a product costs $50 and sells for $100, the profit is $50. The margin is 50% (50/100), but the markup is 100% (50/50). This distinction matters because a 50% markup does not equal a 50% margin. Many pricing mistakes happen when business owners confuse the two. As a rule of thumb, markup will always be a higher number than margin for the same product."
              />
              <FAQItem
                question="What is a good profit margin for a small business?"
                answer="A 'good' profit margin varies significantly by industry. As a general guide, a net profit margin of 10% is considered average, 20% is considered good, and 5% or below is considered low. However, grocery stores and restaurants often operate on margins as thin as 1-3%, while software companies can achieve margins of 50-80%. Service-based businesses like consulting typically have higher margins (30-50%) because they have lower cost of goods sold. The key is to benchmark against your specific industry and focus on improving your margin over time rather than comparing across industries."
              />
              <FAQItem
                question="How do I calculate my break-even point?"
                answer="Your break-even point is the number of units you need to sell to cover all of your costs -- both fixed and variable. The formula is: Break-Even Units = Fixed Costs / (Selling Price Per Unit - Variable Cost Per Unit). Fixed costs are expenses that stay the same regardless of sales volume, like rent, salaries, and insurance. Variable costs change with production volume, like materials and shipping. For example, if your fixed costs are $10,000 per month, your product sells for $50, and your variable cost per unit is $20, your break-even point is 334 units ($10,000 / $30). You can calculate this instantly using the Break-Even mode above."
              />
              <FAQItem
                question="What's the difference between gross and net profit margin?"
                answer="Gross profit margin only accounts for the direct costs of producing or purchasing your product (cost of goods sold). Net profit margin accounts for all expenses including operating costs, taxes, interest, depreciation, and every other business expense. Gross margin tells you how efficiently you produce or source your products, while net margin tells you how profitable your entire business is after everything is paid. For example, a business might have a 60% gross margin but only a 15% net margin after accounting for rent, payroll, marketing, and other overhead. Both metrics are important -- gross margin helps you price products correctly, while net margin shows your true bottom line."
              />
              <FAQItem
                question="How can I improve my profit margins?"
                answer="There are several proven strategies to improve profit margins. First, increase your prices -- even a small price increase can have a significant impact on margins since it goes straight to profit. Second, reduce your cost of goods sold by negotiating with suppliers, buying in bulk, or finding more affordable alternatives. Third, cut unnecessary overhead expenses like unused subscriptions, redundant tools, or inefficient processes. Fourth, focus on selling higher-margin products or services -- not all products are equally profitable. Fifth, improve operational efficiency by automating repetitive tasks and streamlining workflows. Sixth, reduce customer acquisition costs by focusing on retention and referrals. The best approach is to combine several of these strategies for compounding improvement."
              />
            </div>
          </section>

          {/* ==================== RELATED TOOLS ==================== */}
          <section className="mt-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8 text-center">
              Related <span className="text-[#9d90f5]">Tools</span>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                {
                  title: "Invoice Generator",
                  desc: "Create professional invoices for free. Add line items, tax, and download as PDF.",
                  href: "/tools/invoice-generator",
                },
                {
                  title: "Estimate Builder",
                  desc: "Build detailed project estimates and quotes to send to clients in seconds.",
                  href: "/tools/estimate-builder",
                },
                {
                  title: "Receipt Maker",
                  desc: "Generate clean, professional receipts for any transaction. Print or save as PDF.",
                  href: "/tools/receipt-maker",
                },
              ].map((tool) => (
                <a
                  key={tool.href}
                  href={tool.href}
                  className="group rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 hover:border-[#7c6cf0]/40 hover:shadow-[0_0_24px_rgba(124,108,240,0.08)] transition-all"
                >
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#9d90f5] transition-colors">
                    {tool.title}
                  </h3>
                  <p className="text-[#8888a0] text-sm leading-relaxed">
                    {tool.desc}
                  </p>
                  <span className="inline-block mt-3 text-xs text-[#7c6cf0] font-medium">
                    Try it free &rarr;
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ==================== RECOMMENDED TOOLS ==================== */}
          <section className="max-w-4xl mx-auto px-4 pt-16 pb-0">
            <h2 className="text-2xl font-bold text-center mb-2">
              Level Up Your <span className="text-[#7c6cf0]">Workflow</span>
            </h2>
            <p className="text-[#8888a0] text-center mb-10 max-w-xl mx-auto">
              Want to track your margins automatically? These tools make it easy.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
              {[
                {
                  name: "QuickBooks",
                  desc: "Track profits, expenses, and margins automatically with real-time financial reports.",
                  href: "https://quickbooks.intuit.com",
                },
                {
                  name: "Bench",
                  desc: "Expert bookkeeping for small businesses — get clear profit and loss statements every month.",
                  href: "https://bench.co",
                },
              ].map((tool) => (
                <a
                  key={tool.name}
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow sponsored"
                  className="group rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 hover:border-[#7c6cf0]/40 hover:shadow-[0_0_24px_rgba(124,108,240,0.08)] transition-all"
                >
                  <h3 className="text-white font-semibold text-base mb-2 group-hover:text-[#9d90f5] transition-colors">
                    {tool.name}
                  </h3>
                  <p className="text-[#8888a0] text-sm leading-relaxed">
                    {tool.desc}
                  </p>
                  <span className="inline-block mt-3 text-xs text-[#7c6cf0] font-medium">
                    Learn more &rarr;
                  </span>
                </a>
              ))}
            </div>
          </section>

          {/* ==================== FAQ SCHEMA (JSON-LD) ==================== */}
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: [
                  {
                    "@type": "Question",
                    name: "What is profit margin and how is it calculated?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Profit margin is the percentage of revenue that remains as profit after all costs are subtracted. It is calculated by dividing the profit (selling price minus cost) by the selling price, then multiplying by 100. For example, if you sell a product for $100 and it costs you $60, your profit is $40 and your profit margin is 40%.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What's the difference between profit margin and markup?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Margin is calculated as a percentage of the selling price, while markup is calculated as a percentage of the cost. For example, if a product costs $50 and sells for $100, the margin is 50% (50/100), but the markup is 100% (50/50). Markup will always be a higher number than margin for the same product.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What is a good profit margin for a small business?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "A net profit margin of 10% is considered average, 20% is good, and 5% or below is low. However, it varies by industry. Grocery stores operate on 1-3% margins, while software companies can achieve 50-80%. Service businesses typically have 30-50% margins.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How do I calculate my break-even point?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Break-Even Units = Fixed Costs / (Selling Price Per Unit - Variable Cost Per Unit). For example, if fixed costs are $10,000/month, selling price is $50, and variable cost is $20 per unit, break-even is 334 units ($10,000 / $30).",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "What's the difference between gross and net profit margin?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Gross profit margin only accounts for direct production costs (COGS). Net profit margin accounts for all expenses including operating costs, taxes, interest, and overhead. A business might have a 60% gross margin but only 15% net margin after all expenses.",
                    },
                  },
                  {
                    "@type": "Question",
                    name: "How can I improve my profit margins?",
                    acceptedAnswer: {
                      "@type": "Answer",
                      text: "Key strategies include: increasing prices, reducing cost of goods sold through supplier negotiation, cutting overhead expenses, focusing on higher-margin products, improving operational efficiency, and reducing customer acquisition costs through retention and referrals.",
                    },
                  },
                ],
              }),
            }}
          />
        </div>
      </main>
    </>
  );
}
