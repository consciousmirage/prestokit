"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

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
      <span className="text-[#f0f0f5]">Date Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

type Mode = "between" | "addSubtract" | "countdown";

const MODES: { key: Mode; label: string; description: string }[] = [
  {
    key: "between",
    label: "Days Between",
    description: "Calculate days between two dates",
  },
  {
    key: "addSubtract",
    label: "Add/Subtract Days",
    description: "Add or subtract days from a date",
  },
  {
    key: "countdown",
    label: "Countdown",
    description: "Live countdown to a date",
  },
];

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const FAQ_DATA = [
  {
    question: "How is the number of days between two dates calculated?",
    answer:
      "The calculator finds the absolute difference between two dates in milliseconds, then converts to days by dividing by 86,400,000 (the number of milliseconds in a day). It accounts for daylight saving time changes and leap years automatically.",
  },
  {
    question: "What counts as a business day?",
    answer:
      "Business days are Monday through Friday, excluding Saturday and Sunday. Our business day calculation counts only weekdays between the two dates. Note that public holidays are not excluded, as they vary by country and region.",
  },
  {
    question: "Does the calculator account for leap years?",
    answer:
      "Yes. The calculator uses JavaScript's built-in Date object which correctly handles leap years (years divisible by 4, except century years not divisible by 400). February 29 is properly accounted for in all calculations.",
  },
  {
    question: "How does the countdown timer work?",
    answer:
      "The countdown timer calculates the difference between the current time and your target date in real time, updating every second. It shows days, hours, minutes, and seconds remaining. If the target date has passed, it shows how long ago the date was.",
  },
  {
    question: "Can I calculate months and years between dates?",
    answer:
      "Yes. In addition to total days, the results show the difference broken down into years, months, weeks, and days. The month and year calculations use calendar months rather than fixed 30-day periods for accuracy.",
  },
  {
    question: "How does add/subtract days work?",
    answer:
      "Enter a starting date and a number of days to add or subtract. The calculator will compute the resulting date, accounting for different month lengths, leap years, and calendar boundaries. The result includes the day of the week and a full breakdown.",
  },
];

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toDateStr(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function getBusinessDays(start: Date, end: Date): number {
  const s = new Date(Math.min(start.getTime(), end.getTime()));
  const e = new Date(Math.max(start.getTime(), end.getTime()));
  let count = 0;
  const current = new Date(s);
  current.setDate(current.getDate() + 1); // exclude start date
  while (current <= e) {
    const dow = current.getDay();
    if (dow !== 0 && dow !== 6) count++;
    current.setDate(current.getDate() + 1);
  }
  return count;
}

function getDetailedDiff(start: Date, end: Date) {
  const s = start < end ? start : end;
  const e = start < end ? end : start;

  const totalMs = e.getTime() - s.getTime();
  const totalDays = Math.floor(totalMs / 86400000);
  const totalWeeks = Math.floor(totalDays / 7);
  const totalHours = Math.floor(totalMs / 3600000);
  const totalMinutes = Math.floor(totalMs / 60000);

  // Calendar-based year/month diff
  let years = e.getFullYear() - s.getFullYear();
  let months = e.getMonth() - s.getMonth();
  let days = e.getDate() - s.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(e.getFullYear(), e.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  return {
    totalDays,
    totalWeeks,
    totalHours,
    totalMinutes,
    years,
    months,
    days,
  };
}

/* ------------------------------------------------------------------ */
/*  Result Display                                                     */
/* ------------------------------------------------------------------ */

function ResultCard({
  label,
  value,
  sub,
  color = "purple",
}: {
  label: string;
  value: string;
  sub?: string;
  color?: "purple" | "green" | "white";
}) {
  const colorMap = {
    purple: "text-[#9d90f5]",
    green: "text-[#00e676]",
    white: "text-white",
  };

  return (
    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
        {label}
      </div>
      <div className={`text-2xl sm:text-3xl font-bold ${colorMap[color]}`}>
        {value}
      </div>
      {sub && <div className="text-xs text-[#555566] mt-1">{sub}</div>}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Countdown Component                                                */
/* ------------------------------------------------------------------ */

function CountdownDisplay({ targetDate }: { targetDate: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!targetDate || !now) {
    return (
      <div className="text-center text-[#555566] py-8">
        Select a target date to start the countdown
      </div>
    );
  }

  const target = new Date(targetDate + "T00:00:00");
  const diff = target.getTime() - now.getTime();
  const isPast = diff < 0;
  const absDiff = Math.abs(diff);

  const days = Math.floor(absDiff / 86400000);
  const hours = Math.floor((absDiff % 86400000) / 3600000);
  const minutes = Math.floor((absDiff % 3600000) / 60000);
  const seconds = Math.floor((absDiff % 60000) / 1000);

  return (
    <div>
      {isPast && (
        <div className="text-center text-red-400 text-sm font-medium mb-4">
          This date has already passed
        </div>
      )}
      <div className="grid grid-cols-4 gap-3">
        {[
          { label: "Days", value: days },
          { label: "Hours", value: hours },
          { label: "Minutes", value: minutes },
          { label: "Seconds", value: seconds },
        ].map((item) => (
          <div
            key={item.label}
            className={`rounded-xl border p-4 sm:p-6 text-center ${
              isPast
                ? "border-red-500/30 bg-red-500/5"
                : "border-[#7c6cf0]/30 bg-[#7c6cf0]/5"
            }`}
          >
            <div
              className={`text-3xl sm:text-5xl font-bold tabular-nums ${
                isPast ? "text-red-400" : "text-[#00e676]"
              }`}
            >
              {String(item.value).padStart(2, "0")}
            </div>
            <div className="text-xs text-[#8888a0] mt-2 uppercase tracking-wide">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center text-sm text-[#8888a0]">
        {isPast ? "ago" : "remaining"} until{" "}
        <span className="text-white font-medium">
          {target.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function DateCalculatorPage() {
  const [mode, setMode] = useState<Mode>("between");

  // Mode 1: Between
  const [date1, setDate1] = useState("");
  const [date2, setDate2] = useState("");

  // Mode 2: Add/Subtract
  const [baseDate, setBaseDate] = useState("");
  const [daysToAdd, setDaysToAdd] = useState("30");
  const [addOrSubtract, setAddOrSubtract] = useState<"add" | "subtract">(
    "add"
  );

  // Mode 3: Countdown
  const [countdownDate, setCountdownDate] = useState("");

  // Business days toggle
  const [showBusinessDays, setShowBusinessDays] = useState(false);

  // Initialize dates on client only
  const initDates = useCallback(() => {
    const today = new Date();
    const todayStr = toDateStr(today);
    if (!date1) setDate1(todayStr);
    if (!date2) {
      const future = new Date(today);
      future.setDate(future.getDate() + 30);
      setDate2(toDateStr(future));
    }
    if (!baseDate) setBaseDate(todayStr);
    if (!countdownDate) {
      const ny = new Date(today.getFullYear() + 1, 0, 1);
      setCountdownDate(toDateStr(ny));
    }
  }, [date1, date2, baseDate, countdownDate]);

  useEffect(() => {
    initDates();
  }, [initDates]);

  // Mode 1 results
  const betweenResults = useMemo(() => {
    if (!date1 || !date2) return null;
    const d1 = new Date(date1 + "T00:00:00");
    const d2 = new Date(date2 + "T00:00:00");
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return null;
    const detailed = getDetailedDiff(d1, d2);
    const businessDays = getBusinessDays(d1, d2);
    return {
      ...detailed,
      businessDays,
      date1Day: DAY_NAMES[d1.getDay()],
      date2Day: DAY_NAMES[d2.getDay()],
    };
  }, [date1, date2]);

  // Mode 2 results
  const addSubtractResult = useMemo(() => {
    if (!baseDate || !daysToAdd) return null;
    const d = new Date(baseDate + "T00:00:00");
    if (isNaN(d.getTime())) return null;
    const days = parseInt(daysToAdd) || 0;
    const result = new Date(d);
    result.setDate(
      result.getDate() + (addOrSubtract === "add" ? days : -days)
    );
    return {
      date: result,
      dateStr: toDateStr(result),
      dayName: DAY_NAMES[result.getDay()],
      formatted: result.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    };
  }, [baseDate, daysToAdd, addOrSubtract]);

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

  const inputSectionClasses =
    "rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8";

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
              Date{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Calculate days between dates, add or subtract days, and countdown
              to events with a live timer.
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-3 gap-3 mb-8">
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

          {/* ==================== MODE 1: Days Between ==================== */}
          {mode === "between" && (
            <div className={inputSectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Days Between Two Dates
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Calculate the difference between any two dates.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Start Date
                  </label>
                  <input
                    type="date"
                    value={date1}
                    onChange={(e) => setDate1(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors [color-scheme:dark]"
                  />
                  {betweenResults && (
                    <div className="text-xs text-[#555566] mt-1">
                      {betweenResults.date1Day}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    End Date
                  </label>
                  <input
                    type="date"
                    value={date2}
                    onChange={(e) => setDate2(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors [color-scheme:dark]"
                  />
                  {betweenResults && (
                    <div className="text-xs text-[#555566] mt-1">
                      {betweenResults.date2Day}
                    </div>
                  )}
                </div>
              </div>

              {/* Business days toggle */}
              <button
                onClick={() => setShowBusinessDays(!showBusinessDays)}
                className={`flex items-center gap-3 rounded-xl border p-3 mb-6 transition-all ${
                  showBusinessDays
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                    : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40"
                }`}
              >
                <div
                  className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
                    showBusinessDays
                      ? "border-[#7c6cf0] bg-[#7c6cf0]"
                      : "border-[#555566]"
                  }`}
                >
                  {showBusinessDays && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  )}
                </div>
                <span
                  className={`text-sm font-medium ${
                    showBusinessDays ? "text-white" : "text-[#8888a0]"
                  }`}
                >
                  Show business days (exclude weekends)
                </span>
              </button>

              {betweenResults && (
                <>
                  {/* Main result */}
                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-6 text-center mb-6">
                    <div className="text-5xl sm:text-6xl font-bold text-[#00e676] mb-1">
                      {betweenResults.totalDays.toLocaleString()}
                    </div>
                    <div className="text-sm text-[#8888a0]">total days</div>
                    {showBusinessDays && (
                      <div className="mt-2 text-lg font-semibold text-[#9d90f5]">
                        {betweenResults.businessDays.toLocaleString()} business
                        days
                      </div>
                    )}
                  </div>

                  {/* Detailed breakdown */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
                    <ResultCard
                      label="Years"
                      value={String(betweenResults.years)}
                      color="purple"
                    />
                    <ResultCard
                      label="Months"
                      value={String(betweenResults.months)}
                      color="purple"
                    />
                    <ResultCard
                      label="Weeks"
                      value={betweenResults.totalWeeks.toLocaleString()}
                      color="white"
                    />
                    <ResultCard
                      label="Days"
                      value={String(betweenResults.days)}
                      color="white"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <ResultCard
                      label="Total Hours"
                      value={betweenResults.totalHours.toLocaleString()}
                      color="green"
                    />
                    <ResultCard
                      label="Total Minutes"
                      value={betweenResults.totalMinutes.toLocaleString()}
                      color="green"
                    />
                  </div>

                  {/* Summary */}
                  <div className="mt-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-4 text-center">
                    <span className="text-sm text-[#8888a0]">
                      {betweenResults.years > 0 &&
                        `${betweenResults.years} year${betweenResults.years !== 1 ? "s" : ""}, `}
                      {betweenResults.months > 0 &&
                        `${betweenResults.months} month${betweenResults.months !== 1 ? "s" : ""}, `}
                      {betweenResults.days} day
                      {betweenResults.days !== 1 ? "s" : ""}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ==================== MODE 2: Add/Subtract Days ==================== */}
          {mode === "addSubtract" && (
            <div className={inputSectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Add or Subtract Days
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Calculate a new date by adding or subtracting days.
              </p>

              {/* Direction Toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setAddOrSubtract("add")}
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    addOrSubtract === "add"
                      ? "border-[#00e676] bg-[#00e676]/10 text-[#00e676]"
                      : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#00e676]/40"
                  }`}
                >
                  + Add Days
                </button>
                <button
                  onClick={() => setAddOrSubtract("subtract")}
                  className={`flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all ${
                    addOrSubtract === "subtract"
                      ? "border-red-500 bg-red-500/10 text-red-400"
                      : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-red-500/40"
                  }`}
                >
                  - Subtract Days
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Starting Date
                  </label>
                  <input
                    type="date"
                    value={baseDate}
                    onChange={(e) => setBaseDate(e.target.value)}
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors [color-scheme:dark]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={daysToAdd}
                    onChange={(e) => setDaysToAdd(e.target.value)}
                    placeholder="e.g. 30"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              </div>

              {/* Quick add buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[7, 14, 30, 60, 90, 180, 365].map((d) => (
                  <button
                    key={d}
                    onClick={() => setDaysToAdd(String(d))}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      daysToAdd === String(d)
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    {d} days
                  </button>
                ))}
              </div>

              {addSubtractResult && (
                <>
                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-6 text-center">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                      Resulting Date
                    </div>
                    <div className="text-3xl sm:text-4xl font-bold text-[#00e676] mb-1">
                      {addSubtractResult.formatted}
                    </div>
                    <div className="text-sm text-[#8888a0]">
                      {addSubtractResult.dayName}
                    </div>
                  </div>

                  <div className="mt-4 rounded-lg bg-[#0a0a0f] border border-[#1e1e2e] p-4 text-center">
                    <span className="text-sm text-[#8888a0]">
                      {baseDate &&
                        new Date(baseDate + "T00:00:00").toLocaleDateString(
                          "en-US",
                          {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          }
                        )}{" "}
                      {addOrSubtract === "add" ? "+" : "-"} {daysToAdd} day
                      {parseInt(daysToAdd) !== 1 ? "s" : ""} ={" "}
                      {addSubtractResult.date.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ==================== MODE 3: Countdown ==================== */}
          {mode === "countdown" && (
            <div className={inputSectionClasses}>
              <h2 className="text-lg font-semibold text-white mb-1">
                Countdown Timer
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                Live countdown to a specific date, updating every second.
              </p>

              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Target Date
                </label>
                <input
                  type="date"
                  value={countdownDate}
                  onChange={(e) => setCountdownDate(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors [color-scheme:dark]"
                />
              </div>

              {/* Quick countdown buttons */}
              <div className="flex flex-wrap gap-2 mb-6">
                {[
                  { label: "New Year", getDate: () => { const d = new Date(); return toDateStr(new Date(d.getFullYear() + 1, 0, 1)); } },
                  { label: "+7 days", getDate: () => { const d = new Date(); d.setDate(d.getDate() + 7); return toDateStr(d); } },
                  { label: "+30 days", getDate: () => { const d = new Date(); d.setDate(d.getDate() + 30); return toDateStr(d); } },
                  { label: "+90 days", getDate: () => { const d = new Date(); d.setDate(d.getDate() + 90); return toDateStr(d); } },
                  { label: "+1 year", getDate: () => { const d = new Date(); d.setFullYear(d.getFullYear() + 1); return toDateStr(d); } },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setCountdownDate(item.getDate())}
                    className="rounded-lg border border-[#1e1e2e] bg-[#0a0a0f] px-3 py-1.5 text-xs font-medium text-[#8888a0] hover:border-[#7c6cf0]/40 transition-all"
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <CountdownDisplay targetDate={countdownDate} />
            </div>
          )}

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
                    "Select from three modes: calculate days between two dates, add or subtract days from a date, or set up a live countdown timer to a future event.",
                },
                {
                  step: "2",
                  title: "Enter Your Dates",
                  description:
                    "Use the date pickers to select your dates. For the add/subtract mode, also enter the number of days. Toggle business days to exclude weekends from your calculation.",
                },
                {
                  step: "3",
                  title: "View Results",
                  description:
                    "See detailed results including days, weeks, months, years, hours, and minutes. The countdown mode updates every second in real time. All calculations handle leap years automatically.",
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
                  title: "Unit Converter",
                  description:
                    "Convert between units across 8 categories including time.",
                  href: "/tools/unit-converter",
                },
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
