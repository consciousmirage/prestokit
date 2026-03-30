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
      <span className="text-[#f0f0f5]">Budget Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface ExpenseCategory {
  key: string;
  label: string;
  value: string;
  type: "needs" | "wants" | "savings";
  color: string;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is the 50/30/20 budgeting rule?",
    answer:
      "The 50/30/20 rule, popularized by Senator Elizabeth Warren, divides your after-tax income: 50% goes to needs (housing, food, utilities, transportation, insurance), 30% goes to wants (dining out, entertainment, subscriptions, hobbies), and 20% goes to savings and debt repayment. It's a simple framework that works as a starting point for most budgets.",
  },
  {
    question: "What counts as a 'need' vs a 'want'?",
    answer:
      "Needs are expenses required to live and work: rent/mortgage, groceries, utilities, basic transportation, health insurance, and minimum debt payments. Wants are extras that improve quality of life but aren't essential: streaming services, dining out, gym memberships, vacations, and shopping for non-essentials. The line can blur — for example, a car may be a need for commuting but a luxury model is a want.",
  },
  {
    question: "What if my housing costs more than 30% of income?",
    answer:
      "In high cost-of-living cities, housing alone often exceeds the 50/30/20 guideline. If housing takes 35-40% of your income, you'll need to compensate by reducing other needs or wants. Consider getting a roommate, moving to a less expensive area, negotiating rent, or increasing income. Spending over 30% of gross income on housing (the 'housing affordability' threshold) is common but creates budget stress.",
  },
  {
    question: "How much should I save each month?",
    answer:
      "The 50/30/20 rule targets 20% for savings and debt. At minimum, aim to build a 3-6 month emergency fund first, then maximize employer 401(k) match (free money), then pay off high-interest debt, then max out IRA contributions ($7,000/year in 2024), then invest additional amounts. Even saving 10% is better than nothing — the key is starting and being consistent.",
  },
  {
    question: "Should I use net income or gross income for budgeting?",
    answer:
      "Budget using net income (take-home pay after taxes and deductions). Gross income includes taxes you never see. For the 50/30/20 rule specifically, you use after-tax income. Note that if your employer deducts 401(k) contributions pre-tax, you may want to consider those as part of your 'savings' percentage even though they don't appear in your take-home pay.",
  },
  {
    question: "What is zero-based budgeting?",
    answer:
      "Zero-based budgeting assigns every dollar of income to a specific category — income minus all expenses (including savings) equals zero. This gives every dollar a job and prevents money from 'disappearing.' It requires more tracking than 50/30/20 but is excellent for people who want tighter control or are in debt payoff mode. Apps like YNAB (You Need A Budget) are built around this method.",
  },
  {
    question: "How do I stick to a budget?",
    answer:
      "Automate savings before you can spend them (pay yourself first). Use separate accounts for different spending categories. Review your budget weekly, not just monthly. Allow a small 'fun money' category so you don't feel deprived. Track actual spending vs budget each month. When you go over one category, identify what you'll reduce elsewhere. Perfect adherence isn't the goal — progress is.",
  },
  {
    question: "What should I do if my expenses exceed my income?",
    answer:
      "First, categorize all expenses as needs vs wants and cut wants aggressively. Then look for ways to reduce needs: downsize housing, refinance debt, shop for cheaper insurance, reduce utility usage. If cuts aren't enough, you need to increase income through overtime, a part-time job, freelancing, or selling items. Budget deficits that persist lead to debt, so treat this as a financial emergency requiring immediate action.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

const DEFAULT_CATEGORIES: ExpenseCategory[] = [
  { key: "housing", label: "Housing (Rent/Mortgage)", value: "1500", type: "needs", color: "#7c6cf0" },
  { key: "food", label: "Groceries & Food", value: "400", type: "needs", color: "#9d90f5" },
  { key: "transportation", label: "Transportation", value: "350", type: "needs", color: "#40c4ff" },
  { key: "utilities", label: "Utilities & Bills", value: "150", type: "needs", color: "#00e676" },
  { key: "insurance", label: "Insurance & Healthcare", value: "200", type: "needs", color: "#b388ff" },
  { key: "dining", label: "Dining Out & Coffee", value: "200", type: "wants", color: "#ff9100" },
  { key: "entertainment", label: "Entertainment & Subscriptions", value: "100", type: "wants", color: "#ff6d00" },
  { key: "shopping", label: "Shopping & Personal", value: "150", type: "wants", color: "#ffca28" },
  { key: "savings", label: "Savings & Investments", value: "300", type: "savings", color: "#00e676" },
  { key: "debt", label: "Debt Payments (above minimum)", value: "200", type: "savings", color: "#00c853" },
  { key: "other", label: "Other Expenses", value: "100", type: "wants", color: "#888" },
];

export default function BudgetCalculatorPage() {
  const [monthlyIncome, setMonthlyIncome] = useState("4500");
  const [categories, setCategories] = useState<ExpenseCategory[]>(DEFAULT_CATEGORIES);

  const updateCategory = (key: string, value: string) => {
    setCategories((prev) =>
      prev.map((c) => (c.key === key ? { ...c, value } : c))
    );
  };

  const results = useMemo(() => {
    const income = parseFloat(monthlyIncome) || 0;
    const totalExpenses = categories.reduce((s, c) => s + (parseFloat(c.value) || 0), 0);
    const remaining = income - totalExpenses;

    const needsTotal = categories
      .filter((c) => c.type === "needs")
      .reduce((s, c) => s + (parseFloat(c.value) || 0), 0);
    const wantsTotal = categories
      .filter((c) => c.type === "wants")
      .reduce((s, c) => s + (parseFloat(c.value) || 0), 0);
    const savingsTotal = categories
      .filter((c) => c.type === "savings")
      .reduce((s, c) => s + (parseFloat(c.value) || 0), 0);

    const needsPct = income > 0 ? (needsTotal / income) * 100 : 0;
    const wantsPct = income > 0 ? (wantsTotal / income) * 100 : 0;
    const savingsPct = income > 0 ? (savingsTotal / income) * 100 : 0;

    // 50/30/20 check
    const following5030 = needsPct <= 50 && wantsPct <= 30 && savingsPct >= 20;

    const categoryBreakdown = categories.map((c) => ({
      ...c,
      amount: parseFloat(c.value) || 0,
      pct: income > 0 ? ((parseFloat(c.value) || 0) / income) * 100 : 0,
    }));

    return {
      income,
      totalExpenses,
      remaining,
      needsTotal,
      wantsTotal,
      savingsTotal,
      needsPct,
      wantsPct,
      savingsPct,
      following5030,
      categoryBreakdown,
    };
  }, [monthlyIncome, categories]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const ruleStatus = (actual: number, target: number, isMax: boolean) => {
    if (isMax) return actual <= target ? "#00e676" : "#ff5252";
    return actual >= target ? "#00e676" : "#ff5252";
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Budget Calculator",
    description:
      "Plan your monthly budget with categorized expenses, see spending percentages, and check 50/30/20 rule compliance.",
    url: "https://prestokit.com/tools/budget-calculator",
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
          <PromoBar type="pro" dismissKey="budget-pro" />
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Budget{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Enter your monthly income and expenses to see where your money goes,
              how each category compares to your income, and whether you&apos;re following
              the 50/30/20 budgeting rule.
            </p>
          </div>

          {/* Income */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
              Monthly Take-Home Income (After Tax)
            </label>
            <div className="relative max-w-xs">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                $
              </span>
              <input
                type="number"
                min="0"
                step="100"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Expenses Input */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5 uppercase tracking-wide">
                Monthly Expenses
              </h2>

              {/* Needs */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#7c6cf0]" />
                  <span className="text-xs font-semibold text-[#7c6cf0] uppercase tracking-wide">
                    Needs (Target: 50%)
                  </span>
                </div>
                <div className="space-y-3">
                  {categories
                    .filter((c) => c.type === "needs")
                    .map((cat) => (
                      <div key={cat.key} className="flex items-center gap-3">
                        <label className="flex-1 text-sm text-[#c0c0d0]">{cat.label}</label>
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8888a0] text-xs pointer-events-none">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            value={cat.value}
                            onChange={(e) => updateCategory(cat.key, e.target.value)}
                            className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2 pl-6 pr-2 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors text-right"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Wants */}
              <div className="mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#ff9100]" />
                  <span className="text-xs font-semibold text-[#ff9100] uppercase tracking-wide">
                    Wants (Target: 30%)
                  </span>
                </div>
                <div className="space-y-3">
                  {categories
                    .filter((c) => c.type === "wants")
                    .map((cat) => (
                      <div key={cat.key} className="flex items-center gap-3">
                        <label className="flex-1 text-sm text-[#c0c0d0]">{cat.label}</label>
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8888a0] text-xs pointer-events-none">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            value={cat.value}
                            onChange={(e) => updateCategory(cat.key, e.target.value)}
                            className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2 pl-6 pr-2 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors text-right"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* Savings */}
              <div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-[#00e676]" />
                  <span className="text-xs font-semibold text-[#00e676] uppercase tracking-wide">
                    Savings & Debt (Target: 20%)
                  </span>
                </div>
                <div className="space-y-3">
                  {categories
                    .filter((c) => c.type === "savings")
                    .map((cat) => (
                      <div key={cat.key} className="flex items-center gap-3">
                        <label className="flex-1 text-sm text-[#c0c0d0]">{cat.label}</label>
                        <div className="relative w-32">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8888a0] text-xs pointer-events-none">
                            $
                          </span>
                          <input
                            type="number"
                            min="0"
                            value={cat.value}
                            onChange={(e) => updateCategory(cat.key, e.target.value)}
                            className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2 pl-6 pr-2 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors text-right"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {/* Summary */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5 uppercase tracking-wide">
                  Budget Summary
                </h2>
                <div className="space-y-3">
                  <div
                    className={`rounded-xl border p-4 ${
                      results.remaining >= 0
                        ? "border-[#00e676]/30 bg-[#00e676]/5"
                        : "border-[#ff5252]/30 bg-[#ff5252]/5"
                    }`}
                  >
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      {results.remaining >= 0 ? "Remaining Budget" : "Budget Deficit"}
                    </div>
                    <div
                      className={`text-3xl font-bold ${
                        results.remaining >= 0 ? "text-[#00e676]" : "text-[#ff5252]"
                      }`}
                    >
                      {results.remaining < 0 ? "-" : ""}${fmt(Math.abs(results.remaining))}
                      <span className="text-sm font-normal text-[#8888a0] ml-2">/ month</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Total Income</div>
                      <div className="text-xl font-bold text-white">${fmt(results.income)}</div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Total Expenses</div>
                      <div className="text-xl font-bold text-[#c0c0d0]">${fmt(results.totalExpenses)}</div>
                    </div>
                  </div>

                  {/* Spending bar */}
                  {results.income > 0 && (
                    <div>
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                        Spending Rate:{" "}
                        {Math.min(100, (results.totalExpenses / results.income) * 100).toFixed(0)}%
                      </div>
                      <div className="w-full h-3 bg-[#1e1e2e] rounded-full overflow-hidden flex">
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${Math.min(100, (results.needsTotal / results.income) * 100)}%`,
                            background: "#7c6cf0",
                          }}
                        />
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100 - Math.min(100, (results.needsTotal / results.income) * 100),
                              (results.wantsTotal / results.income) * 100
                            )}%`,
                            background: "#ff9100",
                          }}
                        />
                        <div
                          className="h-full transition-all duration-500"
                          style={{
                            width: `${Math.min(
                              100 -
                                Math.min(100, (results.needsTotal / results.income) * 100) -
                                Math.min(100, (results.wantsTotal / results.income) * 100),
                              (results.savingsTotal / results.income) * 100
                            )}%`,
                            background: "#00e676",
                          }}
                        />
                      </div>
                      <div className="flex justify-between mt-1.5 text-xs text-[#8888a0]">
                        <span className="text-[#7c6cf0]">Needs</span>
                        <span className="text-[#ff9100]">Wants</span>
                        <span className="text-[#00e676]">Savings</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* 50/30/20 Check */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-sm font-semibold text-[#c0c0d0] uppercase tracking-wide">
                    50/30/20 Rule
                  </h2>
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      color: results.following5030 ? "#00e676" : "#ff9100",
                      background: results.following5030 ? "#00e67618" : "#ff910018",
                      border: `1px solid ${results.following5030 ? "#00e67640" : "#ff910040"}`,
                    }}
                  >
                    {results.following5030 ? "On Track" : "Adjust Budget"}
                  </span>
                </div>
                {[
                  {
                    label: "Needs",
                    actual: results.needsPct,
                    target: 50,
                    amount: results.needsTotal,
                    isMax: true,
                    color: "#7c6cf0",
                  },
                  {
                    label: "Wants",
                    actual: results.wantsPct,
                    target: 30,
                    amount: results.wantsTotal,
                    isMax: true,
                    color: "#ff9100",
                  },
                  {
                    label: "Savings",
                    actual: results.savingsPct,
                    target: 20,
                    amount: results.savingsTotal,
                    isMax: false,
                    color: "#00e676",
                  },
                ].map((row) => (
                  <div key={row.label} className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span style={{ color: row.color }}>{row.label}</span>
                      <span>
                        <span
                          style={{
                            color: ruleStatus(row.actual, row.target, row.isMax),
                            fontWeight: 600,
                          }}
                        >
                          {row.actual.toFixed(1)}%
                        </span>
                        <span className="text-[#8888a0]"> / {row.target}% target</span>
                      </span>
                    </div>
                    <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, row.actual)}%`,
                          background:
                            ruleStatus(row.actual, row.target, row.isMax) === "#00e676"
                              ? row.color
                              : "#ff5252",
                        }}
                      />
                    </div>
                    <div className="text-right text-xs text-[#8888a0] mt-0.5">${fmt(row.amount)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Category Breakdown Table */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
            <h2 className="text-lg font-semibold text-white mb-4">Category Breakdown</h2>
            <div className="space-y-2">
              {results.categoryBreakdown
                .filter((c) => c.amount > 0)
                .sort((a, b) => b.amount - a.amount)
                .map((cat) => (
                  <div key={cat.key}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-[#c0c0d0]">{cat.label}</span>
                      <span className="text-white font-medium">
                        ${fmt(cat.amount)}{" "}
                        <span className="text-[#8888a0] font-normal">({cat.pct.toFixed(1)}%)</span>
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-[#1e1e2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{ width: `${Math.min(100, cat.pct)}%`, background: cat.color }}
                      />
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Income",
                  description:
                    "Enter your monthly take-home pay after taxes. This is the amount you actually have to spend each month.",
                },
                {
                  step: "2",
                  title: "Fill In Your Expenses",
                  description:
                    "Enter your monthly spending in each category — housing, food, transportation, entertainment, savings, and more.",
                },
                {
                  step: "3",
                  title: "See Your Budget Health",
                  description:
                    "We calculate your remaining budget, how each category compares to your income, and whether you're following the 50/30/20 rule.",
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
                  title: "Debt Payoff Calculator",
                  description: "See how quickly you can pay off all your debts using snowball or avalanche strategy.",
                  href: "/tools/debt-payoff-calculator",
                },
                {
                  title: "Savings Goal Calculator",
                  description: "Calculate how long it takes to reach a savings goal based on your monthly contributions.",
                  href: "/tools/savings-goal-calculator",
                },
                {
                  title: "Net Worth Calculator",
                  description: "Track your overall financial health by calculating your total assets minus liabilities.",
                  href: "/tools/net-worth-calculator",
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
