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
      <span className="text-[#f0f0f5]">Hourly to Salary Converter</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How do you convert an hourly rate to an annual salary?",
    answer:
      "Multiply your hourly rate by the number of hours you work per week, then multiply by the number of weeks you work per year. The standard formula is: Annual Salary = Hourly Rate x Hours per Week x Weeks per Year. For a typical full-time worker at $25/hour: $25 x 40 hours x 52 weeks = $52,000 per year.",
  },
  {
    question: "How many work hours are in a year?",
    answer:
      "A standard full-time work year is 2,080 hours (40 hours per week x 52 weeks). However, if you take unpaid time off, your actual working hours will be less. For example, with 2 weeks unpaid vacation, you'd work 2,000 hours (40 x 50 weeks). This calculator lets you adjust both hours per week and weeks per year to match your situation.",
  },
  {
    question: "What is a good hourly rate?",
    answer:
      "A 'good' hourly rate depends on your location, industry, experience, and cost of living. As a reference, the federal minimum wage is $7.25/hour ($15,080/year), the median US hourly wage is approximately $22-28/hour ($45,760-$58,240/year), and highly skilled professionals can earn $50-150+/hour. Use this calculator to see how different hourly rates translate to annual salaries.",
  },
  {
    question: "Should I include overtime in the calculation?",
    answer:
      "This calculator computes your base salary at your regular hourly rate. If you regularly work overtime, you have two options: (1) increase the 'hours per week' field to include overtime hours at your regular rate for a rough estimate, or (2) calculate your base salary and overtime pay separately. Remember that overtime is typically 1.5x your regular rate for hours over 40 per week.",
  },
  {
    question: "How do I calculate biweekly pay from an hourly rate?",
    answer:
      "Biweekly pay is what you earn every two weeks. Multiply your hourly rate by the number of hours you work per week, then multiply by 2. For example, at $20/hour working 40 hours/week: $20 x 40 x 2 = $1,600 biweekly. There are 26 biweekly pay periods in a year (52 weeks / 2).",
  },
  {
    question: "What is the difference between salary and hourly pay?",
    answer:
      "Salaried employees receive a fixed annual amount regardless of hours worked and are typically exempt from overtime. Hourly employees are paid for each hour worked and usually qualify for overtime pay (1.5x rate) after 40 hours/week. Salary offers more income predictability, while hourly pay can be higher with overtime. Benefits eligibility may also differ between the two.",
  },
  {
    question: "Does this calculator account for taxes?",
    answer:
      "This calculator shows your gross (pre-tax) pay at various intervals. Your actual take-home pay will be lower after federal income tax, state income tax (if applicable), Social Security (6.2%), and Medicare (1.45%) are deducted. For a full after-tax estimate, try our Tax Calculator or Paycheck Calculator tools.",
  },
];

/* ------------------------------------------------------------------ */
/*  Common Hourly Rate Presets                                         */
/* ------------------------------------------------------------------ */

const RATE_PRESETS = [10, 15, 20, 25, 30, 35, 40, 50, 60, 75, 100];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HourlyToSalaryPage() {
  const [hourlyRate, setHourlyRate] = useState("");
  const [hoursPerWeek, setHoursPerWeek] = useState("40");
  const [weeksPerYear, setWeeksPerYear] = useState("52");

  const results = useMemo(() => {
    const rate = parseFloat(hourlyRate) || 0;
    const hpw = parseFloat(hoursPerWeek) || 40;
    const wpy = parseFloat(weeksPerYear) || 52;

    const annualSalary = rate * hpw * wpy;
    const monthlySalary = annualSalary / 12;
    const biweeklySalary = rate * hpw * 2;
    const weeklySalary = rate * hpw;
    const dailySalary = rate * (hpw / 5); // Assumes 5-day work week
    const totalHoursPerYear = hpw * wpy;

    return {
      rate,
      hpw,
      wpy,
      annualSalary,
      monthlySalary,
      biweeklySalary,
      weeklySalary,
      dailySalary,
      totalHoursPerYear,
    };
  }, [hourlyRate, hoursPerWeek, weeksPerYear]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Hourly to Salary Calculator",
    description:
      "Convert your hourly rate to annual salary. See yearly, monthly, biweekly, weekly, and daily pay breakdowns.",
    url: "https://prestokit.com/tools/hourly-to-salary",
    applicationCategory: "FinanceApplication",
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

  const fmt = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 });

  const fmt2 = (n: number) =>
    n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

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
              Hourly to Salary{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Converter
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Convert your hourly rate to an annual salary. See your yearly, monthly,
              biweekly, weekly, and daily pay. Adjust hours per week and weeks per year
              for an accurate calculation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Hourly Rate */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Hourly Rate
                </label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8888a0] text-lg pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    step="0.25"
                    min="0"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(e.target.value)}
                    placeholder="25.00"
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-4 pl-9 pr-14 text-2xl text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[#555566] text-sm pointer-events-none">
                    /hr
                  </span>
                </div>
              </div>

              {/* Quick Rate Presets */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Quick Select
                </label>
                <div className="flex flex-wrap gap-2">
                  {RATE_PRESETS.map((rate) => (
                    <button
                      key={rate}
                      onClick={() => setHourlyRate(rate.toString())}
                      className={`rounded-lg border py-1.5 px-3 text-sm font-medium transition-all ${
                        parseFloat(hourlyRate) === rate
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      ${rate}
                    </button>
                  ))}
                </div>
              </div>

              {/* Hours Per Week */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Hours Per Week
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="168"
                  value={hoursPerWeek}
                  onChange={(e) => setHoursPerWeek(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
                <div className="flex gap-2 mt-2">
                  {[20, 30, 35, 40, 45, 50].map((h) => (
                    <button
                      key={h}
                      onClick={() => setHoursPerWeek(h.toString())}
                      className={`rounded-lg border py-1 px-2.5 text-xs font-medium transition-all ${
                        parseFloat(hoursPerWeek) === h
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#555566] hover:border-[#7c6cf0]/40 hover:text-[#8888a0]"
                      }`}
                    >
                      {h}h
                    </button>
                  ))}
                </div>
              </div>

              {/* Weeks Per Year */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Weeks Per Year
                </label>
                <input
                  type="number"
                  step="1"
                  min="1"
                  max="52"
                  value={weeksPerYear}
                  onChange={(e) => setWeeksPerYear(e.target.value)}
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
                <div className="flex gap-2 mt-2">
                  {[48, 49, 50, 51, 52].map((w) => (
                    <button
                      key={w}
                      onClick={() => setWeeksPerYear(w.toString())}
                      className={`rounded-lg border py-1 px-2.5 text-xs font-medium transition-all ${
                        parseFloat(weeksPerYear) === w
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] bg-[#0a0a0f] text-[#555566] hover:border-[#7c6cf0]/40 hover:text-[#8888a0]"
                      }`}
                    >
                      {w}w
                    </button>
                  ))}
                </div>
                <p className="text-xs text-[#555566] mt-2">
                  52 = full year. Reduce for unpaid time off (e.g., 50 = 2 weeks
                  unpaid vacation).
                </p>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Salary Breakdown
                </h2>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#7c6cf0]/30 bg-[#7c6cf0]/5 p-5">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Annual Salary
                    </div>
                    <div className="text-3xl font-bold text-[#00e676]">
                      ${fmt(results.annualSalary)}
                    </div>
                    <div className="text-xs text-[#555566] mt-1">
                      {fmt(results.totalHoursPerYear)} hours/year
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Monthly
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${fmt(results.monthlySalary)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Biweekly
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${fmt(results.biweeklySalary)}
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Weekly
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${fmt(results.weeklySalary)}
                      </div>
                    </div>
                    <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                      <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                        Daily
                      </div>
                      <div className="text-2xl font-bold text-white">
                        ${fmt(results.dailySalary)}
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                      Hourly Rate
                    </div>
                    <div className="text-lg font-bold text-[#9d90f5]">
                      ${fmt2(results.rate)}/hr
                    </div>
                    <div className="text-xs text-[#555566] mt-1">
                      {results.hpw} hrs/week &times; {results.wpy} weeks/year
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          {results.rate > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-16">
              <h2 className="text-lg font-semibold text-white mb-4">
                Rate Comparison Table
              </h2>
              <p className="text-sm text-[#8888a0] mb-6">
                See how different hourly rates compare at {results.hpw} hours/week,{" "}
                {results.wpy} weeks/year.
              </p>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-[#1e1e2e]">
                      <th className="text-left text-[#8888a0] font-medium pb-3 pr-4">
                        Hourly
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Weekly
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Biweekly
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 px-4">
                        Monthly
                      </th>
                      <th className="text-right text-[#8888a0] font-medium pb-3 pl-4">
                        Annual
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      // Build a set of comparison rates centered around the user's rate
                      const base = results.rate;
                      const rates = new Set<number>();
                      // Always include some common reference points
                      [10, 15, 20, 25, 30, 40, 50, 75, 100].forEach((r) => {
                        if (Math.abs(r - base) <= 30 || r <= base + 15) rates.add(r);
                      });
                      // Always include the user's rate
                      rates.add(base);
                      const sorted = Array.from(rates).sort((a, b) => a - b);
                      // Limit to 8 entries
                      const limited = sorted.slice(0, 8);

                      return limited.map((r) => {
                        const weekly = r * results.hpw;
                        const biweekly = weekly * 2;
                        const annual = r * results.hpw * results.wpy;
                        const monthly = annual / 12;
                        const isUserRate = r === base;
                        return (
                          <tr
                            key={r}
                            className={`border-b border-[#1e1e2e]/60 ${
                              isUserRate ? "bg-[#7c6cf0]/5" : ""
                            }`}
                          >
                            <td
                              className={`py-3 pr-4 font-semibold ${
                                isUserRate ? "text-[#9d90f5]" : "text-[#c0c0d0]"
                              }`}
                            >
                              ${fmt2(r)}
                              {isUserRate && (
                                <span className="ml-2 text-xs text-[#7c6cf0]">
                                  (you)
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4 text-right text-[#c0c0d0]">
                              ${fmt(weekly)}
                            </td>
                            <td className="py-3 px-4 text-right text-[#c0c0d0]">
                              ${fmt(biweekly)}
                            </td>
                            <td className="py-3 px-4 text-right text-[#c0c0d0]">
                              ${fmt(monthly)}
                            </td>
                            <td
                              className={`py-3 pl-4 text-right font-semibold ${
                                isUserRate ? "text-[#00e676]" : "text-white"
                              }`}
                            >
                              ${fmt(annual)}
                            </td>
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
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
                  title: "Enter Hourly Rate",
                  description:
                    "Type in your hourly wage or select a quick preset. You can enter any amount, including cents.",
                },
                {
                  step: "2",
                  title: "Adjust Your Schedule",
                  description:
                    "Set how many hours you work per week and how many weeks per year (reduce for unpaid time off).",
                },
                {
                  step: "3",
                  title: "See All Pay Periods",
                  description:
                    "Instantly see your annual salary, plus monthly, biweekly, weekly, and daily breakdowns. Compare with the rate table.",
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
                  title: "Salary Calculator",
                  description:
                    "Convert between hourly, daily, monthly, and annual salary rates.",
                  href: "/tools/salary-calculator",
                },
                {
                  title: "Paycheck Calculator",
                  description:
                    "Estimate your take-home pay after all taxes and deductions.",
                  href: "/tools/paycheck-calculator",
                },
                {
                  title: "Tax Calculator",
                  description:
                    "Estimate your federal income tax by bracket with effective and marginal rates.",
                  href: "/tools/tax-calculator",
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

          {/* ==================== PROMO BANNERS ==================== */}
          <div className="mt-10">
            <PromoBar
              type="pro"
              dismissKey="hourly-salary-pro"
            />
          </div>
        </div>
      </main>
    </>
  );
}
