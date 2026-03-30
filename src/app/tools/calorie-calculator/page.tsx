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
      <span className="text-[#f0f0f5]">Calorie Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const ACTIVITY_LEVELS = [
  {
    key: "sedentary",
    label: "Sedentary",
    description: "Little or no exercise, desk job",
    multiplier: 1.2,
  },
  {
    key: "lightly",
    label: "Lightly Active",
    description: "Light exercise 1-3 days/week",
    multiplier: 1.375,
  },
  {
    key: "moderately",
    label: "Moderately Active",
    description: "Moderate exercise 3-5 days/week",
    multiplier: 1.55,
  },
  {
    key: "very",
    label: "Very Active",
    description: "Hard exercise 6-7 days/week",
    multiplier: 1.725,
  },
  {
    key: "extra",
    label: "Extra Active",
    description: "Very hard exercise, physical job, or 2x/day training",
    multiplier: 1.9,
  },
];

const FAQ_DATA = [
  {
    question: "What is BMR and how is it calculated?",
    answer:
      "BMR (Basal Metabolic Rate) is the number of calories your body needs to maintain basic physiological functions at rest — breathing, circulation, cell production, etc. This calculator uses the Mifflin-St Jeor equation, which is widely considered the most accurate for most people. The formulas are: Men: BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) + 5. Women: BMR = (10 × weight kg) + (6.25 × height cm) − (5 × age) − 161.",
  },
  {
    question: "What is TDEE?",
    answer:
      "TDEE (Total Daily Energy Expenditure) is the total number of calories you burn in a day, accounting for your activity level. It is calculated by multiplying your BMR by an activity factor ranging from 1.2 (sedentary) to 1.9 (extra active). Your TDEE is your maintenance calorie level — eating at this level, your weight stays the same.",
  },
  {
    question: "How many calories should I eat to lose weight?",
    answer:
      "A deficit of 500 calories per day below TDEE is a common target that produces approximately 1 pound of fat loss per week (3,500 calorie deficit = ~1 lb). A 1,000 calorie daily deficit is more aggressive (~2 lbs/week) but may be difficult to sustain and can risk muscle loss. Most experts recommend no fewer than 1,200 calories/day for women and 1,500 for men. Always consult a healthcare professional for personalized guidance.",
  },
  {
    question: "What are macros and why do they matter?",
    answer:
      "Macros (macronutrients) are the three main categories of nutrients that provide calories: protein (4 cal/g), carbohydrates (4 cal/g), and fat (9 cal/g). Tracking macros helps ensure you get adequate protein for muscle retention, appropriate carbs for energy, and healthy fats for hormones and absorption. The macro split recommendations in this calculator are general guidelines — individual needs vary based on fitness goals, body composition, and health conditions.",
  },
  {
    question: "Is the Mifflin-St Jeor formula accurate for everyone?",
    answer:
      "The Mifflin-St Jeor equation is considered the most accurate BMR formula for most adults and is preferred by many registered dietitians. However, it was developed based on relatively homogeneous study populations and may be less accurate for people with very high or very low muscle mass, certain medical conditions, or at extremes of weight. Treat the result as a starting estimate and adjust based on real-world results over 2-4 weeks.",
  },
  {
    question: "How do I choose the right activity level?",
    answer:
      "Be honest and realistic. Most office workers should choose Sedentary or Lightly Active even if they work out a few times a week, because the majority of hours are spent sitting. People often overestimate their activity level, which leads to overeating. If you are losing weight more slowly than expected, try the next lower activity level. Common guideline: Sedentary = desk job, minimal exercise. Lightly Active = 1-3 workouts/week. Moderately Active = 3-5 workouts/week. Very Active = intense daily training. Extra Active = manual labor job + regular training.",
  },
  {
    question: "Can I use this calculator if I am trying to gain muscle?",
    answer:
      "Yes. For muscle gain (clean bulk), select the '+500 cal / Weight Gain' target. This surplus of ~500 calories per day above TDEE supports muscle growth while minimizing fat gain. Pair this with a high-protein diet (1.6-2.2g protein per kg of body weight) and progressive resistance training. If you gain fat too quickly, reduce the surplus to +250 calories.",
  },
  {
    question: "How often should I recalculate my calories?",
    answer:
      "Recalculate whenever your weight changes by 5+ lbs, you significantly change your activity level, or you hit a plateau. As you lose weight, your TDEE decreases, so you may need to reduce calories to continue progressing. Recalculating every 4-6 weeks during an active weight loss phase is a good habit.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function CalorieCalculatorPage() {
  const [unitSystem, setUnitSystem] = useState<"imperial" | "metric">("imperial");
  const [gender, setGender] = useState<"male" | "female">("male");
  const [age, setAge] = useState("");

  // Imperial
  const [weightLbs, setWeightLbs] = useState("");
  const [heightFt, setHeightFt] = useState("");
  const [heightIn, setHeightIn] = useState("");

  // Metric
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");

  const [activityLevel, setActivityLevel] = useState("sedentary");

  const results = useMemo(() => {
    const ageNum = parseFloat(age) || 0;
    if (ageNum <= 0) return null;

    let weightKgVal = 0;
    let heightCmVal = 0;

    if (unitSystem === "imperial") {
      weightKgVal = (parseFloat(weightLbs) || 0) * 0.453592;
      const ft = parseFloat(heightFt) || 0;
      const inches = parseFloat(heightIn) || 0;
      heightCmVal = (ft * 12 + inches) * 2.54;
    } else {
      weightKgVal = parseFloat(weightKg) || 0;
      heightCmVal = parseFloat(heightCm) || 0;
    }

    if (weightKgVal <= 0 || heightCmVal <= 0) return null;

    // Mifflin-St Jeor
    let bmr: number;
    if (gender === "male") {
      bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * ageNum + 5;
    } else {
      bmr = 10 * weightKgVal + 6.25 * heightCmVal - 5 * ageNum - 161;
    }

    const activity = ACTIVITY_LEVELS.find((a) => a.key === activityLevel);
    const multiplier = activity?.multiplier ?? 1.2;
    const tdee = bmr * multiplier;

    const goals = [
      {
        label: "Aggressive Weight Loss",
        description: "~2 lbs/week loss",
        calories: Math.round(tdee - 1000),
        color: "#ff5252",
        protein: Math.round(weightKgVal * 2.0),
        carbRatio: 0.35,
        fatRatio: 0.25,
      },
      {
        label: "Weight Loss",
        description: "~1 lb/week loss",
        calories: Math.round(tdee - 500),
        color: "#ff9f43",
        protein: Math.round(weightKgVal * 2.0),
        carbRatio: 0.4,
        fatRatio: 0.3,
      },
      {
        label: "Maintenance",
        description: "Maintain current weight",
        calories: Math.round(tdee),
        color: "#00e676",
        protein: Math.round(weightKgVal * 1.8),
        carbRatio: 0.45,
        fatRatio: 0.3,
      },
      {
        label: "Weight Gain",
        description: "~1 lb/week gain",
        calories: Math.round(tdee + 500),
        color: "#7c6cf0",
        protein: Math.round(weightKgVal * 2.2),
        carbRatio: 0.5,
        fatRatio: 0.25,
      },
    ].map((g) => {
      const proteinCals = g.protein * 4;
      const fatCals = g.calories * g.fatRatio;
      const carbCals = g.calories - proteinCals - fatCals;
      return {
        ...g,
        proteinG: g.protein,
        fatG: Math.round(fatCals / 9),
        carbG: Math.round(Math.max(carbCals, 0) / 4),
      };
    });

    return { bmr: Math.round(bmr), tdee: Math.round(tdee), goals };
  }, [
    unitSystem,
    gender,
    age,
    weightLbs,
    heightFt,
    heightIn,
    weightKg,
    heightCm,
    activityLevel,
  ]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Calorie Calculator",
    description:
      "Calculate BMR and TDEE using the Mifflin-St Jeor formula. Get daily calorie targets for weight loss, maintenance, and weight gain with macro breakdowns.",
    url: "https://prestokit.com/tools/calorie-calculator",
    applicationCategory: "HealthApplication",
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
        <PromoBar type="pro" dismissKey="calorie-calculator-pro" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Calorie{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate your BMR and TDEE using the Mifflin-St Jeor formula. Get
              daily calorie targets and macro breakdowns for weight loss,
              maintenance, or weight gain.
            </p>
          </div>

          {/* Input Section */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            {/* Unit + Gender Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              {/* Unit Toggle */}
              <div>
                <label className="block text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                  Units
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setUnitSystem("imperial")}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      unitSystem === "imperial"
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    Imperial
                  </button>
                  <button
                    onClick={() => setUnitSystem("metric")}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      unitSystem === "metric"
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    Metric
                  </button>
                </div>
              </div>

              {/* Gender Toggle */}
              <div>
                <label className="block text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                  Gender
                </label>
                <div className="flex gap-2">
                  <button
                    onClick={() => setGender("male")}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      gender === "male"
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    Male
                  </button>
                  <button
                    onClick={() => setGender("female")}
                    className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                      gender === "female"
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>

            {/* Age, Weight, Height */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Age */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Age
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min="1"
                    max="120"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                    placeholder="e.g. 30"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-16"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                    years
                  </span>
                </div>
              </div>

              {/* Weight */}
              {unitSystem === "imperial" ? (
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Weight
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      min="0"
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
              ) : (
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Weight
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      min="0"
                      value={weightKg}
                      onChange={(e) => setWeightKg(e.target.value)}
                      placeholder="e.g. 77"
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-10"
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                      kg
                    </span>
                  </div>
                </div>
              )}

              {/* Height */}
              {unitSystem === "imperial" ? (
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Height
                  </label>
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        value={heightFt}
                        onChange={(e) => setHeightFt(e.target.value)}
                        placeholder="5"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-9"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                        ft
                      </span>
                    </div>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        step="1"
                        min="0"
                        max="11"
                        value={heightIn}
                        onChange={(e) => setHeightIn(e.target.value)}
                        placeholder="10"
                        className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors pr-9"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
                        in
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Height
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      min="0"
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
              )}
            </div>

            {/* Activity Level */}
            <div>
              <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                Activity Level
              </label>
              <div className="space-y-2">
                {ACTIVITY_LEVELS.map((level) => (
                  <button
                    key={level.key}
                    onClick={() => setActivityLevel(level.key)}
                    className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-left transition-all ${
                      activityLevel === level.key
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                        : "border-[#1e1e2e] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    <div>
                      <span
                        className={`text-sm font-medium ${
                          activityLevel === level.key
                            ? "text-[#9d90f5]"
                            : "text-[#c0c0d0]"
                        }`}
                      >
                        {level.label}
                      </span>
                      <span className="text-xs text-[#555566] ml-2">
                        {level.description}
                      </span>
                    </div>
                    <span className="text-xs text-[#555566]">
                      ×{level.multiplier}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {results && (
            <>
              {/* BMR + TDEE Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    BMR (Basal Metabolic Rate)
                  </div>
                  <div className="text-4xl font-bold text-white mb-1">
                    {results.bmr.toLocaleString()}
                  </div>
                  <div className="text-sm text-[#555566]">calories/day at rest</div>
                  <div className="text-xs text-[#444455] mt-2">
                    Mifflin-St Jeor formula
                  </div>
                </div>
                <div className="rounded-2xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 backdrop-blur-sm p-6 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    TDEE (Maintenance Calories)
                  </div>
                  <div className="text-4xl font-bold text-[#9d90f5] mb-1">
                    {results.tdee.toLocaleString()}
                  </div>
                  <div className="text-sm text-[#555566]">calories/day</div>
                  <div className="text-xs text-[#444455] mt-2">
                    BMR × activity multiplier
                  </div>
                </div>
              </div>

              {/* Calorie Goals with Macros */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
                <h2 className="text-lg font-semibold text-white mb-6">
                  Calorie Targets & Macro Breakdown
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {results.goals.map((goal) => (
                    <div
                      key={goal.label}
                      className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <div className="font-semibold text-white text-sm">
                            {goal.label}
                          </div>
                          <div className="text-xs text-[#555566]">
                            {goal.description}
                          </div>
                        </div>
                        <div
                          className="text-2xl font-bold"
                          style={{ color: goal.color }}
                        >
                          {goal.calories.toLocaleString()}
                        </div>
                      </div>
                      <div className="text-xs text-[#555566] mb-2">
                        cal/day
                      </div>
                      {/* Macro bar */}
                      <div className="w-full h-3 rounded-full overflow-hidden flex mb-3">
                        {(() => {
                          const total = goal.calories || 1;
                          const pCal = goal.proteinG * 4;
                          const fCal = goal.fatG * 9;
                          const cCal = goal.carbG * 4;
                          const sum = pCal + fCal + cCal || 1;
                          return (
                            <>
                              <div
                                className="h-full"
                                style={{
                                  width: `${(pCal / sum) * 100}%`,
                                  background: "#00e676",
                                }}
                              />
                              <div
                                className="h-full"
                                style={{
                                  width: `${(cCal / sum) * 100}%`,
                                  background: "#7c6cf0",
                                }}
                              />
                              <div
                                className="h-full"
                                style={{
                                  width: `${(fCal / sum) * 100}%`,
                                  background: "#ff9f43",
                                }}
                              />
                            </>
                          );
                        })()}
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-xs text-center">
                        <div>
                          <div className="text-[#00e676] font-semibold">
                            {goal.proteinG}g
                          </div>
                          <div className="text-[#555566]">Protein</div>
                        </div>
                        <div>
                          <div className="text-[#7c6cf0] font-semibold">
                            {goal.carbG}g
                          </div>
                          <div className="text-[#555566]">Carbs</div>
                        </div>
                        <div>
                          <div className="text-[#ff9f43] font-semibold">
                            {goal.fatG}g
                          </div>
                          <div className="text-[#555566]">Fat</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/5 p-4">
                  <p className="text-xs text-[#a0a0b8]">
                    <span className="text-amber-400 font-semibold">Note: </span>
                    Macro recommendations are general estimates. Protein is set at
                    2.0-2.2g/kg body weight to support muscle. Consult a registered
                    dietitian for a personalized nutrition plan.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Medical Disclaimer */}
          <div className="rounded-2xl border border-amber-500/30 bg-amber-500/5 p-6 mb-10">
            <div className="flex gap-3">
              <svg
                className="w-6 h-6 shrink-0 text-amber-400 mt-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
              <div>
                <h3 className="text-amber-400 font-semibold text-sm mb-1">
                  Medical Disclaimer
                </h3>
                <p className="text-sm text-[#a0a0b8] leading-relaxed">
                  This calculator provides general estimates for informational
                  purposes only. Results are not a substitute for professional
                  medical or nutritional advice. Always consult a qualified
                  healthcare provider before making significant changes to your
                  diet or exercise routine, especially if you have any medical
                  conditions.
                </p>
              </div>
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
                  title: "Enter Your Stats",
                  description:
                    "Provide your age, gender, height, and weight. Toggle between imperial (lbs/ft/in) and metric (kg/cm) units.",
                },
                {
                  step: "2",
                  title: "Select Activity Level",
                  description:
                    "Choose the activity level that best matches your typical weekly routine. Be honest — most people overestimate.",
                },
                {
                  step: "3",
                  title: "Get Your Targets",
                  description:
                    "See your BMR, TDEE (maintenance calories), and personalized calorie and macro targets for every goal.",
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
                  title: "BMI Calculator",
                  description:
                    "Calculate your Body Mass Index and see your weight category on the BMI scale.",
                  href: "/tools/bmi-calculator",
                },
                {
                  title: "Percentage Calculator",
                  description:
                    "Calculate any percentage, percentage change, or percentage of a number instantly.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Age Calculator",
                  description:
                    "Calculate your exact age in years, months, and days from any date.",
                  href: "/tools/age-calculator",
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
