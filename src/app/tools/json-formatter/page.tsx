"use client";

import { useState, useCallback, useMemo } from "react";

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
      <span className="text-[#f0f0f5]">JSON Formatter</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Syntax highlighting                                                */
/* ------------------------------------------------------------------ */

function syntaxHighlight(json: string): string {
  // Escape HTML
  let str = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Apply colors via spans
  str = str.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    (match) => {
      let cls = "text-[#00e676]"; // number - green
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "text-[#9d90f5]"; // key - purple
        } else {
          cls = "text-[#f0c674]"; // string - yellow
        }
      } else if (/true|false/.test(match)) {
        cls = "text-[#56b6c2]"; // boolean - cyan
      } else if (/null/.test(match)) {
        cls = "text-[#e06c75]"; // null - red
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );

  return str;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What does a JSON formatter do?",
    answer:
      "A JSON formatter takes raw or minified JSON data and formats it with proper indentation and line breaks, making it easy to read and debug. It can also validate the JSON structure and report errors with specific locations.",
  },
  {
    question: "What is the difference between formatting and minifying?",
    answer:
      "Formatting (also called 'pretty printing' or 'beautifying') adds indentation and line breaks for readability. Minifying does the opposite -- it removes all unnecessary whitespace to produce the smallest possible output, ideal for production APIs and data transfer.",
  },
  {
    question: "How does JSON validation work?",
    answer:
      "The validator parses your JSON using the built-in JSON.parse() function. If the JSON is invalid, the parser throws an error with a description and position. We display this error clearly so you can pinpoint and fix the issue.",
  },
  {
    question: "What indentation options are available?",
    answer:
      "You can choose between 2 spaces, 4 spaces, or tabs for indentation. The default is 2 spaces, which is the most common convention in web development. Change the setting before formatting to apply your preference.",
  },
  {
    question: "Is my JSON data stored or sent to a server?",
    answer:
      "No. All formatting, validation, and minification happens entirely in your browser using JavaScript. Your JSON data never leaves your device, is never transmitted, and is never logged.",
  },
  {
    question: "What is syntax highlighting?",
    answer:
      "Syntax highlighting applies different colors to different types of values in your JSON: purple for keys, yellow for strings, green for numbers, cyan for booleans, and red for null. This makes it much easier to scan and understand the structure of your data.",
  },
];

/* ------------------------------------------------------------------ */
/*  Indentation types                                                  */
/* ------------------------------------------------------------------ */

type IndentType = "2" | "4" | "tab";

function getIndent(type: IndentType): string | number {
  if (type === "tab") return "\t";
  return parseInt(type);
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function JsonFormatterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [indent, setIndent] = useState<IndentType>("2");
  const [copied, setCopied] = useState(false);
  const [highlighted, setHighlighted] = useState("");

  const handleFormat = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter some JSON to format.");
      setOutput("");
      setHighlighted("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, getIndent(indent));
      setOutput(formatted);
      setHighlighted(syntaxHighlight(formatted));
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
      setHighlighted("");
    }
  }, [input, indent]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter some JSON to minify.");
      setOutput("");
      setHighlighted("");
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setHighlighted(syntaxHighlight(minified));
      setError(null);
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
      setHighlighted("");
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setError("Please enter some JSON to validate.");
      return;
    }
    try {
      JSON.parse(input);
      setError(null);
      setOutput("Valid JSON!");
      setHighlighted(
        '<span class="text-[#00e676] font-bold">Valid JSON!</span>'
      );
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Invalid JSON";
      setError(msg);
      setOutput("");
      setHighlighted("");
    }
  }, [input]);

  const handleCopy = async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setHighlighted("");
    setError(null);
    setCopied(false);
  };

  const lineCount = useMemo(() => {
    if (!output) return 0;
    return output.split("\n").length;
  }, [output]);

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
              JSON Formatter &amp;{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Validator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Format, validate, and minify JSON with syntax highlighting. Find
              errors instantly with descriptive error messages.
            </p>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={handleFormat}
                className="bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white font-medium text-sm rounded-xl px-5 py-2.5 transition-colors"
              >
                Format
              </button>
              <button
                onClick={handleMinify}
                className="border border-[#7c6cf0]/30 hover:border-[#7c6cf0] text-[#9d90f5] font-medium text-sm rounded-xl px-5 py-2.5 transition-colors"
              >
                Minify
              </button>
              <button
                onClick={handleValidate}
                className="border border-[#00e676]/30 hover:border-[#00e676] text-[#00e676] font-medium text-sm rounded-xl px-5 py-2.5 transition-colors"
              >
                Validate
              </button>

              {/* Indent selector */}
              <div className="flex items-center gap-2 ml-auto">
                <span className="text-xs text-[#8888a0]">Indent:</span>
                {(["2", "4", "tab"] as IndentType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setIndent(t)}
                    className={`text-xs rounded-lg px-3 py-1.5 border transition-all ${
                      indent === t
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    {t === "tab" ? "Tab" : `${t} spaces`}
                  </button>
                ))}
              </div>

              <button
                onClick={handleClear}
                disabled={!input && !output}
                className="text-xs text-[#8888a0] hover:text-white border border-[#1e1e2e] hover:border-[#7c6cf0]/40 rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Clear
              </button>
            </div>

            {/* Error display */}
            {error && (
              <div className="mb-4 rounded-xl border border-[#e06c75]/30 bg-[#e06c75]/10 px-5 py-3">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-[#e06c75] shrink-0 mt-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="15" y1="9" x2="9" y2="15" />
                    <line x1="9" y1="9" x2="15" y2="15" />
                  </svg>
                  <div>
                    <div className="text-sm font-medium text-[#e06c75]">
                      JSON Error
                    </div>
                    <div className="text-sm text-[#e06c75]/80 mt-1">{error}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Input / Output */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Input */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Input
                  </label>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='{"key": "value", "number": 42}'
                  rows={18}
                  spellCheck={false}
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-white text-sm font-mono placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Output */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Output
                    {lineCount > 0 && (
                      <span className="text-[#8888a0] font-normal ml-2">
                        ({lineCount} lines)
                      </span>
                    )}
                  </label>
                  <button
                    onClick={handleCopy}
                    disabled={!output}
                    className="text-xs text-[#7c6cf0] hover:text-[#9d90f5] border border-[#7c6cf0]/30 hover:border-[#7c6cf0] rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                {highlighted ? (
                  <div className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-sm font-mono overflow-auto leading-relaxed"
                    style={{ height: "calc(18 * 1.625rem + 2rem)", maxHeight: "calc(18 * 1.625rem + 2rem)" }}
                  >
                    <pre
                      className="whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{ __html: highlighted }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-sm font-mono text-[#555566] overflow-auto leading-relaxed"
                    style={{ height: "calc(18 * 1.625rem + 2rem)", maxHeight: "calc(18 * 1.625rem + 2rem)" }}
                  >
                    Formatted output will appear here...
                  </div>
                )}
              </div>
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
                  title: "Paste Your JSON",
                  description:
                    "Paste raw, minified, or messy JSON into the input textarea. It can be from an API response, config file, or any JSON source.",
                },
                {
                  step: "2",
                  title: "Format, Minify, or Validate",
                  description:
                    "Click Format to pretty-print with your chosen indentation. Click Minify to compress. Click Validate to check for errors.",
                },
                {
                  step: "3",
                  title: "Copy the Result",
                  description:
                    "View the syntax-highlighted output and click Copy to grab the formatted JSON. Paste it into your code editor or API tool.",
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
                  title: "Markdown to HTML",
                  description:
                    "Convert Markdown to HTML with live preview and syntax support.",
                  href: "/tools/markdown-to-html",
                },
                {
                  title: "Text Case Converter",
                  description:
                    "Convert text between UPPERCASE, camelCase, snake_case, and more.",
                  href: "/tools/text-case-converter",
                },
                {
                  title: "Lorem Ipsum Generator",
                  description:
                    "Generate placeholder text for your designs and mockups.",
                  href: "/tools/lorem-ipsum-generator",
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
