"use client";

import { useState, useMemo } from "react";
import PromoBar from "@/components/PromoBar";

/* ------------------------------------------------------------------ */
/*  Math Helpers                                                       */
/* ------------------------------------------------------------------ */

function gcd(a: number, b: number): number {
  a = Math.abs(Math.round(a));
  b = Math.abs(Math.round(b));
  while (b !== 0) {
    const t = b;
    b = a % b;
    a = t;
  }
  return a === 0 ? 1 : a;
}

function lcm(a: number, b: number): number {
  return Math.abs(a * b) / gcd(a, b);
}

function simplify(num: number, den: number): [number, number] {
  if (den === 0) return [num, den];
  const g = gcd(Math.abs(num), Math.abs(den));
  let n = num / g;
  let d = den / g;
  if (d < 0) {
    n = -n;
    d = -d;
  }
  return [n, d];
}

function decimalToFraction(decimal: string): { num: number; den: number; simplified: [number, number] } | null {
  const val = parseFloat(decimal);
  if (isNaN(val)) return null;
  const sign = val < 0 ? -1 : 1;
  const abs = Math.abs(val);
  const decStr = decimal.replace("-", "").replace(",", ".");
  const dotIdx = decStr.indexOf(".");
  if (dotIdx === -1) return { num: Math.round(val), den: 1, simplified: [Math.round(val), 1] };
  const decimals = decStr.length - dotIdx - 1;
  const den = Math.pow(10, decimals);
  const num = sign * Math.round(abs * den);
  const simp = simplify(num, den);
  return { num, den, simplified: simp };
}

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
      <span className="text-[#f0f0f5]">Fraction Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Fraction Input Component                                           */
/* ------------------------------------------------------------------ */

function FractionInput({
  label,
  num,
  den,
  onNumChange,
  onDenChange,
}: {
  label: string;
  num: string;
  den: string;
  onNumChange: (v: string) => void;
  onDenChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="text-xs text-[#8888a0] mb-1">{label}</div>
      <input
        type="number"
        value={num}
        onChange={(e) => onNumChange(e.target.value)}
        placeholder="num"
        className="w-20 text-center rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2 px-2 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
      />
      <div className="w-20 h-px bg-[#7c6cf0]" />
      <input
        type="number"
        value={den}
        onChange={(e) => onDenChange(e.target.value)}
        placeholder="den"
        className="w-20 text-center rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-2 px-2 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How do you add fractions?",
    answer:
      "To add fractions, you need a common denominator. Find the Least Common Denominator (LCD) of both fractions, convert each fraction to an equivalent fraction with that denominator, then add the numerators. For example: 1/3 + 1/4. LCD = 12. Convert: 4/12 + 3/12 = 7/12. If the denominators are already the same, just add the numerators directly.",
  },
  {
    question: "How do you subtract fractions?",
    answer:
      "Subtracting fractions follows the same process as addition. Find the LCD, convert both fractions to that denominator, then subtract the second numerator from the first. Example: 3/4 − 1/3. LCD = 12. Convert: 9/12 − 4/12 = 5/12. Always simplify the result if possible.",
  },
  {
    question: "How do you multiply fractions?",
    answer:
      "Multiplying fractions is straightforward: multiply the numerators together and multiply the denominators together. Example: 2/3 × 3/4 = (2×3)/(3×4) = 6/12 = 1/2. You can simplify before or after multiplying. Cross-simplification (canceling common factors between numerators and denominators of different fractions before multiplying) can make the arithmetic easier.",
  },
  {
    question: "How do you divide fractions?",
    answer:
      "To divide fractions, multiply the first fraction by the reciprocal (flip) of the second fraction. This is often remembered as 'keep, change, flip' — keep the first fraction, change the operation to multiplication, flip the second fraction. Example: 2/3 ÷ 4/5 = 2/3 × 5/4 = 10/12 = 5/6.",
  },
  {
    question: "How do you simplify a fraction?",
    answer:
      "To simplify (reduce) a fraction, find the Greatest Common Divisor (GCD) of the numerator and denominator, then divide both by that number. Example: 12/18. GCD(12, 18) = 6. 12/6 = 2, 18/6 = 3. Simplified: 2/3. A fraction is fully simplified (in lowest terms) when the GCD of the numerator and denominator is 1.",
  },
  {
    question: "How do you convert a decimal to a fraction?",
    answer:
      "To convert a decimal to a fraction: (1) Count the decimal places. (2) Write the decimal digits as the numerator. (3) Use 10, 100, 1000, etc. (based on decimal places) as the denominator. (4) Simplify. Example: 0.75 = 75/100. GCD(75, 100) = 25. Simplified: 3/4. For repeating decimals, the process is more complex and involves algebra.",
  },
  {
    question: "What is an improper fraction?",
    answer:
      "An improper fraction is one where the numerator is greater than or equal to the denominator — for example, 7/4 or 5/5. Improper fractions are perfectly valid and are often easier to work with in calculations. They can be converted to mixed numbers: 7/4 = 1 and 3/4 (one whole and three quarters). This calculator always returns results as improper fractions when the result is greater than 1, with the decimal equivalent shown as well.",
  },
  {
    question: "Is this fraction calculator free?",
    answer:
      "Yes — completely free, no account required. All calculations happen instantly in your browser with full step-by-step solutions shown. No data is stored or sent anywhere. Bookmark it for quick fraction math whenever you need it.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

type Operation = "add" | "subtract" | "multiply" | "divide";
type ToolMode = "operations" | "simplify" | "decimal-to-fraction";

export default function FractionCalculatorPage() {
  const [toolMode, setToolMode] = useState<ToolMode>("operations");

  // Operations mode
  const [op, setOp] = useState<Operation>("add");
  const [n1, setN1] = useState("");
  const [d1, setD1] = useState("");
  const [n2, setN2] = useState("");
  const [d2, setD2] = useState("");

  // Simplify mode
  const [simpN, setSimpN] = useState("");
  const [simpD, setSimpD] = useState("");

  // Decimal to fraction mode
  const [decInput, setDecInput] = useState("");

  /* ---- Operations Result ---- */
  const operationResult = useMemo(() => {
    const num1 = parseInt(n1) || 0;
    const den1 = parseInt(d1) || 0;
    const num2 = parseInt(n2) || 0;
    const den2 = parseInt(d2) || 0;

    if (den1 === 0 || den2 === 0) return null;

    let resNum = 0;
    let resDen = 1;
    const steps: string[] = [];

    if (op === "add" || op === "subtract") {
      const commonDen = lcm(den1, den2);
      const adjNum1 = num1 * (commonDen / den1);
      const adjNum2 = num2 * (commonDen / den2);
      steps.push(
        `Find LCD of ${den1} and ${den2}: LCD = ${commonDen}`
      );
      steps.push(
        `Convert fractions: ${num1}/${den1} = ${adjNum1}/${commonDen}, ${num2}/${den2} = ${adjNum2}/${commonDen}`
      );
      if (op === "add") {
        resNum = adjNum1 + adjNum2;
        steps.push(`Add numerators: ${adjNum1} + ${adjNum2} = ${resNum}`);
      } else {
        resNum = adjNum1 - adjNum2;
        steps.push(`Subtract numerators: ${adjNum1} − ${adjNum2} = ${resNum}`);
      }
      resDen = commonDen;
      steps.push(`Result before simplifying: ${resNum}/${resDen}`);
    } else if (op === "multiply") {
      steps.push(`Multiply numerators: ${num1} × ${num2} = ${num1 * num2}`);
      steps.push(`Multiply denominators: ${den1} × ${den2} = ${den1 * den2}`);
      resNum = num1 * num2;
      resDen = den1 * den2;
      steps.push(`Result before simplifying: ${resNum}/${resDen}`);
    } else if (op === "divide") {
      steps.push(
        `Flip the second fraction (reciprocal): ${num2}/${den2} becomes ${den2}/${num2}`
      );
      steps.push(
        `Now multiply: ${num1}/${den1} × ${den2}/${num2}`
      );
      steps.push(`Multiply numerators: ${num1} × ${den2} = ${num1 * den2}`);
      steps.push(`Multiply denominators: ${den1} × ${num2} = ${den1 * num2}`);
      resNum = num1 * den2;
      resDen = den1 * num2;
      steps.push(`Result before simplifying: ${resNum}/${resDen}`);
    }

    const g = gcd(Math.abs(resNum), Math.abs(resDen));
    const [simpNum, simpDen] = simplify(resNum, resDen);
    if (g > 1) {
      steps.push(
        `Simplify: GCD(${Math.abs(resNum)}, ${Math.abs(resDen)}) = ${g} → ${simpNum}/${simpDen}`
      );
    } else {
      steps.push(`Already in simplest form: ${simpNum}/${simpDen}`);
    }

    const decimal = resDen !== 0 ? resNum / resDen : NaN;

    return { num: simpNum, den: simpDen, decimal, steps };
  }, [op, n1, d1, n2, d2]);

  /* ---- Simplify Result ---- */
  const simplifyResult = useMemo(() => {
    const num = parseInt(simpN) || 0;
    const den = parseInt(simpD) || 0;
    if (den === 0) return null;
    const g = gcd(Math.abs(num), Math.abs(den));
    const [sn, sd] = simplify(num, den);
    const decimal = num / den;
    const steps: string[] = [
      `Find GCD(${Math.abs(num)}, ${Math.abs(den)}) = ${g}`,
      `Divide both by ${g}: ${num}/${g} = ${sn}, ${den}/${g} = ${sd}`,
      `Simplified: ${sn}/${sd}`,
    ];
    return { num: sn, den: sd, decimal, steps, alreadySimplified: g === 1 };
  }, [simpN, simpD]);

  /* ---- Decimal to Fraction Result ---- */
  const d2fResult = useMemo(() => {
    return decimalToFraction(decInput);
  }, [decInput]);

  const opSymbol: Record<Operation, string> = {
    add: "+",
    subtract: "−",
    multiply: "×",
    divide: "÷",
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Fraction Calculator",
    description:
      "Add, subtract, multiply, and divide fractions with step-by-step solutions. Also simplify fractions and convert decimals to fractions.",
    url: "https://prestokit.com/tools/fraction-calculator",
    applicationCategory: "EducationApplication",
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
        <PromoBar type="pro" dismissKey="fraction-calculator-pro" />
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Fraction{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Add, subtract, multiply, and divide fractions with step-by-step
              solutions. Also simplify fractions and convert decimals to fractions.
            </p>
          </div>

          {/* Tool Mode Tabs */}
          <div className="flex gap-2 mb-6 flex-wrap">
            {(
              [
                { key: "operations", label: "Fraction Operations" },
                { key: "simplify", label: "Simplify Fraction" },
                { key: "decimal-to-fraction", label: "Decimal to Fraction" },
              ] as { key: ToolMode; label: string }[]
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setToolMode(tab.key)}
                className={`rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                  toolMode === tab.key
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                    : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ---- OPERATIONS MODE ---- */}
          {toolMode === "operations" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Input */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                {/* Operation Selector */}
                <div className="mb-6">
                  <label className="block text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Operation
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["add", "subtract", "multiply", "divide"] as Operation[]).map(
                      (o) => (
                        <button
                          key={o}
                          onClick={() => setOp(o)}
                          className={`rounded-xl border py-2.5 text-lg font-bold transition-all ${
                            op === o
                              ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                              : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                          }`}
                        >
                          {opSymbol[o]}
                        </button>
                      )
                    )}
                  </div>
                  <div className="text-center mt-2 text-xs text-[#555566]">
                    {op === "add" && "Addition"}
                    {op === "subtract" && "Subtraction"}
                    {op === "multiply" && "Multiplication"}
                    {op === "divide" && "Division"}
                  </div>
                </div>

                {/* Fraction Inputs */}
                <div className="flex items-center justify-center gap-4 flex-wrap">
                  <FractionInput
                    label="First Fraction"
                    num={n1}
                    den={d1}
                    onNumChange={setN1}
                    onDenChange={setD1}
                  />
                  <div className="text-3xl font-bold text-[#7c6cf0] mt-4">
                    {opSymbol[op]}
                  </div>
                  <FractionInput
                    label="Second Fraction"
                    num={n2}
                    den={d2}
                    onNumChange={setN2}
                    onDenChange={setD2}
                  />
                </div>

                {/* Expression preview */}
                {n1 && d1 && n2 && d2 && parseInt(d1) !== 0 && parseInt(d2) !== 0 && (
                  <div className="mt-4 text-center text-sm text-[#8888a0]">
                    {n1}/{d1} {opSymbol[op]} {n2}/{d2}
                  </div>
                )}
              </div>

              {/* Result */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">Result</h2>
                {operationResult ? (
                  <div className="space-y-4">
                    {/* Main result */}
                    <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5 text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                        Answer (Simplified)
                      </div>
                      <div className="flex flex-col items-center gap-1 mb-2">
                        <span className="text-4xl font-bold text-white">
                          {operationResult.num}
                        </span>
                        <div className="w-16 h-0.5 bg-[#7c6cf0]" />
                        <span className="text-4xl font-bold text-white">
                          {operationResult.den}
                        </span>
                      </div>
                      <div className="text-sm text-[#9d90f5] mt-2">
                        = {isFinite(operationResult.decimal)
                          ? operationResult.decimal.toFixed(6).replace(/\.?0+$/, "")
                          : "undefined"}
                      </div>
                    </div>

                    {/* Step by step */}
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                        Step-by-Step Solution
                      </div>
                      <ol className="space-y-2">
                        {operationResult.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] text-xs flex items-center justify-center font-bold">
                              {i + 1}
                            </span>
                            <span className="text-[#c0c0d0] leading-relaxed">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48">
                    <p className="text-[#555566] text-sm text-center">
                      Enter two fractions above to see the result
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---- SIMPLIFY MODE ---- */}
          {toolMode === "simplify" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Enter a Fraction to Simplify
                </h2>
                <div className="flex flex-col items-center gap-1">
                  <input
                    type="number"
                    value={simpN}
                    onChange={(e) => setSimpN(e.target.value)}
                    placeholder="Numerator"
                    className="w-40 text-center rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  <div className="w-40 h-0.5 bg-[#7c6cf0] my-2" />
                  <input
                    type="number"
                    value={simpD}
                    onChange={(e) => setSimpD(e.target.value)}
                    placeholder="Denominator"
                    className="w-40 text-center rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">Result</h2>
                {simplifyResult ? (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5 text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                        {simplifyResult.alreadySimplified
                          ? "Already in Simplest Form"
                          : "Simplified Fraction"}
                      </div>
                      <div className="flex flex-col items-center gap-1 mb-2">
                        <span className="text-4xl font-bold text-white">
                          {simplifyResult.num}
                        </span>
                        <div className="w-16 h-0.5 bg-[#7c6cf0]" />
                        <span className="text-4xl font-bold text-white">
                          {simplifyResult.den}
                        </span>
                      </div>
                      <div className="text-sm text-[#9d90f5] mt-2">
                        = {simplifyResult.decimal.toFixed(6).replace(/\.?0+$/, "")}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                        Steps
                      </div>
                      <ol className="space-y-2">
                        {simplifyResult.steps.map((step, i) => (
                          <li key={i} className="flex gap-3 text-sm">
                            <span className="shrink-0 w-5 h-5 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] text-xs flex items-center justify-center font-bold">
                              {i + 1}
                            </span>
                            <span className="text-[#c0c0d0] leading-relaxed">
                              {step}
                            </span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48">
                    <p className="text-[#555566] text-sm text-center">
                      Enter a fraction above to simplify it
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ---- DECIMAL TO FRACTION MODE ---- */}
          {toolMode === "decimal-to-fraction" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Enter a Decimal
                </h2>
                <input
                  type="text"
                  value={decInput}
                  onChange={(e) => setDecInput(e.target.value)}
                  placeholder="e.g. 0.75"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-4 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
                <p className="text-xs text-[#555566] mt-3">
                  Enter any decimal number including negatives (e.g. -0.333)
                </p>
                {/* Common decimals */}
                <div className="mt-4">
                  <div className="text-xs text-[#555566] mb-2">Common decimals:</div>
                  <div className="flex flex-wrap gap-2">
                    {["0.25", "0.333", "0.5", "0.667", "0.75", "0.125", "0.2", "0.6"].map(
                      (d) => (
                        <button
                          key={d}
                          onClick={() => setDecInput(d)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                            decInput === d
                              ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                              : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                          }`}
                        >
                          {d}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">Result</h2>
                {d2fResult ? (
                  <div className="space-y-4">
                    <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5 text-center">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                        As a Fraction (Simplified)
                      </div>
                      <div className="flex flex-col items-center gap-1 mb-2">
                        <span className="text-4xl font-bold text-white">
                          {d2fResult.simplified[0]}
                        </span>
                        <div className="w-16 h-0.5 bg-[#7c6cf0]" />
                        <span className="text-4xl font-bold text-white">
                          {d2fResult.simplified[1]}
                        </span>
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-3">
                        Steps
                      </div>
                      <ol className="space-y-2 text-sm">
                        {(() => {
                          const val = parseFloat(decInput);
                          const decStr = decInput.replace("-", "");
                          const dotIdx = decStr.indexOf(".");
                          const decimals = dotIdx === -1 ? 0 : decStr.length - dotIdx - 1;
                          const den = Math.pow(10, decimals);
                          const g = gcd(Math.abs(d2fResult.num), Math.abs(d2fResult.den));
                          const steps = [
                            `Decimal ${decInput} has ${decimals} decimal place(s)`,
                            `Denominator = 10^${decimals} = ${den}`,
                            `Fraction = ${d2fResult.num}/${d2fResult.den}`,
                            g > 1
                              ? `GCD(${Math.abs(d2fResult.num)}, ${Math.abs(d2fResult.den)}) = ${g} → Simplified: ${d2fResult.simplified[0]}/${d2fResult.simplified[1]}`
                              : `Already in simplest form: ${d2fResult.simplified[0]}/${d2fResult.simplified[1]}`,
                          ];
                          return steps.map((step, i) => (
                            <li key={i} className="flex gap-3">
                              <span className="shrink-0 w-5 h-5 rounded-full bg-[#7c6cf0]/20 text-[#7c6cf0] text-xs flex items-center justify-center font-bold">
                                {i + 1}
                              </span>
                              <span className="text-[#c0c0d0] leading-relaxed">
                                {step}
                              </span>
                            </li>
                          ));
                        })()}
                      </ol>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-48">
                    <p className="text-[#555566] text-sm text-center">
                      Enter a decimal number above to convert it
                    </p>
                  </div>
                )}
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
                  title: "Choose a Mode",
                  description:
                    "Select Fraction Operations to add, subtract, multiply, or divide two fractions. Use Simplify or Decimal to Fraction for those specific tasks.",
                },
                {
                  step: "2",
                  title: "Enter Your Values",
                  description:
                    "Type in the numerators and denominators (or your decimal). Results appear instantly as you type.",
                },
                {
                  step: "3",
                  title: "View Steps & Answer",
                  description:
                    "See the fully simplified result as a fraction and decimal, plus a numbered step-by-step breakdown of the math.",
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
                  description:
                    "Calculate percentages, percentage change, and percentage of a number.",
                  href: "/tools/percentage-calculator",
                },
                {
                  title: "Exponent Calculator",
                  description:
                    "Calculate powers and exponents for any base and exponent.",
                  href: "/tools/exponent-calculator",
                },
                {
                  title: "Scientific Calculator",
                  description:
                    "Full-featured scientific calculator for complex math expressions.",
                  href: "/tools/scientific-calculator",
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
