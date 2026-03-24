"use client";

import { useState, useEffect, useCallback } from "react";
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
      <span className="text-[#f0f0f5]">Unix Timestamp Converter</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Date formatting helpers                                            */
/* ------------------------------------------------------------------ */

function formatDate(date: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");

  const iso = date.toISOString();
  const utc = date.toUTCString();
  const local = date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    timeZoneName: "short",
  });
  const shortDate = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate()
  )}`;
  const shortTime = `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds()
  )}`;
  const relative = getRelativeTime(date);

  return { iso, utc, local, shortDate, shortTime, relative };
}

function getRelativeTime(date: Date): string {
  const now = Date.now();
  const diff = now - date.getTime();
  const absDiff = Math.abs(diff);
  const future = diff < 0;
  const prefix = future ? "in " : "";
  const suffix = future ? "" : " ago";

  if (absDiff < 60000) {
    const secs = Math.floor(absDiff / 1000);
    return `${prefix}${secs} second${secs !== 1 ? "s" : ""}${suffix}`;
  }
  if (absDiff < 3600000) {
    const mins = Math.floor(absDiff / 60000);
    return `${prefix}${mins} minute${mins !== 1 ? "s" : ""}${suffix}`;
  }
  if (absDiff < 86400000) {
    const hours = Math.floor(absDiff / 3600000);
    return `${prefix}${hours} hour${hours !== 1 ? "s" : ""}${suffix}`;
  }
  if (absDiff < 2592000000) {
    const days = Math.floor(absDiff / 86400000);
    return `${prefix}${days} day${days !== 1 ? "s" : ""}${suffix}`;
  }
  if (absDiff < 31536000000) {
    const months = Math.floor(absDiff / 2592000000);
    return `${prefix}${months} month${months !== 1 ? "s" : ""}${suffix}`;
  }
  const years = Math.floor(absDiff / 31536000000);
  return `${prefix}${years} year${years !== 1 ? "s" : ""}${suffix}`;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is a Unix timestamp?",
    answer:
      "A Unix timestamp (also called epoch time or POSIX time) is the number of seconds that have elapsed since January 1, 1970, 00:00:00 UTC. It is widely used in programming and databases as a universal way to represent a point in time, independent of time zones.",
  },
  {
    question: "What is the Unix epoch?",
    answer:
      "The Unix epoch is the reference point for Unix time: January 1, 1970, at 00:00:00 UTC. All Unix timestamps are measured as the number of seconds before or after this date. A timestamp of 0 corresponds exactly to the epoch.",
  },
  {
    question: "What is the difference between seconds and milliseconds timestamps?",
    answer:
      "Standard Unix timestamps are in seconds (10 digits, e.g. 1700000000). Many programming languages like JavaScript use millisecond timestamps (13 digits, e.g. 1700000000000). This tool automatically detects and handles both formats when converting to a date.",
  },
  {
    question: "What is the Year 2038 problem?",
    answer:
      "The Year 2038 problem occurs because many systems store Unix timestamps as a 32-bit signed integer, which can only represent dates up to January 19, 2038 at 03:14:07 UTC. After that, the integer overflows. Modern 64-bit systems do not have this limitation.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All conversions happen entirely in your browser using JavaScript. No data is transmitted, stored, or logged anywhere.",
  },
  {
    question: "How do I get the current Unix timestamp in code?",
    answer:
      "In JavaScript: Math.floor(Date.now() / 1000). In Python: import time; int(time.time()). In PHP: time(). In Java: System.currentTimeMillis() / 1000. In C/C++: time(NULL). In Ruby: Time.now.to_i.",
  },
];

/* ------------------------------------------------------------------ */
/*  CopyButton                                                         */
/* ------------------------------------------------------------------ */

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="text-xs text-[#7c6cf0] hover:text-[#9d90f5] border border-[#7c6cf0]/30 hover:border-[#7c6cf0] rounded-lg px-2.5 py-1 transition-all"
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TimestampConverterPage() {
  const [currentTimestamp, setCurrentTimestamp] = useState<number>(
    Math.floor(Date.now() / 1000)
  );
  const [timestampInput, setTimestampInput] = useState("");
  const [dateInput, setDateInput] = useState("");
  const [timeInput, setTimeInput] = useState("");
  const [tsResult, setTsResult] = useState<ReturnType<typeof formatDate> | null>(
    null
  );
  const [tsError, setTsError] = useState<string | null>(null);
  const [dateResult, setDateResult] = useState<string | null>(null);
  const [dateError, setDateError] = useState<string | null>(null);

  // Auto-update current timestamp every second
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTimestamp(Math.floor(Date.now() / 1000));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timestamp → Date conversion
  const convertTimestamp = useCallback(() => {
    if (!timestampInput.trim()) {
      setTsResult(null);
      setTsError(null);
      return;
    }
    const num = Number(timestampInput.trim());
    if (isNaN(num)) {
      setTsError("Please enter a valid number.");
      setTsResult(null);
      return;
    }
    // Auto-detect milliseconds (13+ digits) vs seconds (10 digits)
    const ms = String(Math.abs(num)).length >= 13 ? num : num * 1000;
    const date = new Date(ms);
    if (isNaN(date.getTime())) {
      setTsError("Invalid timestamp. Could not convert to a valid date.");
      setTsResult(null);
      return;
    }
    setTsResult(formatDate(date));
    setTsError(null);
  }, [timestampInput]);

  // Real-time timestamp conversion
  useEffect(() => {
    convertTimestamp();
  }, [convertTimestamp]);

  // Date → Timestamp conversion
  const convertDate = useCallback(() => {
    if (!dateInput.trim()) {
      setDateResult(null);
      setDateError(null);
      return;
    }
    const dateStr = timeInput.trim()
      ? `${dateInput.trim()}T${timeInput.trim()}`
      : dateInput.trim();
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) {
      setDateError("Invalid date. Please use YYYY-MM-DD format.");
      setDateResult(null);
      return;
    }
    setDateResult(String(Math.floor(date.getTime() / 1000)));
    setDateError(null);
  }, [dateInput, timeInput]);

  // Real-time date conversion
  useEffect(() => {
    convertDate();
  }, [convertDate]);

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

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Unix Timestamp Converter",
    url: "https://prestokit.com/tools/timestamp-converter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Convert Unix timestamps to human-readable dates and vice versa. Free online epoch converter.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Unix Timestamp{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Converter
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Convert between Unix timestamps and human-readable dates. Supports
              seconds and milliseconds with multiple output formats.
            </p>
          </div>

          {/* Current Timestamp */}
          <div className="rounded-2xl border border-[#7c6cf0]/20 bg-gradient-to-r from-[#12121a] via-[#16162a] to-[#12121a] p-6 sm:p-8 mb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="text-sm text-[#8888a0] mb-1">
                  Current Unix Timestamp
                </div>
                <div className="text-3xl sm:text-4xl font-bold font-mono text-[#7c6cf0]">
                  {currentTimestamp}
                </div>
              </div>
              <div className="flex items-center gap-3">
                <CopyButton text={String(currentTimestamp)} />
                <div className="flex items-center gap-1.5">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00e676] opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#00e676]"></span>
                  </span>
                  <span className="text-xs text-[#00e676]">Live</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timestamp → Date */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Timestamp to Date
            </h2>
            <div className="mb-4">
              <label className="text-sm font-medium text-[#c0c0d0] block mb-2">
                Unix Timestamp (seconds or milliseconds)
              </label>
              <input
                type="text"
                value={timestampInput}
                onChange={(e) => setTimestampInput(e.target.value)}
                placeholder="e.g. 1700000000 or 1700000000000"
                spellCheck={false}
                className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-3 text-white text-sm font-mono placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
              />
            </div>

            {/* Error */}
            {tsError && (
              <div className="mb-4 rounded-xl border border-[#e06c75]/30 bg-[#e06c75]/10 px-5 py-3">
                <div className="text-sm text-[#e06c75]">{tsError}</div>
              </div>
            )}

            {/* Results */}
            {tsResult && (
              <div className="space-y-3">
                {[
                  { label: "ISO 8601", value: tsResult.iso },
                  { label: "UTC", value: tsResult.utc },
                  { label: "Local Time", value: tsResult.local },
                  { label: "Date", value: tsResult.shortDate },
                  { label: "Time", value: tsResult.shortTime },
                  { label: "Relative", value: tsResult.relative },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-3"
                  >
                    <div>
                      <span className="text-xs text-[#8888a0] block mb-0.5">
                        {item.label}
                      </span>
                      <span className="text-sm font-mono text-[#e0e0ea]">
                        {item.value}
                      </span>
                    </div>
                    <CopyButton text={item.value} />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Date → Timestamp */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Date to Timestamp
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm font-medium text-[#c0c0d0] block mb-2">
                  Date
                </label>
                <input
                  type="date"
                  value={dateInput}
                  onChange={(e) => setDateInput(e.target.value)}
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#7c6cf0] transition-colors [color-scheme:dark]"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-[#c0c0d0] block mb-2">
                  Time (optional)
                </label>
                <input
                  type="time"
                  value={timeInput}
                  onChange={(e) => setTimeInput(e.target.value)}
                  step="1"
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-3 text-white text-sm font-mono focus:outline-none focus:border-[#7c6cf0] transition-colors [color-scheme:dark]"
                />
              </div>
            </div>

            {/* Error */}
            {dateError && (
              <div className="mb-4 rounded-xl border border-[#e06c75]/30 bg-[#e06c75]/10 px-5 py-3">
                <div className="text-sm text-[#e06c75]">{dateError}</div>
              </div>
            )}

            {/* Result */}
            {dateResult && (
              <div className="flex items-center justify-between bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4">
                <div>
                  <span className="text-xs text-[#8888a0] block mb-0.5">
                    Unix Timestamp (seconds)
                  </span>
                  <span className="text-lg font-mono font-bold text-[#00e676]">
                    {dateResult}
                  </span>
                </div>
                <CopyButton text={dateResult} />
              </div>
            )}
          </div>

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="timestamp-converter-pro" />

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter a Timestamp or Date",
                  description:
                    "Paste a Unix timestamp to convert to a date, or use the date picker to convert a date to a timestamp.",
                },
                {
                  step: "2",
                  title: "View Multiple Formats",
                  description:
                    "See your result in ISO 8601, UTC, local time, and relative formats. Both seconds and millisecond timestamps are supported.",
                },
                {
                  step: "3",
                  title: "Copy Any Format",
                  description:
                    "Click the Copy button next to any format to grab it. The current live timestamp is always visible at the top.",
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
                  title: "Date Calculator",
                  description:
                    "Calculate the difference between two dates or add/subtract days.",
                  href: "/tools/date-calculator",
                },
                {
                  title: "Timezone Converter",
                  description:
                    "Convert times between different time zones instantly.",
                  href: "/tools/timezone-converter",
                },
                {
                  title: "JSON Formatter",
                  description:
                    "Format, validate, and minify JSON with syntax highlighting.",
                  href: "/tools/json-formatter",
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
