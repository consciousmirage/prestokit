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
      <span className="text-[#f0f0f5]">Sales Tax Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  US State Tax Rates (common rates as of 2024)                       */
/* ------------------------------------------------------------------ */

const STATE_RATES: { name: string; rate: number }[] = [
  { name: "Alabama", rate: 4.0 },
  { name: "Alaska", rate: 0.0 },
  { name: "Arizona", rate: 5.6 },
  { name: "Arkansas", rate: 6.5 },
  { name: "California", rate: 7.25 },
  { name: "Colorado", rate: 2.9 },
  { name: "Connecticut", rate: 6.35 },
  { name: "Delaware", rate: 0.0 },
  { name: "Florida", rate: 6.0 },
  { name: "Georgia", rate: 4.0 },
  { name: "Hawaii", rate: 4.0 },
  { name: "Idaho", rate: 6.0 },
  { name: "Illinois", rate: 6.25 },
  { name: "Indiana", rate: 7.0 },
  { name: "Iowa", rate: 6.0 },
  { name: "Kansas", rate: 6.5 },
  { name: "Kentucky", rate: 6.0 },
  { name: "Louisiana", rate: 4.45 },
  { name: "Maine", rate: 5.5 },
  { name: "Maryland", rate: 6.0 },
  { name: "Massachusetts", rate: 6.25 },
  { name: "Michigan", rate: 6.0 },
  { name: "Minnesota", rate: 6.875 },
  { name: "Mississippi", rate: 7.0 },
  { name: "Missouri", rate: 4.225 },
  { name: "Montana", rate: 0.0 },
  { name: "Nebraska", rate: 5.5 },
  { name: "Nevada", rate: 6.85 },
  { name: "New Hampshire", rate: 0.0 },
  { name: "New Jersey", rate: 6.625 },
  { name: "New Mexico", rate: 5.0 },
  { name: "New York", rate: 4.0 },
  { name: "North Carolina", rate: 4.75 },
  { name: "North Dakota", rate: 5.0 },
  { name: "Ohio", rate: 5.75 },
  { name: "Oklahoma", rate: 4.5 },
  { name: "Oregon", rate: 0.0 },
  { name: "Pennsylvania", rate: 6.0 },
  { name: "Rhode Island", rate: 7.0 },
  { name: "South Carolina", rate: 6.0 },
  { name: "South Dakota", rate: 4.5 },
  { name: "Tennessee", rate: 7.0 },
  { name: "Texas", rate: 6.25 },
  { name: "Utah", rate: 6.1 },
  { name: "Vermont", rate: 6.0 },
  { name: "Virginia", rate: 5.3 },
  { name: "Washington", rate: 6.5 },
  { name: "West Virginia", rate: 6.0 },
  { name: "Wisconsin", rate: 5.0 },
  { name: "Wyoming", rate: 4.0 },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How is sales tax calculated?",
    answer:
      "Sales tax is calculated by multiplying the purchase price (subtotal) by the applicable tax rate. For example, if you buy something for $100 in a state with a 6% sales tax, the tax is $6.00, making your total $106.00. The formula is: Sales Tax = Subtotal x (Tax Rate / 100).",
  },
  {
    question: "Which US states have no sales tax?",
    answer:
      "Five states have no statewide sales tax: Alaska, Delaware, Montana, New Hampshire, and Oregon. However, Alaska allows local jurisdictions to charge sales tax, so some areas in Alaska do have a local sales tax. Delaware, Montana, New Hampshire, and Oregon have no sales tax at any level.",
  },
  {
    question: "What is the difference between state and local sales tax?",
    answer:
      "State sales tax is set by the state government and applies uniformly across the state. Local sales tax is an additional tax charged by cities, counties, or special districts on top of the state rate. The combined rate (state + local) is what you actually pay at the register. For example, Los Angeles has a 9.5% combined rate: 7.25% state + 2.25% local.",
  },
  {
    question: "Are all items subject to sales tax?",
    answer:
      "No. Many states exempt certain items from sales tax. Common exemptions include groceries (food for home consumption), prescription medications, and clothing (in some states like Pennsylvania and New Jersey). Some states also have tax-free shopping days or weekends, typically before the school year starts.",
  },
  {
    question: "What is a use tax?",
    answer:
      "A use tax is a tax on items purchased out of state (or online) where no sales tax was collected. It is typically the same rate as your state's sales tax. For example, if you buy something online from a state with no sales tax, you technically owe use tax to your home state. Most states require you to report and pay use tax on your annual income tax return.",
  },
  {
    question: "How do I find the exact sales tax rate for my area?",
    answer:
      "This calculator uses state-level base rates. Your actual rate may be higher due to local (city/county) taxes. To find your exact combined rate, check your state's department of revenue website, use the IRS Sales Tax Deduction Calculator, or look at a recent receipt from a local store — the tax rate is often printed on it.",
  },
  {
    question: "Can I deduct sales tax on my federal tax return?",
    answer:
      "Yes. If you itemize deductions on your federal tax return, you can choose to deduct either state income tax or state and local sales tax (but not both). This is done using Schedule A (Form 1040). The IRS provides optional sales tax tables to estimate your deduction, or you can use actual receipts. This is especially beneficial for residents of states with no income tax.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SalesTaxCalculatorPage() {
  const [subtotal, setSubtotal] = useState("");
  const [taxRate, setTaxRate] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const results = useMemo(() => {
    const amount = parseFloat(subtotal) || 0;
    const rate = parseFloat(taxRate) || 0;
    const taxAmount = amount * (rate / 100);
    const total = amount + taxAmount;

    return {
      amount,
      rate,
      taxAmount,
      total,
    };
  }, [subtotal, taxRate]);

  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    const state = STATE_RATES.find((s) => s.name === stateName);
    if (state) {
      setTaxRate(state.rate.toString());
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Sales Tax Calculator",
    description:
      "Calculate sales tax for any US state. Enter subtotal and tax rate to see the total with tax instantly.",
    url: "https://prestokit.com/tools/sales-tax-calculator",
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
              Sales Tax{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate sales tax on any purchase. Select a US state for preset rates
              or enter a custom tax rate. See the tax amount and total instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Subtotal */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Subtotal (Before Tax)
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={subtotal}
                    onChange={(e) => setSubtotal(e.target.value)}
                    placeholder="100.00"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* State Preset */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Select State (Optional Preset)
                </label>
                <select
                  value={selectedState}
                  onChange={(e) => handleStateSelect(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors appearance-none cursor-pointer"
                >
                  <option value="">Choose a state...</option>
                  {STATE_RATES.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name} ({s.rate}%)
                    </option>
                  ))}
                </select>
              </div>

              {/* Tax Rate */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Tax Rate (%)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    max="100"
                    value={taxRate}
                    onChange={(e) => {
                      setTaxRate(e.target.value);
                      setSelectedState("");
                    }}
                    placeholder="6.00"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-4 pr-10 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    %
                  </span>
                </div>
                <p className="text-xs text-[#555566] mt-2">
                  Enter the combined state + local tax rate, or select a state above for
                  the base state rate.
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Tax Breakdown
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Subtotal
                    </div>
                    <div className="text-3xl font-bold text-white">
                      ${fmt(results.amount)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Sales Tax ({results.rate}%)
                    </div>
                    <div className="text-3xl font-bold text-[#ff5252]">
                      ${fmt(results.taxAmount)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Total with Tax
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      ${fmt(results.total)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick reference */}
              {results.amount > 0 && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                  <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                    Quick Compare: Other Rates
                  </h2>
                  <div className="space-y-2">
                    {[5, 6, 7, 8, 9, 10].map((r) => {
                      const tax = results.amount * (r / 100);
                      return (
                        <div
                          key={r}
                          className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-[#0a0a0f]/60 transition-colors"
                        >
                          <span className="text-sm text-[#8888a0]">{r}% rate</span>
                          <div className="flex items-center gap-4">
                            <span className="text-sm text-[#ff5252]">
                              +${fmt(tax)}
                            </span>
                            <span className="text-sm font-semibold text-white">
                              ${fmt(results.amount + tax)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Subtotal",
                  description:
                    "Type in the purchase amount before tax. This is the price of the item or items you are buying.",
                },
                {
                  step: "2",
                  title: "Set the Tax Rate",
                  description:
                    "Select a US state to auto-fill the base state sales tax rate, or type in a custom combined rate (state + local).",
                },
                {
                  step: "3",
                  title: "See Your Total",
                  description:
                    "Instantly see the sales tax amount and your total cost including tax. Compare rates at a glance with the quick reference table.",
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
                  title: "Profit Margin Calculator",
                  description:
                    "Calculate profit margins, markups, and break-even points for your business.",
                  href: "/tools/profit-margin-calculator",
                },
                {
                  title: "Discount Calculator",
                  description:
                    "Calculate sale prices, percentage off, and savings on any purchase.",
                  href: "/tools/discount-calculator",
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
              dismissKey="sales-tax-pro"
            />
          </div>
        </div>
      </main>
    </>
  );
}
