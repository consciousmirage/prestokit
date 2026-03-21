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
      <span className="text-[#f0f0f5]">Salary Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

type InputMode = "annual" | "hourly" | "monthly" | "weekly" | "daily";

const INPUT_MODES: { key: InputMode; label: string }[] = [
  { key: "annual", label: "Annual Salary" },
  { key: "hourly", label: "Hourly Rate" },
  { key: "monthly", label: "Monthly" },
  { key: "weekly", label: "Weekly" },
  { key: "daily", label: "Daily" },
];

const STATE_TAX_RATES: { state: string; rate: number }[] = [
  { state: "No State Tax (AK, FL, NV, NH, SD, TN, TX, WA, WY)", rate: 0 },
  { state: "Alabama", rate: 5.0 },
  { state: "Arizona", rate: 2.5 },
  { state: "Arkansas", rate: 4.4 },
  { state: "California", rate: 9.3 },
  { state: "Colorado", rate: 4.4 },
  { state: "Connecticut", rate: 5.0 },
  { state: "Delaware", rate: 5.5 },
  { state: "Georgia", rate: 5.49 },
  { state: "Hawaii", rate: 7.2 },
  { state: "Idaho", rate: 5.8 },
  { state: "Illinois", rate: 4.95 },
  { state: "Indiana", rate: 3.05 },
  { state: "Iowa", rate: 5.7 },
  { state: "Kansas", rate: 5.7 },
  { state: "Kentucky", rate: 4.0 },
  { state: "Louisiana", rate: 4.25 },
  { state: "Maine", rate: 7.15 },
  { state: "Maryland", rate: 5.0 },
  { state: "Massachusetts", rate: 5.0 },
  { state: "Michigan", rate: 4.25 },
  { state: "Minnesota", rate: 7.85 },
  { state: "Mississippi", rate: 5.0 },
  { state: "Missouri", rate: 4.8 },
  { state: "Montana", rate: 5.9 },
  { state: "Nebraska", rate: 5.84 },
  { state: "New Jersey", rate: 6.37 },
  { state: "New Mexico", rate: 4.9 },
  { state: "New York", rate: 6.85 },
  { state: "North Carolina", rate: 4.5 },
  { state: "North Dakota", rate: 2.5 },
  { state: "Ohio", rate: 3.99 },
  { state: "Oklahoma", rate: 4.75 },
  { state: "Oregon", rate: 8.75 },
  { state: "Pennsylvania", rate: 3.07 },
  { state: "Rhode Island", rate: 5.99 },
  { state: "South Carolina", rate: 6.4 },
  { state: "Utah", rate: 4.65 },
  { state: "Vermont", rate: 6.6 },
  { state: "Virginia", rate: 5.75 },
  { state: "Washington D.C.", rate: 6.5 },
  { state: "West Virginia", rate: 5.12 },
  { state: "Wisconsin", rate: 5.3 },
];

const FEDERAL_BRACKETS_2024 = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const FAQ_DATA = [
  {
    question: "How do I convert annual salary to hourly rate?",
    answer:
      "Divide your annual salary by the number of working weeks per year (typically 52), then divide by the hours you work per week (typically 40). For example, $60,000 / 52 / 40 = $28.85 per hour. Our calculator does this instantly and also shows daily, weekly, biweekly, and monthly breakdowns.",
  },
  {
    question: "How do I convert hourly pay to annual salary?",
    answer:
      "Multiply your hourly rate by the number of hours you work per week, then multiply by the number of weeks you work per year. For example, $25/hour x 40 hours x 52 weeks = $52,000 per year. Adjust weeks if you take unpaid time off.",
  },
  {
    question: "What is FICA and why is it deducted?",
    answer:
      "FICA stands for the Federal Insurance Contributions Act. It includes Social Security tax (6.2% up to $168,600 in 2024) and Medicare tax (1.45% on all earnings). Together, they total 7.65% on most wages. These fund Social Security retirement benefits and Medicare health insurance.",
  },
  {
    question: "How accurate is the tax estimate?",
    answer:
      "The tax estimate is simplified and uses standard single-filer federal brackets and approximate flat state tax rates. It does not account for deductions, credits, filing status, local taxes, or other factors. For precise tax planning, consult a tax professional or use IRS resources.",
  },
  {
    question: "What does the salary comparison feature do?",
    answer:
      "The comparison mode lets you enter two different salaries (or hourly rates) side by side to see the difference in gross pay, estimated taxes, and take-home pay across all time periods. It is useful for evaluating job offers or raises.",
  },
  {
    question: "Is this salary calculator free to use?",
    answer:
      "Yes, completely free with no signup required. All calculations happen instantly in your browser. No personal data is stored or sent to any server. Use it as many times as you need for job comparisons, budgeting, or financial planning.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function formatCurrency(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "$0.00";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(n);
}

function calcFederalTax(annualIncome: number): number {
  let tax = 0;
  for (const bracket of FEDERAL_BRACKETS_2024) {
    if (annualIncome <= bracket.min) break;
    const taxable = Math.min(annualIncome, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

function calcFICA(annualIncome: number): number {
  const ssLimit = 168600;
  const ss = Math.min(annualIncome, ssLimit) * 0.062;
  const medicare = annualIncome * 0.0145;
  return ss + medicare;
}

interface PayBreakdown {
  hourly: number;
  daily: number;
  weekly: number;
  biweekly: number;
  monthly: number;
  annual: number;
  federalTax: number;
  stateTax: number;
  fica: number;
  totalTax: number;
  takeHome: number;
  effectiveRate: number;
}

function calculateAll(
  annualSalary: number,
  hoursPerWeek: number,
  weeksPerYear: number,
  stateTaxRate: number
): PayBreakdown {
  const hourly = annualSalary / (weeksPerYear * hoursPerWeek);
  const daily = hourly * (hoursPerWeek / 5);
  const weekly = annualSalary / weeksPerYear;
  const biweekly = weekly * 2;
  const monthly = annualSalary / 12;

  const federalTax = calcFederalTax(annualSalary);
  const stateTax = annualSalary * (stateTaxRate / 100);
  const fica = calcFICA(annualSalary);
  const totalTax = federalTax + stateTax + fica;
  const takeHome = annualSalary - totalTax;
  const effectiveRate = annualSalary > 0 ? (totalTax / annualSalary) * 100 : 0;

  return {
    hourly,
    daily,
    weekly,
    biweekly,
    monthly,
    annual: annualSalary,
    federalTax,
    stateTax,
    fica,
    totalTax,
    takeHome,
    effectiveRate,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SalaryCalculatorPage() {
  const [mode, setMode] = useState<InputMode>("annual");
  const [inputValue, setInputValue] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");
  const [selectedState, setSelectedState] = useState(0);

  // Comparison mode
  const [showComparison, setShowComparison] = useState(false);
  const [compareValue, setCompareValue] = useState("");

  function toAnnual(value: number, m: InputMode, hpw: number, wpy: number): number {
    switch (m) {
      case "annual":
        return value;
      case "hourly":
        return value * hpw * wpy;
      case "daily":
        return value * (hpw / 5) > 0 ? value * 5 * wpy : 0;
      case "weekly":
        return value * wpy;
      case "monthly":
        return value * 12;
      default:
        return value;
    }
  }

  const stateTaxRate = STATE_TAX_RATES[selectedState]?.rate || 0;

  const primaryResult = useMemo(() => {
    const val = parseNum(inputValue);
    const hpw = parseNum(hoursPerWeek);
    const wpy = parseNum(weeksPerYear);
    if (val <= 0 || hpw <= 0 || wpy <= 0) return null;
    const annual = toAnnual(val, mode, hpw, wpy);
    return calculateAll(annual, hpw, wpy, stateTaxRate);
  }, [inputValue, mode, hoursPerWeek, weeksPerYear, stateTaxRate]);

  const compareResult = useMemo(() => {
    if (!showComparison) return null;
    const val = parseNum(compareValue);
    const hpw = parseNum(hoursPerWeek);
    const wpy = parseNum(weeksPerYear);
    if (val <= 0 || hpw <= 0 || wpy <= 0) return null;
    const annual = toAnnual(val, mode, hpw, wpy);
    return calculateAll(annual, hpw, wpy, stateTaxRate);
  }, [compareValue, showComparison, mode, hoursPerWeek, weeksPerYear, stateTaxRate]);

  const sectionClasses =
    "rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8";

  const inputLabel = INPUT_MODES.find((m) => m.key === mode)?.label || "Amount";

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

  function ResultTable({ data, label }: { data: PayBreakdown; label: string }) {
    const rows = [
      { period: "Hourly", value: data.hourly },
      { period: "Daily", value: data.daily },
      { period: "Weekly", value: data.weekly },
      { period: "Biweekly", value: data.biweekly },
      { period: "Monthly", value: data.monthly },
      { period: "Annual", value: data.annual },
    ];

    return (
      <div>
        <h3 className="text-sm font-semibold text-[#9d90f5] mb-3 uppercase tracking-wide">
          {label}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e1e2e]">
                <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Period</th>
                <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">Gross Pay</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.period} className="border-b border-[#1e1e2e]/60">
                  <td className="py-3 pr-4 text-[#c0c0d0]">{row.period}</td>
                  <td className="py-3 pl-4 text-right text-white font-semibold">
                    {formatCurrency(row.value)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  function TaxBreakdown({ data, label }: { data: PayBreakdown; label: string }) {
    return (
      <div>
        <h3 className="text-sm font-semibold text-[#9d90f5] mb-3 uppercase tracking-wide">
          {label} - Tax Estimate
        </h3>
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-[#8888a0]">Gross Annual</span>
            <span className="text-white font-semibold">{formatCurrency(data.annual)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8888a0]">Federal Tax</span>
            <span className="text-red-400">-{formatCurrency(data.federalTax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8888a0]">State Tax ({stateTaxRate}%)</span>
            <span className="text-red-400">-{formatCurrency(data.stateTax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8888a0]">FICA (SS + Medicare)</span>
            <span className="text-red-400">-{formatCurrency(data.fica)}</span>
          </div>
          <div className="border-t border-[#1e1e2e] pt-3 flex justify-between text-sm">
            <span className="text-[#8888a0]">Total Taxes</span>
            <span className="text-red-400 font-semibold">-{formatCurrency(data.totalTax)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8888a0]">Effective Tax Rate</span>
            <span className="text-[#8888a0]">{data.effectiveRate.toFixed(1)}%</span>
          </div>
          <div className="border-t border-[#1e1e2e] pt-3 flex justify-between">
            <span className="text-white font-semibold">Take-Home (Annual)</span>
            <span className="text-[#00e676] font-bold text-lg">{formatCurrency(data.takeHome)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8888a0]">Take-Home (Monthly)</span>
            <span className="text-[#00e676] font-semibold">{formatCurrency(data.takeHome / 12)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-[#8888a0]">Take-Home (Biweekly)</span>
            <span className="text-[#00e676] font-semibold">{formatCurrency(data.takeHome / 26)}</span>
          </div>

          {/* Visual: gross vs take-home */}
          <div className="mt-4">
            <div className="text-xs text-[#8888a0] mb-2">Gross vs Take-Home</div>
            <div className="w-full h-6 rounded-full bg-[#0a0a0f] overflow-hidden flex">
              <div
                className="h-full bg-[#00e676] transition-all duration-300"
                style={{ width: `${data.annual > 0 ? (data.takeHome / data.annual) * 100 : 0}%` }}
              />
              <div
                className="h-full bg-red-500/60 transition-all duration-300"
                style={{ width: `${data.annual > 0 ? (data.totalTax / data.annual) * 100 : 0}%` }}
              />
            </div>
            <div className="flex gap-6 text-xs text-[#8888a0] mt-2">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-[#00e676]" /> Take-Home ({data.annual > 0 ? ((data.takeHome / data.annual) * 100).toFixed(1) : 0}%)
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-red-500/60" /> Taxes ({data.effectiveRate.toFixed(1)}%)
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
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
              Salary to Hourly{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Convert between annual salary, hourly rate, daily, weekly, and
              monthly pay. Estimate taxes and compare two salaries side by side.
            </p>
          </div>

          {/* Input Section */}
          <div className={sectionClasses}>
            <h2 className="text-lg font-semibold text-white mb-1">
              Pay Details
            </h2>
            <p className="text-sm text-[#8888a0] mb-6">
              Enter any pay rate and we will calculate all the others instantly.
            </p>

            {/* Input mode selector */}
            <div className="flex flex-wrap gap-2 mb-6">
              {INPUT_MODES.map((m) => (
                <button
                  key={m.key}
                  onClick={() => setMode(m.key)}
                  className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    mode === m.key
                      ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                      : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Primary Input */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  {inputLabel}
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="any"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={mode === "annual" ? "60000" : mode === "hourly" ? "30" : "5000"}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-8 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Comparison Input */}
              {showComparison && (
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Compare: {inputLabel}
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="any"
                      value={compareValue}
                      onChange={(e) => setCompareValue(e.target.value)}
                      placeholder={mode === "annual" ? "75000" : mode === "hourly" ? "38" : "6000"}
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-8 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              {/* Hours per week */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Hours / Week
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    value={hoursPerWeek}
                    onChange={(e) => setHoursPerWeek(e.target.value)}
                    placeholder="40"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                    hrs
                  </span>
                </div>
              </div>

              {/* Weeks per year */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Weeks / Year
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    value={weeksPerYear}
                    onChange={(e) => setWeeksPerYear(e.target.value)}
                    placeholder="52"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-12"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                    wks
                  </span>
                </div>
              </div>

              {/* State Tax */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  State
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(Number(e.target.value))}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors appearance-none"
                >
                  {STATE_TAX_RATES.map((s, i) => (
                    <option key={i} value={i}>
                      {s.state} ({s.rate}%)
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Comparison toggle */}
            <button
              onClick={() => setShowComparison(!showComparison)}
              className={`rounded-xl border px-5 py-2.5 text-sm font-medium transition-all ${
                showComparison
                  ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                  : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
              }`}
            >
              {showComparison ? "Hide Comparison" : "Compare Two Salaries"}
            </button>
          </div>

          {/* Results */}
          {primaryResult && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Hourly
                  </div>
                  <div className="text-xl font-bold text-[#9d90f5]">
                    {formatCurrency(primaryResult.hourly)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Annual
                  </div>
                  <div className="text-xl font-bold text-white">
                    {formatCurrency(primaryResult.annual)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Take-Home
                  </div>
                  <div className="text-xl font-bold text-[#00e676]">
                    {formatCurrency(primaryResult.takeHome)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Total Tax
                  </div>
                  <div className="text-xl font-bold text-red-400">
                    {formatCurrency(primaryResult.totalTax)}
                  </div>
                </div>
              </div>

              {/* Detailed Results */}
              <div className={`${sectionClasses} mt-8`}>
                <div className={`grid ${showComparison && compareResult ? "grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#1e1e2e]" : "grid-cols-1"}`}>
                  <div className={showComparison && compareResult ? "lg:pr-8" : ""}>
                    <ResultTable data={primaryResult} label="Salary A" />
                  </div>
                  {showComparison && compareResult && (
                    <div className="lg:pl-8 pt-8 lg:pt-0">
                      <ResultTable data={compareResult} label="Salary B" />
                    </div>
                  )}
                </div>
              </div>

              {/* Tax Breakdown */}
              <div className={`${sectionClasses} mt-8`}>
                <h2 className="text-lg font-semibold text-white mb-6">
                  Tax Estimate
                </h2>
                <p className="text-xs text-[#555566] mb-6">
                  Simplified estimate using 2024 single-filer federal brackets. Does not include deductions, credits, or local taxes.
                </p>
                <div className={`grid ${showComparison && compareResult ? "grid-cols-1 lg:grid-cols-2 gap-8 divide-y lg:divide-y-0 lg:divide-x divide-[#1e1e2e]" : "grid-cols-1"}`}>
                  <div className={showComparison && compareResult ? "lg:pr-8" : ""}>
                    <TaxBreakdown data={primaryResult} label="Salary A" />
                  </div>
                  {showComparison && compareResult && (
                    <div className="lg:pl-8 pt-8 lg:pt-0">
                      <TaxBreakdown data={compareResult} label="Salary B" />
                    </div>
                  )}
                </div>
              </div>

              {/* Comparison Summary */}
              {showComparison && compareResult && (
                <div className="rounded-2xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-6 sm:p-8 mt-8">
                  <h2 className="text-lg font-semibold text-[#9d90f5] mb-4">
                    Comparison Summary
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        Annual Difference
                      </div>
                      <div className={`text-2xl font-bold ${compareResult.annual > primaryResult.annual ? "text-[#00e676]" : "text-red-400"}`}>
                        {compareResult.annual >= primaryResult.annual ? "+" : ""}
                        {formatCurrency(compareResult.annual - primaryResult.annual)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        Take-Home Difference
                      </div>
                      <div className={`text-2xl font-bold ${compareResult.takeHome > primaryResult.takeHome ? "text-[#00e676]" : "text-red-400"}`}>
                        {compareResult.takeHome >= primaryResult.takeHome ? "+" : ""}
                        {formatCurrency(compareResult.takeHome - primaryResult.takeHome)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        Hourly Difference
                      </div>
                      <div className={`text-2xl font-bold ${compareResult.hourly > primaryResult.hourly ? "text-[#00e676]" : "text-red-400"}`}>
                        {compareResult.hourly >= primaryResult.hourly ? "+" : ""}
                        {formatCurrency(compareResult.hourly - primaryResult.hourly)}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Pay",
                  description:
                    "Choose a pay period (annual, hourly, daily, weekly, or monthly) and enter your rate. Set your hours per week and weeks per year for accurate conversion.",
                },
                {
                  step: "2",
                  title: "View All Breakdowns",
                  description:
                    "Instantly see your pay converted to every period: hourly, daily, weekly, biweekly, monthly, and annual. All values update in real time.",
                },
                {
                  step: "3",
                  title: "Estimate Taxes & Compare",
                  description:
                    "See estimated federal tax, state tax, and FICA deductions. Toggle comparison mode to evaluate two salaries side by side for job offers or raises.",
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
                  title: "Mortgage Calculator",
                  description: "Calculate monthly mortgage payments and amortization schedules.",
                  href: "/tools/mortgage-calculator",
                },
                {
                  title: "Percentage Calculator",
                  description: "Calculate percentages, percentage change, increase and decrease.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Profit Margin Calculator",
                  description: "Calculate profit margins, markups, and break-even points.",
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
