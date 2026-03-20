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
      <span className="text-[#f0f0f5]">Percentage Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

type CalcMode = "of" | "whatPercent" | "change" | "increaseDecrease";

const MODES: { key: CalcMode; label: string; description: string }[] = [
  {
    key: "of",
    label: "X% of Y",
    description: "What is X% of Y?",
  },
  {
    key: "whatPercent",
    label: "X is ?% of Y",
    description: "X is what percent of Y?",
  },
  {
    key: "change",
    label: "% Change",
    description: "Percentage change from X to Y",
  },
  {
    key: "increaseDecrease",
    label: "Increase/Decrease",
    description: "Y increased or decreased by X%",
  },
];

const COMMON_PERCENTAGES = [
  { percent: "5%", fraction: "1/20", decimal: "0.05" },
  { percent: "10%", fraction: "1/10", decimal: "0.10" },
  { percent: "12.5%", fraction: "1/8", decimal: "0.125" },
  { percent: "20%", fraction: "1/5", decimal: "0.20" },
  { percent: "25%", fraction: "1/4", decimal: "0.25" },
  { percent: "33.3%", fraction: "1/3", decimal: "0.333" },
  { percent: "50%", fraction: "1/2", decimal: "0.50" },
  { percent: "66.7%", fraction: "2/3", decimal: "0.667" },
  { percent: "75%", fraction: "3/4", decimal: "0.75" },
  { percent: "100%", fraction: "1/1", decimal: "1.00" },
];

const FAQ_DATA = [
  {
    question: "How do I calculate what X% of a number is?",
    answer:
      "To find X% of Y, multiply Y by X and divide by 100. For example, 15% of 200 = (200 x 15) / 100 = 30. Our calculator does this instantly as you type.",
  },
  {
    question: "How do I find what percentage one number is of another?",
    answer:
      "To find what percent X is of Y, divide X by Y and multiply by 100. For example, 30 is what percent of 200? Answer: (30 / 200) x 100 = 15%. Use the 'X is ?% of Y' mode above.",
  },
  {
    question: "How is percentage change calculated?",
    answer:
      "Percentage change = ((New Value - Old Value) / Old Value) x 100. A positive result means an increase, negative means a decrease. For example, going from 100 to 150 is a +50% change.",
  },
  {
    question: "What is the difference between percentage increase and percentage change?",
    answer:
      "They are related but used differently. Percentage change measures the relative difference between two values (from A to B). Percentage increase/decrease applies a known percentage to a starting value to find the result. For example, '200 increased by 15%' gives you the final value (230).",
  },
  {
    question: "How do I calculate a percentage increase?",
    answer:
      "To increase a number by a percentage: Result = Original x (1 + Percentage/100). For example, 200 increased by 15% = 200 x 1.15 = 230. To decrease, use: Result = Original x (1 - Percentage/100).",
  },
  {
    question: "Is this percentage calculator free to use?",
    answer:
      "Yes, completely free with no signup required. All calculations happen in real time in your browser. No data is sent to any server. Use it as many times as you need for homework, business, finance, or any other purpose.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseNum(val: string): number {
  const n = parseFloat(val);
  return isNaN(n) ? 0 : n;
}

function formatResult(n: number): string {
  if (!isFinite(n) || isNaN(n)) return "--";
  // Show up to 4 decimal places, strip trailing zeros
  const fixed = n.toFixed(4);
  return parseFloat(fixed).toString();
}

/* ------------------------------------------------------------------ */
/*  Visual Percentage Bar                                              */
/* ------------------------------------------------------------------ */

function PercentBar({ value, max = 100, label }: { value: number; max?: number; label?: string }) {
  const safeValue = isFinite(value) && !isNaN(value) ? value : 0;
  const percent = Math.min(Math.max(0, (Math.abs(safeValue) / max) * 100), 100);
  const isNeg = safeValue < 0;

  return (
    <div className="mt-4">
      {label && (
        <div className="text-xs text-[#8888a0] mb-2">{label}</div>
      )}
      <div className="w-full h-4 rounded-full bg-[#0a0a0f] overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            isNeg ? "bg-red-500" : "bg-[#7c6cf0]"
          }`}
          style={{ width: `${percent}%` }}
        />
      </div>
      <div className="flex justify-between text-xs mt-1">
        <span className="text-[#555566]">0%</span>
        <span className={isNeg ? "text-red-400 font-semibold" : "text-[#9d90f5] font-semibold"}>
          {formatResult(safeValue)}%
        </span>
        <span className="text-[#555566]">{max}%</span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Result Display                                                     */
/* ------------------------------------------------------------------ */

function ResultDisplay({ label, value, color = "purple" }: { label: string; value: string; color?: "purple" | "green" | "red" | "white" }) {
  const colorMap = {
    purple: "text-[#9d90f5]",
    green: "text-[#00e676]",
    red: "text-red-400",
    white: "text-white",
  };

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#12121a] p-5 text-center">
      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
        {label}
      </div>
      <div className={`text-2xl sm:text-3xl font-bold ${colorMap[color]}`}>
        {value}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Input Field                                                        */
/* ------------------------------------------------------------------ */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  suffix?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
        {label}
      </label>
      <div className="relative">
        <input
          type="number"
          step="any"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors ${
            suffix ? "pr-10" : ""
          }`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-sm pointer-events-none">
            {suffix}
          </span>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function PercentageCalculatorPage() {
  const [mode, setMode] = useState<CalcMode>("of");

  // Mode 1: What is X% of Y?
  const [ofPercent, setOfPercent] = useState("");
  const [ofNumber, setOfNumber] = useState("");

  // Mode 2: X is what % of Y?
  const [wpPart, setWpPart] = useState("");
  const [wpWhole, setWpWhole] = useState("");

  // Mode 3: Percentage change from X to Y
  const [changeFrom, setChangeFrom] = useState("");
  const [changeTo, setChangeTo] = useState("");

  // Mode 4: Increase/Decrease
  const [idNumber, setIdNumber] = useState("");
  const [idPercent, setIdPercent] = useState("");
  const [idDirection, setIdDirection] = useState<"increase" | "decrease">("increase");

  /* Calculations */

  const ofResult = useMemo(() => {
    const pct = parseNum(ofPercent);
    const num = parseNum(ofNumber);
    if (!ofPercent && !ofNumber) return null;
    return (pct / 100) * num;
  }, [ofPercent, ofNumber]);

  const wpResult = useMemo(() => {
    const part = parseNum(wpPart);
    const whole = parseNum(wpWhole);
    if (!wpPart && !wpWhole) return null;
    if (whole === 0) return 0;
    return (part / whole) * 100;
  }, [wpPart, wpWhole]);

  const changeResult = useMemo(() => {
    const from = parseNum(changeFrom);
    const to = parseNum(changeTo);
    if (!changeFrom && !changeTo) return null;
    if (from === 0) return 0;
    return ((to - from) / Math.abs(from)) * 100;
  }, [changeFrom, changeTo]);

  const idResult = useMemo(() => {
    const num = parseNum(idNumber);
    const pct = parseNum(idPercent);
    if (!idNumber && !idPercent) return null;
    const factor = idDirection === "increase" ? 1 + pct / 100 : 1 - pct / 100;
    return num * factor;
  }, [idNumber, idPercent, idDirection]);

  const inputSectionClasses =
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
              Percentage{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate percentages instantly with four different modes. All
              calculations update in real time as you type.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
            {MODES.map((m) => (
              <button
                key={m.key}
                onClick={() => setMode(m.key)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  mode === m.key
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 shadow-[0_0_20px_rgba(124,108,240,0.1)]"
                    : "border-[#1e1e2e] bg-[#12121a] hover:border-[#7c6cf0]/40"
                }`}
              >
                <div
                  className={`text-sm font-semibold mb-0.5 ${
                    mode === m.key ? "text-[#9d90f5]" : "text-white"
                  }`}
                >
                  {m.label}
                </div>
                <div className="text-xs text-[#8888a0]">{m.description}</div>
              </button>
            ))}
          </div>

          {/* ==================== MODE 1: X% of Y ==================== */}
          {mode === "of" && (
            <div className={inputSectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                What is X% of Y?
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Enter a percentage and a number to find the result.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="Percentage (%)"
                  value={ofPercent}
                  onChange={setOfPercent}
                  placeholder="e.g. 15"
                  suffix="%"
                />
                <InputField
                  label="Of Number"
                  value={ofNumber}
                  onChange={setOfNumber}
                  placeholder="e.g. 200"
                />
              </div>

              {ofResult !== null && (ofPercent || ofNumber) && (
                <>
                  <ResultDisplay
                    label={`${ofPercent || "0"}% of ${ofNumber || "0"} is`}
                    value={formatResult(ofResult)}
                    color="green"
                  />
                  <PercentBar
                    value={parseNum(ofPercent)}
                    label={`${ofPercent || "0"}% visualized`}
                  />

                  {/* Formula */}
                  <div className="mt-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-4 text-center">
                    <span className="text-xs text-[#8888a0] font-mono">
                      {ofNumber || "0"} x {ofPercent || "0"} / 100 = {formatResult(ofResult)}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ==================== MODE 2: X is ?% of Y ==================== */}
          {mode === "whatPercent" && (
            <div className={inputSectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                X is what percent of Y?
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Find what percentage one number is of another.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="Part (X)"
                  value={wpPart}
                  onChange={setWpPart}
                  placeholder="e.g. 30"
                />
                <InputField
                  label="Whole (Y)"
                  value={wpWhole}
                  onChange={setWpWhole}
                  placeholder="e.g. 200"
                />
              </div>

              {wpResult !== null && (wpPart || wpWhole) && (
                <>
                  <ResultDisplay
                    label={`${wpPart || "0"} is this percent of ${wpWhole || "0"}`}
                    value={`${formatResult(wpResult)}%`}
                    color="purple"
                  />
                  <PercentBar
                    value={wpResult}
                    label="Percentage visualized"
                  />
                  <div className="mt-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-4 text-center">
                    <span className="text-xs text-[#8888a0] font-mono">
                      ({wpPart || "0"} / {wpWhole || "0"}) x 100 = {formatResult(wpResult)}%
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ==================== MODE 3: % Change ==================== */}
          {mode === "change" && (
            <div className={inputSectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Percentage Change
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Calculate the percentage change from one value to another.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="From (Old Value)"
                  value={changeFrom}
                  onChange={setChangeFrom}
                  placeholder="e.g. 100"
                />
                <InputField
                  label="To (New Value)"
                  value={changeTo}
                  onChange={setChangeTo}
                  placeholder="e.g. 150"
                />
              </div>

              {changeResult !== null && (changeFrom || changeTo) && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <ResultDisplay
                      label="Percentage Change"
                      value={`${changeResult >= 0 ? "+" : ""}${formatResult(changeResult)}%`}
                      color={changeResult >= 0 ? "green" : "red"}
                    />
                    <ResultDisplay
                      label="Difference"
                      value={formatResult(parseNum(changeTo) - parseNum(changeFrom))}
                      color="white"
                    />
                    <ResultDisplay
                      label="Direction"
                      value={changeResult > 0 ? "Increase" : changeResult < 0 ? "Decrease" : "No Change"}
                      color={changeResult >= 0 ? "green" : "red"}
                    />
                  </div>
                  <PercentBar
                    value={changeResult}
                    max={Math.max(100, Math.abs(changeResult))}
                    label="Change visualized"
                  />
                  <div className="mt-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-4 text-center">
                    <span className="text-xs text-[#8888a0] font-mono">
                      (({changeTo || "0"} - {changeFrom || "0"}) / |{changeFrom || "0"}|) x 100 = {changeResult >= 0 ? "+" : ""}{formatResult(changeResult)}%
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ==================== MODE 4: Increase / Decrease ==================== */}
          {mode === "increaseDecrease" && (
            <div className={inputSectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Percentage Increase / Decrease
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Apply a percentage increase or decrease to a number.
              </p>

              {/* Direction Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setIdDirection("increase")}
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    idDirection === "increase"
                      ? "border-[#00e676] bg-[#00e676]/10 text-[#00e676]"
                      : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#00e676]/40"
                  }`}
                >
                  Increase
                </button>
                <button
                  onClick={() => setIdDirection("decrease")}
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    idDirection === "decrease"
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-red-500/40"
                  }`}
                >
                  Decrease
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <InputField
                  label="Starting Number"
                  value={idNumber}
                  onChange={setIdNumber}
                  placeholder="e.g. 200"
                />
                <InputField
                  label={`${idDirection === "increase" ? "Increase" : "Decrease"} by (%)`}
                  value={idPercent}
                  onChange={setIdPercent}
                  placeholder="e.g. 15"
                  suffix="%"
                />
              </div>

              {idResult !== null && (idNumber || idPercent) && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                    <ResultDisplay
                      label="Result"
                      value={formatResult(idResult)}
                      color={idDirection === "increase" ? "green" : "red"}
                    />
                    <ResultDisplay
                      label={idDirection === "increase" ? "Amount Added" : "Amount Subtracted"}
                      value={formatResult(Math.abs(idResult - parseNum(idNumber)))}
                      color="white"
                    />
                    <ResultDisplay
                      label="Original"
                      value={formatResult(parseNum(idNumber))}
                      color="purple"
                    />
                  </div>
                  <PercentBar
                    value={parseNum(idPercent)}
                    label={`${idPercent || "0"}% ${idDirection}`}
                  />
                  <div className="mt-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-4 text-center">
                    <span className="text-xs text-[#8888a0] font-mono">
                      {idNumber || "0"} x (1 {idDirection === "increase" ? "+" : "-"} {idPercent || "0"}/100) = {formatResult(idResult)}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* Common Percentages Reference Table */}
          <div className="mt-10 rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-white mb-4">
              Common Percentage Reference
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">Percentage</th>
                    <th className="text-center text-[#8888a0] font-medium pb-3 px-4">Fraction</th>
                    <th className="text-center text-[#8888a0] font-medium pb-3 px-4">Decimal</th>
                    <th className="text-left text-[#8888a0] font-medium pb-3 pl-4 w-1/3">Visual</th>
                  </tr>
                </thead>
                <tbody>
                  {COMMON_PERCENTAGES.map((row) => (
                    <tr key={row.percent} className="border-b border-[#1e1e2e]/60">
                      <td className="py-3 pr-4 text-white font-semibold">{row.percent}</td>
                      <td className="py-3 px-4 text-center text-[#9d90f5]">{row.fraction}</td>
                      <td className="py-3 px-4 text-center text-[#8888a0]">{row.decimal}</td>
                      <td className="py-3 pl-4">
                        <div className="w-full h-2.5 rounded-full bg-[#0a0a0f] overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#7c6cf0] transition-all"
                            style={{ width: row.percent }}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
                  title: "Choose a Mode",
                  description:
                    "Select one of four calculation modes: percentage of a number, what percent one number is of another, percentage change, or percentage increase/decrease.",
                },
                {
                  step: "2",
                  title: "Enter Your Numbers",
                  description:
                    "Type your values into the input fields. Results calculate instantly in real time as you type -- no need to press a button.",
                },
                {
                  step: "3",
                  title: "Read Your Results",
                  description:
                    "View the answer with a formula breakdown and visual percentage bar. Use the reference table below for quick percentage-to-fraction conversions.",
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
                  title: "Profit Margin Calculator",
                  description: "Calculate profit margins, markups, and break-even points.",
                  href: "/tools/profit-margin-calculator",
                },
                {
                  title: "Invoice Generator",
                  description: "Create professional invoices for your business.",
                  href: "/tools/invoice-generator",
                },
                {
                  title: "Password Generator",
                  description: "Create strong, secure random passwords instantly.",
                  href: "/tools/password-generator",
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
