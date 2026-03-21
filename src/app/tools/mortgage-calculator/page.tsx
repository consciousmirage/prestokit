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
      <span className="text-[#f0f0f5]">Mortgage Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const LOAN_TERMS = [
  { value: 15, label: "15 years" },
  { value: 20, label: "20 years" },
  { value: 30, label: "30 years" },
  { value: 0, label: "Custom" },
];

const FAQ_DATA = [
  {
    question: "How is my monthly mortgage payment calculated?",
    answer:
      "Your monthly payment is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where P is the loan amount, r is the monthly interest rate (annual rate / 12), and n is the total number of payments (years x 12). This formula gives you the fixed monthly payment that includes both principal and interest.",
  },
  {
    question: "What is included in a mortgage payment?",
    answer:
      "A basic mortgage payment includes principal (the loan amount you are paying back) and interest (the cost of borrowing). In practice, most lenders also collect property taxes and homeowners insurance through escrow, often referred to as PITI (Principal, Interest, Taxes, Insurance). This calculator focuses on the principal and interest portion.",
  },
  {
    question: "How do extra payments reduce my mortgage?",
    answer:
      "Extra payments go directly toward your loan principal, which reduces the balance faster. Since interest is calculated on the remaining balance, a lower balance means less interest each month. Even small extra payments can save you tens of thousands of dollars and shave years off your mortgage.",
  },
  {
    question: "Should I choose a 15-year or 30-year mortgage?",
    answer:
      "A 15-year mortgage has higher monthly payments but a lower interest rate, and you pay much less total interest. A 30-year mortgage has lower monthly payments but costs more in total interest over the life of the loan. Choose based on your monthly budget and long-term financial goals.",
  },
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule is a table that shows each monthly payment broken down into principal and interest, along with the remaining loan balance. Early in the loan, most of your payment goes toward interest. Over time, the principal portion grows and the interest portion shrinks.",
  },
  {
    question: "Is this mortgage calculator free to use?",
    answer:
      "Yes, completely free with no signup required. All calculations happen instantly in your browser. No data is sent to any server. Use it to compare different loan scenarios, see the impact of extra payments, and plan your home purchase.",
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

interface AmortRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function MortgageCalculatorPage() {
  const [homePrice, setHomePrice] = useState("350000");
  const [downPaymentVal, setDownPaymentVal] = useState("70000");
  const [downPaymentMode, setDownPaymentMode] = useState<"$" | "%">("$");
  const [selectedTerm, setSelectedTerm] = useState(30);
  const [customTerm, setCustomTerm] = useState("");
  const [interestRate, setInterestRate] = useState("6.5");
  const [extraPayment, setExtraPayment] = useState("");

  const loanTerm = selectedTerm === 0 ? parseNum(customTerm) : selectedTerm;

  const results = useMemo(() => {
    const price = parseNum(homePrice);
    const rate = parseNum(interestRate) / 100;
    const years = loanTerm;
    const extra = parseNum(extraPayment);

    let downPayment: number;
    if (downPaymentMode === "%") {
      downPayment = price * (parseNum(downPaymentVal) / 100);
    } else {
      downPayment = parseNum(downPaymentVal);
    }

    const loanAmount = Math.max(0, price - downPayment);
    const monthlyRate = rate / 12;
    const totalPayments = years * 12;

    if (loanAmount <= 0 || monthlyRate <= 0 || totalPayments <= 0) {
      return null;
    }

    // Standard monthly payment formula
    const monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    const totalPaid = monthlyPayment * totalPayments;
    const totalInterest = totalPaid - loanAmount;

    // Amortization schedule (first 12 months)
    const amortization: AmortRow[] = [];
    let balance = loanAmount;
    for (let m = 1; m <= Math.min(12, totalPayments); m++) {
      const interestPortion = balance * monthlyRate;
      const principalPortion = monthlyPayment - interestPortion;
      balance = Math.max(0, balance - principalPortion);
      amortization.push({
        month: m,
        payment: monthlyPayment,
        principal: principalPortion,
        interest: interestPortion,
        balance,
      });
    }

    // Extra payments calculation
    let extraSavings = null;
    if (extra > 0) {
      let balNormal = loanAmount;
      let balExtra = loanAmount;
      let monthsNormal = 0;
      let monthsExtra = 0;
      let totalPaidNormal = 0;
      let totalPaidExtra = 0;

      // Normal payoff
      while (balNormal > 0.01 && monthsNormal < totalPayments) {
        const intN = balNormal * monthlyRate;
        const princN = Math.min(monthlyPayment - intN, balNormal);
        balNormal -= princN;
        totalPaidNormal += monthlyPayment;
        monthsNormal++;
      }

      // With extra payments
      while (balExtra > 0.01 && monthsExtra < totalPayments * 2) {
        const intE = balExtra * monthlyRate;
        const princE = Math.min(monthlyPayment - intE + extra, balExtra);
        balExtra -= princE;
        totalPaidExtra += Math.min(monthlyPayment + extra, monthlyPayment - intE + extra + intE);
        monthsExtra++;
      }

      const monthsSaved = monthsNormal - monthsExtra;
      const moneySaved = totalPaidNormal - totalPaidExtra;

      extraSavings = {
        monthsSaved: Math.max(0, monthsSaved),
        yearsSaved: Math.max(0, Math.floor(monthsSaved / 12)),
        remainingMonths: Math.max(0, monthsSaved % 12),
        moneySaved: Math.max(0, moneySaved),
        newTotalMonths: monthsExtra,
      };
    }

    return {
      loanAmount,
      monthlyPayment,
      totalPaid,
      totalInterest,
      downPayment,
      amortization,
      extraSavings,
    };
  }, [homePrice, downPaymentVal, downPaymentMode, loanTerm, interestRate, extraPayment]);

  const sectionClasses =
    "rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8";

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Mortgage{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate your monthly mortgage payment, view an amortization
              breakdown, and see how extra payments can save you time and money.
            </p>
          </div>

          {/* Input Section */}
          <div className={sectionClasses}>
            <h2 className="text-lg font-semibold text-white mb-1">
              Loan Details
            </h2>
            <p className="text-sm text-[#8888a0] mb-6">
              Enter your mortgage details below. Results update in real time.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              {/* Home Price */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="any"
                    value={homePrice}
                    onChange={(e) => setHomePrice(e.target.value)}
                    placeholder="350000"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-8 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Down Payment
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                      {downPaymentMode === "$" ? "$" : ""}
                    </span>
                    <input
                      type="number"
                      step="any"
                      value={downPaymentVal}
                      onChange={(e) => setDownPaymentVal(e.target.value)}
                      placeholder={downPaymentMode === "$" ? "70000" : "20"}
                      className={`w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors ${
                        downPaymentMode === "$" ? "pl-8" : "pl-4"
                      }`}
                    />
                    {downPaymentMode === "%" && (
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                        %
                      </span>
                    )}
                  </div>
                  <div className="flex rounded-xl border border-[#1e1e2e] overflow-hidden">
                    <button
                      onClick={() => setDownPaymentMode("$")}
                      className={`px-4 py-3 text-sm font-medium transition-colors ${
                        downPaymentMode === "$"
                          ? "bg-[#7c6cf0] text-white"
                          : "bg-[#0a0a0f] text-[#8888a0] hover:text-white"
                      }`}
                    >
                      $
                    </button>
                    <button
                      onClick={() => setDownPaymentMode("%")}
                      className={`px-4 py-3 text-sm font-medium transition-colors ${
                        downPaymentMode === "%"
                          ? "bg-[#7c6cf0] text-white"
                          : "bg-[#0a0a0f] text-[#8888a0] hover:text-white"
                      }`}
                    >
                      %
                    </button>
                  </div>
                </div>
              </div>

              {/* Loan Term */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Loan Term
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {LOAN_TERMS.map((t) => (
                    <button
                      key={t.value}
                      onClick={() => setSelectedTerm(t.value)}
                      className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all ${
                        selectedTerm === t.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
                {selectedTerm === 0 && (
                  <div className="mt-3 relative">
                    <input
                      type="number"
                      step="1"
                      value={customTerm}
                      onChange={(e) => setCustomTerm(e.target.value)}
                      placeholder="Enter years"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-16"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                      years
                    </span>
                  </div>
                )}
              </div>

              {/* Interest Rate */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="any"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="6.5"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-10"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                    %
                  </span>
                </div>
              </div>
            </div>

            {/* Extra Payment */}
            <div className="border-t border-[#1e1e2e] pt-6 mt-2">
              <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                Extra Monthly Payment (optional)
              </label>
              <div className="relative max-w-xs">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  step="any"
                  value={extraPayment}
                  onChange={(e) => setExtraPayment(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-8 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>
              <p className="text-xs text-[#555566] mt-2">
                See how adding extra to your monthly payment saves time and money.
              </p>
            </div>
          </div>

          {/* Results */}
          {results && (
            <>
              {/* Summary Cards */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-8">
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Monthly Payment
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#00e676]">
                    {formatCurrency(results.monthlyPayment)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Loan Amount
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-[#9d90f5]">
                    {formatCurrency(results.loanAmount)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Total Interest
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-red-400">
                    {formatCurrency(results.totalInterest)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Total Paid
                  </div>
                  <div className="text-xl sm:text-2xl font-bold text-white">
                    {formatCurrency(results.totalPaid)}
                  </div>
                </div>
              </div>

              {/* Principal vs Interest Visual */}
              <div className={`${sectionClasses} mt-8`}>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Principal vs Interest
                </h2>
                <div className="space-y-3">
                  {results.amortization.map((row) => {
                    const total = row.principal + row.interest;
                    const principalPct = total > 0 ? (row.principal / total) * 100 : 0;
                    const interestPct = total > 0 ? (row.interest / total) * 100 : 0;
                    return (
                      <div key={row.month}>
                        <div className="flex justify-between text-xs text-[#8888a0] mb-1">
                          <span>Month {row.month}</span>
                          <span>
                            Principal: {formatCurrency(row.principal)} | Interest: {formatCurrency(row.interest)}
                          </span>
                        </div>
                        <div className="w-full h-5 rounded-full bg-[#0a0a0f] overflow-hidden flex">
                          <div
                            className="h-full bg-[#7c6cf0] transition-all duration-300"
                            style={{ width: `${principalPct}%` }}
                            title={`Principal: ${principalPct.toFixed(1)}%`}
                          />
                          <div
                            className="h-full bg-red-500/70 transition-all duration-300"
                            style={{ width: `${interestPct}%` }}
                            title={`Interest: ${interestPct.toFixed(1)}%`}
                          />
                        </div>
                      </div>
                    );
                  })}
                  <div className="flex gap-6 text-xs text-[#8888a0] mt-2">
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-[#7c6cf0]" /> Principal
                    </span>
                    <span className="flex items-center gap-2">
                      <span className="w-3 h-3 rounded bg-red-500/70" /> Interest
                    </span>
                  </div>
                </div>
              </div>

              {/* Amortization Table */}
              <div className={`${sectionClasses} mt-8`}>
                <h2 className="text-lg font-semibold text-white mb-4">
                  Amortization Schedule (First 12 Months)
                </h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1e1e2e]">
                        <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Month</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Payment</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Principal</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Interest</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.amortization.map((row) => (
                        <tr key={row.month} className="border-b border-[#1e1e2e]/60">
                          <td className="py-3 pr-4 text-white font-semibold">{row.month}</td>
                          <td className="py-3 px-4 text-right text-[#c0c0d0]">{formatCurrency(row.payment)}</td>
                          <td className="py-3 px-4 text-right text-[#9d90f5]">{formatCurrency(row.principal)}</td>
                          <td className="py-3 px-4 text-right text-red-400">{formatCurrency(row.interest)}</td>
                          <td className="py-3 pl-4 text-right text-[#8888a0]">{formatCurrency(row.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Extra Payment Savings */}
              {results.extraSavings && (
                <div className="rounded-2xl border border-[#00e676]/30 bg-[#00e676]/5 p-6 sm:p-8 mt-8">
                  <h2 className="text-lg font-semibold text-[#00e676] mb-4">
                    Extra Payment Savings
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        Time Saved
                      </div>
                      <div className="text-2xl font-bold text-[#00e676]">
                        {results.extraSavings.yearsSaved > 0
                          ? `${results.extraSavings.yearsSaved}y ${results.extraSavings.remainingMonths}m`
                          : `${results.extraSavings.monthsSaved}m`}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        Money Saved
                      </div>
                      <div className="text-2xl font-bold text-[#00e676]">
                        {formatCurrency(results.extraSavings.moneySaved)}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        New Payoff
                      </div>
                      <div className="text-2xl font-bold text-white">
                        {Math.floor(results.extraSavings.newTotalMonths / 12)}y{" "}
                        {results.extraSavings.newTotalMonths % 12}m
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-[#8888a0] mt-4 text-center">
                    By adding {formatCurrency(parseNum(extraPayment))} extra each month, you save{" "}
                    {formatCurrency(results.extraSavings.moneySaved)} in interest and pay off your
                    mortgage{" "}
                    {results.extraSavings.yearsSaved > 0
                      ? `${results.extraSavings.yearsSaved} years and ${results.extraSavings.remainingMonths} months`
                      : `${results.extraSavings.monthsSaved} months`}{" "}
                    sooner.
                  </p>
                </div>
              )}
            </>
          )}

          {/* ==================== PROMO BANNER ==================== */}
          <div className="mt-10">
            <PromoBar
              type="pro"
              dismissKey="mortgage-pro"
            />
          </div>

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Loan Details",
                  description:
                    "Input your home price, down payment, loan term, and interest rate. Toggle between dollar amount and percentage for the down payment.",
                },
                {
                  step: "2",
                  title: "View Your Results",
                  description:
                    "Instantly see your monthly payment, total interest, and a month-by-month amortization table showing how each payment is split between principal and interest.",
                },
                {
                  step: "3",
                  title: "Optimize with Extra Payments",
                  description:
                    "Add an optional extra monthly payment to see how much time and money you can save. Even small amounts can make a big difference over the life of your loan.",
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
                  title: "Percentage Calculator",
                  description: "Calculate percentages, percentage change, increase and decrease.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Profit Margin Calculator",
                  description: "Calculate profit margins, markups, and break-even points.",
                  href: "/tools/profit-margin-calculator",
                },
                {
                  title: "Salary Calculator",
                  description: "Convert between salary, hourly, and other pay rates.",
                  href: "/tools/salary-calculator",
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
