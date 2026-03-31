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
    question: "What is the margin of safety?",
    answer:
      "Margin of safety is the difference between your expected or target sales volume and the break-even point. It tells you how far sales can drop before you start losing money. A higher margin of safety means a more comfortable cushion. It's calculated as: (Target Units - Break-Even Units) / Target Units x 100, expressed as a percentage.",
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
/*  Break-Even SVG Chart                                               */
/* ------------------------------------------------------------------ */

function BreakEvenChart({
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

  const W = 520;
  const H = 300;
  const PAD_LEFT = 70;
  const PAD_BOTTOM = 40;
  const PAD_TOP = 20;
  const PAD_RIGHT = 20;

  const chartW = W - PAD_LEFT - PAD_RIGHT;
  const chartH = H - PAD_BOTTOM - PAD_TOP;

  // X domain: 0 to 2x break-even units
  const maxUnits = breakEvenUnits * 2;
  // Y domain: 0 to max(revenue, totalCost) at maxUnits
  const maxRevenue = maxUnits * pricePerUnit;
  const maxTotalCost = fixedCosts + maxUnits * variableCostPerUnit;
  const maxY = Math.max(maxRevenue, maxTotalCost) * 1.05;

  function xPx(units: number) {
    return PAD_LEFT + (units / maxUnits) * chartW;
  }
  function yPx(dollars: number) {
    return PAD_TOP + chartH - (dollars / maxY) * chartH;
  }

  // Points for revenue line: (0, 0) to (maxUnits, maxRevenue)
  const revPath = `M ${xPx(0)} ${yPx(0)} L ${xPx(maxUnits)} ${yPx(maxRevenue)}`;

  // Points for total cost line: (0, fixedCosts) to (maxUnits, maxTotalCost)
  const costPath = `M ${xPx(0)} ${yPx(fixedCosts)} L ${xPx(maxUnits)} ${yPx(maxTotalCost)}`;

  // Fixed cost line: horizontal at y = fixedCosts
  const fixedPath = `M ${xPx(0)} ${yPx(fixedCosts)} L ${xPx(maxUnits)} ${yPx(fixedCosts)}`;

  // Break-even point
  const bePx = xPx(breakEvenUnits);
  const bePy = yPx(breakEvenUnits * pricePerUnit);

  // Y-axis tick values
  const yTicks = 5;
  const yTickVals = Array.from({ length: yTicks + 1 }, (_, i) => (maxY / yTicks) * i);

  // X-axis tick values
  const xTicks = 4;
  const xTickVals = Array.from({ length: xTicks + 1 }, (_, i) =>
    Math.round((maxUnits / xTicks) * i)
  );

  function fmtShort(n: number): string {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${Math.round(n)}`;
  }

  return (
    <div className="w-full overflow-x-auto">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full max-w-[520px] mx-auto"
        style={{ minWidth: 280 }}
      >
        {/* Grid lines */}
        {yTickVals.map((v, i) => (
          <line
            key={i}
            x1={PAD_LEFT}
            y1={yPx(v)}
            x2={W - PAD_RIGHT}
            y2={yPx(v)}
            stroke="#1e1e2e"
            strokeWidth={1}
          />
        ))}

        {/* Break-even vertical guide */}
        <line
          x1={bePx}
          y1={PAD_TOP}
          x2={bePx}
          y2={H - PAD_BOTTOM}
          stroke="#7c6cf0"
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0.5}
        />

        {/* Fixed cost line */}
        <path d={fixedPath} stroke="#8888a0" strokeWidth={1.5} strokeDasharray="5 3" fill="none" />

        {/* Revenue line */}
        <path d={revPath} stroke="#00e676" strokeWidth={2} fill="none" />

        {/* Total cost line */}
        <path d={costPath} stroke="#ff5252" strokeWidth={2} fill="none" />

        {/* Break-even dot */}
        <circle cx={bePx} cy={bePy} r={5} fill="#7c6cf0" />
        <circle cx={bePx} cy={bePy} r={9} fill="#7c6cf0" opacity={0.2} />

        {/* Break-even label */}
        <text
          x={bePx + 10}
          y={bePy - 8}
          fill="#c0b0ff"
          fontSize={10}
          fontWeight="600"
        >
          Break-Even
        </text>
        <text
          x={bePx + 10}
          y={bePy + 4}
          fill="#a090e0"
          fontSize={9}
        >
          {Math.ceil(breakEvenUnits).toLocaleString()} units
        </text>

        {/* Axes */}
        <line
          x1={PAD_LEFT}
          y1={PAD_TOP}
          x2={PAD_LEFT}
          y2={H - PAD_BOTTOM}
          stroke="#2a2a3a"
          strokeWidth={1.5}
        />
        <line
          x1={PAD_LEFT}
          y1={H - PAD_BOTTOM}
          x2={W - PAD_RIGHT}
          y2={H - PAD_BOTTOM}
          stroke="#2a2a3a"
          strokeWidth={1.5}
        />

        {/* Y-axis labels */}
        {yTickVals.map((v, i) => (
          <text
            key={i}
            x={PAD_LEFT - 6}
            y={yPx(v) + 4}
            fill="#555566"
            fontSize={9}
            textAnchor="end"
          >
            {fmtShort(v)}
          </text>
        ))}

        {/* X-axis labels */}
        {xTickVals.map((v, i) => (
          <text
            key={i}
            x={xPx(v)}
            y={H - PAD_BOTTOM + 14}
            fill="#555566"
            fontSize={9}
            textAnchor="middle"
          >
            {v.toLocaleString()}
          </text>
        ))}

        {/* Axis titles */}
        <text
          x={PAD_LEFT + chartW / 2}
          y={H - 2}
          fill="#555566"
          fontSize={9}
          textAnchor="middle"
        >
          Units Sold
        </text>

        {/* Legend */}
        <g transform={`translate(${PAD_LEFT + 8}, ${PAD_TOP + 6})`}>
          <line x1={0} y1={5} x2={16} y2={5} stroke="#00e676" strokeWidth={2} />
          <text x={20} y={9} fill="#8888a0" fontSize={9}>
            Revenue
          </text>
          <line x1={60} y1={5} x2={76} y2={5} stroke="#ff5252" strokeWidth={2} />
          <text x={80} y={9} fill="#8888a0" fontSize={9}>
            Total Cost
          </text>
          <line
            x1={135}
            y1={5}
            x2={151}
            y2={5}
            stroke="#8888a0"
            strokeWidth={1.5}
            strokeDasharray="4 3"
          />
          <text x={155} y={9} fill="#8888a0" fontSize={9}>
            Fixed Cost
          </text>
        </g>
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sensitivity Analysis Table                                         */
/* ------------------------------------------------------------------ */

function SensitivityTable({
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
  const variations = [-30, -20, -10, 0, 10, 20, 30];

  const fmt = (n: number, dec = 0) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1e1e2e]">
            <th className="text-left pb-3 text-xs text-[#8888a0] font-medium">
              Price Change
            </th>
            <th className="text-right pb-3 text-xs text-[#8888a0] font-medium">
              New Price
            </th>
            <th className="text-right pb-3 text-xs text-[#8888a0] font-medium">
              Break-Even Units
            </th>
            <th className="text-right pb-3 text-xs text-[#8888a0] font-medium">
              Change vs. Base
            </th>
            <th className="text-right pb-3 text-xs text-[#8888a0] font-medium">
              Break-Even Revenue
            </th>
          </tr>
        </thead>
        <tbody>
          {variations.map((pct) => {
            const newPrice = pricePerUnit * (1 + pct / 100);
            const cm = newPrice - variableCostPerUnit;
            const beUnits = cm > 0 ? fixedCosts / cm : Infinity;
            const delta = beUnits - breakEvenUnits;
            const beRev = beUnits * newPrice;
            const isBase = pct === 0;
            const isInfeasible = !isFinite(beUnits);

            return (
              <tr
                key={pct}
                className={`border-b border-[#1e1e2e]/60 last:border-0 ${
                  isBase ? "bg-[#7c6cf0]/5" : ""
                }`}
              >
                <td className="py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-0.5 ${
                      isBase
                        ? "bg-[#7c6cf0]/20 text-[#7c6cf0]"
                        : pct < 0
                        ? "bg-[#ff5252]/10 text-[#ff5252]"
                        : "bg-[#00e676]/10 text-[#00e676]"
                    }`}
                  >
                    {pct === 0 ? "Base" : pct > 0 ? `+${pct}%` : `${pct}%`}
                  </span>
                </td>
                <td className="py-3 text-right text-[#c0c0d0] tabular-nums">
                  ${fmt(newPrice, 2)}
                </td>
                <td
                  className="py-3 text-right font-semibold tabular-nums"
                  style={{ color: isBase ? "#7c6cf0" : isInfeasible ? "#ff5252" : "#e0e0ea" }}
                >
                  {isInfeasible ? "Impossible" : fmt(Math.ceil(beUnits))}
                </td>
                <td
                  className="py-3 text-right text-xs tabular-nums font-medium"
                  style={{
                    color: isBase ? "#8888a0" : delta < 0 ? "#00e676" : "#ff5252",
                  }}
                >
                  {isBase
                    ? "—"
                    : isInfeasible
                    ? "N/A"
                    : delta < 0
                    ? `${fmt(Math.ceil(delta))} units`
                    : `+${fmt(Math.ceil(delta))} units`}
                </td>
                <td className="py-3 text-right text-[#8888a0] tabular-nums text-xs">
                  {isInfeasible ? "—" : `$${fmt(Math.round(beRev))}`}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <p className="text-[10px] text-[#555566] mt-3">
        Sensitivity analysis shows how break-even units shift when your selling price changes, holding
        fixed costs and variable costs constant.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  What-If Scenarios                                                  */
/* ------------------------------------------------------------------ */

function WhatIfPanel({
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
  const percentages = [50, 75, 100, 125, 150, 200];

  const fmt = (n: number, dec = 0) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: dec,
      maximumFractionDigits: dec,
    });

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-[#1e1e2e]">
            <th className="text-left pb-3 text-xs text-[#8888a0] font-medium">
              Volume
            </th>
            <th className="text-right pb-3 text-xs text-[#8888a0] font-medium">
              Units Sold
            </th>
            <th className="text-right pb-3 text-xs text-[#8888a0] font-medium">
              Revenue
            </th>
            <th className="text-right pb-3 text-xs text-[#8888a0] font-medium">
              Total Cost
            </th>
            <th className="text-right pb-3 text-xs text-[#8888a0] font-medium">
              Profit / Loss
            </th>
          </tr>
        </thead>
        <tbody>
          {percentages.map((pct) => {
            const units = Math.ceil(breakEvenUnits * (pct / 100));
            const rev = units * pricePerUnit;
            const totalCost = fixedCosts + units * variableCostPerUnit;
            const profit = rev - totalCost;
            const isBreakEven = pct === 100;

            return (
              <tr
                key={pct}
                className={`border-b border-[#1e1e2e]/60 last:border-0 ${
                  isBreakEven ? "bg-[#7c6cf0]/5" : ""
                }`}
              >
                <td className="py-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold rounded-full px-2 py-0.5 ${
                      isBreakEven
                        ? "bg-[#7c6cf0]/20 text-[#7c6cf0]"
                        : pct < 100
                        ? "bg-[#ff5252]/10 text-[#ff5252]"
                        : "bg-[#00e676]/10 text-[#00e676]"
                    }`}
                  >
                    {pct}% of BE
                  </span>
                </td>
                <td className="py-3 text-right text-[#c0c0d0] tabular-nums">
                  {fmt(units)}
                </td>
                <td className="py-3 text-right text-[#c0c0d0] tabular-nums">
                  ${fmt(Math.round(rev))}
                </td>
                <td className="py-3 text-right text-[#c0c0d0] tabular-nums">
                  ${fmt(Math.round(totalCost))}
                </td>
                <td
                  className="py-3 text-right font-bold tabular-nums"
                  style={{ color: profit >= 0 ? "#00e676" : "#ff5252" }}
                >
                  {profit >= 0 ? "+" : ""}${fmt(Math.round(profit))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
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
  const [targetUnits, setTargetUnits] = useState("");

  const results = useMemo(() => {
    const fc = parseFloat(fixedCosts) || 0;
    const vc = parseFloat(variableCost) || 0;
    const p = parseFloat(price) || 0;
    const tu = parseFloat(targetUnits) || 0;

    const contributionMargin = p - vc;
    const contributionMarginRatio = p > 0 ? contributionMargin / p : 0;
    const breakEvenUnits = contributionMargin > 0 ? fc / contributionMargin : 0;
    const breakEvenRevenue = breakEvenUnits * p;

    // Margin of Safety (only if target units entered and > break-even)
    const marginOfSafetyUnits =
      tu > 0 && breakEvenUnits > 0 ? tu - breakEvenUnits : null;
    const marginOfSafetyPct =
      marginOfSafetyUnits !== null && tu > 0
        ? (marginOfSafetyUnits / tu) * 100
        : null;

    return {
      fixedCosts: fc,
      variableCost: vc,
      price: p,
      contributionMargin,
      contributionMarginRatio,
      breakEvenUnits,
      breakEvenRevenue,
      targetUnits: tu,
      marginOfSafetyUnits,
      marginOfSafetyPct,
    };
  }, [fixedCosts, variableCost, price, targetUnits]);

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
      "Calculate your break-even point in units and revenue. Visual break-even chart, sensitivity analysis, and what-if scenarios. Enter fixed costs, variable cost per unit, and price per unit for instant analysis.",
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

  const hasResults =
    results.contributionMargin > 0 && results.breakEvenUnits > 0;

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
              Calculate your break-even point with a visual chart, sensitivity
              analysis, and what-if scenarios. More powerful than any free
              break-even tool available online.
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

                {/* Target Units (optional) */}
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Target Sales Volume{" "}
                    <span className="text-[#555566] font-normal">(optional)</span>
                  </label>
                  <p className="text-xs text-[#555566] mb-2">
                    Enter expected units sold to calculate margin of safety
                  </p>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    value={targetUnits}
                    onChange={(e) => setTargetUnits(e.target.value)}
                    placeholder="e.g. 600"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
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
              {/* Core Break-Even Results */}
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
                </div>
              </div>

              {/* Unit Economics Summary */}
              {hasResults && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                  <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                    Unit Economics Summary
                  </h2>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-[#1e1e2e]/60">
                      <span className="text-xs text-[#8888a0]">Selling Price</span>
                      <span className="text-sm font-semibold text-white">
                        ${fmt(results.price, 2)} / unit
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#1e1e2e]/60">
                      <span className="text-xs text-[#8888a0]">Variable Cost</span>
                      <span className="text-sm font-semibold text-[#ff5252]">
                        −${fmt(results.variableCost, 2)} / unit
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#1e1e2e]/60">
                      <span className="text-xs text-[#8888a0]">Contribution Margin</span>
                      <span className="text-sm font-bold text-[#00e676]">
                        ${fmt(results.contributionMargin, 2)} / unit
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#1e1e2e]/60">
                      <span className="text-xs text-[#8888a0]">CM Ratio</span>
                      <span className="text-sm font-semibold text-[#9d90f5]">
                        {(results.contributionMarginRatio * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-[#1e1e2e]/60">
                      <span className="text-xs text-[#8888a0]">Fixed Costs / Break-Even Unit</span>
                      <span className="text-sm font-semibold text-white">
                        ${fmt(results.fixedCosts / Math.max(results.breakEvenUnits, 1), 2)}
                      </span>
                    </div>
                    {results.marginOfSafetyUnits !== null &&
                      results.marginOfSafetyPct !== null && (
                        <>
                          <div className="flex justify-between items-center py-2 border-b border-[#1e1e2e]/60">
                            <span className="text-xs text-[#8888a0]">Margin of Safety (Units)</span>
                            <span
                              className="text-sm font-bold"
                              style={{
                                color:
                                  results.marginOfSafetyUnits >= 0
                                    ? "#00e676"
                                    : "#ff5252",
                              }}
                            >
                              {results.marginOfSafetyUnits >= 0 ? "+" : ""}
                              {fmt(Math.round(results.marginOfSafetyUnits))} units
                            </span>
                          </div>
                          <div className="flex justify-between items-center py-2">
                            <span className="text-xs text-[#8888a0]">
                              Margin of Safety (%)
                            </span>
                            <span
                              className="text-sm font-bold"
                              style={{
                                color:
                                  results.marginOfSafetyPct >= 0
                                    ? "#00e676"
                                    : "#ff5252",
                              }}
                            >
                              {results.marginOfSafetyPct.toFixed(1)}%
                            </span>
                          </div>
                        </>
                      )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Break-Even SVG Chart */}
          {hasResults && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-2">
                Break-Even Chart
              </h2>
              <p className="text-xs text-[#555566] mb-6">
                Revenue line (green) crosses Total Cost line (red) at the break-even
                point. Fixed Cost line (gray dashed) shows your floor cost.
              </p>
              <BreakEvenChart
                fixedCosts={results.fixedCosts}
                variableCostPerUnit={results.variableCost}
                pricePerUnit={results.price}
                breakEvenUnits={results.breakEvenUnits}
              />
            </div>
          )}

          {/* Sensitivity Analysis */}
          {hasResults && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white mb-1">
                  Price Sensitivity Analysis
                </h2>
                <p className="text-sm text-[#8888a0]">
                  See how break-even units change as your selling price shifts
                  ±30%. This analysis is not available on most free break-even
                  calculators.
                </p>
              </div>
              <SensitivityTable
                fixedCosts={results.fixedCosts}
                variableCostPerUnit={results.variableCost}
                pricePerUnit={results.price}
                breakEvenUnits={results.breakEvenUnits}
              />
            </div>
          )}

          {/* What-If Scenarios */}
          {hasResults && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <div className="mb-5">
                <h2 className="text-lg font-semibold text-white mb-1">
                  What-If Volume Scenarios
                </h2>
                <p className="text-sm text-[#8888a0]">
                  What happens to your profit or loss if you sell more or less than
                  your break-even volume?
                </p>
              </div>
              <WhatIfPanel
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
                  title: "Explore Results",
                  description:
                    "See your break-even point, a visual chart, price sensitivity table, what-if scenarios, and full unit economics summary.",
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
                    "Calculate return on investment for any project or business decision, with scenario comparison.",
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
