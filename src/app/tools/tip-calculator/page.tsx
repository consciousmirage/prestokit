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
      <span className="text-[#f0f0f5]">Tip Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const TIP_PRESETS = [10, 15, 18, 20, 25];

const FAQ_DATA = [
  {
    question: "How much should I tip at a restaurant?",
    answer:
      "In the United States, 15-20% is standard for sit-down restaurant service. 15% is for adequate service, 18% for good service, and 20%+ for excellent service. For buffets, 10% is common. Fine dining may warrant 20-25%.",
  },
  {
    question: "Should I tip on the pre-tax or post-tax amount?",
    answer:
      "Etiquette experts generally recommend tipping on the pre-tax amount (the subtotal before sales tax). However, tipping on the total including tax is also common and makes the math easier. Either is acceptable.",
  },
  {
    question: "How do I split a bill fairly?",
    answer:
      "The simplest method is to divide the total (including tip) equally among all diners. If people ordered items of significantly different prices, you can have each person calculate their share based on what they ordered, then add their portion of the tip.",
  },
  {
    question: "Is it okay to tip less than 15%?",
    answer:
      "In the US, tipping below 15% is generally considered a sign of dissatisfaction with service. If service was truly poor, 10% is the minimum. If you have an issue, it is better to speak with a manager. Keep in mind that servers often earn below minimum wage and rely on tips.",
  },
  {
    question: "Should I tip for takeout orders?",
    answer:
      "Tipping for takeout is optional but appreciated, typically 10-15%. During and after the pandemic, tipping on takeout has become more common. If the order is large or complex, a tip of 15-20% is a nice gesture.",
  },
  {
    question: "How does the round-up option work?",
    answer:
      "The round-up feature rounds your total (bill + tip) up to the nearest whole dollar. This makes payment easier and slightly increases the tip amount. For example, if your total is $47.63, it rounds up to $48.00.",
  },
];

/* ------------------------------------------------------------------ */
/*  Pie Chart (CSS-based)                                              */
/* ------------------------------------------------------------------ */

function PieChart({
  billAmount,
  tipAmount,
}: {
  billAmount: number;
  tipAmount: number;
}) {
  const total = billAmount + tipAmount;
  if (total <= 0) return null;

  const tipPercent = (tipAmount / total) * 100;
  const billPercent = (billAmount / total) * 100;

  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="w-40 h-40 rounded-full relative"
        style={{
          background: `conic-gradient(#7c6cf0 0% ${billPercent}%, #00e676 ${billPercent}% 100%)`,
        }}
      >
        <div className="absolute inset-4 rounded-full bg-[#12121a] flex items-center justify-center">
          <span className="text-xs text-[#8888a0] text-center leading-tight">
            ${total.toFixed(2)}
            <br />
            <span className="text-[10px]">Total</span>
          </span>
        </div>
      </div>
      <div className="flex gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#7c6cf0]" />
          <span className="text-[#8888a0]">
            Bill ({billPercent.toFixed(0)}%)
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#00e676]" />
          <span className="text-[#8888a0]">
            Tip ({tipPercent.toFixed(0)}%)
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TipCalculatorPage() {
  const [billAmount, setBillAmount] = useState("");
  const [tipPercent, setTipPercent] = useState(18);
  const [customTip, setCustomTip] = useState("");
  const [useCustomTip, setUseCustomTip] = useState(false);
  const [people, setPeople] = useState(1);
  const [roundUp, setRoundUp] = useState(false);

  const results = useMemo(() => {
    const bill = parseFloat(billAmount) || 0;
    let tip: number;

    if (useCustomTip) {
      tip = parseFloat(customTip) || 0;
    } else {
      tip = bill * (tipPercent / 100);
    }

    let total = bill + tip;

    if (roundUp) {
      const roundedTotal = Math.ceil(total);
      tip = tip + (roundedTotal - total);
      total = roundedTotal;
    }

    const perPerson = people > 0 ? total / people : total;
    const tipPerPerson = people > 0 ? tip / people : tip;
    const effectiveTipPercent = bill > 0 ? (tip / bill) * 100 : 0;

    return {
      tip,
      total,
      perPerson,
      tipPerPerson,
      effectiveTipPercent,
      bill,
    };
  }, [billAmount, tipPercent, customTip, useCustomTip, people, roundUp]);

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
              Tip{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate tips and split bills instantly. Adjust the tip
              percentage, split between multiple people, and round up.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Bill Amount */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Bill Amount
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={billAmount}
                    onChange={(e) => setBillAmount(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Tip Percentage */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Tip Percentage
                  </label>
                  {!useCustomTip && (
                    <span className="text-lg font-bold text-[#7c6cf0]">
                      {tipPercent}%
                    </span>
                  )}
                </div>

                {/* Presets */}
                <div className="grid grid-cols-5 gap-2 mb-4">
                  {TIP_PRESETS.map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setTipPercent(p);
                        setUseCustomTip(false);
                      }}
                      className={`rounded-xl border py-2.5 text-sm font-semibold transition-all ${
                        !useCustomTip && tipPercent === p
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {p}%
                    </button>
                  ))}
                </div>

                {/* Slider */}
                {!useCustomTip && (
                  <input
                    type="range"
                    min={0}
                    max={50}
                    value={tipPercent}
                    onChange={(e) => setTipPercent(parseInt(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer mb-4"
                    style={{
                      background: `linear-gradient(to right, #7c6cf0 ${
                        (tipPercent / 50) * 100
                      }%, #1e1e2e ${(tipPercent / 50) * 100}%)`,
                    }}
                  />
                )}

                {/* Custom Tip Toggle */}
                <button
                  onClick={() => setUseCustomTip(!useCustomTip)}
                  className={`w-full flex items-center gap-3 rounded-xl border p-3 transition-all ${
                    useCustomTip
                      ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                      : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40"
                  }`}
                >
                  <div
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                      useCustomTip
                        ? "border-[#7c6cf0] bg-[#7c6cf0]"
                        : "border-[#555566]"
                    }`}
                  >
                    {useCustomTip && (
                      <svg
                        className="w-3 h-3 text-white"
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
                      useCustomTip ? "text-white" : "text-[#8888a0]"
                    }`}
                  >
                    Enter custom tip amount
                  </span>
                </button>

                {useCustomTip && (
                  <div className="mt-3 relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={customTip}
                      onChange={(e) => setCustomTip(e.target.value)}
                      placeholder="0.00"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                )}
              </div>

              {/* Split Between */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Split Between
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPeople(Math.max(1, people - 1))}
                    className="w-10 h-10 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] text-white hover:border-[#7c6cf0]/40 transition-all flex items-center justify-center text-lg font-semibold"
                  >
                    -
                  </button>
                  <div className="flex-1 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2.5 text-center text-lg font-bold text-white">
                    {people} {people === 1 ? "person" : "people"}
                  </div>
                  <button
                    onClick={() => setPeople(people + 1)}
                    className="w-10 h-10 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] text-white hover:border-[#7c6cf0]/40 transition-all flex items-center justify-center text-lg font-semibold"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Round Up */}
              <button
                onClick={() => setRoundUp(!roundUp)}
                className={`w-full flex items-center gap-3 rounded-xl border p-4 transition-all ${
                  roundUp
                    ? "border-[#00e676] bg-[#00e676]/10"
                    : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#00e676]/40"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    roundUp
                      ? "border-[#00e676] bg-[#00e676]"
                      : "border-[#555566]"
                  }`}
                >
                  {roundUp && (
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
                    roundUp ? "text-white" : "text-[#8888a0]"
                  }`}
                >
                  Round up to nearest dollar
                </span>
              </button>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {/* Results Cards */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Results
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Tip Amount
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      ${results.tip.toFixed(2)}
                    </div>
                    <div className="text-xs text-[#555566] mt-1">
                      {results.effectiveTipPercent.toFixed(1)}% of bill
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Total with Tip
                    </div>
                    <div className="text-3xl font-bold text-[#9d90f5]">
                      ${results.total.toFixed(2)}
                    </div>
                  </div>

                  {people > 1 && (
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Per Person
                        </div>
                        <div className="text-2xl font-bold text-white">
                          ${results.perPerson.toFixed(2)}
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Tip Per Person
                        </div>
                        <div className="text-2xl font-bold text-[#8888a0]">
                          ${results.tipPerPerson.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Visual Breakdown */}
              {results.bill > 0 && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                  <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5 text-center">
                    Visual Breakdown
                  </h2>
                  <PieChart
                    billAmount={results.bill}
                    tipAmount={results.tip}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Quick Reference Table */}
          {results.bill > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <h2 className="text-lg font-semibold text-white mb-4">
                Quick Tip Reference for ${parseFloat(billAmount).toFixed(2)}
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">
                        Tip %
                      </th>
                      <th className="text-center text-[#8888a0] font-medium pb-3 px-4">
                        Tip Amount
                      </th>
                      <th className="text-center text-[#8888a0] font-medium pb-3 px-4">
                        Total
                      </th>
                      {people > 1 && (
                        <th className="text-center text-[#8888a0] font-medium pb-3 pl-4">
                          Per Person
                        </th>
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {[10, 15, 18, 20, 25, 30].map((pct) => {
                      const bill = parseFloat(billAmount) || 0;
                      const tip = bill * (pct / 100);
                      const total = bill + tip;
                      const pp = people > 0 ? total / people : total;
                      const isActive =
                        !useCustomTip && pct === tipPercent;
                      return (
                        <tr
                          key={pct}
                          className={`border-b border-[#1e1e2e]/60 ${
                            isActive ? "bg-[#7c6cf0]/10" : ""
                          }`}
                        >
                          <td
                            className={`py-3 pr-4 font-semibold ${
                              isActive ? "text-[#9d90f5]" : "text-white"
                            }`}
                          >
                            {pct}%
                          </td>
                          <td className="py-3 px-4 text-center text-[#00e676]">
                            ${tip.toFixed(2)}
                          </td>
                          <td className="py-3 px-4 text-center text-[#c0c0d0]">
                            ${total.toFixed(2)}
                          </td>
                          {people > 1 && (
                            <td className="py-3 pl-4 text-center text-[#8888a0]">
                              ${pp.toFixed(2)}
                            </td>
                          )}
                        </tr>
                      );
                    })}
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
                  title: "Enter Your Bill",
                  description:
                    "Type in the total amount of your bill before tip. Choose a tip percentage from the presets, use the slider, or enter a custom tip amount in dollars.",
                },
                {
                  step: "2",
                  title: "Adjust & Split",
                  description:
                    "Select how many people to split the bill between. Toggle the round-up option to round the total to the nearest dollar for easier payment.",
                },
                {
                  step: "3",
                  title: "View Results",
                  description:
                    "See the tip amount, total with tip, per-person amount, and a visual pie chart breakdown. Use the quick reference table to compare different tip percentages.",
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
                  title: "Percentage Calculator",
                  description:
                    "Calculate percentages, percentage change, and more.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Profit Margin Calculator",
                  description:
                    "Calculate profit margins, markups, and break-even points.",
                  href: "/tools/profit-margin-calculator",
                },
                {
                  title: "Invoice Generator",
                  description:
                    "Create professional invoices for your business.",
                  href: "/tools/invoice-generator",
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
