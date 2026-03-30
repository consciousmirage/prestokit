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
      <span className="text-[#f0f0f5]">Net Worth Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface AssetFields {
  cash: string;
  investments: string;
  realEstate: string;
  vehicles: string;
  otherAssets: string;
}

interface LiabilityFields {
  mortgage: string;
  carLoans: string;
  creditCards: string;
  studentLoans: string;
  otherLiabilities: string;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is net worth and why does it matter?",
    answer:
      "Net worth is the total value of everything you own (assets) minus everything you owe (liabilities). It's the single best snapshot of your overall financial health. A positive net worth means you own more than you owe. Tracking it over time shows whether you're building wealth or falling behind, regardless of your income.",
  },
  {
    question: "What counts as an asset?",
    answer:
      "Assets include anything of monetary value: cash and bank account balances, investment accounts (stocks, bonds, ETFs, retirement accounts like 401(k) and IRA), real estate (market value of your home or investment properties), vehicles (current market value), business ownership interests, jewelry and valuables, and any money owed to you.",
  },
  {
    question: "What counts as a liability?",
    answer:
      "Liabilities are debts and financial obligations: mortgage balance (what you still owe, not the home's value), auto loan balances, credit card balances, student loan balances, personal loans, medical debt, back taxes owed, and any other money you owe to others.",
  },
  {
    question: "What is considered a good net worth?",
    answer:
      "Net worth benchmarks vary by age and income. A general guideline from The Millionaire Next Door: your net worth should be roughly (your age × your annual income) ÷ 10. However, any positive net worth is a good start. The most important thing is the trend — is it growing over time? Negative net worth is common for young adults with student loans and is not necessarily a crisis.",
  },
  {
    question: "Should I include my home equity as an asset?",
    answer:
      "Yes — your home equity (market value minus mortgage balance) is a real asset. However, it's illiquid, meaning you can't easily access it without selling your home or taking a home equity loan. Many financial planners separate 'liquid net worth' (excluding home and other illiquid assets) from total net worth to understand financial flexibility.",
  },
  {
    question: "How often should I calculate my net worth?",
    answer:
      "Most financial advisors recommend tracking net worth quarterly or at minimum annually. Monthly tracking is fine if you're actively paying down debt or building savings. Use a consistent snapshot date (like the first of the month) so comparisons are meaningful. The goal isn't perfection — it's seeing the trend over time.",
  },
  {
    question: "How can I increase my net worth?",
    answer:
      "Net worth grows when you either increase assets or decrease liabilities (or both). Practical strategies: automate savings and investments, pay down high-interest debt aggressively, avoid depreciating purchases on credit, invest in income-producing assets, increase your income through career advancement or side income, and avoid lifestyle inflation when your income increases.",
  },
];

/* ------------------------------------------------------------------ */
/*  Asset/Liability Row Input                                         */
/* ------------------------------------------------------------------ */

function NumberInput({
  label,
  value,
  onChange,
  placeholder = "0",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-[#8888a0] mb-1">{label}</label>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
          $
        </span>
        <input
          type="number"
          min="0"
          step="1000"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 pl-7 pr-3 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
        />
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function NetWorthCalculatorPage() {
  const [assets, setAssets] = useState<AssetFields>({
    cash: "15000",
    investments: "45000",
    realEstate: "0",
    vehicles: "12000",
    otherAssets: "0",
  });
  const [liabilities, setLiabilities] = useState<LiabilityFields>({
    mortgage: "0",
    carLoans: "8000",
    creditCards: "3500",
    studentLoans: "22000",
    otherLiabilities: "0",
  });

  const setAsset = (key: keyof AssetFields) => (v: string) =>
    setAssets((prev) => ({ ...prev, [key]: v }));
  const setLiability = (key: keyof LiabilityFields) => (v: string) =>
    setLiabilities((prev) => ({ ...prev, [key]: v }));

  const results = useMemo(() => {
    const totalAssets =
      (parseFloat(assets.cash) || 0) +
      (parseFloat(assets.investments) || 0) +
      (parseFloat(assets.realEstate) || 0) +
      (parseFloat(assets.vehicles) || 0) +
      (parseFloat(assets.otherAssets) || 0);

    const totalLiabilities =
      (parseFloat(liabilities.mortgage) || 0) +
      (parseFloat(liabilities.carLoans) || 0) +
      (parseFloat(liabilities.creditCards) || 0) +
      (parseFloat(liabilities.studentLoans) || 0) +
      (parseFloat(liabilities.otherLiabilities) || 0);

    const netWorth = totalAssets - totalLiabilities;

    const assetBreakdown = [
      { label: "Cash & Savings", value: parseFloat(assets.cash) || 0, color: "#7c6cf0" },
      { label: "Investments", value: parseFloat(assets.investments) || 0, color: "#9d90f5" },
      { label: "Real Estate", value: parseFloat(assets.realEstate) || 0, color: "#00e676" },
      { label: "Vehicles", value: parseFloat(assets.vehicles) || 0, color: "#ff9100" },
      { label: "Other Assets", value: parseFloat(assets.otherAssets) || 0, color: "#40c4ff" },
    ].filter((a) => a.value > 0);

    const debtRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

    let healthLabel = "Excellent";
    let healthColor = "#00e676";
    if (netWorth < 0) {
      healthLabel = "Negative";
      healthColor = "#ff5252";
    } else if (debtRatio > 60) {
      healthLabel = "Needs Work";
      healthColor = "#ff5252";
    } else if (debtRatio > 40) {
      healthLabel = "Fair";
      healthColor = "#ff9100";
    } else if (debtRatio > 20) {
      healthLabel = "Good";
      healthColor = "#7c6cf0";
    }

    return { totalAssets, totalLiabilities, netWorth, assetBreakdown, debtRatio, healthLabel, healthColor };
  }, [assets, liabilities]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Net Worth Calculator",
    description:
      "Calculate your personal net worth by entering assets and liabilities. Includes asset breakdown and financial health indicator.",
    url: "https://prestokit.com/tools/net-worth-calculator",
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
          <PromoBar type="pro" dismissKey="networth-pro" />
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Net Worth{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate your total net worth by entering your assets and liabilities.
              See an instant breakdown of your financial picture and health indicator.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Assets Input */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#00e676]" />
                <h2 className="text-sm font-semibold text-[#c0c0d0] uppercase tracking-wide">
                  Assets (What You Own)
                </h2>
              </div>
              <div className="space-y-4">
                <NumberInput label="Cash & Bank Accounts" value={assets.cash} onChange={setAsset("cash")} />
                <NumberInput label="Investments (Stocks, Bonds, Retirement Accounts)" value={assets.investments} onChange={setAsset("investments")} />
                <NumberInput label="Real Estate (Market Value)" value={assets.realEstate} onChange={setAsset("realEstate")} />
                <NumberInput label="Vehicles (Current Market Value)" value={assets.vehicles} onChange={setAsset("vehicles")} />
                <NumberInput label="Other Assets (Business, Jewelry, etc.)" value={assets.otherAssets} onChange={setAsset("otherAssets")} />
              </div>
              <div className="mt-5 pt-4 border-t border-[#1e1e2e] flex items-center justify-between">
                <span className="text-sm text-[#8888a0]">Total Assets</span>
                <span className="text-xl font-bold text-[#00e676]">${fmt(results.totalAssets)}</span>
              </div>
            </div>

            {/* Liabilities Input */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-5">
                <div className="w-3 h-3 rounded-full bg-[#ff5252]" />
                <h2 className="text-sm font-semibold text-[#c0c0d0] uppercase tracking-wide">
                  Liabilities (What You Owe)
                </h2>
              </div>
              <div className="space-y-4">
                <NumberInput label="Mortgage Balance" value={liabilities.mortgage} onChange={setLiability("mortgage")} />
                <NumberInput label="Car Loans" value={liabilities.carLoans} onChange={setLiability("carLoans")} />
                <NumberInput label="Credit Card Balances" value={liabilities.creditCards} onChange={setLiability("creditCards")} />
                <NumberInput label="Student Loans" value={liabilities.studentLoans} onChange={setLiability("studentLoans")} />
                <NumberInput label="Other Liabilities (Personal Loans, etc.)" value={liabilities.otherLiabilities} onChange={setLiability("otherLiabilities")} />
              </div>
              <div className="mt-5 pt-4 border-t border-[#1e1e2e] flex items-center justify-between">
                <span className="text-sm text-[#8888a0]">Total Liabilities</span>
                <span className="text-xl font-bold text-[#ff5252]">${fmt(results.totalLiabilities)}</span>
              </div>
            </div>
          </div>

          {/* Net Worth Result */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="sm:col-span-1">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">Your Net Worth</div>
                <div
                  className={`text-4xl font-bold ${
                    results.netWorth >= 0 ? "text-[#00e676]" : "text-[#ff5252]"
                  }`}
                >
                  {results.netWorth < 0 ? "-" : ""}${fmt(Math.abs(results.netWorth))}
                </div>
                <div className="mt-3 flex items-center gap-2">
                  <span
                    className="text-xs font-semibold px-3 py-1 rounded-full"
                    style={{
                      color: results.healthColor,
                      background: `${results.healthColor}18`,
                      border: `1px solid ${results.healthColor}40`,
                    }}
                  >
                    {results.healthLabel}
                  </span>
                </div>
              </div>

              <div className="sm:col-span-2">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">Assets vs Liabilities</div>
                <div className="w-full h-6 bg-[#0a0a0f] rounded-lg overflow-hidden flex mb-2">
                  {results.totalAssets > 0 && (
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${(results.totalAssets / (results.totalAssets + results.totalLiabilities || 1)) * 100}%`,
                        background: "linear-gradient(90deg, #00e676, #00c853)",
                      }}
                    />
                  )}
                  {results.totalLiabilities > 0 && (
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${(results.totalLiabilities / (results.totalAssets + results.totalLiabilities || 1)) * 100}%`,
                        background: "linear-gradient(90deg, #ff5252, #ff1744)",
                      }}
                    />
                  )}
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-[#00e676]">
                    Assets: ${fmt(results.totalAssets)}
                  </span>
                  <span className="text-[#ff5252]">
                    Liabilities: ${fmt(results.totalLiabilities)}
                  </span>
                </div>

                {results.totalAssets > 0 && (
                  <div className="mt-3">
                    <div className="text-xs text-[#8888a0] mb-2">
                      Debt-to-Asset Ratio: {results.debtRatio.toFixed(1)}%
                    </div>
                    <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, results.debtRatio)}%`,
                          background:
                            results.debtRatio > 60
                              ? "#ff5252"
                              : results.debtRatio > 40
                              ? "#ff9100"
                              : "#7c6cf0",
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Asset Breakdown */}
          {results.assetBreakdown.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <h2 className="text-lg font-semibold text-white mb-5">Asset Breakdown</h2>
              <div className="space-y-3">
                {results.assetBreakdown.map((item) => {
                  const pct = results.totalAssets > 0 ? (item.value / results.totalAssets) * 100 : 0;
                  return (
                    <div key={item.label}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-[#c0c0d0]">{item.label}</span>
                        <span className="text-white font-medium">
                          ${fmt(item.value)}{" "}
                          <span className="text-[#8888a0] font-normal">({pct.toFixed(1)}%)</span>
                        </span>
                      </div>
                      <div className="w-full h-2 bg-[#1e1e2e] rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{ width: `${pct}%`, background: item.color }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Assets",
                  description:
                    "List everything you own with a monetary value — cash, investments, real estate, vehicles, and other valuables.",
                },
                {
                  step: "2",
                  title: "Enter Your Liabilities",
                  description:
                    "List all your debts — mortgage balance, car loans, credit card balances, student loans, and any other money you owe.",
                },
                {
                  step: "3",
                  title: "See Your Net Worth",
                  description:
                    "We subtract your liabilities from your assets to calculate your net worth, with a breakdown and financial health indicator.",
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
                  description: "Calculate your debt payoff date and compare snowball vs avalanche strategies.",
                  href: "/tools/debt-payoff-calculator",
                },
                {
                  title: "Budget Calculator",
                  description: "Plan your monthly budget and see how much you can put toward savings each month.",
                  href: "/tools/budget-calculator",
                },
                {
                  title: "Retirement Calculator",
                  description: "Project your retirement savings and see if you're on track to retire comfortably.",
                  href: "/tools/retirement-calculator",
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
