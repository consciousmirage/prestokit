"use client";

import { useState, useMemo } from "react";

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
      <span className="text-[#f0f0f5]">Compound Interest Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types & Calculations                                               */
/* ------------------------------------------------------------------ */

interface YearData {
  year: number;
  startBalance: number;
  contributions: number;
  interest: number;
  endBalance: number;
  totalContributions: number;
  totalInterest: number;
}

function calculateCompoundInterest(
  principal: number,
  monthlyContribution: number,
  annualRate: number,
  years: number,
  compoundingFrequency: number
): YearData[] {
  const data: YearData[] = [];
  let balance = principal;
  let totalContributions = principal;
  let totalInterest = 0;
  const ratePerPeriod = annualRate / 100 / compoundingFrequency;
  const periodsPerYear = compoundingFrequency;

  for (let year = 1; year <= years; year++) {
    const startBalance = balance;
    let yearInterest = 0;
    const yearContributions = monthlyContribution * 12;

    for (let period = 0; period < periodsPerYear; period++) {
      // Add monthly contributions for this compounding period
      const monthsInPeriod = 12 / periodsPerYear;
      balance += monthlyContribution * monthsInPeriod;

      // Compound interest
      const interest = balance * ratePerPeriod;
      balance += interest;
      yearInterest += interest;
    }

    totalContributions += yearContributions;
    totalInterest += yearInterest;

    data.push({
      year,
      startBalance,
      contributions: yearContributions,
      interest: yearInterest,
      endBalance: balance,
      totalContributions,
      totalInterest,
    });
  }

  return data;
}

/* ------------------------------------------------------------------ */
/*  Bar Chart (stacked)                                                */
/* ------------------------------------------------------------------ */

function GrowthChart({ data }: { data: YearData[] }) {
  if (data.length === 0) return null;

  const maxBalance = Math.max(...data.map((d) => d.endBalance));
  const chartHeight = 200;

  // Show at most ~20 bars; if more years, sample
  const step = data.length > 20 ? Math.ceil(data.length / 20) : 1;
  const display = data.filter((_, i) => i % step === 0 || i === data.length - 1);

  return (
    <div className="w-full overflow-x-auto">
      <div className="min-w-[400px]">
        {/* Chart area */}
        <div
          className="flex items-end gap-1 sm:gap-2"
          style={{ height: chartHeight }}
        >
          {display.map((d) => {
            const totalHeight =
              maxBalance > 0 ? (d.endBalance / maxBalance) * chartHeight : 0;
            const contributionRatio =
              d.endBalance > 0 ? d.totalContributions / d.endBalance : 0;
            const contributionHeight = totalHeight * contributionRatio;
            const interestHeight = totalHeight - contributionHeight;

            return (
              <div
                key={d.year}
                className="flex-1 flex flex-col justify-end items-stretch group relative"
              >
                {/* Tooltip */}
                <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 hidden group-hover:block z-10">
                  <div className="bg-[#1a1a2e] border border-[#2e2e4e] rounded-lg px-3 py-2 text-xs whitespace-nowrap shadow-xl">
                    <div className="text-white font-semibold mb-1">
                      Year {d.year}
                    </div>
                    <div className="text-[#00e676]">
                      Balance: $
                      {d.endBalance.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                    <div className="text-[#7c6cf0]">
                      Contributions: $
                      {d.totalContributions.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                    <div className="text-[#ff9100]">
                      Interest: $
                      {d.totalInterest.toLocaleString("en-US", {
                        maximumFractionDigits: 0,
                      })}
                    </div>
                  </div>
                </div>

                {/* Interest portion */}
                <div
                  className="rounded-t-sm transition-all duration-300"
                  style={{
                    height: interestHeight,
                    background:
                      "linear-gradient(180deg, #ff9100, #ff6d00)",
                    minHeight: interestHeight > 0 ? 2 : 0,
                  }}
                />
                {/* Contribution portion */}
                <div
                  className="transition-all duration-300"
                  style={{
                    height: contributionHeight,
                    background:
                      "linear-gradient(180deg, #7c6cf0, #5a4fcf)",
                    minHeight: contributionHeight > 0 ? 2 : 0,
                  }}
                />
              </div>
            );
          })}
        </div>

        {/* X-axis labels */}
        <div className="flex gap-1 sm:gap-2 mt-2">
          {display.map((d) => (
            <div
              key={d.year}
              className="flex-1 text-center text-[10px] text-[#555566]"
            >
              {d.year}
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#7c6cf0]" />
            <span className="text-[#8888a0]">Contributions</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-[#ff9100]" />
            <span className="text-[#8888a0]">Interest Earned</span>
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
    question: "What is compound interest?",
    answer:
      "Compound interest is interest calculated on both the initial principal and the accumulated interest from previous periods. Unlike simple interest (which only earns interest on the original amount), compound interest causes your money to grow exponentially over time. This is why Albert Einstein reportedly called it \"the eighth wonder of the world.\"",
  },
  {
    question: "How does compounding frequency affect my returns?",
    answer:
      "The more frequently interest compounds, the more you earn. Daily compounding earns slightly more than monthly, which earns more than quarterly, which earns more than annually. For example, $10,000 at 5% annual interest earns $500 with annual compounding, $509.45 with monthly compounding, and $512.67 with daily compounding. The difference grows significantly over longer time periods.",
  },
  {
    question: "What is the Rule of 72?",
    answer:
      "The Rule of 72 is a quick formula to estimate how long it takes to double your money. Divide 72 by your annual interest rate to get the approximate number of years. For example, at 6% annual return, your money doubles in roughly 72 / 6 = 12 years. At 8%, it doubles in about 9 years. This rule works best for rates between 6% and 10%.",
  },
  {
    question: "What is a realistic annual return rate?",
    answer:
      "Historical returns vary by investment type. The S&P 500 has averaged about 10% annually before inflation (roughly 7% after inflation) over the past century. High-yield savings accounts typically offer 4-5% as of 2024. Bonds average 4-6%. A diversified portfolio commonly targets 6-8% average annual returns. Higher returns generally come with higher risk.",
  },
  {
    question: "How do monthly contributions impact growth?",
    answer:
      "Regular monthly contributions dramatically accelerate wealth building. Even small amounts add up through the power of compound interest. For example, investing $500/month at 7% annual return for 30 years results in approximately $567,000 — of which $180,000 is contributions and $387,000 is interest earned. Starting early and contributing consistently is the most reliable wealth-building strategy.",
  },
  {
    question: "What is the difference between APR and APY?",
    answer:
      "APR (Annual Percentage Rate) is the simple annual interest rate without compounding. APY (Annual Percentage Yield) accounts for the effect of compounding throughout the year. APY is always equal to or higher than APR. For example, a 5% APR compounded monthly results in a 5.12% APY. When comparing investments, always use APY for an accurate comparison of actual returns.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CompoundInterestCalculatorPage() {
  const [principal, setPrincipal] = useState("10000");
  const [monthlyContribution, setMonthlyContribution] = useState("500");
  const [annualRate, setAnnualRate] = useState("7");
  const [years, setYears] = useState("20");
  const [compounding, setCompounding] = useState(12); // monthly

  const data = useMemo(() => {
    const p = parseFloat(principal) || 0;
    const mc = parseFloat(monthlyContribution) || 0;
    const r = parseFloat(annualRate) || 0;
    const y = Math.min(Math.max(parseInt(years) || 0, 0), 50);
    return calculateCompoundInterest(p, mc, r, y, compounding);
  }, [principal, monthlyContribution, annualRate, years, compounding]);

  const finalData = data.length > 0 ? data[data.length - 1] : null;

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Compound Interest Calculator",
    description:
      "Calculate compound interest on savings and investments with monthly contributions. See year-by-year growth charts.",
    url: "https://prestokit.com/tools/compound-interest-calculator",
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
              Compound Interest{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              See how your money grows over time with compound interest and
              regular contributions. Visualize year-by-year growth instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Initial Investment */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Initial Investment
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    value={principal}
                    onChange={(e) => setPrincipal(e.target.value)}
                    placeholder="10,000"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Monthly Contribution */}
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
                    step="100"
                    min="0"
                    value={monthlyContribution}
                    onChange={(e) => setMonthlyContribution(e.target.value)}
                    placeholder="500"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Annual Interest Rate */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Annual Interest Rate
                  </label>
                  <span className="text-lg font-bold text-[#7c6cf0]">
                    {annualRate}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="20"
                  step="0.5"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer mb-2"
                  style={{
                    background: `linear-gradient(to right, #7c6cf0 ${
                      (parseFloat(annualRate) / 20) * 100
                    }%, #1e1e2e ${(parseFloat(annualRate) / 20) * 100}%)`,
                  }}
                />
                <input
                  type="number"
                  step="0.1"
                  min="0"
                  max="50"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Time Period */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Time Period (Years)
                  </label>
                  <span className="text-lg font-bold text-[#7c6cf0]">
                    {years} yr
                  </span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="50"
                  step="1"
                  value={years}
                  onChange={(e) => setYears(e.target.value)}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer mb-2"
                  style={{
                    background: `linear-gradient(to right, #7c6cf0 ${
                      ((parseInt(years) || 1) / 50) * 100
                    }%, #1e1e2e ${((parseInt(years) || 1) / 50) * 100}%)`,
                  }}
                />
              </div>

              {/* Compounding Frequency */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Compounding Frequency
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { value: 1, label: "Annual" },
                    { value: 4, label: "Quarterly" },
                    { value: 12, label: "Monthly" },
                    { value: 365, label: "Daily" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setCompounding(option.value)}
                      className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                        compounding === option.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Results
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Future Value
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      ${finalData ? fmt(finalData.endBalance) : "0"}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Total Contributions
                      </div>
                      <div className="text-xl font-bold text-[#9d90f5]">
                        $
                        {finalData
                          ? fmt(finalData.totalContributions)
                          : "0"}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#ff9100]/30 bg-[#ff9100]/5 p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Total Interest
                      </div>
                      <div className="text-xl font-bold text-[#ff9100]">
                        ${finalData ? fmt(finalData.totalInterest) : "0"}
                      </div>
                    </div>
                  </div>

                  {finalData && finalData.endBalance > 0 && (
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                        Composition
                      </div>
                      <div className="w-full h-4 rounded-full overflow-hidden flex bg-[#1e1e2e]">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${
                              (finalData.totalContributions /
                                finalData.endBalance) *
                              100
                            }%`,
                            background: "#7c6cf0",
                          }}
                        />
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${
                              (finalData.totalInterest /
                                finalData.endBalance) *
                              100
                            }%`,
                            background: "#ff9100",
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs text-[#8888a0]">
                        <span>
                          {(
                            (finalData.totalContributions /
                              finalData.endBalance) *
                            100
                          ).toFixed(0)}
                          % contributions
                        </span>
                        <span>
                          {(
                            (finalData.totalInterest / finalData.endBalance) *
                            100
                          ).toFixed(0)}
                          % interest
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Growth Chart */}
          {data.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                Growth Over Time
              </h2>
              <GrowthChart data={data} />
            </div>
          )}

          {/* Year-by-Year Table */}
          {data.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <h2 className="text-lg font-semibold text-white mb-4">
                Year-by-Year Breakdown
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">
                        Year
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Contributions
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Interest (Year)
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Total Interest
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">
                        Balance
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((d) => (
                      <tr
                        key={d.year}
                        className="border-b border-[#1e1e2e]/60 hover:bg-[#7c6cf0]/5"
                      >
                        <td className="py-3 pr-4 font-semibold text-white">
                          {d.year}
                        </td>
                        <td className="py-3 px-4 text-right text-[#9d90f5]">
                          ${fmt(d.totalContributions)}
                        </td>
                        <td className="py-3 px-4 text-right text-[#ff9100]">
                          ${fmt(d.interest)}
                        </td>
                        <td className="py-3 px-4 text-right text-[#ff9100]">
                          ${fmt(d.totalInterest)}
                        </td>
                        <td className="py-3 pl-4 text-right text-[#00e676] font-semibold">
                          ${fmt(d.endBalance)}
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Details",
                  description:
                    "Input your initial investment, monthly contribution amount, expected annual interest rate, and time horizon.",
                },
                {
                  step: "2",
                  title: "Choose Compounding",
                  description:
                    "Select how often interest compounds — annually, quarterly, monthly, or daily. More frequent compounding earns more.",
                },
                {
                  step: "3",
                  title: "View Growth",
                  description:
                    "See your future value, total interest earned, a visual growth chart, and a year-by-year breakdown of your investment.",
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center"
                >
                  <div className="w-10 h-10 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] font-bold text-lg flex items-center justify-center mx-auto mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-white font-semibold mb-2">
                    {item.title}
                  </h3>
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
                <FAQItem
                  key={i}
                  question={item.question}
                  answer={item.answer}
                />
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
                  title: "ROI Calculator",
                  description:
                    "Calculate return on investment, compound growth, and marketing ROI.",
                  href: "/tools/roi-calculator",
                },
                {
                  title: "Mortgage Calculator",
                  description:
                    "Calculate monthly mortgage payments with amortization schedule.",
                  href: "/tools/mortgage-calculator",
                },
                {
                  title: "Tax Calculator",
                  description:
                    "Estimate your federal income tax by bracket.",
                  href: "/tools/tax-calculator",
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
                  <p className="text-sm text-[#8888a0]">
                    {tool.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
