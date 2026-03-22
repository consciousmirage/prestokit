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
      <span className="text-[#f0f0f5]">Paycheck Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  2024 Federal Tax Brackets (Single)                                 */
/* ------------------------------------------------------------------ */

const FEDERAL_BRACKETS = [
  { min: 0, max: 11600, rate: 0.10 },
  { min: 11600, max: 47150, rate: 0.12 },
  { min: 47150, max: 100525, rate: 0.22 },
  { min: 100525, max: 191950, rate: 0.24 },
  { min: 191950, max: 243725, rate: 0.32 },
  { min: 243725, max: 609350, rate: 0.35 },
  { min: 609350, max: Infinity, rate: 0.37 },
];

const STANDARD_DEDUCTION = 14600;
const SOCIAL_SECURITY_RATE = 0.062;
const SOCIAL_SECURITY_CAP = 168600;
const MEDICARE_RATE = 0.0145;
const MEDICARE_ADDITIONAL_RATE = 0.009;
const MEDICARE_ADDITIONAL_THRESHOLD = 200000;

type PayFrequency = "weekly" | "biweekly" | "semimonthly" | "monthly";
type PayType = "salary" | "hourly";

const PAY_PERIODS: Record<PayFrequency, number> = {
  weekly: 52,
  biweekly: 26,
  semimonthly: 24,
  monthly: 12,
};

interface StateOption {
  name: string;
  code: string;
  rate: number; // Flat-ish effective rate approximation
}

const STATES: StateOption[] = [
  { name: "No State Tax (AK, FL, NV, NH, SD, TN, TX, WA, WY)", code: "none", rate: 0 },
  { name: "Alabama", code: "AL", rate: 0.04 },
  { name: "Arizona", code: "AZ", rate: 0.025 },
  { name: "Arkansas", code: "AR", rate: 0.039 },
  { name: "California", code: "CA", rate: 0.065 },
  { name: "Colorado", code: "CO", rate: 0.044 },
  { name: "Connecticut", code: "CT", rate: 0.05 },
  { name: "Delaware", code: "DE", rate: 0.048 },
  { name: "Georgia", code: "GA", rate: 0.0549 },
  { name: "Hawaii", code: "HI", rate: 0.064 },
  { name: "Idaho", code: "ID", rate: 0.058 },
  { name: "Illinois", code: "IL", rate: 0.0495 },
  { name: "Indiana", code: "IN", rate: 0.0305 },
  { name: "Iowa", code: "IA", rate: 0.044 },
  { name: "Kansas", code: "KS", rate: 0.046 },
  { name: "Kentucky", code: "KY", rate: 0.04 },
  { name: "Louisiana", code: "LA", rate: 0.0275 },
  { name: "Maine", code: "ME", rate: 0.055 },
  { name: "Maryland", code: "MD", rate: 0.05 },
  { name: "Massachusetts", code: "MA", rate: 0.05 },
  { name: "Michigan", code: "MI", rate: 0.0425 },
  { name: "Minnesota", code: "MN", rate: 0.0535 },
  { name: "Mississippi", code: "MS", rate: 0.047 },
  { name: "Missouri", code: "MO", rate: 0.048 },
  { name: "Montana", code: "MT", rate: 0.059 },
  { name: "Nebraska", code: "NE", rate: 0.0501 },
  { name: "New Jersey", code: "NJ", rate: 0.054 },
  { name: "New Mexico", code: "NM", rate: 0.039 },
  { name: "New York", code: "NY", rate: 0.0597 },
  { name: "North Carolina", code: "NC", rate: 0.045 },
  { name: "North Dakota", code: "ND", rate: 0.018 },
  { name: "Ohio", code: "OH", rate: 0.035 },
  { name: "Oklahoma", code: "OK", rate: 0.04 },
  { name: "Oregon", code: "OR", rate: 0.075 },
  { name: "Pennsylvania", code: "PA", rate: 0.0307 },
  { name: "Rhode Island", code: "RI", rate: 0.0475 },
  { name: "South Carolina", code: "SC", rate: 0.05 },
  { name: "Utah", code: "UT", rate: 0.0465 },
  { name: "Vermont", code: "VT", rate: 0.055 },
  { name: "Virginia", code: "VA", rate: 0.0475 },
  { name: "Washington D.C.", code: "DC", rate: 0.06 },
  { name: "West Virginia", code: "WV", rate: 0.05 },
  { name: "Wisconsin", code: "WI", rate: 0.0465 },
];

function calcFederalTax(taxableIncome: number): number {
  let tax = 0;
  for (const bracket of FEDERAL_BRACKETS) {
    if (taxableIncome <= bracket.min) break;
    const taxable = Math.min(taxableIncome, bracket.max) - bracket.min;
    tax += taxable * bracket.rate;
  }
  return tax;
}

/* ------------------------------------------------------------------ */
/*  Donut Chart                                                        */
/* ------------------------------------------------------------------ */

function DonutChart({
  segments,
}: {
  segments: { label: string; value: number; color: string }[];
}) {
  const total = segments.reduce((sum, s) => sum + s.value, 0);
  if (total <= 0) return null;

  let cumPercent = 0;
  const gradientParts: string[] = [];
  segments.forEach((s) => {
    const pct = (s.value / total) * 100;
    gradientParts.push(`${s.color} ${cumPercent}% ${cumPercent + pct}%`);
    cumPercent += pct;
  });

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-44 h-44 rounded-full relative"
        style={{
          background: `conic-gradient(${gradientParts.join(", ")})`,
        }}
      >
        <div className="absolute inset-5 rounded-full bg-[#12121a] flex items-center justify-center">
          <span className="text-xs text-[#8888a0] text-center leading-tight">
            $
            {total.toLocaleString("en-US", {
              maximumFractionDigits: 0,
            })}
            <br />
            <span className="text-[10px]">Per Pay Period</span>
          </span>
        </div>
      </div>
      <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs">
        {segments.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5">
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: s.color }}
            />
            <span className="text-[#8888a0]">
              {s.label} ({((s.value / total) * 100).toFixed(0)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What taxes come out of my paycheck?",
    answer:
      "Typical paycheck deductions include: federal income tax (based on your tax bracket and filing status), state income tax (varies by state, 0% to 13%+), Social Security tax (6.2% of wages up to $168,600 in 2024), and Medicare tax (1.45% on all earnings, plus an additional 0.9% on earnings over $200,000). You may also have deductions for 401(k) contributions, health insurance premiums, and other benefits.",
  },
  {
    question: "What is the difference between gross pay and net pay?",
    answer:
      "Gross pay is your total earnings before any deductions — your full salary or hourly wages. Net pay (take-home pay) is what you actually receive after all taxes, Social Security, Medicare, and other deductions are subtracted. For most employees, net pay is 65-80% of gross pay depending on income level and state.",
  },
  {
    question: "How often do I get paid?",
    answer:
      "Pay frequency depends on your employer: Weekly (52 paychecks/year) is common in hourly/retail jobs. Biweekly (26 paychecks/year) is the most common for salaried employees. Semi-monthly (24 paychecks/year, typically 1st and 15th) is also popular. Monthly (12 paychecks/year) is less common but used by some companies, especially for executives.",
  },
  {
    question: "Do all states have income tax?",
    answer:
      "No. Nine states have no state income tax: Alaska, Florida, Nevada, New Hampshire (dividends and interest only), South Dakota, Tennessee (dividends and interest only), Texas, Washington, and Wyoming. States with the highest income tax rates include California (up to 13.3%), Hawaii (up to 11%), and New Jersey (up to 10.75%).",
  },
  {
    question: "How does a 401(k) contribution affect my paycheck?",
    answer:
      "Traditional 401(k) contributions are deducted from your paycheck before federal and state income taxes are calculated. This reduces your taxable income, effectively giving you a tax break now. However, Social Security and Medicare taxes are still calculated on the full amount. For example, contributing $500/month to a 401(k) while in the 22% tax bracket saves you $110/month in federal taxes.",
  },
  {
    question: "Why is my first paycheck different from what I expected?",
    answer:
      "Several factors can cause differences: your first pay period may be partial (you didn't work the full period), your W-4 allowances affect how much federal tax is withheld, some benefits (health insurance, 401k) may have initial enrollment deductions, and some states have different withholding tables that don't perfectly match their tax rates.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PaycheckCalculatorPage() {
  const [payType, setPayType] = useState<PayType>("salary");
  const [salary, setSalary] = useState("75000");
  const [hourlyRate, setHourlyRate] = useState("35");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [payFrequency, setPayFrequency] = useState<PayFrequency>("biweekly");
  const [stateIndex, setStateIndex] = useState(0);
  const [retirement401k, setRetirement401k] = useState("");
  const [healthInsurance, setHealthInsurance] = useState("");

  const results = useMemo(() => {
    // Annual gross
    let annualGross: number;
    if (payType === "salary") {
      annualGross = parseFloat(salary) || 0;
    } else {
      annualGross =
        (parseFloat(hourlyRate) || 0) *
        (parseFloat(hoursPerWeek) || 0) *
        52;
    }

    const periods = PAY_PERIODS[payFrequency];
    const grossPerPeriod = annualGross / periods;

    // Pre-tax deductions (annual)
    const annual401k =
      (parseFloat(retirement401k) || 0) * 12;
    const annualHealth =
      (parseFloat(healthInsurance) || 0) * 12;
    const totalPreTax = annual401k + annualHealth;

    // Taxable income for federal
    const federalTaxable = Math.max(
      0,
      annualGross - totalPreTax - STANDARD_DEDUCTION
    );
    const federalTax = calcFederalTax(federalTaxable);

    // Social Security
    const ssTaxable = Math.min(annualGross, SOCIAL_SECURITY_CAP);
    const socialSecurity = ssTaxable * SOCIAL_SECURITY_RATE;

    // Medicare
    let medicare = annualGross * MEDICARE_RATE;
    if (annualGross > MEDICARE_ADDITIONAL_THRESHOLD) {
      medicare +=
        (annualGross - MEDICARE_ADDITIONAL_THRESHOLD) *
        MEDICARE_ADDITIONAL_RATE;
    }

    // State tax
    const state = STATES[stateIndex];
    const stateTax = (annualGross - totalPreTax) * state.rate;

    // Totals
    const totalTaxAnnual =
      federalTax + socialSecurity + medicare + stateTax;
    const totalDeductionsAnnual = totalTaxAnnual + totalPreTax;
    const annualNet = annualGross - totalDeductionsAnnual;

    return {
      annualGross,
      grossPerPeriod,
      federalTax: federalTax / periods,
      stateTax: stateTax / periods,
      socialSecurity: socialSecurity / periods,
      medicare: medicare / periods,
      retirement: annual401k / periods,
      health: annualHealth / periods,
      totalDeductions: totalDeductionsAnnual / periods,
      netPay: annualNet / periods,
      annualNet,
      annualFederalTax: federalTax,
      annualStateTax: stateTax,
      annualSS: socialSecurity,
      annualMedicare: medicare,
      effectiveTaxRate:
        annualGross > 0 ? (totalTaxAnnual / annualGross) * 100 : 0,
    };
  }, [
    payType,
    salary,
    hourlyRate,
    hoursPerWeek,
    payFrequency,
    stateIndex,
    retirement401k,
    healthInsurance,
  ]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

  const fmtInt = (n: number) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });

  const chartSegments = [
    { label: "Take Home", value: Math.max(0, results.netPay), color: "#00e676" },
    { label: "Federal Tax", value: results.federalTax, color: "#7c6cf0" },
    { label: "State Tax", value: results.stateTax, color: "#ff9100" },
    { label: "SS + Medicare", value: results.socialSecurity + results.medicare, color: "#ff5252" },
    ...(results.retirement > 0
      ? [{ label: "401(k)", value: results.retirement, color: "#40c4ff" }]
      : []),
    ...(results.health > 0
      ? [{ label: "Health Ins.", value: results.health, color: "#ce93d8" }]
      : []),
  ].filter((s) => s.value > 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Paycheck Calculator",
    description:
      "Calculate your take-home pay after federal and state taxes, Social Security, and Medicare.",
    url: "https://prestokit.com/tools/paycheck-calculator",
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
              Paycheck{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Estimate your take-home pay after federal tax, state tax, Social
              Security, and Medicare. See a detailed breakdown for any pay
              frequency.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 space-y-5">
              {/* Pay Type Toggle */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Pay Type
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(["salary", "hourly"] as PayType[]).map((type) => (
                    <button
                      key={type}
                      onClick={() => setPayType(type)}
                      className={`rounded-xl border py-3 text-sm font-semibold capitalize transition-all ${
                        payType === type
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              {/* Salary or Hourly Input */}
              {payType === "salary" ? (
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Annual Salary
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="1000"
                      min="0"
                      value={salary}
                      onChange={(e) => setSalary(e.target.value)}
                      placeholder="75,000"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Hourly Rate
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">
                        $
                      </span>
                      <input
                        type="number"
                        step="0.50"
                        min="0"
                        value={hourlyRate}
                        onChange={(e) => setHourlyRate(e.target.value)}
                        placeholder="35"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Hours / Week
                    </label>
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="168"
                      value={hoursPerWeek}
                      onChange={(e) => setHoursPerWeek(e.target.value)}
                      placeholder="40"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Pay Frequency */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Pay Frequency
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    [
                      { value: "weekly" as PayFrequency, label: "Weekly" },
                      { value: "biweekly" as PayFrequency, label: "Biweekly" },
                      {
                        value: "semimonthly" as PayFrequency,
                        label: "Semi-Monthly",
                      },
                      { value: "monthly" as PayFrequency, label: "Monthly" },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setPayFrequency(option.value)}
                      className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                        payFrequency === option.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  State
                </label>
                <select
                  value={stateIndex}
                  onChange={(e) => setStateIndex(parseInt(e.target.value))}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors appearance-none cursor-pointer"
                >
                  {STATES.map((s, i) => (
                    <option key={s.code} value={i}>
                      {s.name} {s.rate > 0 ? `(~${(s.rate * 100).toFixed(1)}%)` : ""}
                    </option>
                  ))}
                </select>
              </div>

              {/* Pre-tax Deductions */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    401(k) / Month
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="50"
                      min="0"
                      value={retirement401k}
                      onChange={(e) => setRetirement401k(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Health Ins. / Month
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="25"
                      min="0"
                      value={healthInsurance}
                      onChange={(e) => setHealthInsurance(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Per Paycheck ({payFrequency === "biweekly" ? "Biweekly" : payFrequency === "semimonthly" ? "Semi-Monthly" : payFrequency.charAt(0).toUpperCase() + payFrequency.slice(1)})
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Take-Home Pay
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      ${fmt(Math.max(0, results.netPay))}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Gross Pay
                    </div>
                    <div className="text-2xl font-bold text-[#c0c0d0]">
                      ${fmt(results.grossPerPeriod)}
                    </div>
                  </div>

                  {/* Deduction Lines */}
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 space-y-2">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                      Deductions
                    </div>
                    {[
                      { label: "Federal Tax", value: results.federalTax, color: "#7c6cf0" },
                      { label: "State Tax", value: results.stateTax, color: "#ff9100" },
                      { label: "Social Security", value: results.socialSecurity, color: "#ff5252" },
                      { label: "Medicare", value: results.medicare, color: "#ff5252" },
                      ...(results.retirement > 0
                        ? [{ label: "401(k)", value: results.retirement, color: "#40c4ff" }]
                        : []),
                      ...(results.health > 0
                        ? [{ label: "Health Insurance", value: results.health, color: "#ce93d8" }]
                        : []),
                    ].map((d) => (
                      <div
                        key={d.label}
                        className="flex items-center justify-between text-sm"
                      >
                        <div className="flex items-center gap-2">
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: d.color }}
                          />
                          <span className="text-[#8888a0]">{d.label}</span>
                        </div>
                        <span className="text-white font-medium">
                          -${fmt(d.value)}
                        </span>
                      </div>
                    ))}
                    <div className="border-t border-[#1e1e2e] pt-2 flex items-center justify-between text-sm font-semibold">
                      <span className="text-[#c0c0d0]">Total Deductions</span>
                      <span className="text-[#ff5252]">
                        -${fmt(results.totalDeductions)}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Effective Tax Rate
                      </div>
                      <div className="text-xl font-bold text-white">
                        {results.effectiveTaxRate.toFixed(1)}%
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Annual Net
                      </div>
                      <div className="text-xl font-bold text-[#00e676]">
                        ${fmtInt(results.annualNet)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Donut Chart */}
              {results.grossPerPeriod > 0 && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                  <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5 text-center">
                    Paycheck Breakdown
                  </h2>
                  <DonutChart segments={chartSegments} />
                </div>
              )}
            </div>
          </div>

          {/* Annual Summary */}
          {results.annualGross > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <h2 className="text-lg font-semibold text-white mb-4">
                Annual Summary
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  { label: "Gross Income", value: results.annualGross },
                  { label: "Federal Tax", value: results.annualFederalTax },
                  { label: "State Tax", value: results.annualStateTax },
                  { label: "SS + Medicare", value: results.annualSS + results.annualMedicare },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center"
                  >
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                      {item.label}
                    </div>
                    <div className="text-lg font-bold text-white">
                      ${fmtInt(item.value)}
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
                  title: "Enter Your Pay",
                  description:
                    "Input your annual salary or hourly rate with hours per week. Select how often you get paid — weekly, biweekly, semi-monthly, or monthly.",
                },
                {
                  step: "2",
                  title: "Select Your State",
                  description:
                    "Choose your state to include state income tax. Add optional pre-tax deductions like 401(k) contributions and health insurance premiums.",
                },
                {
                  step: "3",
                  title: "View Your Paycheck",
                  description:
                    "See your take-home pay per paycheck with a detailed breakdown of federal tax, state tax, Social Security, Medicare, and other deductions.",
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
                    "Estimate your federal income tax by bracket with visual breakdown.",
                  href: "/tools/tax-calculator",
                },
                {
                  title: "Salary Calculator",
                  description:
                    "Convert between hourly, daily, monthly, and annual salary rates.",
                  href: "/tools/salary-calculator",
                },
                {
                  title: "Pay Stub Creator",
                  description:
                    "Create professional pay stubs for employees and contractors.",
                  href: "/tools/pay-stub-creator",
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
