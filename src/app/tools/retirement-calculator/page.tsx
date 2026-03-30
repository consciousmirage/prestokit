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
      <span className="text-[#f0f0f5]">Retirement Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Calculation Logic                                                  */
/* ------------------------------------------------------------------ */

interface RetirementResults {
  yearsUntilRetirement: number;
  projectedSavings: number;
  monthlyIncomeFrom4Percent: number;
  requiredNestEgg: number;
  savingsGap: number;
  onTrack: boolean;
  chartData: { year: number; balance: number; label: string }[];
}

function calculateRetirement(
  currentAge: number,
  retirementAge: number,
  currentSavings: number,
  monthlyContribution: number,
  annualReturn: number,
  desiredMonthlyIncome: number,
  inflationRate: number
): RetirementResults {
  const yearsUntilRetirement = Math.max(0, retirementAge - currentAge);
  const monthlyRate = annualReturn / 100 / 12;
  const totalMonths = yearsUntilRetirement * 12;

  // Project savings at retirement using FV formula
  let projectedSavings = 0;
  if (monthlyRate === 0) {
    projectedSavings = currentSavings + monthlyContribution * totalMonths;
  } else {
    // Future value of lump sum + future value of annuity
    projectedSavings =
      currentSavings * Math.pow(1 + monthlyRate, totalMonths) +
      monthlyContribution *
        ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
  }

  // Inflation-adjust the desired monthly income to future dollars
  const inflationFactor = Math.pow(1 + inflationRate / 100, yearsUntilRetirement);
  const futureDesiredIncome = desiredMonthlyIncome * inflationFactor;

  // Required nest egg using 4% rule (annual withdrawal / 0.04)
  const requiredNestEgg = (futureDesiredIncome * 12) / 0.04;

  // Monthly income from 4% rule
  const monthlyIncomeFrom4Percent = (projectedSavings * 0.04) / 12;

  // Gap (positive = shortfall, negative = surplus)
  const savingsGap = requiredNestEgg - projectedSavings;

  // Build chart data (every 5 years up to retirement)
  const chartData: { year: number; balance: number; label: string }[] = [];
  const step = Math.max(1, Math.round(yearsUntilRetirement / 10));
  for (let y = 0; y <= yearsUntilRetirement; y += step) {
    const months = y * 12;
    let balance = 0;
    if (monthlyRate === 0) {
      balance = currentSavings + monthlyContribution * months;
    } else {
      balance =
        currentSavings * Math.pow(1 + monthlyRate, months) +
        monthlyContribution *
          ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    }
    chartData.push({
      year: currentAge + y,
      balance,
      label: `Age ${currentAge + y}`,
    });
  }
  // Ensure final point is exactly at retirement
  if (
    chartData.length === 0 ||
    chartData[chartData.length - 1].year !== retirementAge
  ) {
    chartData.push({
      year: retirementAge,
      balance: projectedSavings,
      label: `Age ${retirementAge}`,
    });
  }

  return {
    yearsUntilRetirement,
    projectedSavings,
    monthlyIncomeFrom4Percent,
    requiredNestEgg,
    savingsGap,
    onTrack: savingsGap <= 0,
    chartData,
  };
}

/* ------------------------------------------------------------------ */
/*  Mini Bar Chart                                                     */
/* ------------------------------------------------------------------ */

function SavingsChart({
  chartData,
  requiredNestEgg,
}: {
  chartData: { year: number; balance: number; label: string }[];
  requiredNestEgg: number;
}) {
  if (chartData.length === 0) return null;
  const maxVal = Math.max(...chartData.map((d) => d.balance), requiredNestEgg);
  const chartHeight = 160;

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[300px]">
        <div className="flex items-end gap-1 sm:gap-2" style={{ height: chartHeight }}>
          {chartData.map((d) => {
            const barH = maxVal > 0 ? (d.balance / maxVal) * chartHeight : 0;
            const targetH = maxVal > 0 ? (requiredNestEgg / maxVal) * chartHeight : 0;
            const isAboveTarget = d.balance >= requiredNestEgg;
            return (
              <div
                key={d.year}
                className="flex-1 flex flex-col justify-end items-stretch group relative"
                style={{ height: chartHeight }}
              >
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                  <div className="bg-[#1a1a2e] border border-[#2e2e4e] rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                    <div className="text-white font-semibold">{d.label}</div>
                    <div className="text-[#7c6cf0]">
                      ${d.balance.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                </div>
                {/* Target line marker */}
                <div
                  className="absolute left-0 right-0 border-t border-dashed border-[#ff9100]/40"
                  style={{ bottom: targetH }}
                />
                <div
                  className="rounded-t-sm transition-all duration-300"
                  style={{
                    height: barH,
                    background: isAboveTarget
                      ? "linear-gradient(180deg, #00e676, #00c853)"
                      : "linear-gradient(180deg, #7c6cf0, #5a4fcf)",
                    minHeight: barH > 0 ? 2 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="flex gap-1 sm:gap-2 mt-2">
          {chartData.map((d) => (
            <div key={d.year} className="flex-1 text-center text-[10px] text-[#555566]">
              {d.year}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-6 mt-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#7c6cf0]" />
            <span className="text-[#8888a0]">Projected Savings</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-5 border-t border-dashed border-[#ff9100]" />
            <span className="text-[#8888a0]">Target</span>
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
    question: "How much do I need to save for retirement?",
    answer:
      "A common rule of thumb is to save 10–15% of your income annually for retirement. The total amount you need depends on your desired lifestyle. The 4% rule suggests you need 25 times your annual retirement expenses saved. For example, if you want $5,000/month ($60,000/year) in retirement, you'd need $1,500,000 saved.",
  },
  {
    question: "What is the 4% rule for retirement?",
    answer:
      "The 4% rule (also called the 'safe withdrawal rate') says you can withdraw 4% of your retirement savings each year without running out of money over a 30-year retirement. It's based on historical market data. To use it: divide your desired annual income by 0.04 to find your required nest egg. For $60,000/year, that's $60,000 ÷ 0.04 = $1,500,000.",
  },
  {
    question: "What annual return rate should I use for retirement planning?",
    answer:
      "A conservative estimate is 5–6% after inflation for a diversified portfolio. More optimistic projections use 7–8% (roughly matching historical S&P 500 returns minus inflation). Use 6–7% for a balanced portfolio of stocks and bonds. More aggressive stock-heavy portfolios might use 7–8%, but with higher short-term volatility.",
  },
  {
    question: "How does inflation affect my retirement savings?",
    answer:
      "Inflation erodes purchasing power over time. $5,000/month today will feel like much less 30 years from now. At 3% annual inflation, today's $5,000 becomes about $12,000 in 30 years in nominal terms. This calculator adjusts your desired income for inflation so your target nest egg reflects future purchasing power, not today's dollars.",
  },
  {
    question: "What's the difference between a 401(k) and an IRA?",
    answer:
      "A 401(k) is an employer-sponsored retirement plan with higher contribution limits ($23,000/year in 2024, plus $7,500 catch-up for 50+). Many employers offer matching contributions — free money you should capture. An IRA (Individual Retirement Account) is opened independently with lower limits ($7,000/year in 2024). Both offer tax advantages, either traditional (pre-tax contributions, taxed at withdrawal) or Roth (after-tax, tax-free growth).",
  },
  {
    question: "When should I start saving for retirement?",
    answer:
      "The earlier the better — thanks to compound interest, time is your most powerful asset. Starting at 25 vs. 35 can double your final balance with the same monthly contributions. Even small amounts invested early beat large amounts invested late. If you're 40+ and behind, don't panic — maximize contributions (including catch-up contributions after 50), reduce expenses, and consider working a few extra years.",
  },
  {
    question: "What if I have a savings gap?",
    answer:
      "If your projected savings falls short of your target, you have several options: increase monthly contributions, adjust your expected retirement age (even 2-3 extra years makes a huge difference), reduce your desired monthly income in retirement, plan to work part-time in retirement, or target a slightly higher investment return through a more growth-oriented portfolio.",
  },
  {
    question: "How accurate is this retirement calculator?",
    answer:
      "This calculator provides estimates based on consistent returns, which real markets don't deliver — actual returns vary year to year. It assumes you maintain your contribution rate and the market delivers your assumed return every year. For real retirement planning, consult a fee-only financial advisor who can account for Social Security benefits, tax strategy, healthcare costs, and sequence-of-returns risk.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RetirementCalculatorPage() {
  const [currentAge, setCurrentAge] = useState("30");
  const [retirementAge, setRetirementAge] = useState("65");
  const [currentSavings, setCurrentSavings] = useState("25000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualReturn, setAnnualReturn] = useState("7");
  const [desiredMonthlyIncome, setDesiredMonthlyIncome] = useState("5000");
  const [inflationRate, setInflationRate] = useState("3");

  const results = useMemo<RetirementResults>(() => {
    const cAge = Math.min(Math.max(parseInt(currentAge) || 0, 0), 100);
    const rAge = Math.min(Math.max(parseInt(retirementAge) || 0, 0), 100);
    const savings = parseFloat(currentSavings) || 0;
    const contrib = parseFloat(monthlyContribution) || 0;
    const ret = parseFloat(annualReturn) || 0;
    const income = parseFloat(desiredMonthlyIncome) || 0;
    const infl = parseFloat(inflationRate) || 0;
    return calculateRetirement(cAge, rAge, savings, contrib, ret, income, infl);
  }, [currentAge, retirementAge, currentSavings, monthlyContribution, annualReturn, desiredMonthlyIncome, inflationRate]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Retirement Calculator",
    description:
      "Calculate how much you need to save for retirement, projected savings, and monthly income using the 4% rule.",
    url: "https://prestokit.com/tools/retirement-calculator",
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
          <PromoBar type="pro" dismissKey="retirement-pro" />
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Retirement{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Project your retirement savings, see monthly income from your nest egg
              using the 4% rule, and find out if you&apos;re on track to retire comfortably.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5 uppercase tracking-wide">
                Your Details
              </h2>

              <div className="grid grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Current Age
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={currentAge}
                    onChange={(e) => setCurrentAge(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Retirement Age
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="100"
                    value={retirementAge}
                    onChange={(e) => setRetirementAge(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Current Retirement Savings
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">$</span>
                  <input
                    type="number"
                    min="0"
                    step="1000"
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
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">$</span>
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

              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Desired Monthly Income in Retirement
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">$</span>
                  <input
                    type="number"
                    min="0"
                    step="500"
                    value={desiredMonthlyIncome}
                    onChange={(e) => setDesiredMonthlyIncome(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Expected Annual Return
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="30"
                      step="0.5"
                      value={annualReturn}
                      onChange={(e) => setAnnualReturn(e.target.value)}
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-4 pr-9 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">%</span>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Expected Inflation Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      min="0"
                      max="15"
                      step="0.1"
                      value={inflationRate}
                      onChange={(e) => setInflationRate(e.target.value)}
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-4 pr-9 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5 uppercase tracking-wide">
                  Retirement Projection
                </h2>

                <div className="space-y-3">
                  {/* Status badge */}
                  <div
                    className={`rounded-xl border p-4 ${
                      results.onTrack
                        ? "border-[#00e676]/30 bg-[#00e676]/5"
                        : "border-[#ff5252]/30 bg-[#ff5252]/5"
                    }`}
                  >
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Status
                    </div>
                    <div
                      className={`text-xl font-bold ${
                        results.onTrack ? "text-[#00e676]" : "text-[#ff5252]"
                      }`}
                    >
                      {results.onTrack ? "On Track" : "Savings Gap"}
                    </div>
                    <div className="text-xs text-[#8888a0] mt-1">
                      {results.onTrack
                        ? `Surplus of $${fmt(Math.abs(results.savingsGap))}`
                        : `Shortfall of $${fmt(results.savingsGap)}`}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Projected Savings at Retirement
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${fmt(results.projectedSavings)}
                    </div>
                    <div className="text-xs text-[#8888a0] mt-1">
                      In {results.yearsUntilRetirement} years
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Monthly Income (4% Rule)
                      </div>
                      <div className="text-xl font-bold text-[#9d90f5]">
                        ${fmt(results.monthlyIncomeFrom4Percent)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Required Nest Egg
                      </div>
                      <div className="text-xl font-bold text-[#c0c0d0]">
                        ${fmt(results.requiredNestEgg)}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                      Progress to Goal
                    </div>
                    <div className="w-full h-3 bg-[#1e1e2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            results.requiredNestEgg > 0
                              ? (results.projectedSavings / results.requiredNestEgg) * 100
                              : 0
                          )}%`,
                          background: results.onTrack
                            ? "linear-gradient(90deg, #00e676, #00c853)"
                            : "linear-gradient(90deg, #7c6cf0, #9d90f5)",
                        }}
                      />
                    </div>
                    <div className="text-xs text-[#8888a0] mt-2">
                      {results.requiredNestEgg > 0
                        ? `${Math.min(100, (results.projectedSavings / results.requiredNestEgg) * 100).toFixed(0)}% of target`
                        : "—"}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Savings Growth Chart */}
          {results.chartData.length > 1 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-6">Savings Growth Over Time</h2>
              <SavingsChart
                chartData={results.chartData}
                requiredNestEgg={results.requiredNestEgg}
              />
            </div>
          )}

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Situation",
                  description:
                    "Input your current age, target retirement age, existing savings, monthly contributions, and expected investment return.",
                },
                {
                  step: "2",
                  title: "Set Your Target",
                  description:
                    "Tell us how much monthly income you want in retirement. We inflation-adjust this to future dollars so your target is realistic.",
                },
                {
                  step: "3",
                  title: "See Your Projection",
                  description:
                    "We calculate your projected nest egg, monthly income using the 4% rule, and whether you have a savings surplus or gap.",
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
                  description: "Calculate compound interest with contributions and visualize growth over time.",
                  href: "/tools/compound-interest-calculator",
                },
                {
                  title: "Savings Goal Calculator",
                  description: "See how long it takes to reach any savings target with month-by-month projections.",
                  href: "/tools/savings-goal-calculator",
                },
                {
                  title: "Budget Calculator",
                  description: "Plan your monthly budget and see how much you can put toward retirement each month.",
                  href: "/tools/budget-calculator",
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
