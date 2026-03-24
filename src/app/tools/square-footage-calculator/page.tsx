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
      <span className="text-[#f0f0f5]">Square Footage Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Shape = "rectangle" | "triangle" | "circle" | "trapezoid";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How do I calculate square footage of a room?",
    answer:
      "To calculate the square footage of a rectangular room, simply multiply the length by the width. For example, a room that is 12 feet long and 10 feet wide is 120 square feet (12 x 10 = 120). If your room has an irregular shape, break it into smaller rectangles, calculate each area separately, and add them together.",
  },
  {
    question: "How many square feet are in an acre?",
    answer:
      "One acre equals 43,560 square feet. An acre is roughly the size of a football field without the end zones (which is about 48,000 sq ft). To convert square feet to acres, divide by 43,560. To convert acres to square feet, multiply by 43,560.",
  },
  {
    question: "How do I convert square feet to square meters?",
    answer:
      "To convert square feet to square meters, multiply by 0.0929. For example, 1,000 sq ft = 92.9 sq meters. To go the other direction, multiply square meters by 10.764 to get square feet. This calculator handles both conversions automatically.",
  },
  {
    question: "How do I calculate the area of an irregular shape?",
    answer:
      "For irregular shapes, break the area into standard shapes (rectangles, triangles, circles) that you can calculate individually. Measure each section, calculate its area using the appropriate formula, then add all the areas together. For very complex shapes, you can also use the trapezoid method by dividing the shape into parallel strips.",
  },
  {
    question: "What is the formula for area of a circle?",
    answer:
      "The area of a circle is calculated using the formula A = pi x r squared, where r is the radius (half the diameter). For example, a circular area with a diameter of 20 feet has a radius of 10 feet, so the area would be pi x 10 x 10 = approximately 314.16 square feet.",
  },
  {
    question: "How much flooring do I need for my room?",
    answer:
      "Calculate the square footage of your room using length x width. Then add 10-15% extra to account for waste from cuts, pattern matching, and mistakes. For example, a 200 sq ft room would need approximately 220-230 sq ft of flooring material. For diagonal or herringbone patterns, add 15-20% extra.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SquareFootageCalculatorPage() {
  const [shape, setShape] = useState<Shape>("rectangle");

  // Rectangle
  const [rectLength, setRectLength] = useState("");
  const [rectWidth, setRectWidth] = useState("");

  // Triangle
  const [triBase, setTriBase] = useState("");
  const [triHeight, setTriHeight] = useState("");

  // Circle
  const [circRadius, setCircRadius] = useState("");

  // Trapezoid
  const [trapA, setTrapA] = useState("");
  const [trapB, setTrapB] = useState("");
  const [trapHeight, setTrapHeight] = useState("");

  const areaSqFt = useMemo(() => {
    switch (shape) {
      case "rectangle": {
        const l = parseFloat(rectLength) || 0;
        const w = parseFloat(rectWidth) || 0;
        return l * w;
      }
      case "triangle": {
        const b = parseFloat(triBase) || 0;
        const h = parseFloat(triHeight) || 0;
        return 0.5 * b * h;
      }
      case "circle": {
        const r = parseFloat(circRadius) || 0;
        return Math.PI * r * r;
      }
      case "trapezoid": {
        const a = parseFloat(trapA) || 0;
        const b = parseFloat(trapB) || 0;
        const h = parseFloat(trapHeight) || 0;
        return 0.5 * (a + b) * h;
      }
      default:
        return 0;
    }
  }, [shape, rectLength, rectWidth, triBase, triHeight, circRadius, trapA, trapB, trapHeight]);

  const conversions = useMemo(() => {
    return {
      sqFt: areaSqFt,
      sqM: areaSqFt * 0.092903,
      acres: areaSqFt / 43560,
      sqYd: areaSqFt / 9,
    };
  }, [areaSqFt]);

  const fmt = (n: number, decimals = 2) =>
    n.toLocaleString("en-US", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Square Footage Calculator",
    description:
      "Calculate area in square feet for rectangles, triangles, circles, and trapezoids. Convert to sq meters, acres, and sq yards.",
    url: "https://prestokit.com/tools/square-footage-calculator",
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

  const shapes: { value: Shape; label: string; icon: string }[] = [
    { value: "rectangle", label: "Rectangle", icon: "\u25AD" },
    { value: "triangle", label: "Triangle", icon: "\u25B3" },
    { value: "circle", label: "Circle", icon: "\u25CB" },
    { value: "trapezoid", label: "Trapezoid", icon: "\u2B22" },
  ];

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
              Square Footage{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate area in square feet for any shape. Instantly convert to
              square meters, acres, and square yards.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Shape Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Shape
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {shapes.map((s) => (
                    <button
                      key={s.value}
                      onClick={() => setShape(s.value)}
                      className={`rounded-xl border py-3 px-4 text-sm font-semibold text-center transition-all ${
                        shape === s.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      <span className="text-xl block mb-1">{s.icon}</span>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dimension Inputs */}
              <div className="space-y-4">
                {shape === "rectangle" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                        Length (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={rectLength}
                        onChange={(e) => setRectLength(e.target.value)}
                        placeholder="e.g. 20"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                        Width (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={rectWidth}
                        onChange={(e) => setRectWidth(e.target.value)}
                        placeholder="e.g. 15"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-3 text-center">
                      <p className="text-xs text-[#8888a0]">
                        Formula: Area = Length &times; Width
                      </p>
                    </div>
                  </>
                )}

                {shape === "triangle" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                        Base (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={triBase}
                        onChange={(e) => setTriBase(e.target.value)}
                        placeholder="e.g. 10"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                        Height (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={triHeight}
                        onChange={(e) => setTriHeight(e.target.value)}
                        placeholder="e.g. 8"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-3 text-center">
                      <p className="text-xs text-[#8888a0]">
                        Formula: Area = &frac12; &times; Base &times; Height
                      </p>
                    </div>
                  </>
                )}

                {shape === "circle" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                        Radius (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={circRadius}
                        onChange={(e) => setCircRadius(e.target.value)}
                        placeholder="e.g. 5"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-3 text-center">
                      <p className="text-xs text-[#8888a0]">
                        Formula: Area = &pi; &times; r&sup2;
                      </p>
                    </div>
                  </>
                )}

                {shape === "trapezoid" && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                        Side A / Top (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={trapA}
                        onChange={(e) => setTrapA(e.target.value)}
                        placeholder="e.g. 8"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                        Side B / Bottom (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={trapB}
                        onChange={(e) => setTrapB(e.target.value)}
                        placeholder="e.g. 12"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                        Height (ft)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="any"
                        value={trapHeight}
                        onChange={(e) => setTrapHeight(e.target.value)}
                        placeholder="e.g. 6"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                      />
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-3 text-center">
                      <p className="text-xs text-[#8888a0]">
                        Formula: Area = &frac12; &times; (A + B) &times; Height
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Area Results
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Square Feet
                    </div>
                    <div className="text-3xl font-bold text-white">
                      {fmt(conversions.sqFt)} sq ft
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Square Meters
                    </div>
                    <div className="text-2xl font-bold text-[#00e676]">
                      {fmt(conversions.sqM)} m&sup2;
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Acres
                      </div>
                      <div className="text-xl font-bold text-white">
                        {conversions.acres < 0.01
                          ? fmt(conversions.acres, 6)
                          : fmt(conversions.acres, 4)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Square Yards
                      </div>
                      <div className="text-xl font-bold text-white">
                        {fmt(conversions.sqYd)} yd&sup2;
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Common Sizes Reference */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h3 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                  Common Size Reference
                </h3>
                <div className="space-y-2 text-sm">
                  {[
                    { label: "Parking Space", size: "~162 sq ft" },
                    { label: "Small Bedroom", size: "~100 sq ft" },
                    { label: "1-Car Garage", size: "~200 sq ft" },
                    { label: "Average Living Room", size: "~330 sq ft" },
                    { label: "Tennis Court", size: "~2,808 sq ft" },
                  ].map((ref) => (
                    <div
                      key={ref.label}
                      className="flex justify-between py-1.5 border-b border-[#1e1e2e]/60 last:border-0"
                    >
                      <span className="text-[#c0c0d0]">{ref.label}</span>
                      <span className="text-[#9d90f5] font-medium">{ref.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="sqft-calculator-pro" />

          {/* How It Works */}
          <div className="mb-16 mt-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Pick a Shape",
                  description:
                    "Select the shape that best matches the area you need to measure: rectangle, triangle, circle, or trapezoid.",
                },
                {
                  step: "2",
                  title: "Enter Dimensions",
                  description:
                    "Input the relevant measurements in feet. Each shape requires different dimensions like length, width, radius, or height.",
                },
                {
                  step: "3",
                  title: "Get Area & Conversions",
                  description:
                    "See the calculated area in square feet, plus automatic conversions to square meters, acres, and square yards.",
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
                  title: "Mortgage Calculator",
                  description:
                    "Calculate monthly mortgage payments, total interest, and amortization schedules.",
                  href: "/tools/mortgage-calculator",
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
