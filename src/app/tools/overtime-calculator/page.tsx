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
      <span className="text-[#f0f0f5]">Overtime Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const OT_MULTIPLIER_PRESETS = [
  { label: "1.5x — Time and a Half", value: 1.5 },
  { label: "2.0x — Double Time", value: 2.0 },
  { label: "2.5x — Double Time and a Half", value: 2.5 },
];

const FAQ_DATA = [
  {
    question: "What is the standard overtime rate?",
    answer:
      "Under the Fair Labor Standards Act (FLSA), the standard overtime rate is 1.5 times (time and a half) the employee's regular rate of pay for all hours worked over 40 in a workweek. Some employers or union contracts offer double time (2x) for certain conditions.",
  },
  {
    question: "How is overtime pay calculated?",
    answer:
      "Overtime pay = overtime hours × regular hourly rate × overtime multiplier. For example, if you earn $20/hr and work 5 overtime hours at 1.5x, that's 5 × $20 × 1.5 = $150 in overtime pay. Your total weekly pay would be regular pay + overtime pay.",
  },
  {
    question: "Do all states follow the federal 40-hour overtime threshold?",
    answer:
      "Most states follow the federal weekly 40-hour threshold, but some states have additional daily overtime rules. California requires overtime pay after 8 hours in a single workday. Colorado and Alaska have similar daily overtime provisions.",
  },
  {
    question: "What is double time and when does it apply?",
    answer:
      "Double time means you earn 2x your regular hourly rate. In California, double time applies after 12 hours worked in a day or after 8 hours on the 7th consecutive workday. Federally, double time is not required — it is typically a matter of employer policy or union contract.",
  },
  {
    question: "Are salaried employees entitled to overtime?",
    answer:
      "It depends. Salaried employees who are classified as 'non-exempt' and earn below the salary threshold ($684/week under the FLSA as of 2024) are entitled to overtime. Salaried exempt employees (executives, professionals, administrative workers above the threshold) generally are not.",
  },
  {
    question: "What is the effective hourly rate?",
    answer:
      "The effective hourly rate is your total weekly earnings divided by total hours worked (regular + overtime). It will be higher than your base rate because overtime hours are paid at a premium. This gives you a true picture of your actual earnings per hour worked.",
  },
  {
    question: "How does overtime affect my annual salary equivalent?",
    answer:
      "The annual equivalent shown assumes you work the same number of total hours every week for 52 weeks. It is a helpful estimate but may not reflect actual annual income if your hours vary by week.",
  },
  {
    question: "Can my employer avoid overtime by giving me comp time instead?",
    answer:
      "For private-sector employees, the FLSA does not allow comp time in place of overtime pay. Government employees may receive comp time under certain conditions. Always check your state's labor laws and your employment contract.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function OvertimeCalculatorPage() {
  const [regularRate, setRegularRate] = useState("");
  const [regularHours, setRegularHours] = useState("40");
  const [overtimeHours, setOvertimeHours] = useState("");
  const [otMultiplier, setOtMultiplier] = useState(1.5);
  const [customMultiplier, setCustomMultiplier] = useState("");
  const [useCustom, setUseCustom] = useState(false);

  const results = useMemo(() => {
    const rate = parseFloat(regularRate) || 0;
    const regHrs = parseFloat(regularHours) || 0;
    const otHrs = parseFloat(overtimeHours) || 0;
    const multiplier = useCustom ? (parseFloat(customMultiplier) || 1.5) : otMultiplier;

    const regularPay = rate * regHrs;
    const otRate = rate * multiplier;
    const overtimePay = otRate * otHrs;
    const totalPay = regularPay + overtimePay;
    const totalHours = regHrs + otHrs;
    const effectiveRate = totalHours > 0 ? totalPay / totalHours : 0;
    const annualEquivalent = totalPay * 52;

    return { rate, regHrs, otHrs, multiplier, regularPay, otRate, overtimePay, totalPay, totalHours, effectiveRate, annualEquivalent };
  }, [regularRate, regularHours, overtimeHours, otMultiplier, customMultiplier, useCustom]);

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_DATA.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PromoBar type="pro" dismissKey="overtime-calculator-pro" />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Overtime{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate overtime pay, total weekly earnings, and effective hourly rate. Supports time and a half, double time, and custom multipliers.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Inputs */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">Pay Details</h2>

              {/* Regular Rate */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">Regular Hourly Rate</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={regularRate}
                    onChange={(e) => setRegularRate(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Regular Hours */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">Regular Hours per Week</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="168"
                  value={regularHours}
                  onChange={(e) => setRegularHours(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Overtime Hours */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">Overtime Hours Worked</label>
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  value={overtimeHours}
                  onChange={(e) => setOvertimeHours(e.target.value)}
                  placeholder="0"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* OT Multiplier */}
              <div className="mb-2">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">Overtime Multiplier</label>
                <div className="space-y-2">
                  {OT_MULTIPLIER_PRESETS.map((preset) => (
                    <button
                      key={preset.value}
                      onClick={() => { setOtMultiplier(preset.value); setUseCustom(false); }}
                      className={`w-full flex items-center justify-between rounded-xl border px-4 py-3 text-sm transition-all ${
                        !useCustom && otMultiplier === preset.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      <span>{preset.label}</span>
                      <span className="font-bold">{preset.value}x</span>
                    </button>
                  ))}

                  {/* Custom */}
                  <button
                    onClick={() => setUseCustom(!useCustom)}
                    className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-sm transition-all ${
                      useCustom
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                        : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    <div className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${useCustom ? "border-[#7c6cf0] bg-[#7c6cf0]" : "border-[#555566]"}`}>
                      {useCustom && (
                        <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </div>
                    <span className={useCustom ? "text-white" : ""}>Custom multiplier</span>
                  </button>

                  {useCustom && (
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      value={customMultiplier}
                      onChange={(e) => setCustomMultiplier(e.target.value)}
                      placeholder="e.g. 1.75"
                      className="w-full rounded-xl border border-[#7c6cf0] bg-[#0a0a0f] py-3 px-4 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Results */}
            <div className="space-y-4">
              {/* Main result cards */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">Results</h2>
                <div className="space-y-3">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Total Weekly Pay</div>
                    <div className="text-3xl font-bold text-[#9d90f5]">
                      ${results.totalPay.toFixed(2)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Regular Pay</div>
                      <div className="text-xl font-bold text-[#00e676]">
                        ${results.regularPay.toFixed(2)}
                      </div>
                      <div className="text-xs text-[#555566] mt-0.5">{results.regHrs}h @ ${results.rate.toFixed(2)}</div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Overtime Pay</div>
                      <div className={`text-xl font-bold ${results.otHrs > 0 ? "text-[#f59e0b]" : "text-[#555566]"}`}>
                        ${results.overtimePay.toFixed(2)}
                      </div>
                      <div className="text-xs text-[#555566] mt-0.5">
                        {results.otHrs}h @ ${results.otRate.toFixed(2)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Effective rate & annual */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">Additional Metrics</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b border-[#1e1e2e]">
                    <div>
                      <div className="text-sm text-[#c0c0d0]">Effective Hourly Rate</div>
                      <div className="text-xs text-[#555566]">Total pay ÷ total hours</div>
                    </div>
                    <div className="text-xl font-bold text-[#9d90f5]">
                      ${results.effectiveRate.toFixed(2)}/hr
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-[#1e1e2e]">
                    <div>
                      <div className="text-sm text-[#c0c0d0]">Annual Equivalent</div>
                      <div className="text-xs text-[#555566]">52 weeks at this rate</div>
                    </div>
                    <div className="text-xl font-bold text-white">
                      ${results.annualEquivalent.toLocaleString("en-US", { maximumFractionDigits: 0 })}
                    </div>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <div className="text-sm text-[#c0c0d0]">Total Hours</div>
                      <div className="text-xs text-[#555566]">Regular + overtime</div>
                    </div>
                    <div className="text-xl font-bold text-white">
                      {results.totalHours.toFixed(1)}h
                    </div>
                  </div>
                </div>
              </div>

              {/* Breakdown bar */}
              {results.totalPay > 0 && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-sm text-[#c0c0d0] mb-3">Pay Split</div>
                  <div className="flex rounded-full overflow-hidden h-3 mb-2">
                    <div
                      className="bg-[#00e676] transition-all"
                      style={{ width: `${(results.regularPay / results.totalPay) * 100}%` }}
                    />
                    <div
                      className="bg-[#f59e0b] transition-all"
                      style={{ width: `${(results.overtimePay / results.totalPay) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-[#8888a0]">
                    <span>Regular {results.totalPay > 0 ? ((results.regularPay / results.totalPay) * 100).toFixed(0) : 0}%</span>
                    <span>Overtime {results.totalPay > 0 ? ((results.overtimePay / results.totalPay) * 100).toFixed(0) : 0}%</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Rate",
                  description: "Input your regular hourly rate and the number of regular hours worked per week. This sets the baseline for all pay calculations.",
                },
                {
                  step: "2",
                  title: "Add Overtime Hours",
                  description: "Enter overtime hours worked and select your multiplier — 1.5x for time and a half, 2x for double time, or a custom rate.",
                },
                {
                  step: "3",
                  title: "Review Your Pay",
                  description: "See your regular pay, overtime pay, total weekly pay, effective hourly rate, and annual salary equivalent all calculated instantly.",
                },
              ].map((item) => (
                <div key={item.step} className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-6 text-center">
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
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-3 max-w-3xl mx-auto">
              {FAQ_DATA.map((item, i) => (
                <FAQItem key={i} question={item.question} answer={item.answer} />
              ))}
            </div>
          </div>

          {/* Related Tools */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                {
                  title: "Time Card Calculator",
                  description: "Log hours worked each day and calculate weekly totals with overtime.",
                  href: "/tools/time-card-calculator",
                },
                {
                  title: "Salary Calculator",
                  description: "Convert between salary, hourly, daily, weekly, and monthly pay rates.",
                  href: "/tools/salary-calculator",
                },
                {
                  title: "Paycheck Calculator",
                  description: "Estimate your take-home pay after taxes and deductions.",
                  href: "/tools/paycheck-calculator",
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
