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
      <span className="text-[#f0f0f5]">Discount Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Quick Discount Buttons                                             */
/* ------------------------------------------------------------------ */

const QUICK_DISCOUNTS = [5, 10, 15, 20, 25, 30, 40, 50, 60, 70, 75];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How do I calculate a percentage discount?",
    answer:
      "To calculate a percentage discount, multiply the original price by the discount percentage and divide by 100. Then subtract that amount from the original price. For example, 20% off $80: $80 x 20/100 = $16 savings, so the sale price is $80 - $16 = $64. This calculator does the math instantly for any price and percentage.",
  },
  {
    question: "How do I find the original price from a sale price?",
    answer:
      "To find the original price when you know the sale price and discount percentage, divide the sale price by (1 minus the discount rate). For example, if something costs $60 after a 25% discount: $60 / (1 - 0.25) = $60 / 0.75 = $80 original price. Use the 'Find Original Price' mode in this calculator.",
  },
  {
    question: "How do I calculate percent off between two prices?",
    answer:
      "To find the percentage discount between an original and sale price, subtract the sale price from the original price, divide by the original price, and multiply by 100. Example: Original $120, sale $90: ($120 - $90) / $120 x 100 = 25% off. Use the 'Find Discount %' mode in this calculator.",
  },
  {
    question: "Can I stack multiple discounts?",
    answer:
      "Yes, this calculator supports stacking a second discount on top of the first. When you enter a second discount, it applies to the already-discounted price, not the original price. For example, 20% off then 10% off a $100 item: first discount gives $80, second discount gives $80 x 0.9 = $72. That's different from a single 30% off, which would give $70.",
  },
  {
    question: "How does sales tax affect the final price?",
    answer:
      "Sales tax is calculated on the discounted price, not the original price. For example, a $100 item at 20% off becomes $80. If your sales tax is 8%, the tax is $80 x 0.08 = $6.40, making the total $86.40. This calculator includes an optional sales tax field to show you the true out-of-pocket cost.",
  },
  {
    question: "What is the difference between discount and markup?",
    answer:
      "A discount is a reduction from the selling price, while a markup is the amount added to the cost price to set the selling price. For example, a product that costs $50 with a 100% markup sells for $100. If that $100 product goes on sale at 50% off, it sells for $50. The 100% markup and 50% discount result in the same final price but are calculated differently.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

type Mode = "findSalePrice" | "findOriginalPrice" | "findDiscountPercent";

export default function DiscountCalculatorPage() {
  const [mode, setMode] = useState<Mode>("findSalePrice");
  const [originalPrice, setOriginalPrice] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [salePrice, setSalePrice] = useState("");
  const [secondDiscount, setSecondDiscount] = useState("");
  const [salesTax, setSalesTax] = useState("");

  const results = useMemo(() => {
    if (mode === "findSalePrice") {
      const price = parseFloat(originalPrice) || 0;
      const discount = parseFloat(discountPercent) || 0;
      const savings = price * (discount / 100);
      let finalPrice = price - savings;

      let secondSavings = 0;
      const second = parseFloat(secondDiscount) || 0;
      if (second > 0) {
        secondSavings = finalPrice * (second / 100);
        finalPrice -= secondSavings;
      }

      const tax = parseFloat(salesTax) || 0;
      const taxAmount = finalPrice * (tax / 100);
      const totalWithTax = finalPrice + taxAmount;
      const totalSavings = savings + secondSavings;
      const effectiveDiscount = price > 0 ? (totalSavings / price) * 100 : 0;

      return {
        salePrice: finalPrice,
        savings: totalSavings,
        firstSavings: savings,
        secondSavings,
        taxAmount,
        totalWithTax,
        effectiveDiscount,
        originalPrice: price,
      };
    }

    if (mode === "findOriginalPrice") {
      const sale = parseFloat(salePrice) || 0;
      const discount = parseFloat(discountPercent) || 0;
      const original = discount < 100 ? sale / (1 - discount / 100) : 0;
      const savings = original - sale;

      return {
        salePrice: sale,
        savings,
        firstSavings: savings,
        secondSavings: 0,
        taxAmount: 0,
        totalWithTax: sale,
        effectiveDiscount: discount,
        originalPrice: original,
      };
    }

    // findDiscountPercent
    const original = parseFloat(originalPrice) || 0;
    const sale = parseFloat(salePrice) || 0;
    const savings = original - sale;
    const discount = original > 0 ? (savings / original) * 100 : 0;

    return {
      salePrice: sale,
      savings,
      firstSavings: savings,
      secondSavings: 0,
      taxAmount: 0,
      totalWithTax: sale,
      effectiveDiscount: discount,
      originalPrice: original,
    };
  }, [mode, originalPrice, discountPercent, salePrice, secondDiscount, salesTax]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Discount Calculator",
    description:
      "Calculate sale prices, savings, and discounts. Find the final price after any percent off, with optional sales tax and stacked discounts.",
    url: "https://prestokit.com/tools/discount-calculator",
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
              Discount{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate sale prices, total savings, and discounts instantly. Stack
              multiple discounts, add sales tax, and find original prices from sale
              prices.
            </p>
          </div>

          {/* Mode Selector */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            {[
              { value: "findSalePrice" as Mode, label: "Find Sale Price", desc: "Price - Discount %" },
              { value: "findOriginalPrice" as Mode, label: "Find Original Price", desc: "Sale Price + Discount %" },
              { value: "findDiscountPercent" as Mode, label: "Find Discount %", desc: "Original - Sale Price" },
            ].map((m) => (
              <button
                key={m.value}
                onClick={() => setMode(m.value)}
                className={`rounded-xl border py-4 px-4 text-left transition-all ${
                  mode === m.value
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                    : "border-[#1e1e2e] bg-[#12121a]/60 hover:border-[#7c6cf0]/40"
                }`}
              >
                <div className={`text-sm font-semibold ${mode === m.value ? "text-[#9d90f5]" : "text-[#c0c0d0]"}`}>
                  {m.label}
                </div>
                <div className="text-xs text-[#8888a0] mt-1">{m.desc}</div>
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Original Price (for findSalePrice and findDiscountPercent) */}
              {(mode === "findSalePrice" || mode === "findDiscountPercent") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Original Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={originalPrice}
                      onChange={(e) => setOriginalPrice(e.target.value)}
                      placeholder="100.00"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Discount Percent (for findSalePrice and findOriginalPrice) */}
              {(mode === "findSalePrice" || mode === "findOriginalPrice") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Discount Percentage
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={discountPercent}
                      onChange={(e) => setDiscountPercent(e.target.value)}
                      placeholder="20"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-4 pr-9 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                      %
                    </span>
                  </div>

                  {/* Quick discount buttons */}
                  {mode === "findSalePrice" && (
                    <div className="flex flex-wrap gap-2 mt-3">
                      {QUICK_DISCOUNTS.map((d) => (
                        <button
                          key={d}
                          onClick={() => setDiscountPercent(d.toString())}
                          className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                            discountPercent === d.toString()
                              ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                              : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                          }`}
                        >
                          {d}% off
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Sale Price (for findOriginalPrice and findDiscountPercent) */}
              {(mode === "findOriginalPrice" || mode === "findDiscountPercent") && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Sale Price
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                      $
                    </span>
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      value={salePrice}
                      onChange={(e) => setSalePrice(e.target.value)}
                      placeholder="80.00"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Second Discount (findSalePrice only) */}
              {mode === "findSalePrice" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Second Discount (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="1"
                      min="0"
                      max="100"
                      value={secondDiscount}
                      onChange={(e) => setSecondDiscount(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-4 pr-9 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">
                      %
                    </span>
                  </div>
                  <p className="text-xs text-[#555566] mt-1">
                    Applied on top of the first discount (stacked)
                  </p>
                </div>
              )}

              {/* Sales Tax (findSalePrice only) */}
              {mode === "findSalePrice" && (
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Sales Tax (optional)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.01"
                      min="0"
                      max="30"
                      value={salesTax}
                      onChange={(e) => setSalesTax(e.target.value)}
                      placeholder="0"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-4 pr-9 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">
                      %
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Results
                </h2>

                <div className="space-y-4">
                  {mode === "findSalePrice" && (
                    <>
                      <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Sale Price
                        </div>
                        <div className="text-3xl font-bold text-[#00e676]">
                          ${fmt(results.salePrice)}
                        </div>
                      </div>

                      <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          You Save
                        </div>
                        <div className="text-3xl font-bold text-[#ff5252]">
                          ${fmt(results.savings)}
                        </div>
                      </div>

                      {results.secondSavings > 0 && (
                        <div className="grid grid-cols-2 gap-3">
                          <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                            <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                              1st Discount Saves
                            </div>
                            <div className="text-lg font-bold text-white">
                              ${fmt(results.firstSavings)}
                            </div>
                          </div>
                          <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                            <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                              2nd Discount Saves
                            </div>
                            <div className="text-lg font-bold text-white">
                              ${fmt(results.secondSavings)}
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                          <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                            Effective Discount
                          </div>
                          <div className="text-2xl font-bold text-[#9d90f5]">
                            {results.effectiveDiscount.toFixed(1)}%
                          </div>
                        </div>
                        {results.taxAmount > 0 && (
                          <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                            <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                              Tax Amount
                            </div>
                            <div className="text-2xl font-bold text-[#8888a0]">
                              ${fmt(results.taxAmount)}
                            </div>
                          </div>
                        )}
                      </div>

                      {results.taxAmount > 0 && (
                        <div className="rounded-xl border border-[#00e676]/30 bg-[#00e676]/5 p-5">
                          <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                            Total (with tax)
                          </div>
                          <div className="text-3xl font-bold text-[#00e676]">
                            ${fmt(results.totalWithTax)}
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {mode === "findOriginalPrice" && (
                    <>
                      <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Original Price
                        </div>
                        <div className="text-3xl font-bold text-white">
                          ${fmt(results.originalPrice)}
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          You Save
                        </div>
                        <div className="text-3xl font-bold text-[#ff5252]">
                          ${fmt(results.savings)}
                        </div>
                      </div>
                    </>
                  )}

                  {mode === "findDiscountPercent" && (
                    <>
                      <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Discount Percentage
                        </div>
                        <div className="text-3xl font-bold text-[#9d90f5]">
                          {results.effectiveDiscount.toFixed(1)}% off
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Total Savings
                        </div>
                        <div className="text-3xl font-bold text-[#ff5252]">
                          ${fmt(results.savings)}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* Visual Bar */}
              {results.originalPrice > 0 && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                    Price Breakdown
                  </div>
                  <div className="w-full h-8 bg-[#0a0a0f] rounded-lg overflow-hidden flex">
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${Math.max((results.salePrice / results.originalPrice) * 100, 1)}%`,
                        background: "linear-gradient(90deg, #00e676, #00c853)",
                      }}
                    />
                    <div
                      className="h-full transition-all duration-500"
                      style={{
                        width: `${Math.max((results.savings / results.originalPrice) * 100, 1)}%`,
                        background: "linear-gradient(90deg, #ff5252, #ff1744)",
                      }}
                    />
                  </div>
                  <div className="flex justify-between mt-2 text-xs">
                    <span className="text-[#00e676]">You Pay: ${fmt(results.salePrice)}</span>
                    <span className="text-[#ff5252]">You Save: ${fmt(results.savings)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose Calculation Mode",
                  description:
                    "Select whether you want to find the sale price, original price, or discount percentage. Each mode requires different inputs.",
                },
                {
                  step: "2",
                  title: "Enter Your Values",
                  description:
                    "Type in the price and discount percentage. Optionally add a second stacked discount and sales tax rate for the full picture.",
                },
                {
                  step: "3",
                  title: "See Your Savings",
                  description:
                    "View the sale price, total savings, effective discount percentage, and a visual breakdown of what you pay vs. what you save.",
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
                  title: "Percentage Calculator",
                  description:
                    "Calculate percentages, percentage change, increase, and decrease.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Tax Calculator",
                  description:
                    "Estimate federal income tax by bracket. See effective and marginal tax rates.",
                  href: "/tools/tax-calculator",
                },
                {
                  title: "Tip Calculator",
                  description:
                    "Calculate tips and split bills between any number of people.",
                  href: "/tools/tip-calculator",
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
