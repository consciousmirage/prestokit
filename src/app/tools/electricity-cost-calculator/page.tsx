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
      <span className="text-[#f0f0f5]">Electricity Cost Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Common Appliance Presets                                            */
/* ------------------------------------------------------------------ */

const APPLIANCE_PRESETS = [
  { name: "LED Light Bulb", watts: 10 },
  { name: "Laptop", watts: 50 },
  { name: "Desktop Computer", watts: 200 },
  { name: "Television (55\")", watts: 80 },
  { name: "Refrigerator", watts: 150 },
  { name: "Washing Machine", watts: 500 },
  { name: "Clothes Dryer", watts: 3000 },
  { name: "Dishwasher", watts: 1800 },
  { name: "Microwave", watts: 1000 },
  { name: "Air Conditioner (Window)", watts: 1400 },
  { name: "Space Heater", watts: 1500 },
  { name: "Hair Dryer", watts: 1800 },
  { name: "Gaming Console", watts: 120 },
  { name: "Electric Oven", watts: 2500 },
  { name: "Ceiling Fan", watts: 75 },
];

const RATE_PRESETS = [
  { label: "US Average", rate: 0.16 },
  { label: "California", rate: 0.27 },
  { label: "Texas", rate: 0.14 },
  { label: "New York", rate: 0.22 },
  { label: "Florida", rate: 0.14 },
  { label: "UK Average", rate: 0.34 },
  { label: "EU Average", rate: 0.29 },
  { label: "Canada Average", rate: 0.13 },
];

/* ------------------------------------------------------------------ */
/*  Appliance Type                                                     */
/* ------------------------------------------------------------------ */

interface Appliance {
  id: number;
  name: string;
  watts: string;
  hoursPerDay: string;
}

let nextId = 1;

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How do I calculate the electricity cost of an appliance?",
    answer:
      "To calculate the electricity cost: multiply the appliance wattage by the number of hours you use it per day, then divide by 1,000 to get kilowatt-hours (kWh). Multiply the kWh by your electricity rate (price per kWh). For example, a 100-watt light bulb running 10 hours per day at $0.15/kWh costs: (100 x 10) / 1000 x 0.15 = $0.15 per day, or about $4.50 per month.",
  },
  {
    question: "What is a kilowatt-hour (kWh)?",
    answer:
      "A kilowatt-hour (kWh) is the standard unit of energy used by electric utilities for billing. One kWh equals the energy consumed by a 1,000-watt appliance running for one hour, or equivalently, a 100-watt bulb running for 10 hours. Your electricity bill shows the total kWh consumed during the billing period multiplied by your rate per kWh. The average US household uses about 886 kWh per month.",
  },
  {
    question: "What is the average electricity rate in the US?",
    answer:
      "As of 2024, the average residential electricity rate in the US is approximately $0.16 per kWh. However, rates vary significantly by state: Hawaii has the highest rates (around $0.43/kWh), while states like Louisiana, Idaho, and Washington have some of the lowest (around $0.10-0.12/kWh). California averages about $0.27/kWh, while New York averages about $0.22/kWh. Check your utility bill for your exact rate.",
  },
  {
    question: "Which home appliances use the most electricity?",
    answer:
      "The biggest electricity consumers in a typical home are: central air conditioning (2,000-5,000W), electric water heater (4,500W), clothes dryer (3,000-5,000W), electric oven/range (2,500-5,000W), and space heaters (1,500W). However, total cost also depends on how many hours each appliance runs. A refrigerator at 150W running 24/7 costs more per month than a dryer at 3,000W used for one hour a few times a week.",
  },
  {
    question: "How can I reduce my electricity bill?",
    answer:
      "The most effective ways to reduce your electricity bill: (1) Switch to LED bulbs — they use 75% less energy than incandescent. (2) Use a programmable thermostat to reduce heating/cooling when away. (3) Unplug devices when not in use (standby power can account for 5-10% of your bill). (4) Use Energy Star rated appliances. (5) Wash clothes in cold water. (6) Air dry clothes when possible. (7) Use a fan instead of AC when feasible. (8) Seal air leaks around doors and windows.",
  },
  {
    question: "What is phantom/standby power and how much does it cost?",
    answer:
      "Phantom power (also called standby power or vampire power) is the electricity consumed by devices when they are turned off but still plugged in. Common culprits include TVs, game consoles, phone chargers, cable boxes, and computers in sleep mode. The average US household spends $100-$200 per year on phantom power alone. Using smart power strips or unplugging devices when not in use can eliminate most phantom power waste.",
  },
  {
    question: "How do I find the wattage of my appliance?",
    answer:
      "Check the label or sticker on the back or bottom of the appliance — it usually lists the wattage (W) or amperage (A) and voltage (V). If only amps and volts are listed, multiply them to get watts (W = A x V). You can also check the user manual, the manufacturer's website, or use a plug-in electricity monitor (like a Kill-A-Watt meter) for the most accurate real-world reading. Our calculator includes common appliance presets to make it easy.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ElectricityCostCalculatorPage() {
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: nextId++, name: "", watts: "", hoursPerDay: "" },
  ]);
  const [rate, setRate] = useState("0.16");

  const addAppliance = () => {
    setAppliances((prev) => [
      ...prev,
      { id: nextId++, name: "", watts: "", hoursPerDay: "" },
    ]);
  };

  const removeAppliance = (id: number) => {
    if (appliances.length <= 1) return;
    setAppliances((prev) => prev.filter((a) => a.id !== id));
  };

  const updateAppliance = (id: number, field: keyof Appliance, value: string) => {
    setAppliances((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const applyPreset = (id: number, preset: { name: string; watts: number }) => {
    setAppliances((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, name: preset.name, watts: String(preset.watts) } : a
      )
    );
  };

  const results = useMemo(() => {
    const rateVal = parseFloat(rate) || 0;
    const items = appliances.map((a) => {
      const watts = parseFloat(a.watts) || 0;
      const hours = parseFloat(a.hoursPerDay) || 0;
      const dailyKwh = (watts * hours) / 1000;
      const dailyCost = dailyKwh * rateVal;
      const monthlyCost = dailyCost * 30;
      const yearlyCost = dailyCost * 365;
      return {
        id: a.id,
        name: a.name || "Untitled",
        watts,
        hours,
        dailyKwh,
        dailyCost,
        monthlyCost,
        yearlyCost,
      };
    });

    const totalDaily = items.reduce((s, i) => s + i.dailyCost, 0);
    const totalMonthly = items.reduce((s, i) => s + i.monthlyCost, 0);
    const totalYearly = items.reduce((s, i) => s + i.yearlyCost, 0);
    const totalDailyKwh = items.reduce((s, i) => s + i.dailyKwh, 0);

    return { items, totalDaily, totalMonthly, totalYearly, totalDailyKwh };
  }, [appliances, rate]);

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Electricity Cost Calculator",
    description:
      "Calculate how much electricity your appliances cost to run daily, monthly, and yearly. Compare multiple appliances and find savings.",
    url: "https://prestokit.com/tools/electricity-cost-calculator",
    applicationCategory: "UtilitiesApplication",
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
              Electricity Cost{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate how much it costs to run your appliances. Enter wattage
              and daily usage to see daily, monthly, and yearly electricity costs.
            </p>
          </div>

          {/* Electricity Rate */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
              Electricity Rate ($/kWh)
            </label>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-shrink-0">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                  $
                </span>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  value={rate}
                  onChange={(e) => setRate(e.target.value)}
                  className="w-full sm:w-40 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {RATE_PRESETS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => setRate(String(preset.rate))}
                    className={`rounded-lg border px-3 py-2 text-xs font-medium transition-all ${
                      rate === String(preset.rate)
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    {preset.label} (${preset.rate})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Appliance Entries */}
          <div className="space-y-4 mb-6">
            {appliances.map((appliance, idx) => (
              <div
                key={appliance.id}
                className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8"
              >
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-sm font-semibold text-[#c0c0d0]">
                    Appliance {idx + 1}
                  </h2>
                  {appliances.length > 1 && (
                    <button
                      onClick={() => removeAppliance(appliance.id)}
                      className="text-[#555566] hover:text-[#ff5252] transition-colors"
                      aria-label="Remove appliance"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                  {/* Name */}
                  <div>
                    <label className="block text-xs text-[#8888a0] mb-1.5">
                      Appliance Name
                    </label>
                    <input
                      type="text"
                      value={appliance.name}
                      onChange={(e) =>
                        updateAppliance(appliance.id, "name", e.target.value)
                      }
                      placeholder="e.g. Living Room TV"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>

                  {/* Wattage */}
                  <div>
                    <label className="block text-xs text-[#8888a0] mb-1.5">
                      Wattage (W)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={appliance.watts}
                      onChange={(e) =>
                        updateAppliance(appliance.id, "watts", e.target.value)
                      }
                      placeholder="100"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>

                  {/* Hours Per Day */}
                  <div>
                    <label className="block text-xs text-[#8888a0] mb-1.5">
                      Hours / Day
                    </label>
                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={appliance.hoursPerDay}
                      onChange={(e) =>
                        updateAppliance(appliance.id, "hoursPerDay", e.target.value)
                      }
                      placeholder="8"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>

                {/* Appliance Presets */}
                <div>
                  <label className="block text-xs text-[#8888a0] mb-2">
                    Quick Fill
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {APPLIANCE_PRESETS.map((preset) => (
                      <button
                        key={preset.name}
                        onClick={() => applyPreset(appliance.id, preset)}
                        className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40 px-2.5 py-1.5 text-xs text-[#8888a0] hover:text-white transition-all"
                      >
                        {preset.name} ({preset.watts}W)
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Appliance Button */}
          <button
            onClick={addAppliance}
            className="w-full rounded-2xl border border-dashed border-[#1e1e2e] bg-[#12121a]/30 hover:border-[#7c6cf0]/40 py-4 text-sm text-[#8888a0] hover:text-white transition-all mb-6 flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Another Appliance
          </button>

          {/* Results */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-6">
              Cost Summary
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                  Daily Cost
                </div>
                <div className="text-xl font-bold text-white">
                  ${fmt(results.totalDaily)}
                </div>
              </div>
              <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4 text-center">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                  Monthly Cost
                </div>
                <div className="text-xl font-bold text-[#9d90f5]">
                  ${fmt(results.totalMonthly)}
                </div>
              </div>
              <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                  Yearly Cost
                </div>
                <div className="text-xl font-bold text-[#ff5252]">
                  ${fmt(results.totalYearly)}
                </div>
              </div>
              <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                  Daily kWh
                </div>
                <div className="text-xl font-bold text-[#00e676]">
                  {results.totalDailyKwh.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Per-Appliance Breakdown */}
            {results.items.filter((i) => i.watts > 0 && i.hours > 0).length > 0 && (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">
                        Appliance
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Watts
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Hrs/Day
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Daily
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Monthly
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">
                        Yearly
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {results.items
                      .filter((i) => i.watts > 0 && i.hours > 0)
                      .sort((a, b) => b.yearlyCost - a.yearlyCost)
                      .map((item) => (
                        <tr
                          key={item.id}
                          className="border-b border-[#1e1e2e]/60"
                        >
                          <td className="py-3 pr-4 text-[#c0c0d0]">
                            {item.name}
                          </td>
                          <td className="py-3 px-4 text-right text-[#c0c0d0]">
                            {item.watts.toLocaleString()}W
                          </td>
                          <td className="py-3 px-4 text-right text-[#c0c0d0]">
                            {item.hours}h
                          </td>
                          <td className="py-3 px-4 text-right text-white">
                            ${fmt(item.dailyCost)}
                          </td>
                          <td className="py-3 px-4 text-right text-[#9d90f5] font-semibold">
                            ${fmt(item.monthlyCost)}
                          </td>
                          <td className="py-3 pl-4 text-right text-[#ff5252] font-semibold">
                            ${fmt(item.yearlyCost)}
                          </td>
                        </tr>
                      ))}
                    {results.items.filter((i) => i.watts > 0 && i.hours > 0)
                      .length > 1 && (
                      <tr className="border-t border-[#7c6cf0]/30">
                        <td
                          colSpan={3}
                          className="py-3 pr-4 text-right font-semibold text-white"
                        >
                          Total
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-white">
                          ${fmt(results.totalDaily)}
                        </td>
                        <td className="py-3 px-4 text-right font-bold text-[#9d90f5]">
                          ${fmt(results.totalMonthly)}
                        </td>
                        <td className="py-3 pl-4 text-right font-bold text-[#ff5252]">
                          ${fmt(results.totalYearly)}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* Cost Bar Chart */}
            {results.items.filter((i) => i.watts > 0 && i.hours > 0).length > 1 && (
              <div className="mt-6">
                <h3 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                  Monthly Cost Comparison
                </h3>
                <div className="space-y-3">
                  {results.items
                    .filter((i) => i.watts > 0 && i.hours > 0)
                    .sort((a, b) => b.monthlyCost - a.monthlyCost)
                    .map((item) => {
                      const maxCost = Math.max(
                        ...results.items
                          .filter((i) => i.watts > 0 && i.hours > 0)
                          .map((i) => i.monthlyCost)
                      );
                      return (
                        <div key={item.id} className="flex items-center gap-3">
                          <div className="w-28 text-right text-sm text-[#c0c0d0] truncate">
                            {item.name}
                          </div>
                          <div className="flex-1 h-8 bg-[#0a0a0f] rounded-lg overflow-hidden relative">
                            <div
                              className="h-full rounded-lg transition-all duration-500"
                              style={{
                                width:
                                  maxCost > 0
                                    ? `${Math.max((item.monthlyCost / maxCost) * 100, 2)}%`
                                    : "0%",
                                background: `linear-gradient(90deg, #7c6cf0, #9d90f5)`,
                              }}
                            />
                            <div className="absolute inset-0 flex items-center px-3">
                              <span className="text-xs text-white font-medium drop-shadow-sm">
                                ${fmt(item.monthlyCost)}/mo
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>
            )}
          </div>

          {/* Promo Bars */}
          <div className="mb-6">
            <PromoBar type="pro" dismissKey="electricity-pro" />
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
                  title: "Set Your Rate",
                  description:
                    "Enter your electricity rate in $/kWh or pick a preset. You can find your rate on your utility bill.",
                },
                {
                  step: "2",
                  title: "Add Appliances",
                  description:
                    "Enter the wattage and daily usage hours for each appliance, or use quick-fill presets for common devices.",
                },
                {
                  step: "3",
                  title: "Compare Costs",
                  description:
                    "See daily, monthly, and yearly costs for each appliance. Compare multiple devices to find where your money goes.",
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
                  title: "Mortgage Calculator",
                  description:
                    "Calculate monthly mortgage payments, interest, and amortization schedules.",
                  href: "/tools/mortgage-calculator",
                },
                {
                  title: "Tax Calculator",
                  description:
                    "Estimate your federal income tax by bracket with effective and marginal rates.",
                  href: "/tools/tax-calculator",
                },
                {
                  title: "Square Footage Calculator",
                  description:
                    "Calculate area in square feet for rooms, yards, and flooring projects.",
                  href: "/tools/square-footage-calculator",
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
