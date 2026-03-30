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
      <span className="text-[#f0f0f5]">Savings Goal Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Calculation Logic                                                  */
/* ------------------------------------------------------------------ */

interface MonthRow {
  month: number;
  contribution: number;
  interest: number;
  balance: number;
  totalContributions: number;
  totalInterest: number;
}

interface SavingsResults {
  monthsToGoal: number;
  yearsToGoal: number;
  remainingMonths: number;
  totalContributions: number;
  interestEarned: number;
  projectionTable: MonthRow[];
  alreadyThere: boolean;
  reachable: boolean;
}

function calculateSavingsGoal(
  goalAmount: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number
): SavingsResults {
  if (goalAmount <= 0) {
    return {
      monthsToGoal: 0,
      yearsToGoal: 0,
      remainingMonths: 0,
      totalContributions: currentSavings,
      interestEarned: 0,
      projectionTable: [],
      alreadyThere: currentSavings >= goalAmount,
      reachable: true,
    };
  }

  if (currentSavings >= goalAmount) {
    return {
      monthsToGoal: 0,
      yearsToGoal: 0,
      remainingMonths: 0,
      totalContributions: currentSavings,
      interestEarned: 0,
      projectionTable: [],
      alreadyThere: true,
      reachable: true,
    };
  }

  const monthlyRate = annualReturn / 100 / 12;
  const MAX_MONTHS = 600;

  let balance = currentSavings;
  let totalContributions = currentSavings;
  let totalInterest = 0;
  let monthsToGoal = 0;
  const projectionTable: MonthRow[] = [];

  for (let month = 1; month <= MAX_MONTHS; month++) {
    const interest = balance * monthlyRate;
    balance += interest + monthlyContribution;
    totalContributions += monthlyContribution;
    totalInterest += interest;

    const row: MonthRow = {
      month,
      contribution: monthlyContribution,
      interest,
      balance,
      totalContributions,
      totalInterest,
    };

    if (month <= 24) projectionTable.push(row);

    if (monthsToGoal === 0 && balance >= goalAmount) {
      monthsToGoal = month;
    }
  }

  // If never reached within MAX_MONTHS with 0 contribution rate, not reachable
  const reachable = monthlyContribution > 0 || annualReturn > 0 || currentSavings >= goalAmount;

  const years = Math.floor(monthsToGoal / 12);
  const remainingMonths = monthsToGoal % 12;

  return {
    monthsToGoal,
    yearsToGoal: years,
    remainingMonths,
    totalContributions,
    interestEarned: totalInterest,
    projectionTable,
    alreadyThere: false,
    reachable: monthsToGoal > 0,
  };
}

/* ------------------------------------------------------------------ */
/*  Mini Progress Chart                                                */
/* ------------------------------------------------------------------ */

function ProgressChart({
  data,
  goalAmount,
}: {
  data: MonthRow[];
  goalAmount: number;
}) {
  if (data.length === 0) return null;
  const maxVal = Math.max(data[data.length - 1].balance, goalAmount);
  const chartHeight = 160;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[300px]">
        <div className="flex items-end gap-0.5" style={{ height: chartHeight }}>
          {data.map((d) => {
            const barH = maxVal > 0 ? (d.balance / maxVal) * chartHeight : 0;
            const goalH = maxVal > 0 ? (goalAmount / maxVal) * chartHeight : 0;
            const isAboveGoal = d.balance >= goalAmount;
            return (
              <div
                key={d.month}
                className="flex-1 flex flex-col justify-end group relative"
                style={{ height: chartHeight }}
              >
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                  <div className="bg-[#1a1a2e] border border-[#2e2e4e] rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                    <div className="text-white font-semibold">Month {d.month}</div>
                    <div className="text-[#7c6cf0]">
                      ${d.balance.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
                {/* Goal line */}
                <div
                  className="absolute left-0 right-0 border-t border-dashed border-[#ff9100]/50"
                  style={{ bottom: goalH }}
                />
                <div
                  className="transition-all duration-300"
                  style={{
                    height: barH,
                    background: isAboveGoal
                      ? "linear-gradient(180deg, #00e676, #00c853)"
                      : "linear-gradient(180deg, #7c6cf0, #5a4fcf)",
                    minHeight: barH > 0 ? 2 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-0.5 mt-2">
          {data.map((d) => (
            <div key={d.month} className="flex-1 text-center text-[9px] text-[#555566]">
              {d.month % 6 === 0 ? d.month : ""}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#7c6cf0]" />
            <span className="text-[#8888a0]">Balance</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 border-t border-dashed border-[#ff9100]" />
            <span className="text-[#8888a0]">Goal</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#00e676]" />
            <span className="text-[#8888a0]">Goal Reached</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How long does it take to save a specific amount of money?",
    answer:
      "The time depends on three factors: how much you already have saved, how much you contribute each month, and what return you earn on your savings. This calculator uses the compound interest formula to project growth month by month. For a high-yield savings account at 5%, saving $500/month from $0 reaches $10,000 in about 19 months. Adding investment returns significantly shortens the timeline.",
  },
  {
    question: "What is a realistic savings account interest rate?",
    answer:
      "As of 2024-2025, high-yield savings accounts offer 4-5% APY. Traditional savings accounts offer 0.01-0.5%. Money market accounts often land between 4-5%. For investment accounts with a growth-oriented portfolio, historical average returns are 7-10% annually before inflation. Use 4-5% for pure savings goals and 6-7% for long-term investment goals.",
  },
  {
    question: "What's the best way to save for a specific goal?",
    answer:
      "Open a dedicated account specifically for your goal — this removes temptation and makes tracking easy. Automate contributions on payday so you save before spending. Choose an account matching your timeline: high-yield savings for goals under 3 years, investment accounts for goals 5+ years out. Name your account after your goal (e.g., 'House Down Payment') to keep motivation high.",
  },
  {
    question: "How much emergency fund should I save?",
    answer:
      "Financial experts typically recommend 3-6 months of essential living expenses in an easily accessible account. If you have variable income, work in a volatile industry, or have dependents, aim for 6-12 months. Keep your emergency fund in a high-yield savings account where it earns interest but isn't exposed to market risk. Don't invest your emergency fund in stocks.",
  },
  {
    question: "Should I save or pay off debt first?",
    answer:
      "Build a small emergency fund first ($1,000-$2,000) to avoid going deeper into debt when unexpected expenses hit. Then aggressively pay off high-interest debt (over 7%). Once high-interest debt is cleared, balance debt payoff with savings. Always capture any employer 401(k) match first — it's an immediate 50-100% return on your money.",
  },
  {
    question: "How do I save for a house down payment?",
    answer:
      "Conventional mortgages typically require 5-20% down. FHA loans require 3.5%. For a $300,000 home, that's $15,000-$60,000. Keep down payment savings in high-yield savings or short-term CDs since you'll need the money within 1-5 years and can't afford market volatility. Automate a fixed monthly transfer, open a dedicated savings account, and cut large discretionary expenses temporarily.",
  },
  {
    question: "What happens to my savings goal if I miss a month?",
    answer:
      "Missing one month delays your goal slightly but isn't catastrophic. The bigger risk is missing multiple months and losing momentum. If you miss a contribution, don't try to make it up all at once — just resume your normal amount. Build a 'savings buffer' by saving slightly more than your target when possible, so that occasional misses don't derail your timeline.",
  },
  {
    question: "Is it better to save a lump sum or contribute monthly?",
    answer:
      "Monthly contributions (dollar-cost averaging) are usually more practical and psychologically sustainable than trying to save lump sums. Monthly savings also benefit from compounding sooner. That said, investing windfalls (tax refunds, bonuses, gifts) as lump sums alongside regular contributions significantly accelerates your goal — use both strategies whenever possible.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SavingsGoalCalculatorPage() {
  const [goalAmount, setGoalAmount] = useState("20000");
  const [currentSavings, setCurrentSavings] = useState("2000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("4.5");
  const [showFullTable, setShowFullTable] = useState(false);

  const results = useMemo<SavingsResults>(() => {
    const goal = parseFloat(goalAmount) || 0;
    const current = parseFloat(currentSavings) || 0;
    const monthly = parseFloat(monthlyContribution) || 0;
    const rate = parseFloat(annualReturn) || 0;
    return calculateSavingsGoal(goal, current, monthly, rate);
  }, [goalAmount, currentSavings, monthlyContribution, annualReturn]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  const fmtDec = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const goal = parseFloat(goalAmount) || 0;
  const current = parseFloat(currentSavings) || 0;
  const progressPct = goal > 0 ? Math.min(100, (current / goal) * 100) : 0;

  const timeLabel = results.alreadyThere
    ? "Already reached!"
    : results.monthsToGoal === 0
    ? "—"
    : results.yearsToGoal > 0
    ? `${results.yearsToGoal} yr${results.yearsToGoal !== 1 ? "s" : ""} ${
        results.remainingMonths > 0
          ? `${results.remainingMonths} mo`
          : ""
      }`
    : `${results.monthsToGoal} month${results.monthsToGoal !== 1 ? "s" : ""}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Savings Goal Calculator",
    description:
      "Calculate how long it takes to reach a savings goal with monthly contributions and compound interest. Includes month-by-month projection.",
    url: "https://prestokit.com/tools/savings-goal-calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <PromoBar type="pro" dismissKey="savings-goal-pro" />
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Savings Goal{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              See exactly how long it takes to reach your savings goal. Enter your
              target amount, current savings, monthly contribution, and expected
              return to get a complete projection.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Inputs */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5 uppercase tracking-wide">
                Your Goal
              </h2>

              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Savings Goal Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={goalAmount}
                    onChange={(e) => setGoalAmount(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Quick presets */}
              <div className="flex flex-wrap gap-2 mb-5">
                {[
                  { label: "Emergency Fund ($5k)", val: "5000" },
                  { label: "Down Payment ($20k)", val: "20000" },
                  { label: "Dream Vacation ($5k)", val: "5000" },
                  { label: "New Car ($30k)", val: "30000" },
                ].map((p) => (
                  <button
                    key={p.label}
                    onClick={() => setGoalAmount(p.val)}
                    className="rounded-lg border border-[#1e1e2e] px-3 py-1.5 text-xs text-[#8888a0] hover:border-[#7c6cf0]/40 hover:text-[#7c6cf0] transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Current Savings
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={currentSavings}
                    onChange={(e) => setCurrentSavings(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Monthly Contribution
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Expected Annual Return
                  </label>
                  <span className="text-lg font-bold text-[#7c6cf0]">{annualReturn}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={annualReturn}
                  onChange={(e) => setAnnualReturn(e.target.value)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer mb-2"
                  style={{
                    background: `linear-gradient(to right, #7c6cf0 ${
                      (parseFloat(annualReturn) / 15) * 100
                    }%, #1e1e2e ${(parseFloat(annualReturn) / 15) * 100}%)`,
                  }}
                />
                <div className="flex justify-between text-xs text-[#8888a0]">
                  <span>0% (No interest)</span>
                  <span>4-5% (HYSA)</span>
                  <span>7%+ (Investing)</span>
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5 uppercase tracking-wide">
                  Your Timeline
                </h2>

                <div className="space-y-3">
                  <div
                    className={`rounded-xl border p-5 ${
                      results.alreadyThere
                        ? "border-[#00e676]/30 bg-[#00e676]/5"
                        : "border-[#7c6cf0]/30 bg-[#7c6cf0]/5"
                    }`}
                  >
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Time to Goal
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        results.alreadyThere ? "text-[#00e676]" : "text-white"
                      }`}
                    >
                      {timeLabel}
                    </div>
                    {!results.alreadyThere && results.monthsToGoal > 0 && (
                      <div className="text-xs text-[#8888a0] mt-1">
                        {results.monthsToGoal} total months
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Total Contributions
                      </div>
                      <div className="text-xl font-bold text-[#9d90f5]">
                        ${fmt(results.totalContributions)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#ff9100]/20 bg-[#ff9100]/5 p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Interest Earned
                      </div>
                      <div className="text-xl font-bold text-[#ff9100]">
                        ${fmt(results.interestEarned)}
                      </div>
                    </div>
                  </div>

                  {/* Current progress */}
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                      Current Progress
                    </div>
                    <div className="w-full h-3 bg-[#1e1e2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${progressPct}%`,
                          background:
                            progressPct >= 100
                              ? "#00e676"
                              : "linear-gradient(90deg, #7c6cf0, #9d90f5)",
                        }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-[#8888a0]">
                      <span className="text-[#9d90f5]">${fmt(current)} saved</span>
                      <span>{progressPct.toFixed(0)}% of ${fmt(goal)}</span>
                    </div>
                  </div>

                  {/* Monthly breakdown */}
                  {!results.alreadyThere && results.monthsToGoal > 0 && (
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        Monthly Breakdown
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-[#c0c0d0]">Your contributions</span>
                        <span className="text-[#9d90f5] font-medium">
                          {results.totalContributions > 0
                            ? `${((results.totalContributions / (results.totalContributions + results.interestEarned)) * 100).toFixed(0)}%`
                            : "—"}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm mt-1">
                        <span className="text-[#c0c0d0]">Interest earned</span>
                        <span className="text-[#ff9100] font-medium">
                          {results.totalContributions + results.interestEarned > 0
                            ? `${((results.interestEarned / (results.totalContributions + results.interestEarned)) * 100).toFixed(0)}%`
                            : "—"}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Growth Chart */}
          {results.projectionTable.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                24-Month Savings Projection
              </h2>
              <ProgressChart data={results.projectionTable} goalAmount={goal} />
            </div>
          )}

          {/* Month-by-month table */}
          {results.projectionTable.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">Month-by-Month Projection</h2>
                <button
                  onClick={() => setShowFullTable(!showFullTable)}
                  className="text-sm font-medium text-[#7c6cf0] hover:text-[#9d90f5] transition-colors"
                >
                  {showFullTable ? "Show Less" : "Show All 24 Months"}
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Month</th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Contribution</th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Interest</th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Total Interest</th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(showFullTable
                      ? results.projectionTable
                      : results.projectionTable.slice(0, 6)
                    ).map((row) => (
                      <tr
                        key={row.month}
                        className={`border-b border-[#1e1e2e]/60 ${
                          row.balance >= goal ? "bg-[#00e676]/5" : ""
                        }`}
                      >
                        <td className="py-2.5 pr-4 text-[#c0c0d0]">{row.month}</td>
                        <td className="py-2.5 px-4 text-right text-[#9d90f5]">
                          ${fmt(row.contribution)}
                        </td>
                        <td className="py-2.5 px-4 text-right text-[#ff9100]">
                          ${fmtDec(row.interest)}
                        </td>
                        <td className="py-2.5 px-4 text-right text-[#ff9100]">
                          ${fmt(row.totalInterest)}
                        </td>
                        <td
                          className={`py-2.5 pl-4 text-right font-semibold ${
                            row.balance >= goal ? "text-[#00e676]" : "text-white"
                          }`}
                        >
                          ${fmt(row.balance)}
                          {row.balance >= goal && (
                            <span className="ml-1 text-xs text-[#00e676]">Goal!</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Set Your Goal",
                  description:
                    "Enter your target savings amount — whether it's an emergency fund, down payment, vacation, or any other goal.",
                },
                {
                  step: "2",
                  title: "Enter Your Numbers",
                  description:
                    "Tell us how much you already have saved, how much you can contribute each month, and your expected interest rate.",
                },
                {
                  step: "3",
                  title: "See Your Timeline",
                  description:
                    "We calculate your exact time to reach your goal, total interest earned, and show a month-by-month projection of your balance.",
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
                  <p className="text-sm text-[#8888a0] leading-relaxed">{item.description}</p>
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Compound Interest Calculator",
                  description: "Visualize how compound interest grows your money over time with regular contributions.",
                  href: "/tools/compound-interest-calculator",
                },
                {
                  title: "Budget Calculator",
                  description: "Plan your monthly budget to find extra money to put toward your savings goal.",
                  href: "/tools/budget-calculator",
                },
                {
                  title: "Retirement Calculator",
                  description: "Project your retirement savings and see if you're on track to retire comfortably.",
                  href: "/tools/retirement-calculator",
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
