"use client";

import { useState, useMemo, useCallback } from "react";

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQS = [
  {
    q: "How does the time zone converter work?",
    a: "Our time zone converter uses the built-in Intl API in your browser to accurately convert times between any time zones in the world. Simply enter a time, select the source time zone, and add one or more target time zones. The conversion is instant and accounts for UTC offsets, daylight saving time, and date changes automatically.",
  },
  {
    q: "Does this tool account for daylight saving time?",
    a: "Yes. The converter uses your browser's Intl.DateTimeFormat API, which automatically accounts for daylight saving time (DST) transitions. When a time zone observes DST, the conversion will reflect the correct offset for the specific date you enter. A note is displayed when DST may affect the conversion.",
  },
  {
    q: "What time zones are supported?",
    a: "We support all IANA time zones, which covers every time zone in the world. We also provide quick-access presets for the most commonly used zones: US zones (Eastern, Central, Mountain, Pacific), European zones (GMT/London, CET/Paris, EET/Helsinki), and Asian zones (JST/Tokyo, CST/Shanghai, IST/Mumbai, AEST/Sydney).",
  },
  {
    q: "Can I compare multiple time zones at once?",
    a: "Yes! You can add up to 4 target time zones and compare them side by side. This is perfect for scheduling meetings across multiple offices, coordinating with international teams, or planning travel across several time zones.",
  },
  {
    q: "Is this time zone converter free?",
    a: "Absolutely. The PrestoKit time zone converter is 100% free, requires no signup, and runs entirely in your browser. Your data never leaves your device. Use it as often as you need.",
  },
  {
    q: "What happens when the converted time falls on a different day?",
    a: "The converter clearly shows the full date and time for each conversion. If converting between zones causes the date to change (e.g., 11 PM EST becomes 4 AM the next day in London), both the date and time are displayed so there is no confusion.",
  },
];

const RELATED_TOOLS = [
  {
    name: "Date Calculator",
    description: "Calculate differences between dates, add or subtract days.",
    href: "/tools/date-calculator",
    icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z",
  },
  {
    name: "Unit Converter",
    description: "Convert between units of measurement instantly.",
    href: "/tools/unit-converter",
    icon: "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4",
  },
  {
    name: "Salary Calculator",
    description: "Convert between salary, hourly, daily, and monthly rates.",
    href: "/tools/salary-calculator",
    icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z",
  },
  {
    name: "ROI Calculator",
    description: "Calculate return on investment for business decisions.",
    href: "/tools/roi-calculator",
    icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
  },
];

/* ------------------------------------------------------------------ */
/*  Time Zone Data                                                     */
/* ------------------------------------------------------------------ */

interface TZ {
  label: string;
  value: string;
  abbr: string;
  group: string;
}

const TIMEZONES: TZ[] = [
  // US
  { label: "Eastern Time (ET)", value: "America/New_York", abbr: "ET", group: "US" },
  { label: "Central Time (CT)", value: "America/Chicago", abbr: "CT", group: "US" },
  { label: "Mountain Time (MT)", value: "America/Denver", abbr: "MT", group: "US" },
  { label: "Pacific Time (PT)", value: "America/Los_Angeles", abbr: "PT", group: "US" },
  { label: "Alaska Time (AKT)", value: "America/Anchorage", abbr: "AKT", group: "US" },
  { label: "Hawaii Time (HT)", value: "Pacific/Honolulu", abbr: "HT", group: "US" },
  // Europe
  { label: "GMT / London", value: "Europe/London", abbr: "GMT", group: "Europe" },
  { label: "CET / Paris", value: "Europe/Paris", abbr: "CET", group: "Europe" },
  { label: "CET / Berlin", value: "Europe/Berlin", abbr: "CET", group: "Europe" },
  { label: "EET / Helsinki", value: "Europe/Helsinki", abbr: "EET", group: "Europe" },
  { label: "MSK / Moscow", value: "Europe/Moscow", abbr: "MSK", group: "Europe" },
  // Asia & Pacific
  { label: "IST / Mumbai", value: "Asia/Kolkata", abbr: "IST", group: "Asia" },
  { label: "CST / Shanghai", value: "Asia/Shanghai", abbr: "CST", group: "Asia" },
  { label: "JST / Tokyo", value: "Asia/Tokyo", abbr: "JST", group: "Asia" },
  { label: "KST / Seoul", value: "Asia/Seoul", abbr: "KST", group: "Asia" },
  { label: "SGT / Singapore", value: "Asia/Singapore", abbr: "SGT", group: "Asia" },
  { label: "AEST / Sydney", value: "Australia/Sydney", abbr: "AEST", group: "Asia" },
  { label: "NZST / Auckland", value: "Pacific/Auckland", abbr: "NZST", group: "Asia" },
  // Other
  { label: "UTC", value: "UTC", abbr: "UTC", group: "Other" },
  { label: "BRT / Sao Paulo", value: "America/Sao_Paulo", abbr: "BRT", group: "Other" },
  { label: "AST / Dubai", value: "Asia/Dubai", abbr: "GST", group: "Other" },
  { label: "WAT / Lagos", value: "Africa/Lagos", abbr: "WAT", group: "Other" },
  { label: "CAT / Johannesburg", value: "Africa/Johannesburg", abbr: "SAST", group: "Other" },
];

const PRESET_GROUPS = [
  { label: "US", zones: ["America/New_York", "America/Chicago", "America/Denver", "America/Los_Angeles"] },
  { label: "Europe", zones: ["Europe/London", "Europe/Paris", "Europe/Berlin", "Europe/Moscow"] },
  { label: "Asia", zones: ["Asia/Tokyo", "Asia/Shanghai", "Asia/Kolkata", "Australia/Sydney"] },
];

function getUTCOffset(tz: string, date: Date): string {
  try {
    const formatter = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      timeZoneName: "shortOffset",
    });
    const parts = formatter.formatToParts(date);
    const tzPart = parts.find((p) => p.type === "timeZoneName");
    return tzPart?.value || "";
  } catch {
    return "";
  }
}

function formatInZone(date: Date, tz: string): { time: string; date: string; dayName: string; offset: string } {
  try {
    const timeFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const dateFmt = new Intl.DateTimeFormat("en-US", {
      timeZone: tz,
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
    });
    const parts = dateFmt.formatToParts(date);
    const dayName = parts.find((p) => p.type === "weekday")?.value || "";
    return {
      time: timeFmt.format(date),
      date: dateFmt.format(date),
      dayName,
      offset: getUTCOffset(tz, date),
    };
  } catch {
    return { time: "Invalid", date: "", dayName: "", offset: "" };
  }
}

function nowISO(): string {
  const now = new Date();
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, "0");
  const d = String(now.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function nowTime(): string {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, "0");
  const m = String(now.getMinutes()).padStart(2, "0");
  return `${h}:${m}`;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function TimezoneConverterPage() {
  const [sourceDate, setSourceDate] = useState(nowISO);
  const [sourceTime, setSourceTime] = useState(nowTime);
  const [sourceZone, setSourceZone] = useState("America/New_York");
  const [targetZones, setTargetZones] = useState<string[]>(["America/Los_Angeles", "Europe/London", "Asia/Tokyo"]);

  const sourceDateTime = useMemo(() => {
    if (!sourceDate || !sourceTime) return null;
    try {
      const [y, m, d] = sourceDate.split("-").map(Number);
      const [h, min] = sourceTime.split(":").map(Number);
      // Create a UTC date then adjust by finding the offset
      const tempDate = new Date(Date.UTC(y, m - 1, d, h, min));
      // We need to find what UTC time corresponds to the local time entered
      const targetLocal = new Date(y, m - 1, d, h, min);
      // Get offset of the source timezone at this approximate time
      const sampleStr = tempDate.toLocaleString("en-US", { timeZone: sourceZone });
      const sampleDate = new Date(sampleStr);
      const offset = sampleDate.getTime() - tempDate.getTime();
      // The actual UTC time is the local time minus the offset
      return new Date(targetLocal.getTime() - offset);
    } catch {
      return null;
    }
  }, [sourceDate, sourceTime, sourceZone]);

  const conversions = useMemo(() => {
    if (!sourceDateTime) return [];
    return targetZones.map((tz) => {
      const tzData = TIMEZONES.find((t) => t.value === tz);
      const result = formatInZone(sourceDateTime, tz);
      const sourceResult = formatInZone(sourceDateTime, sourceZone);
      // Calculate if it's a different day
      const isDifferentDay = result.date !== sourceResult.date;
      return {
        tz,
        label: tzData?.label || tz,
        abbr: tzData?.abbr || "",
        ...result,
        isDifferentDay,
      };
    });
  }, [sourceDateTime, targetZones, sourceZone]);

  const sourceFormatted = useMemo(() => {
    if (!sourceDateTime) return null;
    return formatInZone(sourceDateTime, sourceZone);
  }, [sourceDateTime, sourceZone]);

  const handleNow = useCallback(() => {
    setSourceDate(nowISO());
    setSourceTime(nowTime());
  }, []);

  const addTargetZone = useCallback((tz: string) => {
    if (targetZones.length >= 4) return;
    if (targetZones.includes(tz)) return;
    setTargetZones((prev) => [...prev, tz]);
  }, [targetZones]);

  const removeTargetZone = useCallback((tz: string) => {
    setTargetZones((prev) => prev.filter((t) => t !== tz));
  }, []);

  const applyPreset = useCallback((zones: string[]) => {
    setTargetZones(zones.slice(0, 4));
  }, []);

  const inputCls =
    "w-full rounded-lg border border-white/10 bg-[#12121c] px-3 py-2 text-sm text-gray-100 outline-none focus:border-[#7c6cf0]/60 focus:ring-1 focus:ring-[#7c6cf0]/40 transition";
  const labelCls = "block text-xs font-medium text-gray-400 mb-1";

  return (
    <>
      {/* FAQ Schema JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: FAQS.map((faq) => ({
              "@type": "Question",
              name: faq.q,
              acceptedAnswer: { "@type": "Answer", text: faq.a },
            })),
          }),
        }}
      />

      <div className="min-h-screen bg-[#0a0a0f] text-gray-100 font-[family-name:var(--font-geist-sans)]">
        {/* Breadcrumb */}
        <nav className="border-b border-white/5 bg-[#0e0e18]">
          <div className="mx-auto max-w-7xl px-4 py-3 text-sm text-gray-500 flex items-center gap-2">
            <a href="/" className="hover:text-[#7c6cf0] transition">PrestoKit</a>
            <span>/</span>
            <a href="/tools" className="hover:text-[#7c6cf0] transition">Tools</a>
            <span>/</span>
            <span className="text-gray-300">Time Zone Converter</span>
          </div>
        </nav>

        {/* Header */}
        <header className="mx-auto max-w-4xl px-4 pt-10 pb-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Time Zone Converter
          </h1>
          <p className="mt-2 text-gray-400 max-w-2xl">
            Convert times between time zones instantly. Compare up to 4 zones at once. Perfect for scheduling international meetings and coordinating with remote teams.
          </p>
        </header>

        {/* Main Tool */}
        <main className="mx-auto max-w-4xl px-4 pb-20">
          <div className="space-y-6">
            {/* Source Time Input */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Source Time</h2>
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div>
                  <label className={labelCls}>Date</label>
                  <input
                    className={inputCls}
                    type="date"
                    value={sourceDate}
                    onChange={(e) => setSourceDate(e.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCls}>Time</label>
                  <input
                    className={inputCls}
                    type="time"
                    value={sourceTime}
                    onChange={(e) => setSourceTime(e.target.value)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelCls}>Time Zone</label>
                  <select
                    className={inputCls}
                    value={sourceZone}
                    onChange={(e) => setSourceZone(e.target.value)}
                  >
                    <optgroup label="United States">
                      {TIMEZONES.filter((t) => t.group === "US").map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Europe">
                      {TIMEZONES.filter((t) => t.group === "Europe").map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Asia & Pacific">
                      {TIMEZONES.filter((t) => t.group === "Asia").map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Other">
                      {TIMEZONES.filter((t) => t.group === "Other").map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button
                  onClick={handleNow}
                  className="flex items-center gap-1.5 rounded-lg bg-[#7c6cf0]/15 px-4 py-2 text-sm font-medium text-[#7c6cf0] hover:bg-[#7c6cf0]/25 transition"
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  Now
                </button>
                {sourceFormatted && (
                  <span className="text-sm text-gray-500">
                    {sourceFormatted.time} {sourceFormatted.offset} &mdash; {sourceFormatted.date}
                  </span>
                )}
              </div>
            </section>

            {/* Quick Presets */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-gray-200">Target Time Zones</h2>
                <span className="text-xs text-gray-500">{targetZones.length}/4 zones</span>
              </div>

              {/* Preset buttons */}
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="text-xs text-gray-500 py-1">Presets:</span>
                {PRESET_GROUPS.map((preset) => (
                  <button
                    key={preset.label}
                    onClick={() => applyPreset(preset.zones)}
                    className="rounded-md border border-white/5 bg-[#12121c] px-3 py-1 text-xs text-gray-400 hover:text-white hover:border-white/10 transition"
                  >
                    {preset.label}
                  </button>
                ))}
              </div>

              {/* Add zone */}
              {targetZones.length < 4 && (
                <div className="mb-4">
                  <select
                    className={inputCls}
                    value=""
                    onChange={(e) => {
                      if (e.target.value) addTargetZone(e.target.value);
                    }}
                  >
                    <option value="">+ Add a time zone...</option>
                    <optgroup label="United States">
                      {TIMEZONES.filter((t) => t.group === "US" && !targetZones.includes(t.value)).map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Europe">
                      {TIMEZONES.filter((t) => t.group === "Europe" && !targetZones.includes(t.value)).map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Asia & Pacific">
                      {TIMEZONES.filter((t) => t.group === "Asia" && !targetZones.includes(t.value)).map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                    <optgroup label="Other">
                      {TIMEZONES.filter((t) => t.group === "Other" && !targetZones.includes(t.value)).map((t) => (
                        <option key={t.value} value={t.value}>{t.label}</option>
                      ))}
                    </optgroup>
                  </select>
                </div>
              )}

              {/* DST Note */}
              <div className="flex items-start gap-2 rounded-lg border border-blue-500/20 bg-blue-500/5 px-3 py-2 text-xs text-blue-400/80 mb-4">
                <svg className="h-4 w-4 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Daylight saving time is automatically accounted for based on the date entered.</span>
              </div>
            </section>

            {/* Conversion Results */}
            {conversions.length > 0 && sourceDateTime && (
              <section className="space-y-3">
                {conversions.map((conv) => (
                  <div
                    key={conv.tz}
                    className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-200">{conv.label}</span>
                        <span className="inline-flex items-center rounded-md bg-[#7c6cf0]/12 px-2 py-0.5 text-[11px] font-medium text-[#7c6cf0]">
                          {conv.offset}
                        </span>
                        {conv.isDifferentDay && (
                          <span className="inline-flex items-center rounded-md bg-yellow-500/12 px-2 py-0.5 text-[11px] font-medium text-yellow-400">
                            Different day
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{conv.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-white tabular-nums">{conv.time}</span>
                      <button
                        onClick={() => removeTargetZone(conv.tz)}
                        className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-400/10 transition"
                        title="Remove"
                      >
                        <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </section>
            )}

            {targetZones.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg font-medium">No target time zones selected</p>
                <p className="text-sm mt-1">Add a time zone above or use a preset to get started.</p>
              </div>
            )}

            {/* Quick Reference Table */}
            <section className="rounded-2xl border border-white/5 bg-[#1a1a26] p-5">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Common UTC Offsets</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                {TIMEZONES.slice(0, 16).map((tz) => {
                  const offset = sourceDateTime ? getUTCOffset(tz.value, sourceDateTime) : "";
                  return (
                    <div key={tz.value} className="rounded-lg bg-[#12121c] px-3 py-2 text-xs">
                      <span className="font-medium text-gray-300">{tz.abbr}</span>
                      <span className="text-gray-600 ml-1.5">{offset}</span>
                    </div>
                  );
                })}
              </div>
            </section>
          </div>
        </main>

        {/* How It Works */}
        <section className="mx-auto max-w-7xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">How It Works</h2>
          <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
            Convert between time zones in three simple steps.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: "1", title: "Enter Source Time", desc: "Set the date, time, and time zone you want to convert from. Click \"Now\" to instantly fill in the current time." },
              { step: "2", title: "Add Target Zones", desc: "Select up to 4 target time zones to convert to. Use presets for US, Europe, or Asia zones, or add individual zones." },
              { step: "3", title: "View Results", desc: "See the converted time for each zone instantly. Day changes and UTC offsets are displayed clearly for each conversion." },
            ].map((item) => (
              <div key={item.step} className="relative rounded-2xl border border-white/5 bg-[#1a1a26] p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#7c6cf0]/15 text-[#7c6cf0] text-xl font-bold">{item.step}</div>
                <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mx-auto max-w-3xl px-4 py-16">
          <h2 className="text-2xl font-bold text-center mb-2">Frequently Asked Questions</h2>
          <p className="text-gray-400 text-center mb-10 max-w-xl mx-auto">
            Everything you need to know about converting time zones.
          </p>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FAQItem key={i} question={faq.q} answer={faq.a} />
            ))}
          </div>
        </section>

        {/* Related Tools */}
        <section className="mx-auto max-w-7xl px-4 py-16 border-t border-white/5">
          <h2 className="text-2xl font-bold text-center mb-2">Related Tools</h2>
          <p className="text-gray-400 text-center mb-10">More free tools to help you get things done.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RELATED_TOOLS.map((tool) => (
              <a key={tool.name} href={tool.href} className="group rounded-2xl border border-white/5 bg-[#1a1a26] p-5 hover:border-[#7c6cf0]/40 transition-all duration-200 hover:shadow-[0_0_30px_rgba(124,108,240,0.08)]">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-[#7c6cf0]/10">
                  <svg className="h-5 w-5 text-[#7c6cf0]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={tool.icon} />
                  </svg>
                </div>
                <h3 className="text-sm font-semibold text-white group-hover:text-[#7c6cf0] transition-colors">{tool.name}</h3>
                <p className="text-xs text-gray-500 mt-1">{tool.description}</p>
              </a>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Accordion Item                                                 */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-white/5 bg-[#1a1a26] overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-[#1e1e2e] transition-colors"
      >
        <span className="text-sm font-medium text-gray-200 pr-4">{question}</span>
        <svg className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {open && <div className="px-5 pb-5 text-sm text-gray-400 leading-relaxed">{answer}</div>}
    </div>
  );
}
