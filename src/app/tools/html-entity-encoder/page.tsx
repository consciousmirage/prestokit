"use client";

import { useState, useCallback, useEffect } from "react";
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
      <span className="text-[#f0f0f5]">HTML Entity Encoder</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  HTML Entity Maps                                                   */
/* ------------------------------------------------------------------ */

const ENCODE_MAP: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
  "/": "&#47;",
  "`": "&#96;",
  "=": "&#61;",
};

const DECODE_MAP: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
  "&apos;": "'",
  "&#47;": "/",
  "&#96;": "`",
  "&#61;": "=",
  "&nbsp;": "\u00A0",
  "&copy;": "\u00A9",
  "&reg;": "\u00AE",
  "&trade;": "\u2122",
  "&mdash;": "\u2014",
  "&ndash;": "\u2013",
  "&laquo;": "\u00AB",
  "&raquo;": "\u00BB",
  "&bull;": "\u2022",
  "&hellip;": "\u2026",
  "&cent;": "\u00A2",
  "&pound;": "\u00A3",
  "&yen;": "\u00A5",
  "&euro;": "\u20AC",
};

function encodeHtmlEntities(text: string): string {
  return text.replace(/[&<>"'`=/]/g, (char) => ENCODE_MAP[char] || char);
}

function decodeHtmlEntities(text: string): string {
  // First handle named entities
  let result = text;
  for (const [entity, char] of Object.entries(DECODE_MAP)) {
    result = result.split(entity).join(char);
  }
  // Then handle numeric entities (decimal and hex)
  result = result.replace(/&#(\d+);/g, (_, dec) =>
    String.fromCodePoint(parseInt(dec, 10))
  );
  result = result.replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
    String.fromCodePoint(parseInt(hex, 16))
  );
  return result;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What are HTML entities?",
    answer:
      "HTML entities are special codes used to represent characters that have special meaning in HTML (like <, >, &) or characters that are difficult to type. They start with an ampersand (&) and end with a semicolon (;). For example, &lt; represents the less-than sign (<).",
  },
  {
    question: "Why do I need to encode HTML entities?",
    answer:
      "Encoding HTML entities prevents your content from being interpreted as HTML code. Without encoding, characters like < and > could create unwanted HTML tags, and & could start an entity reference. This is especially critical for preventing XSS (cross-site scripting) vulnerabilities in web applications.",
  },
  {
    question: "What is the difference between named and numeric entities?",
    answer:
      "Named entities use a descriptive name (like &amp; for & or &lt; for <). Numeric entities use either a decimal number (&#38; for &) or hexadecimal number (&#x26; for &). Named entities are easier to read, but numeric entities can represent any Unicode character.",
  },
  {
    question: "Which characters must be encoded in HTML?",
    answer:
      "The five characters that must always be encoded in HTML content are: & (ampersand) → &amp;, < (less than) → &lt;, > (greater than) → &gt;, \" (double quote) → &quot; (inside attributes), and ' (single quote) → &#39; (inside attributes).",
  },
  {
    question: "Is my data stored or sent to a server?",
    answer:
      "No. All encoding and decoding happens entirely in your browser using JavaScript. Your data never leaves your device, is never transmitted, and is never logged.",
  },
  {
    question: "Does this tool handle Unicode characters?",
    answer:
      "Yes. The decoder handles numeric HTML entities in both decimal (&#8364; for the euro sign) and hexadecimal (&#x20AC;) formats, covering the full Unicode range. The encoder focuses on the most common special characters that require encoding in HTML.",
  },
];

/* ------------------------------------------------------------------ */
/*  Common entities reference table                                    */
/* ------------------------------------------------------------------ */

const REFERENCE_TABLE = [
  { char: "&", entity: "&amp;", description: "Ampersand" },
  { char: "<", entity: "&lt;", description: "Less than" },
  { char: ">", entity: "&gt;", description: "Greater than" },
  { char: '"', entity: "&quot;", description: "Double quote" },
  { char: "'", entity: "&#39;", description: "Single quote / Apostrophe" },
  { char: "\u00A0", entity: "&nbsp;", description: "Non-breaking space" },
  { char: "\u00A9", entity: "&copy;", description: "Copyright" },
  { char: "\u00AE", entity: "&reg;", description: "Registered" },
  { char: "\u2122", entity: "&trade;", description: "Trademark" },
  { char: "\u2014", entity: "&mdash;", description: "Em dash" },
  { char: "\u20AC", entity: "&euro;", description: "Euro sign" },
  { char: "\u00A3", entity: "&pound;", description: "Pound sign" },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function HtmlEntityEncoderPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const convert = useCallback(
    (text: string, currentMode: "encode" | "decode") => {
      if (!text.trim()) {
        setOutput("");
        setError(null);
        return;
      }
      try {
        if (currentMode === "encode") {
          setOutput(encodeHtmlEntities(text));
        } else {
          setOutput(decodeHtmlEntities(text));
        }
        setError(null);
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Invalid input";
        setError(msg);
        setOutput("");
      }
    },
    []
  );

  // Real-time conversion
  useEffect(() => {
    convert(input, mode);
  }, [input, mode, convert]);

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
    setError(null);
    setCopied(false);
  };

  const handleSwap = () => {
    setInput(output);
    setMode(mode === "encode" ? "decode" : "encode");
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

  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "HTML Entity Encoder & Decoder",
    url: "https://prestokit.com/tools/html-entity-encoder",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Encode and decode HTML entities instantly. Convert special characters to HTML entities and back.",
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
              HTML Entity{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Encoder / Decoder
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Encode special characters to HTML entities or decode entities back
              to readable text. Real-time conversion with common entity support.
            </p>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={() => setMode("encode")}
                className={`font-medium text-sm rounded-xl px-5 py-2.5 transition-colors ${
                  mode === "encode"
                    ? "bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white"
                    : "border border-[#7c6cf0]/30 hover:border-[#7c6cf0] text-[#9d90f5]"
                }`}
              >
                Encode
              </button>
              <button
                onClick={() => setMode("decode")}
                className={`font-medium text-sm rounded-xl px-5 py-2.5 transition-colors ${
                  mode === "decode"
                    ? "bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white"
                    : "border border-[#7c6cf0]/30 hover:border-[#7c6cf0] text-[#9d90f5]"
                }`}
              >
                Decode
              </button>

              <button
                onClick={handleSwap}
                disabled={!output}
                className="border border-[#00e676]/30 hover:border-[#00e676] text-[#00e676] font-medium text-sm rounded-xl px-5 py-2.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Swap
              </button>

              <button
                onClick={handleClear}
                disabled={!input && !output}
                className="text-xs text-[#8888a0] hover:text-white border border-[#1e1e2e] hover:border-[#7c6cf0]/40 rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed ml-auto"
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
                      Error
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
                  <span className="text-xs text-[#8888a0]">
                    {input.length} chars
                  </span>
                </div>
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder={
                    mode === "encode"
                      ? '<p>Hello & "World"</p>'
                      : "&lt;p&gt;Hello &amp; &quot;World&quot;&lt;/p&gt;"
                  }
                  rows={12}
                  spellCheck={false}
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-white text-sm font-mono placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-none leading-relaxed"
                />
              </div>

              {/* Output */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-[#c0c0d0]">
                    Output
                    {output && (
                      <span className="text-[#8888a0] font-normal ml-2">
                        ({output.length} chars)
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
                <textarea
                  value={output}
                  readOnly
                  rows={12}
                  spellCheck={false}
                  className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-[#00e676] text-sm font-mono focus:outline-none resize-none leading-relaxed"
                  placeholder={
                    mode === "encode"
                      ? "Encoded output will appear here..."
                      : "Decoded output will appear here..."
                  }
                />
              </div>
            </div>
          </div>

          {/* Common Entities Reference */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Common HTML Entities Reference
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[#1e1e2e]">
                    <th className="text-left py-3 px-4 text-[#8888a0] font-medium">
                      Character
                    </th>
                    <th className="text-left py-3 px-4 text-[#8888a0] font-medium">
                      Entity
                    </th>
                    <th className="text-left py-3 px-4 text-[#8888a0] font-medium">
                      Description
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {REFERENCE_TABLE.map((row, i) => (
                    <tr
                      key={i}
                      className="border-b border-[#1e1e2e]/50 hover:bg-[#1a1a26]/40 transition-colors"
                    >
                      <td className="py-2.5 px-4 font-mono text-[#f0c674]">
                        {row.char === "\u00A0" ? "(space)" : row.char}
                      </td>
                      <td className="py-2.5 px-4 font-mono text-[#9d90f5]">
                        {row.entity}
                      </td>
                      <td className="py-2.5 px-4 text-[#a0a0b8]">
                        {row.description}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="html-entity-encoder-pro" />

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Text or HTML",
                  description:
                    "Paste text containing special characters to encode, or paste HTML entities to decode back to readable text.",
                },
                {
                  step: "2",
                  title: "Choose Encode or Decode",
                  description:
                    "Select Encode to convert characters like <, >, & to their HTML entity equivalents, or Decode to reverse the process.",
                },
                {
                  step: "3",
                  title: "Copy the Result",
                  description:
                    "The conversion happens in real time. Click Copy to grab the result. Use the reference table below for common entities.",
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
                  title: "URL Encoder / Decoder",
                  description:
                    "Encode or decode URLs with percent encoding in real time.",
                  href: "/tools/url-encoder",
                },
                {
                  title: "Markdown to HTML",
                  description:
                    "Convert Markdown to HTML with live preview and syntax support.",
                  href: "/tools/markdown-to-html",
                },
                {
                  title: "Base64 Encoder / Decoder",
                  description:
                    "Encode or decode Base64 strings instantly with real-time conversion.",
                  href: "/tools/base64-encoder",
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
