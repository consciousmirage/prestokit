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
      <span className="text-[#f0f0f5]">Fuel Cost Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How do I calculate gas cost for a trip?",
    answer:
      "Divide the total distance by your vehicle's miles per gallon (MPG) to get gallons needed, then multiply by the price per gallon. For example, a 300-mile trip at 25 MPG with gas at $3.50/gal: 300 / 25 = 12 gallons x $3.50 = $42.00. This calculator does it all instantly.",
  },
  {
    question: "What is the average MPG for cars in the US?",
    answer:
      "The average fuel economy for passenger vehicles in the US is about 25-27 MPG. Compact cars average 30-35 MPG, SUVs average 20-25 MPG, pickup trucks average 17-22 MPG, and hybrids average 45-55 MPG. Check your vehicle's sticker or owner's manual for its specific rating.",
  },
  {
    question: "How do I calculate cost per mile?",
    answer:
      "Divide the gas price per gallon by your MPG. For example, at $3.50/gal and 25 MPG: $3.50 / 25 = $0.14 per mile. This only covers fuel — total driving cost including maintenance, insurance, and depreciation is typically $0.50-$0.70 per mile.",
  },
  {
    question: "How can I improve my gas mileage?",
    answer:
      "Keep tires properly inflated, drive at moderate speeds (55-65 MPH is optimal), avoid aggressive acceleration and hard braking, remove excess weight, use cruise control on highways, keep up with maintenance, and avoid excessive idling. These tips can improve fuel economy by 10-30%.",
  },
  {
    question: "What is the current average gas price in the US?",
    answer:
      "Gas prices fluctuate regularly. Check GasBuddy.com or AAA's fuel gauge for current national and local averages. As a reference, the national average has ranged from about $3.00 to $4.00 per gallon in recent years. This calculator lets you input the exact price at your local station.",
  },
  {
    question: "How do I calculate fuel cost for a round trip?",
    answer:
      "Simply enter double the one-way distance in the distance field, or calculate the one-way cost and multiply by 2. For example, if a one-way trip is 150 miles, enter 300 miles for the round trip calculation.",
  },
];

/* ------------------------------------------------------------------ */
/*  Quick MPG Presets                                                  */
/* ------------------------------------------------------------------ */

const MPG_PRESETS = [
  { label: "Compact Car", mpg: 32 },
  { label: "Sedan", mpg: 28 },
  { label: "SUV", mpg: 23 },
  { label: "Truck", mpg: 19 },
  { label: "Hybrid", mpg: 48 },
  { label: "EV (MPGe)", mpg: 100 },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function FuelCostCalculatorPage() {
  const [distance, setDistance] = useState("");
  const [mpg, setMpg] = useState("");
  const [gasPrice, setGasPrice] = useState("3.50");
  const [passengers, setPassengers] = useState("1");

  const results = useMemo(() => {
    const d = parseFloat(distance) || 0;
    const m = parseFloat(mpg) || 0;
    const g = parseFloat(gasPrice) || 0;
    const p = parseInt(passengers) || 1;

    if (m === 0) return { gallons: 0, totalCost: 0, costPerMile: 0, costPerPerson: 0 };

    const gallons = d / m;
    const totalCost = gallons * g;
    const costPerMile = g / m;
    const costPerPerson = totalCost / p;

    return { gallons, totalCost, costPerMile, costPerPerson };
  }, [distance, mpg, gasPrice, passengers]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Fuel Cost Calculator",
    description:
      "Calculate gas cost for any trip by distance, fuel efficiency (MPG), and gas price. Estimate road trip fuel expenses instantly.",
    url: "https://prestokit.com/tools/fuel-cost-calculator",
    applicationCategory: "UtilityApplication",
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
              Fuel Cost{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate gas cost for any trip. Enter the distance, your
              vehicle&apos;s fuel efficiency, and the gas price to see total fuel
              cost, gallons needed, and cost per mile.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Distance */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Trip Distance
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="1"
                    min="0"
                    value={distance}
                    onChange={(e) => setDistance(e.target.value)}
                    placeholder="300"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-4 pr-16 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                    miles
                  </span>
                </div>
              </div>

              {/* MPG */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Fuel Efficiency (MPG)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    value={mpg}
                    onChange={(e) => setMpg(e.target.value)}
                    placeholder="25"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-4 pr-16 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                    MPG
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3">
                  {MPG_PRESETS.map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => setMpg(preset.mpg.toString())}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                        mpg === preset.mpg.toString()
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {preset.label} ({preset.mpg})
                    </button>
                  ))}
                </div>
              </div>

              {/* Gas Price */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Gas Price per Gallon
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={gasPrice}
                    onChange={(e) => setGasPrice(e.target.value)}
                    placeholder="3.50"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Passengers */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Split Between (passengers)
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="20"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  placeholder="1"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-4 pr-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
                <p className="text-xs text-[#555566] mt-1">
                  Split fuel cost evenly between passengers
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Results
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Total Fuel Cost
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      ${fmt(results.totalCost)}
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Gallons Needed
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {fmt(results.gallons)} gal
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Cost per Mile
                      </div>
                      <div className="text-2xl font-bold text-[#9d90f5]">
                        ${results.costPerMile.toFixed(3)}
                      </div>
                    </div>
                    {parseInt(passengers) > 1 && (
                      <div className="rounded-xl border border-[#00e676]/30 bg-[#00e676]/5 p-4">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Cost per Person
                        </div>
                        <div className="text-2xl font-bold text-[#00e676]">
                          ${fmt(results.costPerPerson)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Visual Bar */}
              {results.totalCost > 0 && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                    Trip Summary
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-white">{distance || 0}</div>
                      <div className="text-xs text-[#8888a0]">Miles</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-white">{fmt(results.gallons)}</div>
                      <div className="text-xs text-[#8888a0]">Gallons</div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-[#00e676]">${fmt(results.totalCost)}</div>
                      <div className="text-xs text-[#8888a0]">Total Cost</div>
                    </div>
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
                  title: "Enter Trip Distance",
                  description:
                    "Type the total miles for your trip. Use a round-trip distance if you want the total cost for the whole journey.",
                },
                {
                  step: "2",
                  title: "Set MPG & Gas Price",
                  description:
                    "Enter your vehicle's fuel efficiency in miles per gallon and the current gas price. Use quick presets for common vehicle types.",
                },
                {
                  step: "3",
                  title: "See Your Fuel Cost",
                  description:
                    "Instantly see the total fuel cost, gallons needed, cost per mile, and cost per person if splitting between passengers.",
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
                  title: "Unit Converter",
                  description:
                    "Convert between units of length, weight, temperature, volume, and more.",
                  href: "/tools/unit-converter",
                },
                {
                  title: "Percentage Calculator",
                  description:
                    "Calculate percentages, percentage change, increase, and decrease.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Discount Calculator",
                  description:
                    "Calculate sale prices, savings, and percent off. Stack discounts and add tax.",
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
