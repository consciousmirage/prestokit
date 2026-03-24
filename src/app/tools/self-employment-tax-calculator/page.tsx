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
      <span className="text-[#f0f0f5]">Self-Employment Tax Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  2024 SE Tax Constants                                              */
/* ------------------------------------------------------------------ */

const SS_RATE = 0.124; // 12.4% Social Security
const MEDICARE_RATE = 0.029; // 2.9% Medicare
const NET_EARNINGS_FACTOR = 0.9235; // 92.35% of net SE income
const SS_WAGE_BASE_2024 = 168600; // Social Security wage base for 2024
const ADDITIONAL_MEDICARE_THRESHOLD_SINGLE = 200000;
const ADDITIONAL_MEDICARE_RATE = 0.009; // 0.9%

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is self-employment tax?",
    answer:
      "Self-employment (SE) tax is the Social Security and Medicare tax paid by people who work for themselves. When you're an employee, your employer pays half of these taxes and you pay the other half through payroll withholding. When you're self-employed, you pay both halves — a total rate of 15.3% (12.4% for Social Security + 2.9% for Medicare). SE tax is reported on Schedule SE of your federal tax return.",
  },
  {
    question: "Why is SE tax calculated on 92.35% of net income?",
    answer:
      "The IRS allows self-employed individuals to calculate SE tax on 92.35% (not 100%) of their net self-employment income. This is equivalent to the employer's share of FICA taxes that W-2 employees receive as a deduction. It effectively reduces your SE tax base by 7.65%, mimicking what employers deduct before calculating their employees' tax liability.",
  },
  {
    question: "What is the Social Security wage base for 2024?",
    answer:
      "For 2024, the Social Security wage base is $168,600. This means only the first $168,600 of your net self-employment earnings (after the 92.35% adjustment) is subject to the 12.4% Social Security tax. Any earnings above this threshold are still subject to the 2.9% Medicare tax (and potentially the additional 0.9% Medicare surtax), but not Social Security tax.",
  },
  {
    question: "What is the additional Medicare tax for high earners?",
    answer:
      "If your self-employment earnings exceed $200,000 (single filers) or $250,000 (married filing jointly), you owe an additional 0.9% Medicare surtax on the amount above the threshold. This is on top of the regular 2.9% Medicare tax. For example, if you earn $250,000 as a single filer, you'd owe the extra 0.9% on $50,000, adding $450 to your tax bill.",
  },
  {
    question: "Can I deduct half of my SE tax?",
    answer:
      "Yes. You can deduct the employer-equivalent portion of your SE tax (half of the total SE tax) when calculating your adjusted gross income (AGI). This deduction is taken on Schedule 1 of Form 1040 — it's an 'above the line' deduction, meaning you get it whether you itemize or take the standard deduction. This calculator shows this deductible amount in the breakdown.",
  },
  {
    question: "Who has to pay self-employment tax?",
    answer:
      "You must pay SE tax if your net self-employment earnings are $400 or more per year. This includes freelancers, independent contractors (1099 workers), sole proprietors, gig workers (Uber, DoorDash, etc.), and members of a partnership. If you receive a 1099-NEC or 1099-K, you likely owe SE tax on that income.",
  },
  {
    question: "Is self-employment tax the same as income tax?",
    answer:
      "No. Self-employment tax and income tax are separate. SE tax covers Social Security and Medicare only. You also owe federal (and possibly state) income tax on your net self-employment income. Your total tax burden is SE tax + income tax. This calculator focuses on the SE tax portion. Use our Tax Calculator to estimate your income tax separately.",
  },
];

/* ------------------------------------------------------------------ */
/*  Bar Chart                                                          */
/* ------------------------------------------------------------------ */

function TaxBreakdownChart({
  ssTax,
  medicareTax,
  additionalMedicare,
}: {
  ssTax: number;
  medicareTax: number;
  additionalMedicare: number;
}) {
  const items = [
    { label: "Social Security (12.4%)", value: ssTax, color: "#7c6cf0" },
    { label: "Medicare (2.9%)", value: medicareTax, color: "#9d90f5" },
  ];
  if (additionalMedicare > 0) {
    items.push({
      label: "Additional Medicare (0.9%)",
      value: additionalMedicare,
      color: "#ff5252",
    });
  }

  const maxVal = Math.max(...items.map((i) => i.value));
  if (maxVal === 0) return null;

  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-40 text-right text-xs font-medium text-[#8888a0] truncate">
            {item.label}
          </div>
          <div className="flex-1 h-8 bg-[#0a0a0f] rounded-lg overflow-hidden relative">
            <div
              className="h-full rounded-lg transition-all duration-500"
              style={{
                width: `${Math.max((item.value / maxVal) * 100, 2)}%`,
                backgroundColor: item.color,
              }}
            />
            <div className="absolute inset-0 flex items-center px-3">
              <span className="text-xs text-white font-medium drop-shadow-sm">
                ${item.value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SelfEmploymentTaxCalculatorPage() {
  const [netIncome, setNetIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState<"single" | "mfj">("single");

  const results = useMemo(() => {
    const income = parseFloat(netIncome) || 0;

    // Step 1: Calculate net SE earnings (92.35% of net income)
    const netSEEarnings = income * NET_EARNINGS_FACTOR;

    // Step 2: Social Security tax (12.4% up to wage base)
    const ssEarnings = Math.min(netSEEarnings, SS_WAGE_BASE_2024);
    const ssTax = ssEarnings * SS_RATE;

    // Step 3: Medicare tax (2.9% on all SE earnings)
    const medicareTax = netSEEarnings * MEDICARE_RATE;

    // Step 4: Additional Medicare tax (0.9% above threshold)
    const medicareThreshold =
      filingStatus === "mfj" ? 250000 : ADDITIONAL_MEDICARE_THRESHOLD_SINGLE;
    const additionalMedicareBase = Math.max(0, netSEEarnings - medicareThreshold);
    const additionalMedicareTax = additionalMedicareBase * ADDITIONAL_MEDICARE_RATE;

    // Step 5: Total SE tax
    const totalSETax = ssTax + medicareTax + additionalMedicareTax;

    // Step 6: Deductible portion (half of SE tax, excluding additional Medicare)
    const deductiblePortion = (ssTax + medicareTax) / 2;

    // Step 7: Effective SE tax rate
    const effectiveRate = income > 0 ? (totalSETax / income) * 100 : 0;

    return {
      income,
      netSEEarnings,
      ssTax,
      medicareTax,
      additionalMedicareTax,
      totalSETax,
      deductiblePortion,
      effectiveRate,
    };
  }, [netIncome, filingStatus]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Self-Employment Tax Calculator",
    description:
      "Calculate your self-employment tax with Social Security and Medicare breakdown. See your total SE tax, deductible portion, and effective rate.",
    url: "https://prestokit.com/tools/self-employment-tax-calculator",
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

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const fmt2 = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
              Self-Employment Tax{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate your 2024 self-employment tax (SE tax) for freelance, 1099,
              and gig income. See your Social Security and Medicare tax breakdown,
              deductible portion, and effective SE tax rate.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Net SE Income */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Net Self-Employment Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    value={netIncome}
                    onChange={(e) => setNetIncome(e.target.value)}
                    placeholder="80,000"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
                <p className="text-xs text-[#555566] mt-2">
                  Your net profit from self-employment (gross income minus business
                  expenses). This is the amount from Schedule C, line 31.
                </p>
              </div>

              {/* Filing Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Filing Status
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: "single" as const, label: "Single / Head of Household", threshold: "$200,000" },
                    { value: "mfj" as const, label: "Married Filing Jointly", threshold: "$250,000" },
                  ].map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFilingStatus(option.value)}
                      className={`rounded-xl border py-3 px-4 text-sm font-semibold text-left transition-all ${
                        filingStatus === option.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      <div>{option.label}</div>
                      <div className="text-xs font-normal mt-0.5 opacity-60">
                        Additional Medicare threshold: {option.threshold}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Info Card */}
              <div className="rounded-xl border border-[#7c6cf0]/20 bg-[#7c6cf0]/5 p-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#7c6cf0] mt-0.5 shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z"
                    />
                  </svg>
                  <div className="text-xs text-[#a0a0b8] leading-relaxed">
                    <strong className="text-[#c0c0d0]">SE Tax Formula:</strong> 15.3%
                    (12.4% SS + 2.9% Medicare) applied to 92.35% of your net SE income.
                    Social Security tax caps at $168,600 for 2024.
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  SE Tax Estimate (2024)
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Total Self-Employment Tax
                    </div>
                    <div className="text-3xl font-bold text-[#ff5252]">
                      ${fmt(results.totalSETax)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Effective SE Rate
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {fmt2(results.effectiveRate)}%
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Deductible (50%)
                      </div>
                      <div className="text-2xl font-bold text-[#00e676]">
                        ${fmt(results.deductiblePortion)}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Net SE Earnings (92.35%)
                    </div>
                    <div className="text-lg font-bold text-[#c0c0d0]">
                      ${fmt(results.netSEEarnings)}
                    </div>
                    <div className="text-xs text-[#555566] mt-1">
                      ${fmt(results.income)} x 92.35%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Breakdown */}
          {results.income > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                Tax Breakdown
              </h2>
              <TaxBreakdownChart
                ssTax={results.ssTax}
                medicareTax={results.medicareTax}
                additionalMedicare={results.additionalMedicareTax}
              />

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">
                        Component
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Rate
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Taxable Base
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">
                        Tax
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-[#1e1e2e]/60">
                      <td className="py-3 pr-4 text-[#c0c0d0]">Social Security</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#9d90f5]">
                        12.4%
                      </td>
                      <td className="py-3 px-4 text-right text-[#c0c0d0]">
                        ${fmt(Math.min(results.netSEEarnings, SS_WAGE_BASE_2024))}
                      </td>
                      <td className="py-3 pl-4 text-right text-[#ff5252] font-semibold">
                        ${fmt(results.ssTax)}
                      </td>
                    </tr>
                    <tr className="border-b border-[#1e1e2e]/60">
                      <td className="py-3 pr-4 text-[#c0c0d0]">Medicare</td>
                      <td className="py-3 px-4 text-right font-semibold text-[#9d90f5]">
                        2.9%
                      </td>
                      <td className="py-3 px-4 text-right text-[#c0c0d0]">
                        ${fmt(results.netSEEarnings)}
                      </td>
                      <td className="py-3 pl-4 text-right text-[#ff5252] font-semibold">
                        ${fmt(results.medicareTax)}
                      </td>
                    </tr>
                    {results.additionalMedicareTax > 0 && (
                      <tr className="border-b border-[#1e1e2e]/60">
                        <td className="py-3 pr-4 text-[#c0c0d0]">
                          Additional Medicare
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-[#ff5252]">
                          0.9%
                        </td>
                        <td className="py-3 px-4 text-right text-[#c0c0d0]">
                          ${fmt(
                            Math.max(
                              0,
                              results.netSEEarnings -
                                (filingStatus === "mfj" ? 250000 : 200000)
                            )
                          )}
                        </td>
                        <td className="py-3 pl-4 text-right text-[#ff5252] font-semibold">
                          ${fmt(results.additionalMedicareTax)}
                        </td>
                      </tr>
                    )}
                    <tr className="border-t border-[#7c6cf0]/30">
                      <td
                        colSpan={3}
                        className="py-3 pr-4 text-right font-semibold text-white"
                      >
                        Total SE Tax
                      </td>
                      <td className="py-3 pl-4 text-right text-[#ff5252] font-bold text-lg">
                        ${fmt(results.totalSETax)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Quarterly Payment Estimate */}
          {results.income > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <h2 className="text-lg font-semibold text-white mb-4">
                Quarterly Estimated Payment
              </h2>
              <p className="text-sm text-[#8888a0] mb-4">
                Self-employed individuals typically pay estimated taxes quarterly.
                Here&apos;s the SE tax portion broken down by quarter.
              </p>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {["Q1 (Apr 15)", "Q2 (Jun 15)", "Q3 (Sep 15)", "Q4 (Jan 15)"].map(
                  (quarter) => (
                    <div
                      key={quarter}
                      className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center"
                    >
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        {quarter}
                      </div>
                      <div className="text-lg font-bold text-white">
                        ${fmt(results.totalSETax / 4)}
                      </div>
                    </div>
                  )
                )}
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
                  title: "Enter Net SE Income",
                  description:
                    "Enter your net self-employment income — your total revenue minus business expenses (Schedule C, line 31).",
                },
                {
                  step: "2",
                  title: "Select Filing Status",
                  description:
                    "Choose your filing status. This affects the threshold for the additional 0.9% Medicare surtax on high earners.",
                },
                {
                  step: "3",
                  title: "See Your SE Tax",
                  description:
                    "View your total SE tax with a breakdown of Social Security, Medicare, and the deductible employer-equivalent portion.",
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
                  title: "Tax Calculator",
                  description:
                    "Estimate your federal income tax by bracket with effective and marginal rates.",
                  href: "/tools/tax-calculator",
                },
                {
                  title: "Paycheck Calculator",
                  description:
                    "Estimate your take-home pay after all taxes and deductions.",
                  href: "/tools/paycheck-calculator",
                },
                {
                  title: "Hourly to Salary Converter",
                  description:
                    "Convert your hourly rate to annual salary with weekly, biweekly, and monthly breakdowns.",
                  href: "/tools/hourly-to-salary",
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

          {/* ==================== PROMO BANNERS ==================== */}
          <div className="mt-10">
            <PromoBar
              type="pro"
              dismissKey="se-tax-pro"
            />
          </div>
        </div>
      </main>
    </>
  );
}
