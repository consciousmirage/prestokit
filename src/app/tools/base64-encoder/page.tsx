"use client";

import { useState, useCallback } from "react";
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
      <span className="text-[#f0f0f5]">Base64 Encoder / Decoder</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is Base64 encoding?",
    answer:
      "Base64 is a binary-to-text encoding scheme that represents binary data using a set of 64 printable ASCII characters (A-Z, a-z, 0-9, +, /). It's commonly used to embed binary data like images or files inside text-based formats such as HTML, CSS, JSON, or email (MIME). The encoded output is roughly 33% larger than the original data.",
  },
  {
    question: "When should I use Base64 encoding?",
    answer:
      "Common use cases include: embedding small images directly in HTML/CSS (data URIs), sending binary data in JSON APIs, encoding email attachments (MIME), storing binary data in text-only databases or config files, and passing data in URL parameters (using URL-safe Base64). It's not meant for encryption or compression — it's purely for safe text transport of binary data.",
  },
  {
    question: "Is Base64 encoding the same as encryption?",
    answer:
      "No. Base64 is not encryption and provides zero security. It's a simple encoding that anyone can decode instantly. Never use Base64 to hide passwords, API keys, or sensitive data — it's trivially reversible. For security, use proper encryption algorithms like AES or secure hashing like bcrypt.",
  },
  {
    question: "Why does Base64 make data larger?",
    answer:
      "Base64 converts every 3 bytes of input into 4 ASCII characters, resulting in roughly a 33% size increase. This is because each Base64 character encodes 6 bits of data (2^6 = 64 possible characters), but takes up 8 bits in ASCII. So 3 bytes (24 bits) become 4 characters (32 bits). Padding characters (=) are added when the input length isn't divisible by 3.",
  },
  {
    question: "What characters are used in Base64?",
    answer:
      "Standard Base64 uses 64 characters: uppercase A-Z (26), lowercase a-z (26), digits 0-9 (10), plus (+), and forward slash (/). The equals sign (=) is used for padding. URL-safe Base64 variants replace + with - and / with _ to avoid issues in URLs and filenames.",
  },
  {
    question: "Can I encode non-ASCII or Unicode text in Base64?",
    answer:
      "Yes, but you need to handle the encoding properly. This tool uses UTF-8 encoding for Unicode text before Base64 encoding, so accented characters, CJK characters, and emoji will all encode and decode correctly. Some simpler tools only handle ASCII, which can cause data loss with international text.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function Base64EncoderPage() {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  const handleConvert = useCallback(
    (text: string, currentMode: "encode" | "decode") => {
      setError("");
      if (!text) {
        setOutput("");
        return;
      }
      try {
        if (currentMode === "encode") {
          // Handle Unicode properly
          const utf8Bytes = new TextEncoder().encode(text);
          let binary = "";
          utf8Bytes.forEach((byte) => {
            binary += String.fromCharCode(byte);
          });
          setOutput(btoa(binary));
        } else {
          // Decode: handle Unicode
          const binary = atob(text);
          const bytes = new Uint8Array(binary.length);
          for (let i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
          }
          setOutput(new TextDecoder().decode(bytes));
        }
      } catch {
        setError(
          currentMode === "decode"
            ? "Invalid Base64 string. Make sure the input is properly encoded."
            : "Could not encode the input. Please check for invalid characters."
        );
        setOutput("");
      }
    },
    []
  );

  const handleInputChange = (text: string) => {
    setInput(text);
    handleConvert(text, mode);
  };

  const handleModeChange = (newMode: "encode" | "decode") => {
    setMode(newMode);
    setInput("");
    setOutput("");
    setError("");
  };

  const handleSwap = () => {
    const newMode = mode === "encode" ? "decode" : "encode";
    const newInput = output;
    setMode(newMode);
    setInput(newInput);
    setError("");
    handleConvert(newInput, newMode);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleClear = () => {
    setInput("");
    setOutput("");
    setError("");
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Base64 Encoder & Decoder",
    description:
      "Encode or decode Base64 strings instantly with real-time conversion and Unicode support.",
    url: "https://prestokit.com/tools/base64-encoder",
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
              Base64{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Encoder / Decoder
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Encode text to Base64 or decode Base64 strings instantly. Supports
              Unicode characters. Real-time conversion with one-click copy.
            </p>
          </div>

          {/* Converter Card */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            {/* Mode Toggle */}
            <div className="flex items-center gap-2 mb-6">
              <button
                onClick={() => handleModeChange("encode")}
                className={`flex-1 rounded-xl border py-3 px-4 text-sm font-semibold text-center transition-all ${
                  mode === "encode"
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                    : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                }`}
              >
                Encode (Text &rarr; Base64)
              </button>
              <button
                onClick={() => handleModeChange("decode")}
                className={`flex-1 rounded-xl border py-3 px-4 text-sm font-semibold text-center transition-all ${
                  mode === "decode"
                    ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                    : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                }`}
              >
                Decode (Base64 &rarr; Text)
              </button>
            </div>

            {/* Input */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[#c0c0d0]">
                  {mode === "encode" ? "Text Input" : "Base64 Input"}
                </label>
                <span className="text-xs text-[#555566]">
                  {input.length} characters
                </span>
              </div>
              <textarea
                value={input}
                onChange={(e) => handleInputChange(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? "Type or paste text to encode..."
                    : "Paste Base64 string to decode..."
                }
                rows={6}
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors font-mono resize-y"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={handleSwap}
                className="inline-flex items-center gap-2 rounded-xl border border-[#7c6cf0]/40 bg-[#7c6cf0]/10 px-4 py-2.5 text-sm font-semibold text-[#9d90f5] hover:bg-[#7c6cf0]/20 transition-colors"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
                  />
                </svg>
                Swap
              </button>
              <button
                onClick={handleClear}
                className="inline-flex items-center gap-2 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-2.5 text-sm font-semibold text-[#8888a0] hover:border-[#7c6cf0]/40 hover:text-white transition-colors"
              >
                Clear
              </button>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-[#ff5252]/30 bg-[#ff5252]/10 p-4 mb-4">
                <p className="text-sm text-[#ff5252]">{error}</p>
              </div>
            )}

            {/* Output */}
            <div className="mb-2">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-[#c0c0d0]">
                  {mode === "encode" ? "Base64 Output" : "Decoded Text"}
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[#555566]">
                    {output.length} characters
                  </span>
                  <button
                    onClick={handleCopy}
                    disabled={!output}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      copied
                        ? "bg-[#00e676]/15 text-[#00e676]"
                        : output
                        ? "bg-[#7c6cf0]/15 text-[#9d90f5] hover:bg-[#7c6cf0]/25"
                        : "bg-[#1e1e2e] text-[#555566] cursor-not-allowed"
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3.5 h-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.666 3.888A2.25 2.25 0 0013.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 01-.75.75H9.75a.75.75 0 01-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 01-2.25 2.25H6.75A2.25 2.25 0 014.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 011.927-.184"
                          />
                        </svg>
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
              <textarea
                value={output}
                readOnly
                rows={6}
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-[#c0c0d0] focus:outline-none font-mono resize-y"
                placeholder="Output will appear here..."
              />
            </div>
          </div>

          {/* Stats */}
          {input && output && !error && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 mb-6">
              <h3 className="text-sm font-semibold text-[#c0c0d0] mb-4">
                Conversion Stats
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                    Input Length
                  </div>
                  <div className="text-lg font-bold text-white">{input.length}</div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                    Output Length
                  </div>
                  <div className="text-lg font-bold text-white">{output.length}</div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                    Size Change
                  </div>
                  <div className="text-lg font-bold text-[#9d90f5]">
                    {input.length > 0
                      ? `${(((output.length - input.length) / input.length) * 100).toFixed(0)}%`
                      : "0%"}
                  </div>
                </div>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 text-center">
                  <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                    Mode
                  </div>
                  <div className="text-lg font-bold text-white capitalize">{mode}</div>
                </div>
              </div>
            </div>
          )}

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="base64-encoder-pro" />

          {/* How It Works */}
          <div className="mb-16 mt-10">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose Mode",
                  description:
                    "Select Encode to convert text to Base64, or Decode to convert Base64 back to readable text.",
                },
                {
                  step: "2",
                  title: "Enter Your Text",
                  description:
                    "Type or paste your content into the input area. Conversion happens in real-time as you type.",
                },
                {
                  step: "3",
                  title: "Copy the Result",
                  description:
                    "Click the Copy button to copy the output to your clipboard, or use the Swap button to reverse the conversion.",
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
                  title: "JSON Formatter",
                  description:
                    "Format, validate, and beautify JSON data with syntax highlighting.",
                  href: "/tools/json-formatter",
                },
                {
                  title: "Password Generator",
                  description:
                    "Generate strong, secure passwords with customizable options.",
                  href: "/tools/password-generator",
                },
                {
                  title: "Regex Tester",
                  description:
                    "Test and debug regular expressions with real-time matching and explanation.",
                  href: "/tools/regex-tester",
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
