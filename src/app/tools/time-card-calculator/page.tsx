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
      <span className="text-[#f0f0f5]">Time Card Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants & Types                                                  */
/* ------------------------------------------------------------------ */

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

interface DayEntry {
  enabled: boolean;
  startTime: string;
  endTime: string;
  breakMinutes: string;
}

const DEFAULT_DAYS: DayEntry[] = DAYS.map((_, i) => ({
  enabled: i < 5,
  startTime: "09:00",
  endTime: "17:00",
  breakMinutes: "30",
}));

const FAQ_DATA = [
  {
    question: "How do I calculate hours worked from a time card?",
    answer:
      "Subtract the start time from the end time to get total time worked, then subtract any unpaid break time. For example, if you worked 9:00 AM to 5:00 PM with a 30-minute break, that is 7.5 hours worked. This calculator does all the math automatically.",
  },
  {
    question: "What counts as overtime on a weekly time card?",
    answer:
      "Under federal law (FLSA), overtime kicks in after 40 hours worked in a workweek. Hours 41 and beyond must be paid at 1.5x the regular rate. Some states like California also have daily overtime rules (over 8 hours in a day), but this calculator applies the federal weekly threshold.",
  },
  {
    question: "How do I convert minutes to decimal hours for payroll?",
    answer:
      "Divide the minutes by 60 to get decimal hours. For example, 7 hours and 30 minutes = 7 + (30/60) = 7.5 hours. This calculator automatically shows hours in both hours:minutes format and decimal format.",
  },
  {
    question: "Should break time be deducted from hours worked?",
    answer:
      "Unpaid meal breaks (usually 30 minutes or longer) should not be counted as hours worked. Short rest breaks of 5–20 minutes typically are counted as work time. Enter only unpaid break minutes in the Break field.",
  },
  {
    question: "How is gross pay calculated on a time card?",
    answer:
      "Regular hours (up to 40 per week) are paid at your base hourly rate. Overtime hours (over 40) are paid at 1.5x your base rate. Gross pay = (regular hours × rate) + (overtime hours × rate × 1.5). This is before any tax deductions.",
  },
  {
    question: "Can I use this for biweekly pay periods?",
    answer:
      "This calculator covers one workweek (7 days). For a biweekly pay period, complete the calculation for week one, note the totals, then complete week two and add the results together. Overtime is still calculated per workweek, not per pay period.",
  },
  {
    question: "What if my shift crosses midnight?",
    answer:
      "For shifts that cross midnight (e.g., 10:00 PM to 6:00 AM), the calculator automatically handles this by detecting when the end time is earlier than the start time and adding 24 hours to the calculation. You will still see the correct hours worked.",
  },
  {
    question: "Is this time card calculator free?",
    answer:
      "Yes, PrestoKit's time card calculator is completely free with no signup, no account required, and no limits. Use it as many times as you need.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function parseTimeToMinutes(time: string): number {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + (m || 0);
}

function minutesToHoursDecimal(minutes: number): number {
  return minutes / 60;
}

function formatHoursMinutes(totalMinutes: number): string {
  const h = Math.floor(totalMinutes / 60);
  const m = Math.round(totalMinutes % 60);
  return `${h}h ${m.toString().padStart(2, "0")}m`;
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TimeCardCalculatorPage() {
  const [days, setDays] = useState<DayEntry[]>(DEFAULT_DAYS);
  const [hourlyRate, setHourlyRate] = useState("");

  const updateDay = (index: number, field: keyof DayEntry, value: string | boolean) => {
    setDays((prev) => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const results = useMemo(() => {
    const dayResults = days.map((day) => {
      if (!day.enabled) return { minutesWorked: 0, hours: 0, display: "—" };
      let startMin = parseTimeToMinutes(day.startTime);
      let endMin = parseTimeToMinutes(day.endTime);
      if (endMin <= startMin) endMin += 24 * 60; // overnight shift
      const breakMin = parseFloat(day.breakMinutes) || 0;
      const worked = Math.max(0, endMin - startMin - breakMin);
      return {
        minutesWorked: worked,
        hours: minutesToHoursDecimal(worked),
        display: formatHoursMinutes(worked),
      };
    });

    const totalMinutes = dayResults.reduce((sum, d) => sum + d.minutesWorked, 0);
    const totalHours = minutesToHoursDecimal(totalMinutes);
    const regularHours = Math.min(totalHours, 40);
    const overtimeHours = Math.max(0, totalHours - 40);
    const rate = parseFloat(hourlyRate) || 0;
    const regularPay = regularHours * rate;
    const overtimePay = overtimeHours * rate * 1.5;
    const grossPay = regularPay + overtimePay;

    return { dayResults, totalMinutes, totalHours, regularHours, overtimeHours, rate, regularPay, overtimePay, grossPay };
  }, [days, hourlyRate]);

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

      <PromoBar type="pro" dismissKey="time-card-calculator-pro" />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Time Card{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Enter your start and end times for each day. Instantly calculate daily hours, weekly totals, overtime, and gross pay.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            {/* Timesheet Input */}
            <div className="lg:col-span-2 rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">Weekly Timesheet</h2>

              {/* Header Row */}
              <div className="grid grid-cols-[100px_1fr_1fr_80px_70px] gap-2 mb-3 text-xs text-[#8888a0] font-medium uppercase tracking-wide">
                <span>Day</span>
                <span>Start</span>
                <span>End</span>
                <span>Break (min)</span>
                <span className="text-right">Hours</span>
              </div>

              <div className="space-y-2">
                {DAYS.map((dayName, i) => {
                  const day = days[i];
                  const result = results.dayResults[i];
                  return (
                    <div
                      key={dayName}
                      className={`grid grid-cols-[100px_1fr_1fr_80px_70px] gap-2 items-center rounded-xl px-3 py-2 transition-colors ${
                        day.enabled ? "bg-[#0a0a0f] border border-[#1e1e2e]" : "opacity-40"
                      }`}
                    >
                      {/* Day toggle */}
                      <button
                        onClick={() => updateDay(i, "enabled", !day.enabled)}
                        className="flex items-center gap-2 text-left"
                      >
                        <div
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                            day.enabled ? "border-[#7c6cf0] bg-[#7c6cf0]" : "border-[#555566]"
                          }`}
                        >
                          {day.enabled && (
                            <svg className="w-2.5 h-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                        <span className="text-xs font-medium text-[#c0c0d0] truncate">{dayName.slice(0, 3)}</span>
                      </button>

                      {/* Start Time */}
                      <input
                        type="time"
                        value={day.startTime}
                        onChange={(e) => updateDay(i, "startTime", e.target.value)}
                        disabled={!day.enabled}
                        className="w-full rounded-lg border border-[#1e1e2e] bg-[#0d0d1a] px-2 py-1.5 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors disabled:opacity-40"
                      />

                      {/* End Time */}
                      <input
                        type="time"
                        value={day.endTime}
                        onChange={(e) => updateDay(i, "endTime", e.target.value)}
                        disabled={!day.enabled}
                        className="w-full rounded-lg border border-[#1e1e2e] bg-[#0d0d1a] px-2 py-1.5 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors disabled:opacity-40"
                      />

                      {/* Break */}
                      <input
                        type="number"
                        min="0"
                        max="480"
                        value={day.breakMinutes}
                        onChange={(e) => updateDay(i, "breakMinutes", e.target.value)}
                        disabled={!day.enabled}
                        className="w-full rounded-lg border border-[#1e1e2e] bg-[#0d0d1a] px-2 py-1.5 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors disabled:opacity-40 text-center"
                      />

                      {/* Hours result */}
                      <span className={`text-right text-sm font-semibold ${day.enabled ? "text-[#9d90f5]" : "text-[#555566]"}`}>
                        {day.enabled ? result.display : "—"}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Hourly Rate */}
              <div className="mt-6 pt-5 border-t border-[#1e1e2e]">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Hourly Rate (optional — for gross pay)
                </label>
                <div className="relative max-w-xs">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] pointer-events-none">$</span>
                  <input
                    type="number"
                    step="0.01"
                    min="0"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 pl-9 pr-4 text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>
            </div>

            {/* Results Panel */}
            <div className="space-y-4">
              {/* Total Hours */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">Weekly Summary</h2>
                <div className="space-y-3">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Total Hours</div>
                    <div className="text-3xl font-bold text-[#9d90f5]">
                      {results.totalHours.toFixed(2)}
                    </div>
                    <div className="text-xs text-[#555566] mt-1">
                      {formatHoursMinutes(results.totalMinutes)}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-3">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Regular</div>
                      <div className="text-xl font-bold text-[#00e676]">
                        {results.regularHours.toFixed(2)}h
                      </div>
                      <div className="text-xs text-[#555566]">≤ 40 hrs</div>
                    </div>
                    <div className="rounded-xl border border-[results.overtimeHours > 0 ? '#f59e0b' : '#1e1e2e'] bg-[#0a0a0f] p-3">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Overtime</div>
                      <div className={`text-xl font-bold ${results.overtimeHours > 0 ? "text-[#f59e0b]" : "text-[#555566]"}`}>
                        {results.overtimeHours.toFixed(2)}h
                      </div>
                      <div className="text-xs text-[#555566]">&gt; 40 hrs</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Pay Breakdown */}
              {results.rate > 0 && (
                <div className="rounded-2xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 backdrop-blur-sm p-6">
                  <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">Pay Breakdown</h2>
                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#8888a0]">Regular pay</span>
                      <span className="text-[#e0e0ea] font-medium">${results.regularPay.toFixed(2)}</span>
                    </div>
                    {results.overtimeHours > 0 && (
                      <div className="flex justify-between">
                        <span className="text-[#8888a0]">Overtime pay (1.5x)</span>
                        <span className="text-[#f59e0b] font-medium">${results.overtimePay.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="border-t border-[#1e1e2e] pt-2 flex justify-between">
                      <span className="text-[#c0c0d0] font-semibold">Gross Pay</span>
                      <span className="text-[#9d90f5] font-bold text-lg">${results.grossPay.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="text-xs text-[#555566]">Before taxes and deductions</div>
                </div>
              )}

              {/* Days Worked */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 p-5">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">Days Worked</div>
                <div className="text-2xl font-bold text-white">
                  {days.filter((d) => d.enabled).length}
                </div>
                <div className="text-xs text-[#555566]">of 7 days</div>
              </div>
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">How It Works</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Schedule",
                  description: "Toggle each day on or off, enter your start and end times, and input unpaid break minutes. The calculator handles shifts that cross midnight automatically.",
                },
                {
                  step: "2",
                  title: "See Daily Totals",
                  description: "Each row instantly shows hours worked for that day in hours and minutes format. Disabled days are excluded from the weekly total.",
                },
                {
                  step: "3",
                  title: "Review Summary & Pay",
                  description: "The weekly panel shows total hours split into regular (up to 40) and overtime (over 40). Enter an hourly rate to see your estimated gross pay.",
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
                  title: "Overtime Calculator",
                  description: "Calculate overtime pay, total weekly pay, and effective hourly rate.",
                  href: "/tools/overtime-calculator",
                },
                {
                  title: "Hours Calculator",
                  description: "Calculate time duration between two times with multiple ranges.",
                  href: "/tools/hours-calculator",
                },
                {
                  title: "Salary Calculator",
                  description: "Convert between salary, hourly, daily, weekly, and monthly pay rates.",
                  href: "/tools/salary-calculator",
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
