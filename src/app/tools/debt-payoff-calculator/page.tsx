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
      <span className="text-[#f0f0f5]">Debt Payoff Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types & Logic                                                      */
/* ------------------------------------------------------------------ */

interface Debt {
  id: string;
  name: string;
  balance: string;
  interestRate: string;
  minimumPayment: string;
}

interface PayoffResult {
  name: string;
  months: number;
  totalInterest: number;
  totalPaid: number;
}

interface StrategyResult {
  payoffDate: string;
  totalMonths: number;
  totalInterest: number;
  debtResults: PayoffResult[];
}

function addMonths(date: Date, months: number): Date {
  const d = new Date(date);
  d.setMonth(d.getMonth() + months);
  return d;
}

function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long", year: "numeric" });
}

function calculatePayoff(
  debts: Debt[],
  strategy: "avalanche" | "snowball",
  extraPayment: number
): StrategyResult {
  // Prepare debt objects
  const debtList = debts
    .map((d) => ({
      id: d.id,
      name: d.name,
      balance: parseFloat(d.balance) || 0,
      rate: (parseFloat(d.interestRate) || 0) / 100 / 12,
      minPayment: parseFloat(d.minimumPayment) || 0,
      totalInterest: 0,
      totalPaid: 0,
      paidOffMonth: 0,
    }))
    .filter((d) => d.balance > 0 && d.minPayment > 0);

  if (debtList.length === 0) {
    return { payoffDate: "—", totalMonths: 0, totalInterest: 0, debtResults: [] };
  }

  // Sort by strategy
  const sorted = [...debtList];
  if (strategy === "avalanche") {
    sorted.sort((a, b) => b.rate - a.rate);
  } else {
    sorted.sort((a, b) => a.balance - b.balance);
  }

  let month = 0;
  const MAX_MONTHS = 600;

  while (sorted.some((d) => d.balance > 0) && month < MAX_MONTHS) {
    month++;

    // Calculate available extra payment (freed minimum payments + extra)
    let availableExtra = extraPayment;

    // Apply minimum payments first
    for (const d of sorted) {
      if (d.balance <= 0) {
        availableExtra += d.minPayment; // freed up minimum
        continue;
      }
      const interest = d.balance * d.rate;
      d.balance += interest;
      d.totalInterest += interest;
    }

    // Apply minimum payments
    for (const d of sorted) {
      if (d.balance <= 0) continue;
      const payment = Math.min(d.balance, d.minPayment);
      d.balance -= payment;
      d.totalPaid += payment;
      if (d.balance <= 0.01) {
        d.balance = 0;
        if (d.paidOffMonth === 0) d.paidOffMonth = month;
      }
    }

    // Apply extra payment to first active debt (by priority)
    for (const d of sorted) {
      if (d.balance <= 0) continue;
      const extraApplied = Math.min(d.balance, availableExtra);
      d.balance -= extraApplied;
      d.totalPaid += extraApplied;
      availableExtra -= extraApplied;
      if (d.balance <= 0.01) {
        d.balance = 0;
        if (d.paidOffMonth === 0) d.paidOffMonth = month;
      }
      if (availableExtra <= 0) break;
    }
  }

  const totalInterest = sorted.reduce((sum, d) => sum + d.totalInterest, 0);
  const payoffDate = formatDate(addMonths(new Date(), month));

  return {
    payoffDate,
    totalMonths: month,
    totalInterest,
    debtResults: sorted.map((d) => ({
      name: d.name,
      months: d.paidOffMonth || month,
      totalInterest: d.totalInterest,
      totalPaid: d.totalPaid,
    })),
  };
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is the debt avalanche method?",
    answer:
      "The debt avalanche method prioritizes paying off debts with the highest interest rate first, while making minimum payments on all others. Once the highest-rate debt is paid off, you roll that payment into the next highest-rate debt. This method minimizes total interest paid and is mathematically optimal — you'll pay less money overall compared to snowball.",
  },
  {
    question: "What is the debt snowball method?",
    answer:
      "The debt snowball method, popularized by Dave Ramsey, prioritizes paying off debts with the smallest balance first. As each debt is eliminated, the freed-up payment is added to the next smallest balance. This provides quick psychological wins — seeing debts disappear keeps motivation high. It may cost more in total interest than avalanche but works better for many people behaviorally.",
  },
  {
    question: "Which method is better — avalanche or snowball?",
    answer:
      "It depends on your personality. Avalanche is better mathematically — you pay less total interest. Snowball is better psychologically — quick wins keep you motivated. Research shows the snowball method often leads to better real-world outcomes because motivation matters. Many people choose avalanche if the differences are large, or snowball if they need early wins to stay on track.",
  },
  {
    question: "How much does an extra monthly payment help?",
    answer:
      "Even $50-$100 extra per month can shave months or years off your debt payoff timeline. The impact is largest early in repayment when more of your payment goes to interest. For example, adding $200/month extra to $20,000 of credit card debt at 20% APR can reduce payoff time from 10+ years to under 4 years and save thousands in interest.",
  },
  {
    question: "What is a debt-to-income ratio?",
    answer:
      "Debt-to-income (DTI) ratio is your total monthly debt payments divided by your gross monthly income. Lenders use it to evaluate creditworthiness. A DTI below 36% is generally considered healthy. Above 43% makes it hard to qualify for mortgages. To improve DTI: pay down existing debts, avoid new debt, and increase your income.",
  },
  {
    question: "Should I pay off debt or invest?",
    answer:
      "A good rule of thumb: if your debt interest rate is higher than your expected investment return (roughly 6-8%), pay off the debt first. High-interest debt like credit cards (15-25% APR) should almost always be paid down aggressively before investing beyond your employer's 401(k) match. Low-interest debt like mortgages (under 4-5%) may be worth carrying while investing.",
  },
  {
    question: "What is debt consolidation?",
    answer:
      "Debt consolidation combines multiple debts into a single loan — ideally at a lower interest rate. This simplifies payments and can reduce total interest paid. Options include personal loans, balance transfer credit cards (often 0% intro APR for 12-18 months), home equity loans, or debt management programs. Be cautious: consolidation only helps if you address the spending habits that created the debt.",
  },
  {
    question: "How do I stay motivated while paying off debt?",
    answer:
      "Track your progress visually — a debt thermometer or spreadsheet helps. Celebrate milestones (each debt paid off, every 10% paid down). Automate extra payments so you don't have to make the decision each month. Find an accountability partner. Calculate your payoff date and mark it on the calendar. Remember that every extra dollar today is worth far more than a dollar paid later due to interest.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

let debtIdCounter = 3;

const DEFAULT_DEBTS: Debt[] = [
  { id: "1", name: "Credit Card", balance: "8500", interestRate: "21.99", minimumPayment: "170" },
  { id: "2", name: "Car Loan", balance: "12000", interestRate: "7.5", minimumPayment: "260" },
  { id: "3", name: "Student Loan", balance: "24000", interestRate: "5.5", minimumPayment: "280" },
];

export default function DebtPayoffCalculatorPage() {
  const [debts, setDebts] = useState<Debt[]>(DEFAULT_DEBTS);
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [extraPayment, setExtraPayment] = useState("200");

  const addDebt = () => {
    debtIdCounter++;
    setDebts((prev) => [
      ...prev,
      {
        id: String(debtIdCounter),
        name: "New Debt",
        balance: "",
        interestRate: "",
        minimumPayment: "",
      },
    ]);
  };

  const removeDebt = (id: string) => {
    setDebts((prev) => prev.filter((d) => d.id !== id));
  };

  const updateDebt = (id: string, field: keyof Debt, value: string) => {
    setDebts((prev) => prev.map((d) => (d.id === id ? { ...d, [field]: value } : d)));
  };

  const results = useMemo(() => {
    const extra = parseFloat(extraPayment) || 0;
    const avalanche = calculatePayoff(debts, "avalanche", extra);
    const snowball = calculatePayoff(debts, "snowball", extra);
    const chosen = strategy === "avalanche" ? avalanche : snowball;
    return { avalanche, snowball, chosen };
  }, [debts, strategy, extraPayment]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const totalBalance = debts.reduce((s, d) => s + (parseFloat(d.balance) || 0), 0);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Debt Payoff Calculator",
    description:
      "Calculate debt payoff timeline and compare debt snowball vs avalanche strategies. Add multiple debts and extra payments.",
    url: "https://prestokit.com/tools/debt-payoff-calculator",
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
          <PromoBar type="pro" dismissKey="debt-payoff-pro" />
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Debt Payoff{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Add your debts, choose a payoff strategy, and see exactly when you&apos;ll
              be debt-free. Compare the avalanche and snowball methods side by side.
            </p>
          </div>

          {/* Strategy + Extra Payment */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Payoff Strategy
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {(["avalanche", "snowball"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setStrategy(s)}
                      className={`rounded-xl border py-3 text-sm font-semibold transition-all capitalize ${
                        strategy === s
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {s === "avalanche" ? "Avalanche (Highest Rate)" : "Snowball (Lowest Balance)"}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Extra Monthly Payment
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="50"
                    value={extraPayment}
                    onChange={(e) => setExtraPayment(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Debt List */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-sm font-semibold text-[#c0c0d0] uppercase tracking-wide">
                Your Debts
              </h2>
              <div className="text-sm text-[#8888a0]">
                Total Balance:{" "}
                <span className="text-white font-semibold">${fmt(totalBalance)}</span>
              </div>
            </div>

            <div className="space-y-4">
              {debts.map((debt) => (
                <div
                  key={debt.id}
                  className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <input
                      type="text"
                      value={debt.name}
                      onChange={(e) => updateDebt(debt.id, "name", e.target.value)}
                      className="flex-1 rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 px-3 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      placeholder="Debt name"
                    />
                    <button
                      onClick={() => removeDebt(debt.id)}
                      className="shrink-0 w-8 h-8 rounded-lg border border-[#1e1e2e] text-[#8888a0] hover:border-[#ff5252]/40 hover:text-[#ff5252] transition-all flex items-center justify-center text-lg leading-none"
                    >
                      &times;
                    </button>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs text-[#8888a0] mb-1">Balance</label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8888a0] text-xs pointer-events-none">
                          $
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={debt.balance}
                          onChange={(e) => updateDebt(debt.id, "balance", e.target.value)}
                          placeholder="0"
                          className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-6 pr-2 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#8888a0] mb-1">Interest Rate</label>
                      <div className="relative">
                        <input
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          value={debt.interestRate}
                          onChange={(e) => updateDebt(debt.id, "interestRate", e.target.value)}
                          placeholder="0"
                          className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-2 pr-6 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                        />
                        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8888a0] text-xs pointer-events-none">
                          %
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#8888a0] mb-1">Min. Payment</label>
                      <div className="relative">
                        <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8888a0] text-xs pointer-events-none">
                          $
                        </span>
                        <input
                          type="number"
                          min="0"
                          value={debt.minimumPayment}
                          onChange={(e) => updateDebt(debt.id, "minimumPayment", e.target.value)}
                          placeholder="0"
                          className="w-full rounded-lg border border-[#1e1e2e] bg-[#12121a] py-2 pl-6 pr-2 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={addDebt}
              className="mt-4 w-full rounded-xl border border-dashed border-[#1e1e2e] py-3 text-sm text-[#8888a0] hover:border-[#7c6cf0]/40 hover:text-[#7c6cf0] transition-all"
            >
              + Add Another Debt
            </button>
          </div>

          {/* Results */}
          {results.chosen.totalMonths > 0 && (
            <>
              {/* Main result */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="rounded-2xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-6">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">Debt-Free Date</div>
                  <div className="text-2xl font-bold text-white">{results.chosen.payoffDate}</div>
                  <div className="text-xs text-[#8888a0] mt-1">{results.chosen.totalMonths} months</div>
                </div>
                <div className="rounded-2xl border border-[#ff5252]/30 bg-[#ff5252]/5 p-6">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">Total Interest</div>
                  <div className="text-2xl font-bold text-[#ff5252]">${fmt(results.chosen.totalInterest)}</div>
                </div>
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">Total Paid</div>
                  <div className="text-2xl font-bold text-[#c0c0d0]">
                    ${fmt(totalBalance + results.chosen.totalInterest)}
                  </div>
                </div>
              </div>

              {/* Strategy Comparison */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
                <h2 className="text-lg font-semibold text-white mb-5">Strategy Comparison</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1e1e2e]">
                        <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Strategy</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Months</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Total Interest</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">Payoff Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { label: "Avalanche", data: results.avalanche },
                        { label: "Snowball", data: results.snowball },
                      ].map((row) => (
                        <tr
                          key={row.label}
                          className={`border-b border-[#1e1e2e]/60 ${
                            strategy === row.label.toLowerCase()
                              ? "bg-[#7c6cf0]/5"
                              : ""
                          }`}
                        >
                          <td className="py-3 pr-4 font-medium text-white">
                            {row.label}
                            {strategy === row.label.toLowerCase() && (
                              <span className="ml-2 text-xs text-[#7c6cf0]">(Selected)</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-right text-[#c0c0d0]">{row.data.totalMonths}</td>
                          <td className="py-3 px-4 text-right text-[#ff5252]">${fmt(row.data.totalInterest)}</td>
                          <td className="py-3 pl-4 text-right text-[#c0c0d0]">{row.data.payoffDate}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {results.avalanche.totalInterest !== results.snowball.totalInterest && (
                  <div className="mt-4 text-xs text-[#8888a0] bg-[#0a0a0f] rounded-xl p-3">
                    Avalanche saves{" "}
                    <span className="text-[#00e676] font-medium">
                      ${fmt(Math.abs(results.snowball.totalInterest - results.avalanche.totalInterest))}
                    </span>{" "}
                    in interest vs Snowball.
                    {results.snowball.totalMonths < results.avalanche.totalMonths && (
                      <> Snowball is{" "}
                        <span className="text-[#9d90f5] font-medium">
                          {results.avalanche.totalMonths - results.snowball.totalMonths} month(s) faster.
                        </span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Debt-by-debt breakdown */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
                <h2 className="text-lg font-semibold text-white mb-4">Payoff Order ({strategy === "avalanche" ? "Avalanche" : "Snowball"})</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#1e1e2e]">
                        <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Debt</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Paid Off (Month)</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 px-4">Interest Paid</th>
                        <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">Total Paid</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.chosen.debtResults.map((d, i) => (
                        <tr key={i} className="border-b border-[#1e1e2e]/60">
                          <td className="py-3 pr-4 text-white font-medium">{d.name}</td>
                          <td className="py-3 px-4 text-right text-[#9d90f5]">Month {d.months}</td>
                          <td className="py-3 px-4 text-right text-[#ff5252]">${fmt(d.totalInterest)}</td>
                          <td className="py-3 pl-4 text-right text-[#c0c0d0]">${fmt(d.totalPaid)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Add Your Debts",
                  description:
                    "Enter each debt with its current balance, interest rate, and minimum monthly payment. Add as many debts as you have.",
                },
                {
                  step: "2",
                  title: "Choose a Strategy",
                  description:
                    "Pick Avalanche (highest rate first — saves most money) or Snowball (smallest balance first — fastest wins). Set any extra monthly payment.",
                },
                {
                  step: "3",
                  title: "See Your Payoff Plan",
                  description:
                    "See your debt-free date, total interest paid, and a side-by-side comparison of both strategies to make an informed decision.",
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
                  title: "Loan Calculator",
                  description: "Calculate loan monthly payments and view a full amortization schedule.",
                  href: "/tools/loan-calculator",
                },
                {
                  title: "Net Worth Calculator",
                  description: "See your total net worth and track assets vs liabilities.",
                  href: "/tools/net-worth-calculator",
                },
                {
                  title: "Budget Calculator",
                  description: "Plan your monthly budget to free up extra cash for debt payments.",
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
