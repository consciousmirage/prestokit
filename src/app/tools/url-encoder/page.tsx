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
      <span className="text-[#f0f0f5]">URL Encoder / Decoder</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is URL encoding?",
    answer:
      "URL encoding (also called percent encoding) replaces unsafe or reserved characters in a URL with a percent sign (%) followed by two hexadecimal digits representing the character's ASCII code. For example, a space becomes %20 and an ampersand becomes %26.",
  },
  {
    question: "When should I URL encode a string?",
    answer:
      "You should URL encode any string that will be included as a query parameter, path segment, or fragment in a URL. This prevents special characters like &, =, ?, and spaces from breaking the URL structure or being misinterpreted by browsers and servers.",
  },
  {
    question: "What is the difference between encodeURI and encodeURIComponent?",
    answer:
      "encodeURI encodes a full URI but preserves characters that have special meaning in URLs (like /, ?, #, &). encodeURIComponent encodes everything except unreserved characters (letters, digits, -, _, ., ~), making it ideal for encoding individual query parameter values. This tool uses encodeURIComponent for the most thorough encoding.",
  },
  {
    question: "Is my data sent to a server?",
    answer:
      "No. All encoding and decoding happens entirely in your browser using JavaScript. Your data never leaves your device, is never transmitted, and is never logged.",
  },
  {
    question: "What characters are not encoded?",
    answer:
      "The encodeURIComponent function does not encode the following unreserved characters: A-Z, a-z, 0-9, hyphen (-), underscore (_), period (.), and tilde (~). All other characters are percent-encoded.",
  },
  {
    question: "Can I decode a full URL with query parameters?",
    answer:
      "Yes. Paste the entire encoded URL into the input and click Decode. The tool will convert all percent-encoded sequences back to their original characters, making the URL human-readable again.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function UrlEncoderPage() {
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
          setOutput(encodeURIComponent(text));
        } else {
          setOutput(decodeURIComponent(text));
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
    name: "URL Encoder / Decoder",
    url: "https://prestokit.com/tools/url-encoder",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Encode or decode URLs instantly with percent encoding support. Free online tool.",
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
              URL Encoder &amp;{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Decoder
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Encode or decode URLs with percent encoding in real time. Handles
              query strings, special characters, and Unicode.
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
                      Decoding Error
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
                      ? "Hello World! How are you?"
                      : "Hello%20World%21%20How%20are%20you%3F"
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

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="url-encoder-pro" />

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Paste Your Text or URL",
                  description:
                    "Enter the text you want to encode, or paste an encoded URL you want to decode back to readable text.",
                },
                {
                  step: "2",
                  title: "Choose Encode or Decode",
                  description:
                    "Select Encode to convert special characters to percent-encoded format, or Decode to convert them back.",
                },
                {
                  step: "3",
                  title: "Copy the Result",
                  description:
                    "The conversion happens in real time as you type. Click Copy to grab the result, or Swap to reverse the operation.",
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
                  title: "Base64 Encoder / Decoder",
                  description:
                    "Encode or decode Base64 strings instantly with real-time conversion.",
                  href: "/tools/base64-encoder",
                },
                {
                  title: "HTML Entity Encoder",
                  description:
                    "Encode and decode HTML entities and special characters.",
                  href: "/tools/html-entity-encoder",
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
