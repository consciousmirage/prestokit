"use client";

import { useState, useCallback } from "react";

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
      <span className="text-[#f0f0f5]">Text Case Converter</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Case conversion functions                                          */
/* ------------------------------------------------------------------ */

function toWords(text: string): string[] {
  return text
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/([A-Z]+)([A-Z][a-z])/g, "$1 $2")
    .replace(/[_\-./\\]+/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 0);
}

function toUpperCase(text: string): string {
  return text.toUpperCase();
}

function toLowerCase(text: string): string {
  return text.toLowerCase();
}

function toTitleCase(text: string): string {
  return text.replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase()
  );
}

function toSentenceCase(text: string): string {
  return text
    .toLowerCase()
    .replace(/(^\s*\w|[.!?]\s+\w)/g, (c) => c.toUpperCase());
}

function toCamelCase(text: string): string {
  const words = toWords(text);
  if (words.length === 0) return "";
  return words
    .map((w, i) =>
      i === 0
        ? w.toLowerCase()
        : w.charAt(0).toUpperCase() + w.substring(1).toLowerCase()
    )
    .join("");
}

function toPascalCase(text: string): string {
  const words = toWords(text);
  return words
    .map((w) => w.charAt(0).toUpperCase() + w.substring(1).toLowerCase())
    .join("");
}

function toSnakeCase(text: string): string {
  return toWords(text)
    .map((w) => w.toLowerCase())
    .join("_");
}

function toKebabCase(text: string): string {
  return toWords(text)
    .map((w) => w.toLowerCase())
    .join("-");
}

function toConstantCase(text: string): string {
  return toWords(text)
    .map((w) => w.toUpperCase())
    .join("_");
}

function toDotCase(text: string): string {
  return toWords(text)
    .map((w) => w.toLowerCase())
    .join(".");
}

function toPathCase(text: string): string {
  return toWords(text)
    .map((w) => w.toLowerCase())
    .join("/");
}

function toAlternatingCase(text: string): string {
  let idx = 0;
  return text
    .split("")
    .map((ch) => {
      if (/[a-zA-Z]/.test(ch)) {
        const result = idx % 2 === 0 ? ch.toLowerCase() : ch.toUpperCase();
        idx++;
        return result;
      }
      return ch;
    })
    .join("");
}

function toInverseCase(text: string): string {
  return text
    .split("")
    .map((ch) => {
      if (ch === ch.toUpperCase()) return ch.toLowerCase();
      if (ch === ch.toLowerCase()) return ch.toUpperCase();
      return ch;
    })
    .join("");
}

/* ------------------------------------------------------------------ */
/*  Case types                                                         */
/* ------------------------------------------------------------------ */

const CASE_TYPES: { label: string; fn: (t: string) => string; example: string }[] = [
  { label: "UPPERCASE", fn: toUpperCase, example: "HELLO WORLD" },
  { label: "lowercase", fn: toLowerCase, example: "hello world" },
  { label: "Title Case", fn: toTitleCase, example: "Hello World" },
  { label: "Sentence case", fn: toSentenceCase, example: "Hello world" },
  { label: "camelCase", fn: toCamelCase, example: "helloWorld" },
  { label: "PascalCase", fn: toPascalCase, example: "HelloWorld" },
  { label: "snake_case", fn: toSnakeCase, example: "hello_world" },
  { label: "kebab-case", fn: toKebabCase, example: "hello-world" },
  { label: "CONSTANT_CASE", fn: toConstantCase, example: "HELLO_WORLD" },
  { label: "dot.case", fn: toDotCase, example: "hello.world" },
  { label: "path/case", fn: toPathCase, example: "hello/world" },
  { label: "aLtErNaTiNg", fn: toAlternatingCase, example: "hElLo WoRlD" },
  { label: "InVeRsE", fn: toInverseCase, example: "hELLO wORLD" },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is a text case converter?",
    answer:
      "A text case converter is an online tool that transforms text between different case formats such as UPPERCASE, lowercase, Title Case, camelCase, snake_case, and more. It's useful for writers, developers, and anyone who needs to quickly change the formatting of text.",
  },
  {
    question: "What case types are supported?",
    answer:
      "We support 13 case types: UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case, CONSTANT_CASE, dot.case, path/case, alternating case, and inverse case. Each conversion is instant and accurate.",
  },
  {
    question: "What is camelCase used for?",
    answer:
      "camelCase is a naming convention commonly used in programming where the first word is lowercase and each subsequent word starts with an uppercase letter (e.g., 'myVariableName'). It is the standard for JavaScript/TypeScript variables and function names.",
  },
  {
    question: "What is the difference between snake_case and kebab-case?",
    answer:
      "snake_case uses underscores to separate words (e.g., 'my_variable_name') and is common in Python and Ruby. kebab-case uses hyphens (e.g., 'my-variable-name') and is common in CSS class names and URL slugs.",
  },
  {
    question: "Is my text stored or sent to a server?",
    answer:
      "No. All text transformations happen entirely in your browser using JavaScript. Your text is never transmitted to any server, never stored, and never logged. You can use this tool with complete confidence for sensitive content.",
  },
  {
    question: "Can I convert programming variable names between cases?",
    answer:
      "Yes! The converter intelligently splits camelCase, PascalCase, snake_case, kebab-case, and other formats into words before converting. So you can paste 'myVariableName' and convert it to 'my_variable_name' or 'my-variable-name' seamlessly.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function TextCaseConverterPage() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [activeCase, setActiveCase] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const wordCount = input.trim() ? input.trim().split(/\s+/).length : 0;
  const charCount = input.length;

  const handleConvert = useCallback(
    (label: string, fn: (t: string) => string) => {
      setOutput(fn(input));
      setActiveCase(label);
    },
    [input]
  );

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
    setActiveCase(null);
    setCopied(false);
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <main className="min-h-screen bg-[#0a0a0f] text-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
          <Breadcrumb />

          {/* Header */}
          <div className="mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
              Text Case{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Converter
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Convert text between UPPERCASE, lowercase, Title Case, camelCase,
              snake_case, kebab-case, and 7 more formats instantly.
            </p>
          </div>

          {/* Input */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-[#c0c0d0]">
                Input Text
              </label>
              <div className="flex items-center gap-3">
                <span className="text-xs text-[#8888a0]">
                  {wordCount} words / {charCount} chars
                </span>
                <button
                  onClick={handleClear}
                  disabled={!input && !output}
                  className="text-xs text-[#8888a0] hover:text-white border border-[#1e1e2e] hover:border-[#7c6cf0]/40 rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Clear
                </button>
              </div>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type or paste your text here..."
              rows={6}
              className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-white text-sm placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors resize-none leading-relaxed"
            />
          </div>

          {/* Case Buttons Grid */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-sm font-semibold text-[#c0c0d0] mb-4">
              Choose a Case
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
              {CASE_TYPES.map((ct) => (
                <button
                  key={ct.label}
                  onClick={() => handleConvert(ct.label, ct.fn)}
                  disabled={!input}
                  className={`text-left rounded-xl border p-3 transition-all disabled:opacity-40 disabled:cursor-not-allowed ${
                    activeCase === ct.label
                      ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                      : "border-[#1e1e2e] hover:border-[#7c6cf0]/40 bg-[#0a0a0f]"
                  }`}
                >
                  <div className="text-sm font-medium text-white mb-1">
                    {ct.label}
                  </div>
                  <div className="text-xs text-[#8888a0] truncate">
                    {ct.example}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Output */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-[#c0c0d0]">
                Output{activeCase ? ` (${activeCase})` : ""}
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
              placeholder="Converted text will appear here..."
              rows={6}
              className="w-full bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 text-[#00e676] text-sm placeholder-[#555566] focus:outline-none transition-colors resize-none leading-relaxed"
            />
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
                  title: "Enter Your Text",
                  description:
                    "Type or paste any text into the input area. You can enter plain sentences, variable names, or any text you want to convert.",
                },
                {
                  step: "2",
                  title: "Pick a Case",
                  description:
                    "Click one of the 13 case buttons to instantly convert your text. The active case is highlighted so you always know the current format.",
                },
                {
                  step: "3",
                  title: "Copy & Use",
                  description:
                    "Click the Copy button to copy the converted text to your clipboard. Paste it wherever you need -- code editors, documents, emails, or social media.",
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
                  title: "Word Counter",
                  description:
                    "Count words, characters, sentences, and paragraphs instantly.",
                  href: "/tools/word-counter",
                },
                {
                  title: "Lorem Ipsum Generator",
                  description:
                    "Generate placeholder text for your designs and mockups.",
                  href: "/tools/lorem-ipsum-generator",
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
