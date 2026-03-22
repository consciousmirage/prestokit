"use client";

import { useState, useMemo, useEffect } from "react";

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
      <span className="text-[#f0f0f5]">Age Calculator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Age Calculation Helpers                                            */
/* ------------------------------------------------------------------ */

interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalWeeks: number;
  totalMonths: number;
  totalHours: number;
  totalMinutes: number;
  nextBirthday: Date;
  daysUntilBirthday: number;
  dayOfBirth: string;
  zodiacSign: string;
  birthstone: string;
}

function calculateAge(birthDate: Date, today: Date): AgeResult {
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();

  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  if (months < 0) {
    years--;
    months += 12;
  }

  const diffMs = today.getTime() - birthDate.getTime();
  const totalDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);
  const totalMonths = years * 12 + months;
  const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
  const totalMinutes = Math.floor(diffMs / (1000 * 60));

  // Next birthday
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday.getTime() <= today.getTime()) {
    nextBirthday = new Date(today.getFullYear() + 1, birthDate.getMonth(), birthDate.getDate());
  }
  const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const dayOfBirth = daysOfWeek[birthDate.getDay()];

  // Zodiac sign
  const month = birthDate.getMonth() + 1;
  const day = birthDate.getDate();
  const zodiacSign = getZodiacSign(month, day);
  const birthstone = getBirthstone(birthDate.getMonth());

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    totalMonths,
    totalHours,
    totalMinutes,
    nextBirthday,
    daysUntilBirthday,
    dayOfBirth,
    zodiacSign,
    birthstone,
  };
}

function getZodiacSign(month: number, day: number): string {
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return "Aquarius";
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return "Pisces";
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return "Aries";
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return "Taurus";
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return "Gemini";
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return "Cancer";
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return "Leo";
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return "Virgo";
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return "Libra";
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return "Scorpio";
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return "Sagittarius";
  return "Capricorn";
}

function getBirthstone(monthIndex: number): string {
  const stones = [
    "Garnet", "Amethyst", "Aquamarine", "Diamond", "Emerald", "Pearl",
    "Ruby", "Peridot", "Sapphire", "Opal", "Topaz", "Tanzanite",
  ];
  return stones[monthIndex];
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How does the age calculator work?",
    answer:
      "The age calculator takes your date of birth and calculates the exact difference between that date and today. It accounts for varying month lengths and leap years to give you a precise age in years, months, and days. It also converts your age into total days, weeks, hours, and minutes.",
  },
  {
    question: "How do I calculate my exact age in days?",
    answer:
      "Enter your date of birth in the calculator and it will instantly show your total age in days. The calculation accounts for leap years (years divisible by 4, except century years not divisible by 400). For a quick estimate, multiply your age in years by 365.25.",
  },
  {
    question: "What is a birthday countdown?",
    answer:
      "The birthday countdown shows how many days are left until your next birthday. After you enter your date of birth, the calculator automatically determines your next birthday date and counts the days remaining. On your birthday, it will show 0 days or roll over to 365/366 for the next year.",
  },
  {
    question: "Can I calculate age between two dates?",
    answer:
      "This calculator computes the difference between your birth date and today's date. The result includes your exact age broken down into years, months, days, and also cumulative totals in days, weeks, hours, and minutes for a complete picture.",
  },
  {
    question: "How are zodiac signs determined?",
    answer:
      "Zodiac signs are based on the position of the sun relative to constellations at the time of your birth. Each sign covers a date range spanning about 30 days. For example, Aries covers March 21 to April 19, Taurus covers April 20 to May 20, and so on through all 12 signs of the zodiac.",
  },
  {
    question: "Is this age calculator accurate for leap years?",
    answer:
      "Yes, the calculator uses JavaScript's built-in Date object which correctly handles leap years. A leap year occurs every 4 years (like 2024), except for century years that are not divisible by 400. This means 2000 was a leap year, but 1900 was not. All date math in this tool respects these rules.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function AgeCalculatorPage() {
  const [birthDate, setBirthDate] = useState("");
  const [now, setNow] = useState<Date>(new Date());

  // Update "now" every minute for live counting
  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const result = useMemo(() => {
    if (!birthDate) return null;
    const bd = new Date(birthDate + "T00:00:00");
    if (isNaN(bd.getTime())) return null;
    if (bd.getTime() > now.getTime()) return null;
    return calculateAge(bd, now);
  }, [birthDate, now]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Age Calculator",
    description:
      "Calculate your exact age in years, months, days, hours, and minutes. Includes birthday countdown and zodiac sign.",
    url: "https://prestokit.com/tools/age-calculator",
    applicationCategory: "UtilityApplication",
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

  const fmt = (n: number) => n.toLocaleString("en-US");

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
              Age{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Calculator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Find out exactly how old you are in years, months, days, hours, and
              minutes. See your birthday countdown, zodiac sign, and fun age
              statistics.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Your Date of Birth
                </label>
                <input
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split("T")[0]}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 px-4 text-xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors [color-scheme:dark]"
                />
              </div>

              {result && (
                <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-2">
                    Your Exact Age
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold text-white">
                    {result.years}{" "}
                    <span className="text-lg text-[#8888a0] font-normal">years</span>{" "}
                    {result.months}{" "}
                    <span className="text-lg text-[#8888a0] font-normal">months</span>{" "}
                    {result.days}{" "}
                    <span className="text-lg text-[#8888a0] font-normal">days</span>
                  </div>
                </div>
              )}

              {result && (
                <div className="mt-6 rounded-xl border border-[#00e676]/30 bg-[#00e676]/5 p-5 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                    Next Birthday In
                  </div>
                  <div className="text-4xl font-bold text-[#00e676]">
                    {result.daysUntilBirthday}
                  </div>
                  <div className="text-sm text-[#8888a0] mt-1">
                    {result.daysUntilBirthday === 1 ? "day" : "days"} &mdash;{" "}
                    {result.nextBirthday.toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {result && (
                <>
                  <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                    <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                      Age Breakdown
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: "Total Months", value: fmt(result.totalMonths) },
                        { label: "Total Weeks", value: fmt(result.totalWeeks) },
                        { label: "Total Days", value: fmt(result.totalDays) },
                        { label: "Total Hours", value: fmt(result.totalHours) },
                        { label: "Total Minutes", value: fmt(result.totalMinutes) },
                        {
                          label: "Born On",
                          value: result.dayOfBirth,
                        },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4"
                        >
                          <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                            {item.label}
                          </div>
                          <div className="text-lg font-bold text-white">
                            {item.value}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                    <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                      Fun Facts
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-4">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Zodiac Sign
                        </div>
                        <div className="text-lg font-bold text-[#9d90f5]">
                          {result.zodiacSign}
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Birthstone
                        </div>
                        <div className="text-lg font-bold text-white">
                          {result.birthstone}
                        </div>
                      </div>
                      <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 col-span-2">
                        <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                          Heartbeats (est.)
                        </div>
                        <div className="text-lg font-bold text-[#ff5252]">
                          ~{fmt(result.totalMinutes * 72)}
                        </div>
                        <div className="text-xs text-[#555566] mt-1">
                          At ~72 beats per minute average
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {!result && (
                <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 flex items-center justify-center min-h-[300px]">
                  <div className="text-center text-[#555566]">
                    <div className="text-5xl mb-4">&#x1F382;</div>
                    <p className="text-lg">Enter your date of birth to get started</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Birthday",
                  description:
                    "Select or type your date of birth using the date picker. The calculator accepts any past date.",
                },
                {
                  step: "2",
                  title: "Get Instant Results",
                  description:
                    "Your exact age appears immediately in years, months, and days. No buttons to click — it calculates as you type.",
                },
                {
                  step: "3",
                  title: "Explore Age Stats",
                  description:
                    "See your total days alive, hours, minutes, birthday countdown, zodiac sign, birthstone, and estimated heartbeats.",
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
                  title: "Date Calculator",
                  description:
                    "Calculate days between dates, add/subtract days, and countdown timers.",
                  href: "/tools/date-calculator",
                },
                {
                  title: "BMI Calculator",
                  description:
                    "Calculate your Body Mass Index with Imperial or Metric units.",
                  href: "/tools/bmi-calculator",
                },
                {
                  title: "Percentage Calculator",
                  description:
                    "Calculate percentages, percentage change, increase, and decrease.",
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
