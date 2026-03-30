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
      <span className="text-[#f0f0f5]">Hours Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types & Constants                                                  */
/* ------------------------------------------------------------------ */

interface TimeRange {
  id: number;
  label: string;
  startTime: string;
  endTime: string;
  breakMinutes: string;
}

const FAQ_DATA = [
  {
    question: "How do I calculate hours between two times?",
    answer:
      "Subtract the start time from the end time. For example, from 8:30 AM to 4:45 PM is 8 hours and 15 minutes (or 8.25 decimal hours). If you have unpaid breaks, subtract those minutes from the result. This calculator handles all of that automatically.",
  },
  {
    question: "How do I convert hours and minutes to decimal hours?",
    answer:
      "Divide the minutes by 60 and add to the whole hours. For example, 3 hours and 45 minutes = 3 + (45 ÷ 60) = 3.75 decimal hours. Decimal hours are useful for payroll calculations and billing.",
  },
  {
    question: "What does the break time field do?",
    answer:
      "The break time field lets you subtract unpaid break time from the total. Enter the number of minutes for your unpaid lunch or break, and the calculator deducts it from your hours worked for that range.",
  },
  {
    question: "Can I calculate hours across midnight?",
    answer:
      "Yes. If your end time is earlier than your start time (e.g., start 10:00 PM, end 6:00 AM), the calculator automatically adds 24 hours to treat it as an overnight shift and returns the correct duration.",
  },
  {
    question: "Why would I add multiple time ranges?",
    answer:
      "Multiple ranges are useful if you worked at different times during a day (e.g., 8 AM–12 PM and 2 PM–5 PM), if you want to track different projects or tasks, or if you work a split shift. The running total adds all ranges together.",
  },
  {
    question: "How many hours is a full-time job per week?",
    answer:
      "A standard full-time job in the US is 40 hours per week (8 hours per day, 5 days). Some industries consider 35 hours full-time. Over 40 hours per week typically triggers overtime pay under federal law.",
  },
  {
    question: "How do I calculate pay from hours worked?",
    answer:
      "Multiply your total decimal hours by your hourly rate. For example, 38.5 hours × $22.00/hr = $847.00 gross pay before taxes. Use the Time Card Calculator on PrestoKit for a full weekly breakdown including overtime.",
  },
  {
    question: "Is this hours calculator free?",
    answer:
      "Yes, completely free. No signup, no account, and no limits. Use it as many times as you need for logging work time, billing clients, or tracking personal projects.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

let nextId = 2;

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

function formatDuration(totalMinutes: number): string {
  if (totalMinutes <= 0) return "0h 00m";
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

function calcRangeMinutes(range: TimeRange): number {
  let start = parseTimeToMinutes(range.startTime);
  let end = parseTimeToMinutes(range.endTime);
  if (end <= start) end += 24 * 60; // overnight
  const brk = parseFloat(range.breakMinutes) || 0;
  return Math.max(0, end - start - brk);
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HoursCalculatorPage() {
  const [ranges, setRanges] = useState<TimeRange[]>([
    { id: 1, label: "Session 1", startTime: "09:00", endTime: "17:00", breakMinutes: "30" },
  ]);

  const addRange = () => {
    setRanges((prev) => [
      ...prev,
      { id: nextId++, label: `Session ${prev.length + 1}`, startTime: "09:00", endTime: "17:00", breakMinutes: "0" },
    ]);
  };

  const removeRange = (id: number) => {
    setRanges((prev) => prev.filter((r) => r.id !== id));
  };

  const updateRange = (id: number, field: keyof TimeRange, value: string) => {
    setRanges((prev) => prev.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  const rangeResults = useMemo(() => {
    return ranges.map((r) => {
      const totalMin = calcRangeMinutes(r);
      return {
        id: r.id,
        totalMin,
        decimal: totalMin / 60,
        display: formatDuration(totalMin),
      };
    });
  }, [ranges]);

  const totals = useMemo(() => {
    const totalMin = rangeResults.reduce((s, r) => s + r.totalMin, 0);
    return {
      totalMin,
      decimal: totalMin / 60,
      display: formatDuration(totalMin),
    };
  }, [rangeResults]);

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

      <PromoBar type="pro" dismissKey="hours-calculator-pro" />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Hours{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate the number of hours and minutes between any two times. Add multiple time ranges and get a running total in hours, minutes, and decimal format.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Time Ranges */}
            <div className="lg:col-span-2 space-y-3">
              {ranges.map((range, idx) => {
                const result = rangeResults[idx];
                return (
                  <div key={range.id} className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-5 sm:p-6">
                    <div className="flex items-center justify-between mb-4">
                      <input
                        type="text"
                        value={range.label}
                        onChange={(e) => updateRange(range.id, "label", e.target.value)}
                        className="text-sm font-semibold text-[#c0c0d0] bg-transparent border-none focus:outline-none focus:text-white w-40"
                        placeholder="Session label"
                      />
                      <div className="flex items-center gap-3">
                        <span className={`text-lg font-bold ${result.totalMin > 0 ? "text-[#9d90f5]" : "text-[#555566]"}`}>
                          {result.display}
                        </span>
                        {ranges.length > 1 && (
                          <button
                            onClick={() => removeRange(range.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-[#555566] hover:text-[#ef4444] hover:bg-[#ef4444]/10 transition-all"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs text-[#8888a0] mb-1.5 font-medium uppercase tracking-wide">Start Time</label>
                        <input
                          type="time"
                          value={range.startTime}
                          onChange={(e) => updateRange(range.id, "startTime", e.target.value)}
                          className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#8888a0] mb-1.5 font-medium uppercase tracking-wide">End Time</label>
                        <input
                          type="time"
                          value={range.endTime}
                          onChange={(e) => updateRange(range.id, "endTime", e.target.value)}
                          className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#8888a0] mb-1.5 font-medium uppercase tracking-wide">Break (min)</label>
                        <input
                          type="number"
                          min="0"
                          max="480"
                          step="5"
                          value={range.breakMinutes}
                          onChange={(e) => updateRange(range.id, "breakMinutes", e.target.value)}
                          placeholder="0"
                          className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                        />
                      </div>
                    </div>

                    {/* Inline decimal result */}
                    {result.totalMin > 0 && (
                      <div className="mt-3 text-xs text-[#555566]">
                        {result.decimal.toFixed(2)} decimal hours
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Add Range Button */}
              <button
                onClick={addRange}
                className="w-full rounded-2xl border border-dashed border-[#1e1e2e] bg-transparent py-4 text-sm text-[#8888a0] hover:border-[#7c6cf0]/40 hover:text-[#9d90f5] transition-all flex items-center justify-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                </svg>
                Add Another Time Range
              </button>
            </div>

            {/* Totals Panel */}
            <div className="space-y-4">
              {/* Grand Total */}
              <div className="rounded-2xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 backdrop-blur-sm p-6">
                <div className="text-sm font-semibold text-[#c0c0d0] mb-4">Total</div>
                <div className="text-4xl font-bold text-[#9d90f5] mb-1">
                  {totals.display}
                </div>
                <div className="text-xl font-semibold text-[#7c6cf0]">
                  {totals.decimal.toFixed(2)} hrs
                </div>
                <div className="text-xs text-[#555566] mt-2">decimal</div>
              </div>

              {/* Breakdown */}
              {ranges.length > 1 && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] font-semibold uppercase tracking-wide mb-3">Breakdown</div>
                  <div className="space-y-2">
                    {rangeResults.map((r, i) => (
                      <div key={r.id} className="flex items-center justify-between text-sm">
                        <span className="text-[#8888a0] truncate">{ranges[i]?.label || `Session ${i + 1}`}</span>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[#9d90f5] font-medium">{r.display}</span>
                          <span className="text-[#555566] text-xs">({r.decimal.toFixed(2)}h)</span>
                        </div>
                      </div>
                    ))}
                    <div className="border-t border-[#1e1e2e] pt-2 flex justify-between text-sm font-semibold">
                      <span className="text-[#c0c0d0]">Total</span>
                      <span className="text-white">{totals.display}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Quick conversions */}
              {totals.totalMin > 0 && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                  <div className="text-xs text-[#8888a0] font-semibold uppercase tracking-wide mb-3">Conversions</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#8888a0]">Minutes</span>
                      <span className="text-white font-medium">{Math.round(totals.totalMin)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8888a0]">Decimal hours</span>
                      <span className="text-white font-medium">{totals.decimal.toFixed(4)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#8888a0]">Seconds</span>
                      <span className="text-white font-medium">{(totals.totalMin * 60).toLocaleString()}</span>
                    </div>
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
                  title: "Enter Start & End Time",
                  description: "Pick your start and end times using the time inputs. Overnight shifts (end time before start time) are handled automatically.",
                },
                {
                  step: "2",
                  title: "Add a Break (Optional)",
                  description: "Enter unpaid break minutes to subtract from your total. Leave it at 0 if you have no break or if you are tracking total elapsed time.",
                },
                {
                  step: "3",
                  title: "Add More Ranges",
                  description: "Click 'Add Another Time Range' to log multiple sessions. The running total panel updates instantly with combined hours, minutes, and decimal hours.",
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
                  description: "Full weekly timesheet with daily hours, overtime, and gross pay calculation.",
                  href: "/tools/time-card-calculator",
                },
                {
                  title: "Overtime Calculator",
                  description: "Calculate overtime pay at 1.5x, 2x, or a custom multiplier.",
                  href: "/tools/overtime-calculator",
                },
                {
                  title: "Date Calculator",
                  description: "Add or subtract days, weeks, and months from any date.",
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
