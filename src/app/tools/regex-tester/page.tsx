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
      <span className="text-[#f0f0f5]">Regex Tester</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Common Patterns                                                    */
/* ------------------------------------------------------------------ */

const COMMON_PATTERNS = [
  { label: "Email", pattern: "[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}", flags: "g" },
  { label: "URL", pattern: "https?://[\\w\\-._~:/?#\\[\\]@!$&'()*+,;=%]+", flags: "g" },
  { label: "Phone (US)", pattern: "\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}", flags: "g" },
  { label: "IP Address", pattern: "\\b\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\b", flags: "g" },
  { label: "Hex Color", pattern: "#[0-9a-fA-F]{3,8}\\b", flags: "gi" },
  { label: "HTML Tag", pattern: "<[^>]+>", flags: "g" },
  { label: "Date (MM/DD/YYYY)", pattern: "\\d{1,2}/\\d{1,2}/\\d{2,4}", flags: "g" },
  { label: "Digits Only", pattern: "\\d+", flags: "g" },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is a regular expression (regex)?",
    answer:
      "A regular expression (regex or regexp) is a sequence of characters that defines a search pattern. They are used in programming, text editors, and command-line tools to find, match, replace, or validate strings. For example, \\d+ matches one or more digits.",
  },
  {
    question: "What are regex flags?",
    answer:
      "Flags modify how a regex pattern is applied. Common flags: 'g' (global — find all matches, not just the first), 'i' (case-insensitive), 'm' (multiline — ^ and $ match line starts/ends), 's' (dotAll — . matches newlines), 'u' (Unicode support). Combine flags like 'gi' for global case-insensitive matching.",
  },
  {
    question: "How do I match an email address with regex?",
    answer:
      "A common email regex pattern is: [a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,} — This matches most standard email formats. However, the official email specification (RFC 5322) is extremely complex. For production use, combine a simple regex with server-side validation.",
  },
  {
    question: "What is the difference between * and + in regex?",
    answer:
      "The * quantifier matches zero or more occurrences of the previous character/group, while + matches one or more. For example, 'ab*c' matches 'ac', 'abc', 'abbc', etc. But 'ab+c' requires at least one 'b', so it matches 'abc', 'abbc', but not 'ac'.",
  },
  {
    question: "How do I escape special characters in regex?",
    answer:
      "Special regex characters (. * + ? ^ $ { } [ ] ( ) | \\) need to be escaped with a backslash to match literally. For example, to match a period, use \\. instead of just a dot. To match a backslash itself, use \\\\.",
  },
  {
    question: "What are capture groups in regex?",
    answer:
      "Capture groups, created with parentheses (), let you extract specific parts of a match. For example, (\\d{3})-(\\d{4}) applied to '555-1234' captures '555' in group 1 and '1234' in group 2. Use (?:...) for non-capturing groups when you need grouping without capturing.",
  },
];

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface MatchResult {
  fullMatch: string;
  index: number;
  groups: string[];
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function RegexTesterPage() {
  const [pattern, setPattern] = useState("");
  const [flags, setFlags] = useState("g");
  const [testString, setTestString] = useState("");
  const [replaceWith, setReplaceWith] = useState("");

  const flagToggles: { flag: string; label: string; desc: string }[] = [
    { flag: "g", label: "g", desc: "Global" },
    { flag: "i", label: "i", desc: "Case Insensitive" },
    { flag: "m", label: "m", desc: "Multiline" },
    { flag: "s", label: "s", desc: "Dot All" },
    { flag: "u", label: "u", desc: "Unicode" },
  ];

  const toggleFlag = (f: string) => {
    setFlags((prev) => (prev.includes(f) ? prev.replace(f, "") : prev + f));
  };

  const { matches, error, highlighted, replaced } = useMemo(() => {
    if (!pattern) return { matches: [] as MatchResult[], error: "", highlighted: testString, replaced: "" };

    try {
      const regex = new RegExp(pattern, flags);
      const allMatches: MatchResult[] = [];

      if (flags.includes("g")) {
        let m;
        while ((m = regex.exec(testString)) !== null) {
          allMatches.push({
            fullMatch: m[0],
            index: m.index,
            groups: m.slice(1),
          });
          if (m[0].length === 0) regex.lastIndex++;
        }
      } else {
        const m = regex.exec(testString);
        if (m) {
          allMatches.push({
            fullMatch: m[0],
            index: m.index,
            groups: m.slice(1),
          });
        }
      }

      // Build highlighted string
      let hl = "";
      let lastIndex = 0;
      for (const match of allMatches) {
        hl += escapeHtml(testString.slice(lastIndex, match.index));
        hl += `<mark class="bg-[#7c6cf0]/30 text-[#c8c0ff] rounded px-0.5">${escapeHtml(match.fullMatch)}</mark>`;
        lastIndex = match.index + match.fullMatch.length;
      }
      hl += escapeHtml(testString.slice(lastIndex));

      // Build replaced string
      let rep = "";
      if (replaceWith !== undefined) {
        try {
          rep = testString.replace(new RegExp(pattern, flags), replaceWith);
        } catch {
          rep = "";
        }
      }

      return { matches: allMatches, error: "", highlighted: hl, replaced: rep };
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid regex";
      return { matches: [] as MatchResult[], error: msg, highlighted: escapeHtml(testString), replaced: "" };
    }
  }, [pattern, flags, testString, replaceWith]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Regex Tester",
    description:
      "Test regular expressions with live matching and highlighting. Supports JavaScript regex flags.",
    url: "https://prestokit.com/tools/regex-tester",
    applicationCategory: "DeveloperApplication",
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
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Regex{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Tester
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Test regular expressions with live matching and highlighting.
              See all matches, capture groups, and replacement results instantly.
            </p>
          </div>

          {/* Pattern Input */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-4">
            <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
              Regular Expression
            </label>
            <div className="flex items-center gap-2">
              <span className="text-[#8888a0] text-xl font-mono">/</span>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-1 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-base font-mono text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
              />
              <span className="text-[#8888a0] text-xl font-mono">/</span>
              <span className="text-[#9d90f5] font-mono text-lg min-w-[40px]">{flags}</span>
            </div>

            {error && (
              <div className="mt-3 text-sm text-[#ff5252] bg-[#ff5252]/10 rounded-lg px-4 py-2">
                {error}
              </div>
            )}

            {/* Flags */}
            <div className="flex flex-wrap gap-2 mt-4">
              {flagToggles.map((f) => (
                <button
                  key={f.flag}
                  onClick={() => toggleFlag(f.flag)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    flags.includes(f.flag)
                      ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                      : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                  }`}
                >
                  <span className="font-mono font-bold">{f.label}</span>{" "}
                  <span className="text-[#555566]">{f.desc}</span>
                </button>
              ))}
            </div>

            {/* Common Patterns */}
            <div className="mt-4">
              <div className="text-xs text-[#8888a0] mb-2">Common patterns:</div>
              <div className="flex flex-wrap gap-2">
                {COMMON_PATTERNS.map((p) => (
                  <button
                    key={p.label}
                    onClick={() => {
                      setPattern(p.pattern);
                      setFlags(p.flags);
                    }}
                    className="rounded-lg border border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40 px-3 py-1.5 text-xs font-medium transition-all"
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
            {/* Test String */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
              <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                Test String
              </label>
              <textarea
                rows={8}
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                placeholder="Enter text to test against your regex pattern..."
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm font-mono text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-none"
              />
            </div>

            {/* Highlighted Results */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#c0c0d0]">
                  Match Highlighting
                </label>
                <span className="text-xs text-[#9d90f5] font-semibold">
                  {matches.length} match{matches.length !== 1 ? "es" : ""}
                </span>
              </div>
              <div
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm font-mono text-[#e0e0ea] min-h-[200px] whitespace-pre-wrap break-words overflow-auto"
                dangerouslySetInnerHTML={{ __html: highlighted || '<span class="text-[#555566]">Matches will be highlighted here...</span>' }}
              />
            </div>
          </div>

          {/* Replace */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 mb-4">
            <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
              Replace With (optional)
            </label>
            <input
              type="text"
              value={replaceWith}
              onChange={(e) => setReplaceWith(e.target.value)}
              placeholder="Replacement string ($1, $2 for capture groups)..."
              className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm font-mono text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
            />
            {replaceWith && replaced && (
              <div className="mt-3 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm font-mono text-[#00e676] whitespace-pre-wrap break-words">
                {replaced}
              </div>
            )}
          </div>

          {/* Match Details */}
          {matches.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 mb-6">
              <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                Match Details ({matches.length})
              </h2>
              <div className="space-y-2 max-h-[300px] overflow-auto">
                {matches.map((m, i) => (
                  <div key={i} className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-3">
                    <div className="flex items-center gap-3 text-sm">
                      <span className="text-xs text-[#8888a0] bg-[#1e1e2e] rounded px-2 py-0.5">
                        #{i + 1}
                      </span>
                      <span className="font-mono text-[#9d90f5]">
                        &quot;{m.fullMatch}&quot;
                      </span>
                      <span className="text-xs text-[#555566]">
                        index {m.index}
                      </span>
                    </div>
                    {m.groups.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {m.groups.map((g, gi) => (
                          <span key={gi} className="text-xs font-mono bg-[#1e1e2e] rounded px-2 py-1 text-[#8888a0]">
                            ${gi + 1}: &quot;{g}&quot;
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Regex",
                  description:
                    "Type your regular expression pattern in the input field. Select flags like global, case-insensitive, and multiline.",
                },
                {
                  step: "2",
                  title: "Add Test Text",
                  description:
                    "Paste or type the text you want to test against. Matches are highlighted in real time as you type.",
                },
                {
                  step: "3",
                  title: "Review Matches",
                  description:
                    "See all matches highlighted, capture groups extracted, match count, and optionally test replacements.",
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
                  <p className="text-sm text-[#8888a0] leading-relaxed">{item.description}</p>
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
                  title: "JSON Formatter",
                  description:
                    "Format, validate, and minify JSON with syntax highlighting.",
                  href: "/tools/json-formatter",
                },
                {
                  title: "Markdown to HTML",
                  description:
                    "Convert Markdown to HTML with live preview and instant copy.",
                  href: "/tools/markdown-to-html",
                },
                {
                  title: "Text Case Converter",
                  description:
                    "Convert text between UPPER, lower, Title, camelCase, and more.",
                  href: "/tools/text-case-converter",
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
