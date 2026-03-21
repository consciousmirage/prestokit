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
      <span className="text-[#f0f0f5]">Unit Converter</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types & Conversion Data                                            */
/* ------------------------------------------------------------------ */

type Category =
  | "length"
  | "weight"
  | "temperature"
  | "volume"
  | "area"
  | "speed"
  | "data"
  | "time";

interface UnitDef {
  id: string;
  label: string;
  symbol: string;
  toBase: (v: number) => number;
  fromBase: (v: number) => number;
}

interface CategoryDef {
  key: Category;
  label: string;
  units: UnitDef[];
  commonConversions: { from: string; to: string; label: string }[];
}

function linearUnit(id: string, label: string, symbol: string, factor: number): UnitDef {
  return {
    id,
    label,
    symbol,
    toBase: (v) => v * factor,
    fromBase: (v) => v / factor,
  };
}

const CATEGORIES: CategoryDef[] = [
  {
    key: "length",
    label: "Length",
    units: [
      linearUnit("mm", "Millimeter", "mm", 0.001),
      linearUnit("cm", "Centimeter", "cm", 0.01),
      linearUnit("m", "Meter", "m", 1),
      linearUnit("km", "Kilometer", "km", 1000),
      linearUnit("in", "Inch", "in", 0.0254),
      linearUnit("ft", "Foot", "ft", 0.3048),
      linearUnit("yd", "Yard", "yd", 0.9144),
      linearUnit("mi", "Mile", "mi", 1609.344),
    ],
    commonConversions: [
      { from: "km", to: "mi", label: "km to miles" },
      { from: "cm", to: "in", label: "cm to inches" },
      { from: "m", to: "ft", label: "meters to feet" },
      { from: "ft", to: "m", label: "feet to meters" },
    ],
  },
  {
    key: "weight",
    label: "Weight",
    units: [
      linearUnit("mg", "Milligram", "mg", 0.000001),
      linearUnit("g", "Gram", "g", 0.001),
      linearUnit("kg", "Kilogram", "kg", 1),
      linearUnit("oz", "Ounce", "oz", 0.028349523125),
      linearUnit("lb", "Pound", "lb", 0.45359237),
      linearUnit("ton", "Metric Ton", "t", 1000),
    ],
    commonConversions: [
      { from: "kg", to: "lb", label: "kg to lbs" },
      { from: "lb", to: "kg", label: "lbs to kg" },
      { from: "oz", to: "g", label: "oz to grams" },
      { from: "g", to: "oz", label: "grams to oz" },
    ],
  },
  {
    key: "temperature",
    label: "Temperature",
    units: [
      {
        id: "c",
        label: "Celsius",
        symbol: "\u00B0C",
        toBase: (v) => v,
        fromBase: (v) => v,
      },
      {
        id: "f",
        label: "Fahrenheit",
        symbol: "\u00B0F",
        toBase: (v) => (v - 32) * (5 / 9),
        fromBase: (v) => v * (9 / 5) + 32,
      },
      {
        id: "k",
        label: "Kelvin",
        symbol: "K",
        toBase: (v) => v - 273.15,
        fromBase: (v) => v + 273.15,
      },
    ],
    commonConversions: [
      { from: "c", to: "f", label: "\u00B0C to \u00B0F" },
      { from: "f", to: "c", label: "\u00B0F to \u00B0C" },
      { from: "c", to: "k", label: "\u00B0C to K" },
    ],
  },
  {
    key: "volume",
    label: "Volume",
    units: [
      linearUnit("ml", "Milliliter", "mL", 0.001),
      linearUnit("l", "Liter", "L", 1),
      linearUnit("gal", "Gallon (US)", "gal", 3.785411784),
      linearUnit("floz", "Fluid Ounce (US)", "fl oz", 0.029573529563),
      linearUnit("cup", "Cup (US)", "cup", 0.2365882365),
      linearUnit("tbsp", "Tablespoon", "tbsp", 0.014786764782),
      linearUnit("tsp", "Teaspoon", "tsp", 0.004928921594),
    ],
    commonConversions: [
      { from: "l", to: "gal", label: "liters to gallons" },
      { from: "gal", to: "l", label: "gallons to liters" },
      { from: "ml", to: "floz", label: "mL to fl oz" },
      { from: "cup", to: "ml", label: "cups to mL" },
    ],
  },
  {
    key: "area",
    label: "Area",
    units: [
      linearUnit("mm2", "Square Millimeter", "mm\u00B2", 0.000001),
      linearUnit("cm2", "Square Centimeter", "cm\u00B2", 0.0001),
      linearUnit("m2", "Square Meter", "m\u00B2", 1),
      linearUnit("km2", "Square Kilometer", "km\u00B2", 1000000),
      linearUnit("in2", "Square Inch", "in\u00B2", 0.00064516),
      linearUnit("ft2", "Square Foot", "ft\u00B2", 0.09290304),
      linearUnit("yd2", "Square Yard", "yd\u00B2", 0.83612736),
      linearUnit("mi2", "Square Mile", "mi\u00B2", 2589988.110336),
      linearUnit("acre", "Acre", "acre", 4046.8564224),
      linearUnit("hectare", "Hectare", "ha", 10000),
    ],
    commonConversions: [
      { from: "m2", to: "ft2", label: "m\u00B2 to ft\u00B2" },
      { from: "acre", to: "hectare", label: "acres to hectares" },
      { from: "km2", to: "mi2", label: "km\u00B2 to mi\u00B2" },
      { from: "ft2", to: "m2", label: "ft\u00B2 to m\u00B2" },
    ],
  },
  {
    key: "speed",
    label: "Speed",
    units: [
      linearUnit("ms", "Meter/second", "m/s", 1),
      linearUnit("kmh", "Kilometer/hour", "km/h", 0.277777778),
      linearUnit("mph", "Mile/hour", "mph", 0.44704),
      linearUnit("knots", "Knot", "kn", 0.514444444),
    ],
    commonConversions: [
      { from: "kmh", to: "mph", label: "km/h to mph" },
      { from: "mph", to: "kmh", label: "mph to km/h" },
      { from: "ms", to: "kmh", label: "m/s to km/h" },
      { from: "knots", to: "mph", label: "knots to mph" },
    ],
  },
  {
    key: "data",
    label: "Data",
    units: [
      linearUnit("b", "Byte", "B", 1),
      linearUnit("kb", "Kilobyte", "KB", 1024),
      linearUnit("mb", "Megabyte", "MB", 1048576),
      linearUnit("gb", "Gigabyte", "GB", 1073741824),
      linearUnit("tb", "Terabyte", "TB", 1099511627776),
      linearUnit("pb", "Petabyte", "PB", 1125899906842624),
    ],
    commonConversions: [
      { from: "gb", to: "mb", label: "GB to MB" },
      { from: "mb", to: "gb", label: "MB to GB" },
      { from: "tb", to: "gb", label: "TB to GB" },
      { from: "kb", to: "mb", label: "KB to MB" },
    ],
  },
  {
    key: "time",
    label: "Time",
    units: [
      linearUnit("ms_t", "Millisecond", "ms", 0.001),
      linearUnit("s", "Second", "s", 1),
      linearUnit("min", "Minute", "min", 60),
      linearUnit("hr", "Hour", "hr", 3600),
      linearUnit("day", "Day", "day", 86400),
      linearUnit("week", "Week", "wk", 604800),
      linearUnit("month", "Month (avg)", "mo", 2629746),
      linearUnit("year", "Year (avg)", "yr", 31556952),
    ],
    commonConversions: [
      { from: "hr", to: "min", label: "hours to minutes" },
      { from: "day", to: "hr", label: "days to hours" },
      { from: "week", to: "day", label: "weeks to days" },
      { from: "year", to: "day", label: "years to days" },
    ],
  },
];

const FAQ_DATA = [
  {
    question: "How accurate are these unit conversions?",
    answer:
      "Our conversions use standard conversion factors with high precision floating-point arithmetic. Results are accurate to at least 6 significant figures, which is more than sufficient for everyday use. For scientific applications requiring extreme precision, please verify with specialized software.",
  },
  {
    question: "What is the difference between metric and imperial units?",
    answer:
      "The metric system (meters, kilograms, liters) is a decimal-based system used by most countries worldwide. The imperial system (feet, pounds, gallons) is primarily used in the United States. Metric units are based on powers of 10, making conversions within the system straightforward.",
  },
  {
    question: "Why are there different types of gallons and ounces?",
    answer:
      "The US and UK use different definitions for some volume units. A US gallon is approximately 3.785 liters, while an imperial (UK) gallon is approximately 4.546 liters. Similarly, US and UK fluid ounces differ slightly. This tool uses US measurements by default.",
  },
  {
    question: "How do temperature conversions work?",
    answer:
      "Temperature conversions are not simple multiplications like most other units. Celsius and Fahrenheit use different zero points and scale sizes. The formula is: F = C x 9/5 + 32. Kelvin uses the same scale as Celsius but starts at absolute zero (-273.15 C), so K = C + 273.15.",
  },
  {
    question: "Is KB 1000 or 1024 bytes?",
    answer:
      "This tool uses the binary definition where 1 KB = 1024 bytes, 1 MB = 1024 KB, and so on. This is the traditional computing convention (technically called kibibytes, mebibytes, etc.). Some storage manufacturers use the decimal definition (1 KB = 1000 bytes), which is why a 1 TB drive shows less than 1 TB in your operating system.",
  },
  {
    question: "Can I convert between different categories?",
    answer:
      "No, you can only convert between units within the same category. For example, you can convert meters to feet (both length), but not meters to kilograms (length vs. weight). This is because different physical quantities are fundamentally incompatible.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatResult(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "--";
  if (n === 0) return "0";
  const abs = Math.abs(n);
  if (abs >= 1e12 || (abs > 0 && abs < 1e-6)) {
    return n.toExponential(6);
  }
  // Show up to 8 significant digits, strip trailing zeros
  const str = n.toPrecision(8);
  return parseFloat(str).toString();
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function UnitConverterPage() {
  const [category, setCategory] = useState<Category>("length");
  const [fromUnit, setFromUnit] = useState("m");
  const [toUnit, setToUnit] = useState("ft");
  const [inputValue, setInputValue] = useState("1");

  const currentCategory = CATEGORIES.find((c) => c.key === category)!;

  const handleCategoryChange = (cat: Category) => {
    setCategory(cat);
    const catDef = CATEGORIES.find((c) => c.key === cat)!;
    setFromUnit(catDef.units[0].id);
    setToUnit(catDef.units[1]?.id ?? catDef.units[0].id);
    setInputValue("1");
  };

  const handleSwap = () => {
    const prevFrom = fromUnit;
    const prevTo = toUnit;
    setFromUnit(prevTo);
    setToUnit(prevFrom);
  };

  const handleQuickConversion = (from: string, to: string) => {
    setFromUnit(from);
    setToUnit(to);
    setInputValue("1");
  };

  const result = useMemo(() => {
    const val = parseFloat(inputValue);
    if (isNaN(val)) return 0;
    const fromDef = currentCategory.units.find((u) => u.id === fromUnit);
    const toDef = currentCategory.units.find((u) => u.id === toUnit);
    if (!fromDef || !toDef) return 0;
    const base = fromDef.toBase(val);
    return toDef.fromBase(base);
  }, [inputValue, fromUnit, toUnit, currentCategory]);

  const fromDef = currentCategory.units.find((u) => u.id === fromUnit);
  const toDef = currentCategory.units.find((u) => u.id === toUnit);

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
              Unit{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Converter
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Convert between units instantly across 8 categories. Results
              update in real time as you type.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mb-8">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.key}
                onClick={() => handleCategoryChange(cat.key)}
                className={`rounded-xl border px-3 py-2.5 text-xs sm:text-sm font-medium transition-all ${
                  category === cat.key
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5] shadow-[0_0_20px_rgba(124,108,240,0.1)]"
                    : "border-[#1e1e2e] bg-[#12121a] text-[#8888a0] hover:border-[#7c6cf0]/40"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Converter */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] gap-4 items-end">
              {/* From */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  From
                </label>
                <select
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors mb-3"
                >
                  {currentCategory.units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.label} ({u.symbol})
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  step="any"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Enter value"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
                <div className="text-xs text-[#555566] mt-1">
                  {fromDef?.label}
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex items-center justify-center py-4">
                <button
                  onClick={handleSwap}
                  className="w-12 h-12 rounded-full border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0] transition-all flex items-center justify-center group"
                >
                  <svg
                    className="w-5 h-5 text-[#7c6cf0] group-hover:rotate-180 transition-transform duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                    />
                  </svg>
                </button>
              </div>

              {/* To */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  To
                </label>
                <select
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors mb-3"
                >
                  {currentCategory.units.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.label} ({u.symbol})
                    </option>
                  ))}
                </select>
                <div className="w-full rounded-xl border border-[#1e1e2e] bg-[#7c6cf0]/5 py-4 px-4 text-2xl text-[#00e676] font-bold min-h-[60px] flex items-center">
                  {formatResult(result)}
                </div>
                <div className="text-xs text-[#555566] mt-1">
                  {toDef?.label}
                </div>
              </div>
            </div>

            {/* Formula display */}
            <div className="mt-6 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-4 text-center">
              <span className="text-sm text-[#8888a0] font-mono">
                {inputValue || "0"} {fromDef?.symbol} = {formatResult(result)}{" "}
                {toDef?.symbol}
              </span>
            </div>
          </div>

          {/* Quick Conversions */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
              Common {currentCategory.label} Conversions
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {currentCategory.commonConversions.map((cc) => (
                <button
                  key={cc.label}
                  onClick={() => handleQuickConversion(cc.from, cc.to)}
                  className={`rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                    fromUnit === cc.from && toUnit === cc.to
                      ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                      : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                  }`}
                >
                  {cc.label}
                </button>
              ))}
            </div>
          </div>

          {/* Conversion Table */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
            <h2 className="text-lg font-semibold text-white mb-4">
              {currentCategory.label} Conversion Table
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">
                      Value
                    </th>
                    <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">
                      From ({fromDef?.symbol})
                    </th>
                    <th className="text-left text-[#8888a0] font-medium pb-3">
                      To ({toDef?.symbol})
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {[0.001, 0.01, 0.1, 1, 5, 10, 25, 50, 100, 1000].map(
                    (val) => {
                      const from = currentCategory.units.find(
                        (u) => u.id === fromUnit
                      );
                      const to = currentCategory.units.find(
                        (u) => u.id === toUnit
                      );
                      if (!from || !to) return null;
                      const base = from.toBase(val);
                      const converted = to.fromBase(base);
                      return (
                        <tr
                          key={val}
                          className="border-b border-[#1e1e2e]/60"
                        >
                          <td className="py-2.5 pr-4 text-white font-semibold">
                            {val}
                          </td>
                          <td className="py-2.5 pr-4 text-[#9d90f5]">
                            {val} {from.symbol}
                          </td>
                          <td className="py-2.5 text-[#00e676]">
                            {formatResult(converted)} {to.symbol}
                          </td>
                        </tr>
                      );
                    }
                  )}
                </tbody>
              </table>
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
                  title: "Choose a Category",
                  description:
                    "Select from 8 unit categories: Length, Weight, Temperature, Volume, Area, Speed, Data, and Time. Each category has its own set of units.",
                },
                {
                  step: "2",
                  title: "Select Units & Enter Value",
                  description:
                    "Pick your source and target units from the dropdowns. Type a value and see the result instantly. Use the swap button to reverse the conversion direction.",
                },
                {
                  step: "3",
                  title: "View Results",
                  description:
                    "Results update in real time as you type. Use the quick-select buttons for common conversions, and reference the conversion table for multiple values at once.",
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
                  title: "Tip Calculator",
                  description:
                    "Calculate tips and split bills between multiple people.",
                  href: "/tools/tip-calculator",
                },
                {
                  title: "Date Calculator",
                  description:
                    "Calculate days between dates and countdown to events.",
                  href: "/tools/date-calculator",
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
