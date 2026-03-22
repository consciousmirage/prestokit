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
      <span className="text-[#f0f0f5]">Loan Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Amortization Calculation                                           */
/* ------------------------------------------------------------------ */

interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  balance: number;
  totalInterest: number;
}

function calculateAmortization(
  loanAmount: number,
  annualRate: number,
  termMonths: number
): { schedule: AmortizationRow[]; monthlyPayment: number; totalInterest: number; totalCost: number } {
  if (loanAmount <= 0 || termMonths <= 0) {
    return { schedule: [], monthlyPayment: 0, totalInterest: 0, totalCost: 0 };
  }

  const monthlyRate = annualRate / 100 / 12;

  let monthlyPayment: number;
  if (monthlyRate === 0) {
    monthlyPayment = loanAmount / termMonths;
  } else {
    monthlyPayment =
      (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, termMonths))) /
      (Math.pow(1 + monthlyRate, termMonths) - 1);
  }

  const schedule: AmortizationRow[] = [];
  let balance = loanAmount;
  let totalInterest = 0;

  for (let month = 1; month <= termMonths; month++) {
    const interestPayment = balance * monthlyRate;
    const principalPayment = monthlyPayment - interestPayment;
    balance -= principalPayment;
    totalInterest += interestPayment;

    schedule.push({
      month,
      payment: monthlyPayment,
      principal: principalPayment,
      interest: interestPayment,
      balance: Math.max(0, balance),
      totalInterest,
    });
  }

  return {
    schedule,
    monthlyPayment,
    totalInterest,
    totalCost: loanAmount + totalInterest,
  };
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How is monthly loan payment calculated?",
    answer:
      "Monthly loan payment is calculated using the standard amortization formula: M = P[r(1+r)^n] / [(1+r)^n - 1], where M is the monthly payment, P is the principal loan amount, r is the monthly interest rate (annual rate / 12), and n is the number of monthly payments (loan term in months). This formula ensures each payment covers both interest and principal.",
  },
  {
    question: "What is an amortization schedule?",
    answer:
      "An amortization schedule is a detailed table showing each payment over the life of a loan. For each month, it breaks down how much of your payment goes toward interest vs. principal, and shows the remaining balance. In the early months, a larger portion goes to interest. Over time, more of each payment goes toward reducing the principal.",
  },
  {
    question: "How does interest rate affect my loan payments?",
    answer:
      "Even a small change in interest rate can significantly affect your total cost. For example, on a $30,000 loan over 5 years, the difference between 5% and 7% APR is about $1,600 in total interest paid. Higher rates mean more of each payment goes to interest, especially in the early years of the loan.",
  },
  {
    question: "What is the difference between APR and interest rate?",
    answer:
      "The interest rate is the base cost of borrowing money. APR (Annual Percentage Rate) includes the interest rate plus additional fees and charges (like origination fees, closing costs, etc.), giving you a more complete picture of the total cost of borrowing. APR is typically slightly higher than the basic interest rate. This calculator uses the interest rate for payment calculations.",
  },
  {
    question: "Should I choose a shorter or longer loan term?",
    answer:
      "A shorter loan term means higher monthly payments but significantly less total interest paid. A longer term gives you lower monthly payments but costs more overall. For example, a $20,000 loan at 6%: a 3-year term costs $2,000 in interest with $608/month payments, while a 5-year term costs $3,200 in interest with $387/month payments. Choose based on what you can afford monthly.",
  },
  {
    question: "What types of loans does this calculator work for?",
    answer:
      "This calculator works for any fixed-rate, fully amortizing loan including personal loans, auto loans, student loans, and small business loans. It does not account for variable rates, balloon payments, or interest-only periods. For mortgages, you may want to use our dedicated Mortgage Calculator which includes property tax and insurance estimates.",
  },
];

/* ------------------------------------------------------------------ */
/*  Loan Term Presets                                                  */
/* ------------------------------------------------------------------ */

const TERM_PRESETS = [
  { label: "1 Year", months: 12 },
  { label: "2 Years", months: 24 },
  { label: "3 Years", months: 36 },
  { label: "4 Years", months: 48 },
  { label: "5 Years", months: 60 },
  { label: "7 Years", months: 84 },
  { label: "10 Years", months: 120 },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function LoanCalculatorPage() {
  const [loanAmount, setLoanAmount] = useState("25000");
  const [interestRate, setInterestRate] = useState("6.5");
  const [termMonths, setTermMonths] = useState("60");
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const results = useMemo(() => {
    const amount = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseInt(termMonths) || 0;
    return calculateAmortization(amount, rate, months);
  }, [loanAmount, interestRate, termMonths]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  const fmtInt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const principal = parseFloat(loanAmount) || 0;
  const interestPercent =
    results.totalCost > 0 ? (results.totalInterest / results.totalCost) * 100 : 0;

  // Show yearly summary
  const yearlySummary = useMemo(() => {
    const yearly: { year: number; principal: number; interest: number; balance: number }[] = [];
    let yearPrincipal = 0;
    let yearInterest = 0;

    for (const row of results.schedule) {
      yearPrincipal += row.principal;
      yearInterest += row.interest;

      if (row.month % 12 === 0 || row.month === results.schedule.length) {
        yearly.push({
          year: Math.ceil(row.month / 12),
          principal: yearPrincipal,
          interest: yearInterest,
          balance: row.balance,
        });
        yearPrincipal = 0;
        yearInterest = 0;
      }
    }
    return yearly;
  }, [results.schedule]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Loan Calculator",
    description:
      "Calculate loan monthly payments, total interest, and view full amortization schedule. Works for personal, auto, and student loans.",
    url: "https://prestokit.com/tools/loan-calculator",
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
              Loan{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate monthly loan payments, total interest, and total cost.
              View a full amortization schedule with principal vs. interest
              breakdown for every payment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Loan Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="1000"
                    min="0"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(e.target.value)}
                    placeholder="25,000"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Annual Interest Rate
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="50"
                    value={interestRate}
                    onChange={(e) => setInterestRate(e.target.value)}
                    placeholder="6.5"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-4 pr-9 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    %
                  </span>
                </div>
              </div>

              {/* Loan Term */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Loan Term (months)
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="600"
                  value={termMonths}
                  onChange={(e) => setTermMonths(e.target.value)}
                  placeholder="60"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors mb-3"
                />
                <div className="flex flex-wrap gap-2">
                  {TERM_PRESETS.map((preset) => (
                    <button
                      key={preset.months}
                      onClick={() => setTermMonths(preset.months.toString())}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        termMonths === preset.months.toString()
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Loan Summary
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Monthly Payment
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${fmt(results.monthlyPayment)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Total Interest
                      </div>
                      <div className="text-2xl font-bold text-[#ff5252]">
                        ${fmtInt(results.totalInterest)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Total Cost
                      </div>
                      <div className="text-2xl font-bold text-[#c0c0d0]">
                        ${fmtInt(results.totalCost)}
                      </div>
                    </div>
                  </div>

                  {/* Visual breakdown */}
                  {principal > 0 && (
                    <div>
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        Principal vs Interest
                      </div>
                      <div className="w-full h-8 bg-[#0a0a0f] rounded-lg overflow-hidden flex">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${100 - interestPercent}%`,
                            background: "linear-gradient(90deg, #7c6cf0, #9d90f5)",
                          }}
                        />
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${interestPercent}%`,
                            background: "linear-gradient(90deg, #ff5252, #ff1744)",
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-xs">
                        <span className="text-[#9d90f5]">
                          Principal: ${fmtInt(principal)} ({(100 - interestPercent).toFixed(1)}%)
                        </span>
                        <span className="text-[#ff5252]">
                          Interest: ${fmtInt(results.totalInterest)} ({interestPercent.toFixed(1)}%)
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Biweekly Payment
                      </div>
                      <div className="text-lg font-bold text-white">
                        ${fmt(results.monthlyPayment / 2)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Weekly Payment
                      </div>
                      <div className="text-lg font-bold text-white">
                        ${fmt((results.monthlyPayment * 12) / 52)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Yearly Summary */}
          {yearlySummary.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <h2 className="text-lg font-semibold text-white mb-4">
                Yearly Summary
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Year</th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Principal Paid</th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Interest Paid</th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">Remaining Balance</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearlySummary.map((row) => (
                      <tr key={row.year} className="border-b border-[#1e1e2e]/60">
                        <td className="py-3 pr-4 text-[#c0c0d0] font-medium">{row.year}</td>
                        <td className="py-3 px-4 text-right text-[#9d90f5]">${fmtInt(row.principal)}</td>
                        <td className="py-3 px-4 text-right text-[#ff5252]">${fmtInt(row.interest)}</td>
                        <td className="py-3 pl-4 text-right text-[#c0c0d0]">${fmtInt(row.balance)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Full Amortization Schedule */}
          {results.schedule.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-white">
                  Amortization Schedule
                </h2>
                <button
                  onClick={() => setShowFullSchedule(!showFullSchedule)}
                  className="text-sm font-medium text-[#7c6cf0] hover:text-[#9d90f5] transition-colors"
                >
                  {showFullSchedule ? "Show Less" : `Show All ${results.schedule.length} Months`}
                </button>
              </div>
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
                    {(showFullSchedule ? results.schedule : results.schedule.slice(0, 12)).map(
                      (row) => (
                        <tr key={row.month} className="border-b border-[#1e1e2e]/60">
                          <td className="py-2.5 pr-4 text-[#c0c0d0]">{row.month}</td>
                          <td className="py-2.5 px-4 text-right text-white">${fmt(row.payment)}</td>
                          <td className="py-2.5 px-4 text-right text-[#9d90f5]">
                            ${fmt(row.principal)}
                          </td>
                          <td className="py-2.5 px-4 text-right text-[#ff5252]">
                            ${fmt(row.interest)}
                          </td>
                          <td className="py-2.5 pl-4 text-right text-[#c0c0d0]">
                            ${fmt(row.balance)}
                          </td>
                        </tr>
                      )
                    )}
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
                  title: "Enter Loan Details",
                  description:
                    "Type in the loan amount, annual interest rate, and loan term. Use the quick preset buttons for common loan terms.",
                },
                {
                  step: "2",
                  title: "View Payment Summary",
                  description:
                    "See your monthly payment, total interest, total cost, and a visual breakdown of principal vs. interest.",
                },
                {
                  step: "3",
                  title: "Explore the Schedule",
                  description:
                    "View the full amortization schedule showing how each payment is split between principal and interest over time.",
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              Related Tools
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Mortgage Calculator",
                  description:
                    "Calculate monthly mortgage payments with amortization schedule.",
                  href: "/tools/mortgage-calculator",
                },
                {
                  title: "Compound Interest Calculator",
                  description:
                    "Calculate compound interest with contributions and visualize growth over time.",
                  href: "/tools/compound-interest-calculator",
                },
                {
                  title: "ROI Calculator",
                  description:
                    "Calculate return on investment, compound growth, and marketing ROI.",
                  href: "/tools/roi-calculator",
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
