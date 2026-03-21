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
      <span className="text-[#f0f0f5]">BMI Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const BMI_CATEGORIES = [
  { label: "Underweight", range: "< 18.5", min: 0, max: 18.5, color: "#3b82f6", bgColor: "bg-blue-500" },
  { label: "Normal", range: "18.5 - 24.9", min: 18.5, max: 25, color: "#00e676", bgColor: "bg-[#00e676]" },
  { label: "Overweight", range: "25 - 29.9", min: 25, max: 30, color: "#f59e0b", bgColor: "bg-amber-500" },
  { label: "Obese", range: "30+", min: 30, max: 100, color: "#ef4444", bgColor: "bg-red-500" },
];

const FAQ_DATA = [
  {
    question: "What is BMI and how is it calculated?",
    answer:
      "Body Mass Index (BMI) is a numerical value calculated from your height and weight. The formula is: BMI = weight (kg) / height (m)^2. In imperial units: BMI = (weight in lbs x 703) / (height in inches)^2. It provides a quick screening measure for weight categories.",
  },
  {
    question: "What is a healthy BMI range?",
    answer:
      "A BMI between 18.5 and 24.9 is generally considered a healthy (normal) weight. Below 18.5 is underweight, 25 to 29.9 is overweight, and 30 or above is classified as obese. However, BMI does not account for muscle mass, bone density, or body composition.",
  },
  {
    question: "Is BMI accurate for everyone?",
    answer:
      "BMI is a useful screening tool for the general population, but it has limitations. It may overestimate body fat in athletes and muscular individuals, and underestimate it in older adults or those who have lost muscle. It does not differentiate between fat, muscle, and bone mass.",
  },
  {
    question: "Does BMI differ for men and women?",
    answer:
      "The BMI formula and categories are the same for adult men and women. However, women naturally tend to have more body fat than men at the same BMI. For a more complete picture of health, consider additional measurements like waist circumference or body fat percentage.",
  },
  {
    question: "How does BMI apply to children and teens?",
    answer:
      "For children and teens (ages 2-20), BMI is calculated the same way but interpreted using age-and-sex-specific percentiles. A child's BMI percentile shows how their BMI compares to others of the same age and sex. This calculator is designed for adults aged 20 and over.",
  },
  {
    question: "Is this BMI calculator free to use?",
    answer:
      "Yes, completely free with no signup required. All calculations happen instantly in your browser. No personal data is stored or sent to any server. Use it as a quick screening tool and consult a healthcare professional for personalized advice.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function getBMICategory(bmi: number): typeof BMI_CATEGORIES[number] | null {
  if (bmi <= 0) return null;
  if (bmi < 18.5) return BMI_CATEGORIES[0];
  if (bmi < 25) return BMI_CATEGORIES[1];
  if (bmi < 30) return BMI_CATEGORIES[2];
  return BMI_CATEGORIES[3];
}

/* ------------------------------------------------------------------ */
/*  BMI Scale Visual                                                   */
/* ------------------------------------------------------------------ */

function BMIScale({ bmi }: { bmi: number }) {
  // Scale from 10 to 45
  const minScale = 10;
  const maxScale = 45;
  const clampedBMI = Math.min(Math.max(bmi, minScale), maxScale);
  const position = ((clampedBMI - minScale) / (maxScale - minScale)) * 100;

  return (
    <div className="mt-6">
      <div className="text-xs text-[#8888a0] mb-3">BMI Scale</div>
      <div className="relative">
        {/* Scale bar */}
        <div className="w-full h-6 rounded-full overflow-hidden flex">
          <div className="h-full bg-blue-500" style={{ width: "24.3%" }} />
          <div className="h-full bg-[#00e676]" style={{ width: "18.6%" }} />
          <div className="h-full bg-amber-500" style={{ width: "14.3%" }} />
          <div className="h-full bg-red-500" style={{ width: "42.8%" }} />
        </div>
        {/* Pointer */}
        {bmi > 0 && (
          <div
            className="absolute top-0 -mt-1 transition-all duration-500"
            style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          >
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-white" />
            <div className="w-1 h-8 bg-white mx-auto" />
            <div className="text-xs font-bold text-white text-center mt-1 whitespace-nowrap">
              {bmi.toFixed(1)}
            </div>
          </div>
        )}
        {/* Labels */}
        <div className="flex justify-between text-[10px] text-[#555566] mt-10">
          <span>10</span>
          <span>18.5</span>
          <span>25</span>
          <span>30</span>
          <span>45</span>
        </div>
      </div>
      {/* Category labels */}
      <div className="flex mt-2 text-xs">
        <div className="text-blue-400" style={{ width: "24.3%" }}>Underweight</div>
        <div className="text-[#00e676]" style={{ width: "18.6%" }}>Normal</div>
        <div className="text-amber-400" style={{ width: "14.3%" }}>Overweight</div>
        <div className="text-red-400" style={{ width: "42.8%" }}>Obese</div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function BMICalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");

  // Imperial inputs
  const [weightLbs, setWeightLbs] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  // Metric inputs
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");

  const result = useMemo(() => {
    let bmi = 0;
    let heightMeters = 0;

    if (unitSystem === "imperial") {
      const lbs = parseNum(weightLbs);
      const ft = parseNum(heightFt);
      const inches = parseNum(heightIn);
      const totalInches = ft * 12 + inches;
      if (lbs <= 0 || totalInches <= 0) return null;
      bmi = (lbs * 703) / (totalInches * totalInches);
      heightMeters = totalInches * 0.0254;
    } else {
      const kg = parseNum(weightKg);
      const cm = parseNum(heightCm);
      if (kg <= 0 || cm <= 0) return null;
      heightMeters = cm / 100;
      bmi = kg / (heightMeters * heightMeters);
    }

    const category = getBMICategory(bmi);

    // Healthy weight range for their height (BMI 18.5 - 24.9)
    const healthyMinKg = 18.5 * (heightMeters * heightMeters);
    const healthyMaxKg = 24.9 * (heightMeters * heightMeters);
    const healthyMinLbs = healthyMinKg * 2.20462;
    const healthyMaxLbs = healthyMaxKg * 2.20462;

    return {
      bmi,
      category,
      healthyMinKg,
      healthyMaxKg,
      healthyMinLbs,
      healthyMaxLbs,
    };
  }, [unitSystem, weightLbs, heightFt, heightIn, weightKg, heightCm]);

  const sectionClasses =
    "rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8";

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
              BMI{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate your Body Mass Index instantly. Toggle between imperial
              and metric units and see where you fall on the BMI scale.
            </p>
          </div>

          {/* Input Section */}
          <div className={sectionClasses}>
            {/* Unit Toggle */}
            <div className="flex gap-2 mb-6">
              <button
                onClick={() => setUnitSystem("imperial")}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  unitSystem === "imperial"
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                    : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                }`}
              >
                Imperial (lbs / ft, in)
              </button>
              <button
                onClick={() => setUnitSystem("metric")}
                className={`flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                  unitSystem === "metric"
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                    : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                }`}
              >
                Metric (kg / cm)
              </button>
            </div>

            {unitSystem === "imperial" ? (
              <div className="space-y-6">
                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Weight
                  </label>
                  <div className="relative max-w-xs">
                    <input
                      type="number"
                      step="any"
                      value={weightLbs}
                      onChange={(e) => setWeightLbs(e.target.value)}
                      placeholder="e.g. 170"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                      lbs
                    </span>
                  </div>
                </div>
                {/* Height */}
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Height
                  </label>
                  <div className="flex gap-3 max-w-xs">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="1"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="5"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                        ft
                      </span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="1"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="10"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-10"
                      />
                      <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                        in
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Weight */}
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Weight
                  </label>
                  <div className="relative max-w-xs">
                    <input
                      type="number"
                      step="any"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="e.g. 77"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                      kg
                    </span>
                  </div>
                </div>
                {/* Height */}
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Height
                  </label>
                  <div className="relative max-w-xs">
                    <input
                      type="number"
                      step="any"
                      value={heightCm}
                      onChange={(e) => setHeightCm(e.target.value)}
                      placeholder="e.g. 178"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-12"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                      cm
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Results */}
          {result && (
            <>
              {/* BMI Result Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Your BMI
                  </div>
                  <div
                    className="text-4xl font-bold"
                    style={{ color: result.category?.color || "#fff" }}
                  >
                    {result.bmi.toFixed(1)}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Category
                  </div>
                  <div
                    className="text-2xl font-bold"
                    style={{ color: result.category?.color || "#fff" }}
                  >
                    {result.category?.label || "--"}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-6 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Healthy Weight Range
                  </div>
                  <div className="text-xl font-bold text-[#00e676]">
                    {unitSystem === "imperial"
                      ? `${Math.round(result.healthyMinLbs)} - ${Math.round(result.healthyMaxLbs)} lbs`
                      : `${result.healthyMinKg.toFixed(1)} - ${result.healthyMaxKg.toFixed(1)} kg`}
                  </div>
                </div>
              </div>

              {/* BMI Scale */}
              <div className={`${sectionClasses} mt-8`}>
                <BMIScale bmi={result.bmi} />
              </div>
            </>
          )}

          {/* BMI Categories Table */}
          <div className={`${sectionClasses} mt-8`}>
            <h2 className="text-lg font-semibold text-white mb-4">
              BMI Categories
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Category</th>
                    <th className="text-left text-[#8888a0] font-medium pb-3 px-4">BMI Range</th>
                    <th className="text-left text-[#8888a0] font-medium pb-3 pl-4 w-1/3">Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {BMI_CATEGORIES.map((cat) => {
                    const isActive = result && result.category?.label === cat.label;
                    return (
                      <tr
                        key={cat.label}
                        className={`border-b border-[#1e1e2e]/60 ${
                          isActive ? "bg-white/5" : ""
                        }`}
                      >
                        <td className="py-3 pr-4">
                          <span
                            className="font-semibold"
                            style={{ color: cat.color }}
                          >
                            {cat.label}
                            {isActive && (
                              <span className="ml-2 text-xs text-[#8888a0]">
                                (You)
                              </span>
                            )}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-[#c0c0d0]">{cat.range}</td>
                        <td className="py-3 pl-4">
                          <div className="w-full h-3 rounded-full bg-[#0a0a0f] overflow-hidden">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{
                                width: isActive ? "100%" : "60%",
                                backgroundColor: cat.color,
                                opacity: isActive ? 1 : 0.4,
                              }}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 mt-8">
            <div className="flex gap-3">
              <svg className="w-6 h-6 shrink-0 text-amber-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
              <div>
                <h3 className="text-amber-400 font-semibold text-sm mb-1">Medical Disclaimer</h3>
                <p className="text-sm text-[#a0a0b8] leading-relaxed">
                  BMI is a screening tool, not a diagnostic measure. It does not
                  account for muscle mass, bone density, body composition, age, or
                  sex differences. For a complete health assessment, consult a
                  qualified healthcare professional. This tool is for informational
                  purposes only.
                </p>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose Units",
                  description:
                    "Select imperial (lbs, feet/inches) or metric (kg, cm). Toggle any time -- your inputs will stay separate for each system.",
                },
                {
                  step: "2",
                  title: "Enter Height & Weight",
                  description:
                    "Type in your current weight and height. Your BMI is calculated instantly in real time as you type.",
                },
                {
                  step: "3",
                  title: "View Your Results",
                  description:
                    "See your BMI number, category, healthy weight range for your height, and a visual scale showing exactly where you fall.",
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
                  title: "Percentage Calculator",
                  description: "Calculate percentages, percentage change, increase and decrease.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Salary Calculator",
                  description: "Convert between salary, hourly, and other pay rates.",
                  href: "/tools/salary-calculator",
                },
                {
                  title: "Mortgage Calculator",
                  description: "Calculate monthly mortgage payments and amortization.",
                  href: "/tools/mortgage-calculator",
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
