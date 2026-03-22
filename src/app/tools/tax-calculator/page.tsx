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
      <span className="text-[#f0f0f5]">Tax Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  2024 Federal Tax Brackets                                          */
/* ------------------------------------------------------------------ */

interface TaxBracket {
  min: number;
  max: number;
  rate: number;
}

const BRACKETS_SINGLE_2024: TaxBracket[] = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const BRACKETS_MFJ_2024: TaxBracket[] = [
  { min: 0, max: 23200, rate: 0.10 },
  { min: 23200, max: 94300, rate: 0.12 },
  { min: 94300, max: 201050, rate: 0.22 },
  { min: 201050, max: 383900, rate: 0.24 },
  { min: 383900, max: 487450, rate: 0.32 },
  { min: 487450, max: 731200, rate: 0.35 },
  { min: 731200, max: Infinity, rate: 0.37 },
];

const BRACKETS_HOH_2024: TaxBracket[] = [
  { min: 0, max: 16550, rate: 0.10 },
  { min: 16550, max: 63100, rate: 0.12 },
  { min: 63100, max: 100500, rate: 0.22 },
  { min: 100500, max: 191950, rate: 0.24 },
  { min: 191950, max: 243700, rate: 0.32 },
  { min: 243700, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTIONS: Record<string, number> = {
  single: 14600,
  mfj: 29200,
  hoh: 21900,
};

type FilingStatus = "single" | "mfj" | "hoh";

const BRACKETS: Record<string, TaxBracket[]> = {
  single: BRACKETS_SINGLE_2024,
  mfj: BRACKETS_MFJ_2024,
  hoh: BRACKETS_HOH_2024,
};

function calculateTax(taxableIncome: number, brackets: TaxBracket[]) {
  let totalTax = 0;
  const breakdown: { rate: number; taxableAmount: number; tax: number; bracketMin: number; bracketMax: number }[] = [];

  for (const bracket of brackets) {
    if (taxableIncome <= bracket.min) break;
    const taxableInBracket = Math.min(taxableIncome, bracket.max) - bracket.min;
    const taxInBracket = taxableInBracket * bracket.rate;
    totalTax += taxInBracket;
    breakdown.push({
      rate: bracket.rate,
      taxableAmount: taxableInBracket,
      tax: taxInBracket,
      bracketMin: bracket.min,
      bracketMax: bracket.max,
    });
  }

  return { totalTax, breakdown };
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How do federal tax brackets work?",
    answer:
      "Federal income tax uses a progressive system with marginal tax brackets. This means only the income within each bracket is taxed at that bracket's rate. For example, if you're single and earn $60,000 in 2024, the first $11,600 is taxed at 10%, the next $35,550 at 12%, and the remaining $12,850 at 22%. You don't pay 22% on all $60,000 — only on the portion that falls in the 22% bracket.",
  },
  {
    question: "What is the difference between marginal and effective tax rate?",
    answer:
      "Your marginal tax rate is the rate applied to your last dollar of income — it's the highest bracket your income reaches. Your effective tax rate is the average rate you actually pay across all your income, calculated by dividing your total tax by your total taxable income. Your effective rate is always lower than your marginal rate because of the progressive bracket system.",
  },
  {
    question: "What is the standard deduction for 2024?",
    answer:
      "For 2024, the standard deduction is $14,600 for single filers, $29,200 for married filing jointly, and $21,900 for head of household. The standard deduction reduces your taxable income before tax brackets are applied. If your itemized deductions (mortgage interest, state taxes, charitable contributions, etc.) exceed the standard deduction, you should itemize instead.",
  },
  {
    question: "Does this calculator include state taxes?",
    answer:
      "This calculator estimates federal income tax only. State income taxes vary significantly — seven states (Alaska, Florida, Nevada, South Dakota, Tennessee, Texas, Washington, and Wyoming) have no state income tax, while others range from about 1% to over 13%. For a complete picture, you would need to add your state tax separately.",
  },
  {
    question: "What about Social Security and Medicare taxes?",
    answer:
      "This calculator focuses on federal income tax. Social Security tax is 6.2% on earnings up to $168,600 (2024), and Medicare tax is 1.45% on all earnings (plus an additional 0.9% on earnings over $200,000 for single filers). These payroll taxes are separate from income tax and are typically withheld by your employer.",
  },
  {
    question: "Is this tax calculator accurate for my tax return?",
    answer:
      "This calculator provides a reasonable estimate of federal income tax based on the 2024 tax brackets and standard deduction. Actual tax liability may differ based on tax credits (child tax credit, earned income credit), itemized deductions, capital gains, self-employment tax, alternative minimum tax, and other factors. For precise tax filing, consult a tax professional or use official IRS resources.",
  },
];

/* ------------------------------------------------------------------ */
/*  Bar Chart                                                          */
/* ------------------------------------------------------------------ */

function BracketChart({ breakdown }: { breakdown: { rate: number; taxableAmount: number; tax: number }[] }) {
  if (breakdown.length === 0) return null;
  const maxTax = Math.max(...breakdown.map((b) => b.tax));

  return (
    <div className="space-y-3">
      {breakdown.map((b, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-14 text-right text-sm font-semibold text-[#9d90f5]">
            {(b.rate * 100).toFixed(0)}%
          </div>
          <div className="flex-1 h-8 bg-[#0a0a0f] rounded-lg overflow-hidden relative">
            <div
              className="h-full rounded-lg transition-all duration-500"
              style={{
                width: maxTax > 0 ? `${Math.max((b.tax / maxTax) * 100, 2)}%` : "0%",
                background: `linear-gradient(90deg, #7c6cf0, #9d90f5)`,
              }}
            />
            <div className="absolute inset-0 flex items-center px-3">
              <span className="text-xs text-white font-medium drop-shadow-sm">
                ${b.tax.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
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

export default function TaxCalculatorPage() {
  const [grossIncome, setGrossIncome] = useState("");
  const [filingStatus, setFilingStatus] = useState<FilingStatus>("single");
  const [useStandardDeduction, setUseStandardDeduction] = useState(true);
  const [customDeduction, setCustomDeduction] = useState("");

  const results = useMemo(() => {
    const income = parseFloat(grossIncome) || 0;
    const deduction = useStandardDeduction
      ? STANDARD_DEDUCTIONS[filingStatus]
      : parseFloat(customDeduction) || 0;
    const taxableIncome = Math.max(0, income - deduction);
    const brackets = BRACKETS[filingStatus];
    const { totalTax, breakdown } = calculateTax(taxableIncome, brackets);
    const effectiveRate = income > 0 ? (totalTax / income) * 100 : 0;
    const marginalRate = breakdown.length > 0 ? breakdown[breakdown.length - 1].rate * 100 : 0;
    const afterTax = income - totalTax;

    return {
      income,
      deduction,
      taxableIncome,
      totalTax,
      breakdown,
      effectiveRate,
      marginalRate,
      afterTax,
    };
  }, [grossIncome, filingStatus, useStandardDeduction, customDeduction]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Tax Calculator",
    description:
      "Calculate your estimated federal income tax by bracket. See your effective tax rate, marginal rate, and tax breakdown.",
    url: "https://prestokit.com/tools/tax-calculator",
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
              Tax{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Estimate your 2024 federal income tax by bracket. See your effective
              tax rate, marginal rate, and a full breakdown of tax owed per bracket.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Gross Income */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Annual Gross Income
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    value={grossIncome}
                    onChange={(e) => setGrossIncome(e.target.value)}
                    placeholder="75,000"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Filing Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Filing Status
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {[
                    { value: "single" as FilingStatus, label: "Single" },
                    { value: "mfj" as FilingStatus, label: "Married Filing Jointly" },
                    { value: "hoh" as FilingStatus, label: "Head of Household" },
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
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Deduction */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Deduction
                </label>
                <button
                  onClick={() => setUseStandardDeduction(!useStandardDeduction)}
                  className={`w-full flex items-center gap-3 rounded-xl border p-4 transition-all mb-3 ${
                    useStandardDeduction
                      ? "border-[#00e676] bg-[#00e676]/10"
                      : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#00e676]/40"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      useStandardDeduction
                        ? "border-[#00e676] bg-[#00e676]"
                        : "border-[#555566]"
                    }`}
                  >
                    {useStandardDeduction && (
                      <svg
                        className="w-3 h-3 text-[#0a0a0f]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm font-medium ${
                      useStandardDeduction ? "text-white" : "text-[#8888a0]"
                    }`}
                  >
                    Use standard deduction ($
                    {STANDARD_DEDUCTIONS[filingStatus].toLocaleString()})
                  </span>
                </button>

                {!useStandardDeduction && (
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="100"
                      min="0"
                      value={customDeduction}
                      onChange={(e) => setCustomDeduction(e.target.value)}
                      placeholder="Enter total deductions"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {/* Key Results */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Tax Estimate (2024)
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Federal Income Tax
                    </div>
                    <div className="text-3xl font-bold text-[#ff5252]">
                      ${fmt(results.totalTax)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      After-Tax Income
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      ${fmt(results.afterTax)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Effective Rate
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {results.effectiveRate.toFixed(1)}%
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Marginal Rate
                      </div>
                      <div className="text-2xl font-bold text-[#8888a0]">
                        {results.marginalRate.toFixed(0)}%
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Taxable Income
                    </div>
                    <div className="text-lg font-bold text-[#c0c0d0]">
                      ${fmt(results.taxableIncome)}
                    </div>
                    <div className="text-xs text-[#555566] mt-1">
                      After ${fmt(results.deduction)} deduction
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bracket Breakdown */}
          {results.breakdown.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-6">
                Tax by Bracket
              </h2>
              <BracketChart breakdown={results.breakdown} />

              <div className="mt-6 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">
                        Bracket
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Rate
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Taxable Amount
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">
                        Tax
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.breakdown.map((b, i) => (
                      <tr
                        key={i}
                        className="border-b border-[#1e1e2e]/60"
                      >
                        <td className="py-3 pr-4 text-[#c0c0d0]">
                          ${fmt(b.bracketMin)} &ndash;{" "}
                          {b.bracketMax === Infinity
                            ? "+"
                            : `$${fmt(b.bracketMax)}`}
                        </td>
                        <td className="py-3 px-4 text-right font-semibold text-[#9d90f5]">
                          {(b.rate * 100).toFixed(0)}%
                        </td>
                        <td className="py-3 px-4 text-right text-[#c0c0d0]">
                          ${fmt(b.taxableAmount)}
                        </td>
                        <td className="py-3 pl-4 text-right text-[#ff5252] font-semibold">
                          ${fmt(b.tax)}
                        </td>
                      </tr>
                    ))}
                    <tr className="border-t border-[#7c6cf0]/30">
                      <td
                        colSpan={3}
                        className="py-3 pr-4 text-right font-semibold text-white"
                      >
                        Total Federal Tax
                      </td>
                      <td className="py-3 pl-4 text-right text-[#ff5252] font-bold text-lg">
                        ${fmt(results.totalTax)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Monthly Breakdown */}
          {results.income > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <h2 className="text-lg font-semibold text-white mb-4">
                Monthly & Biweekly Breakdown
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Monthly Gross", value: results.income / 12 },
                  { label: "Monthly Tax", value: results.totalTax / 12 },
                  { label: "Monthly Net", value: results.afterTax / 12 },
                  { label: "Biweekly Net", value: results.afterTax / 26 },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center"
                  >
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                      {item.label}
                    </div>
                    <div className="text-lg font-bold text-white">
                      ${fmt(item.value)}
                    </div>
                  </div>
                ))}
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
                  title: "Enter Your Income",
                  description:
                    "Type in your annual gross income and select your filing status (Single, Married Filing Jointly, or Head of Household).",
                },
                {
                  step: "2",
                  title: "Choose Deduction",
                  description:
                    "Use the standard deduction or enter your own itemized deduction amount. The deduction reduces your taxable income before tax brackets are applied.",
                },
                {
                  step: "3",
                  title: "See Your Tax Breakdown",
                  description:
                    "View your estimated federal income tax, effective and marginal tax rates, and a visual breakdown of tax owed in each bracket.",
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
                  title: "Paycheck Calculator",
                  description:
                    "Estimate your take-home pay after all taxes and deductions.",
                  href: "/tools/paycheck-calculator",
                },
                {
                  title: "Salary Calculator",
                  description:
                    "Convert between hourly, daily, monthly, and annual salary rates.",
                  href: "/tools/salary-calculator",
                },
                {
                  title: "Profit Margin Calculator",
                  description:
                    "Calculate profit margins, markups, and break-even points.",
                  href: "/tools/profit-margin-calculator",
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
