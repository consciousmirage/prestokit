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
      <span className="text-[#f0f0f5]">Currency Converter</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Exchange Rates (approximate, relative to USD)                       */
/* ------------------------------------------------------------------ */

interface Currency {
  code: string;
  name: string;
  symbol: string;
  rateToUSD: number; // 1 unit of this currency = X USD
}

const CURRENCIES: Currency[] = [
  { code: "USD", name: "US Dollar", symbol: "$", rateToUSD: 1 },
  { code: "EUR", name: "Euro", symbol: "\u20AC", rateToUSD: 1.085 },
  { code: "GBP", name: "British Pound", symbol: "\u00A3", rateToUSD: 1.265 },
  { code: "JPY", name: "Japanese Yen", symbol: "\u00A5", rateToUSD: 0.0067 },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", rateToUSD: 0.745 },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", rateToUSD: 0.655 },
  { code: "CHF", name: "Swiss Franc", symbol: "CHF", rateToUSD: 1.13 },
  { code: "CNY", name: "Chinese Yuan", symbol: "\u00A5", rateToUSD: 0.138 },
  { code: "INR", name: "Indian Rupee", symbol: "\u20B9", rateToUSD: 0.012 },
  { code: "MXN", name: "Mexican Peso", symbol: "Mex$", rateToUSD: 0.058 },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", rateToUSD: 0.20 },
  { code: "KRW", name: "South Korean Won", symbol: "\u20A9", rateToUSD: 0.00075 },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", rateToUSD: 0.745 },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", rateToUSD: 0.128 },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", rateToUSD: 0.096 },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How accurate are these exchange rates?",
    answer:
      "These exchange rates are approximate and intended for quick estimates only. Real exchange rates fluctuate constantly based on global markets. For transactions, always check a live rate from your bank, payment provider, or a financial data service like XE.com or Google Finance.",
  },
  {
    question: "What is an exchange rate?",
    answer:
      "An exchange rate is the price of one currency expressed in terms of another. For example, if the USD/EUR rate is 0.92, that means 1 US Dollar buys 0.92 Euros. Exchange rates are determined by supply and demand in global foreign exchange markets and are influenced by interest rates, inflation, trade balances, and geopolitical events.",
  },
  {
    question: "What is the difference between a spot rate and a bank rate?",
    answer:
      "The spot rate (or mid-market rate) is the wholesale rate at which currencies are traded between banks. The bank rate is what your bank or exchange service actually charges you, which includes a markup or spread. This spread is how they make a profit. The rate you get from your bank will typically be 1-3% worse than the mid-market rate.",
  },
  {
    question: "Why do exchange rates change?",
    answer:
      "Exchange rates change due to many factors including: interest rate differences between countries, inflation rates, political stability, economic performance (GDP, employment data), trade balances, central bank policies, and market speculation. Major economic events and news can cause rapid fluctuations.",
  },
  {
    question: "What are the most traded currencies in the world?",
    answer:
      "The most traded currencies by volume are: the US Dollar (USD), Euro (EUR), Japanese Yen (JPY), British Pound (GBP), Australian Dollar (AUD), Canadian Dollar (CAD), and Swiss Franc (CHF). The US Dollar is involved in roughly 88% of all forex transactions, making it the world's primary reserve currency.",
  },
  {
    question: "How can I get the best exchange rate?",
    answer:
      "To get the best exchange rate: avoid airport and hotel exchange counters (they have the worst rates), use a no-foreign-transaction-fee credit card for purchases abroad, compare rates from multiple banks and online services, consider using a forex broker or fintech app like Wise or Revolut for transfers, and try to exchange larger amounts less frequently to minimize per-transaction fees.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CurrencyConverterPage() {
  const [amount, setAmount] = useState("1");
  const [fromCode, setFromCode] = useState("USD");
  const [toCode, setToCode] = useState("EUR");

  const fromCurrency = CURRENCIES.find((c) => c.code === fromCode)!;
  const toCurrency = CURRENCIES.find((c) => c.code === toCode)!;

  const result = useMemo(() => {
    const val = parseFloat(amount) || 0;
    const inUSD = val * fromCurrency.rateToUSD;
    const converted = inUSD / toCurrency.rateToUSD;
    return converted;
  }, [amount, fromCurrency, toCurrency]);

  const rate = useMemo(() => {
    return fromCurrency.rateToUSD / toCurrency.rateToUSD;
  }, [fromCurrency, toCurrency]);

  const inverseRate = useMemo(() => {
    return toCurrency.rateToUSD / fromCurrency.rateToUSD;
  }, [fromCurrency, toCurrency]);

  const handleSwap = () => {
    setFromCode(toCode);
    setToCode(fromCode);
  };

  const fmt = (n: number, decimals = 2) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Currency Converter",
    description:
      "Convert between 15+ major world currencies instantly with approximate exchange rates.",
    url: "https://prestokit.com/tools/currency-converter",
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
              Currency{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Converter
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Convert between 15+ major world currencies with approximate
              exchange rates. Instant results, no signup required.
            </p>
          </div>

          {/* Converter Card */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-4 items-end mb-8">
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Amount
                </label>
                <input
                  type="number"
                  min="0"
                  step="any"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="1"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors mb-3"
                />
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  From
                </label>
                <select
                  value={fromCode}
                  onChange={(e) => setFromCode(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-white focus:outline-none focus:border-[#7c6cf0] transition-colors appearance-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center md:pb-2">
                <button
                  onClick={handleSwap}
                  className="w-12 h-12 rounded-full border border-[#7c6cf0]/40 bg-[#7c6cf0]/10 flex items-center justify-center hover:bg-[#7c6cf0]/20 transition-colors"
                  aria-label="Swap currencies"
                >
                  <svg
                    className="w-5 h-5 text-[#7c6cf0]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                    />
                  </svg>
                </button>
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Converted Amount
                </label>
                <div className="w-full rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 py-4 px-4 text-2xl text-white mb-3 min-h-[60px] flex items-center font-bold">
                  {fmt(result, result < 1 ? 6 : result > 10000 ? 0 : 2)}
                </div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  To
                </label>
                <select
                  value={toCode}
                  onChange={(e) => setToCode(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-white focus:outline-none focus:border-[#7c6cf0] transition-colors appearance-none cursor-pointer"
                >
                  {CURRENCIES.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.code} — {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Rate Info */}
            <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                <div className="text-sm text-[#c0c0d0]">
                  <span className="font-semibold text-white">1 {fromCode}</span> ={" "}
                  <span className="font-semibold text-[#9d90f5]">
                    {fmt(rate, rate < 1 ? 6 : 4)} {toCode}
                  </span>
                </div>
                <div className="text-sm text-[#8888a0]">
                  <span>1 {toCode}</span> = {fmt(inverseRate, inverseRate < 1 ? 6 : 4)}{" "}
                  {fromCode}
                </div>
              </div>
            </div>

            {/* Disclaimer */}
            <p className="mt-4 text-xs text-[#555566] text-center">
              Rates are approximate and for informational purposes only. Always
              verify with a live source before making financial decisions.
            </p>
          </div>

          {/* Quick Reference Table */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6">
              Quick Reference: 1 {fromCode} in Other Currencies
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
              {CURRENCIES.filter((c) => c.code !== fromCode)
                .slice(0, 10)
                .map((c) => {
                  const val = fromCurrency.rateToUSD / c.rateToUSD;
                  return (
                    <div
                      key={c.code}
                      className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-3 text-center"
                    >
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        {c.code}
                      </div>
                      <div className="text-sm font-bold text-white">
                        {fmt(val, val < 1 ? 4 : 2)}
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="currency-converter-pro" />

          {/* How It Works */}
          <div className="mb-16 mt-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Amount",
                  description:
                    "Type the amount you want to convert and select the source currency from the dropdown.",
                },
                {
                  step: "2",
                  title: "Choose Target Currency",
                  description:
                    "Select the currency you want to convert to, or use the swap button to reverse the direction.",
                },
                {
                  step: "3",
                  title: "Get Your Result",
                  description:
                    "See the converted amount instantly along with the exchange rate and inverse rate for reference.",
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
                  title: "Unit Converter",
                  description:
                    "Convert between hundreds of units for length, weight, volume, temperature, and more.",
                  href: "/tools/unit-converter",
                },
                {
                  title: "Tip Calculator",
                  description:
                    "Calculate tips and split bills easily for any group size.",
                  href: "/tools/tip-calculator",
                },
                {
                  title: "Percentage Calculator",
                  description:
                    "Calculate percentages, percentage change, and percentage of a number.",
                  href: "/tools/percentage-calculator",
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
