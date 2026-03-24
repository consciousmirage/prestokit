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
      <span className="text-[#f0f0f5]">Invoice Number Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

type FormatType = "sequential" | "date-based" | "random";
type DateFormat = "YYYYMMDD" | "YYMMDD" | "MMDDYYYY" | "DDMMYYYY";

function padNumber(n: number, digits: number): string {
  return n.toString().padStart(digits, "0");
}

function formatDate(date: Date, fmt: DateFormat): string {
  const yyyy = date.getFullYear().toString();
  const yy = yyyy.slice(-2);
  const mm = padNumber(date.getMonth() + 1, 2);
  const dd = padNumber(date.getDate(), 2);

  switch (fmt) {
    case "YYYYMMDD":
      return `${yyyy}${mm}${dd}`;
    case "YYMMDD":
      return `${yy}${mm}${dd}`;
    case "MMDDYYYY":
      return `${mm}${dd}${yyyy}`;
    case "DDMMYYYY":
      return `${dd}${mm}${yyyy}`;
  }
}

function generateRandomId(length: number): string {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "Why do I need a consistent invoice numbering system?",
    answer:
      "A consistent invoice numbering system is essential for bookkeeping, tax compliance, and professionalism. It helps you track payments, identify outstanding invoices, and provides an audit trail. Most countries require businesses to use sequential, unique invoice numbers. A good system also makes it easy for clients to reference specific invoices.",
  },
  {
    question: "What is the best invoice number format?",
    answer:
      "The best format depends on your business needs. Sequential numbering (INV-0001, INV-0002) is simple and meets most legal requirements. Date-based formats (INV-20240315-001) help you quickly identify when an invoice was created. For businesses with multiple departments or locations, adding a department code as a prefix can be helpful.",
  },
  {
    question: "Should invoice numbers be sequential?",
    answer:
      "In most countries, tax authorities require or strongly recommend sequential invoice numbering. Gaps in the sequence can raise red flags during audits. If you void an invoice, keep it in your records with a note rather than reusing the number. Some jurisdictions allow non-sequential numbering if each number is unique.",
  },
  {
    question: "Can I use letters in invoice numbers?",
    answer:
      "Yes, invoice numbers can include letters, numbers, and certain special characters like hyphens and slashes. Many businesses use a letter prefix (e.g., INV-, PO-, QT-) to distinguish between invoices, purchase orders, and quotes. Just ensure the system you use generates unique, non-repeating identifiers.",
  },
  {
    question: "How many digits should an invoice number have?",
    answer:
      "Plan for growth. If you expect to send fewer than 10,000 invoices in your business lifetime, 4 digits is sufficient. Most businesses use 4-6 digits. Starting with more digits (like 0001 instead of 1) keeps your numbering visually consistent and makes sorting easier in spreadsheets and accounting software.",
  },
  {
    question: "What should my first invoice number be?",
    answer:
      "While there's no rule against starting at 1, many freelancers and small businesses start at a higher number (like 1001 or 100) to appear more established. What matters most is that you continue sequentially from wherever you start. Never reuse an invoice number, even if the original invoice was voided.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function InvoiceNumberGeneratorPage() {
  const [formatType, setFormatType] = useState<FormatType>("sequential");
  const [prefix, setPrefix] = useState("INV-");
  const [startingNumber, setStartingNumber] = useState(1001);
  const [digitCount, setDigitCount] = useState(4);
  const [dateFormat, setDateFormat] = useState<DateFormat>("YYYYMMDD");
  const [separator, setSeparator] = useState("-");
  const [randomLength, setRandomLength] = useState(8);
  const [batchSize, setBatchSize] = useState(10);
  const [generated, setGenerated] = useState<string[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [copiedAll, setCopiedAll] = useState(false);

  const generateNumbers = useCallback(() => {
    const results: string[] = [];
    const now = new Date();

    for (let i = 0; i < batchSize; i++) {
      let invoiceNumber = "";

      switch (formatType) {
        case "sequential": {
          const num = padNumber(startingNumber + i, digitCount);
          invoiceNumber = `${prefix}${num}`;
          break;
        }
        case "date-based": {
          // Increment day for each invoice in batch for realistic preview
          const date = new Date(now);
          date.setDate(date.getDate() + Math.floor(i / 5)); // New date every 5 invoices
          const dateStr = formatDate(date, dateFormat);
          const seq = padNumber(i + 1, 3);
          invoiceNumber = `${prefix}${dateStr}${separator}${seq}`;
          break;
        }
        case "random": {
          invoiceNumber = `${prefix}${generateRandomId(randomLength)}`;
          break;
        }
      }

      results.push(invoiceNumber);
    }

    setGenerated(results);
    setCopiedIndex(null);
    setCopiedAll(false);
  }, [formatType, prefix, startingNumber, digitCount, dateFormat, separator, randomLength, batchSize]);

  const copyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch {
      // Clipboard not available
    }
  };

  const copyAll = async () => {
    try {
      await navigator.clipboard.writeText(generated.join("\n"));
      setCopiedAll(true);
      setTimeout(() => setCopiedAll(false), 2000);
    } catch {
      // Clipboard not available
    }
  };

  // Preview
  const getPreview = (): string => {
    const now = new Date();
    switch (formatType) {
      case "sequential":
        return `${prefix}${padNumber(startingNumber, digitCount)}`;
      case "date-based":
        return `${prefix}${formatDate(now, dateFormat)}${separator}001`;
      case "random":
        return `${prefix}${"X".repeat(randomLength)}`;
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Invoice Number Generator",
    description:
      "Generate professional invoice numbers with custom prefixes, date-based formats, or random codes. Batch generate up to 50 invoice numbers.",
    url: "https://prestokit.com/tools/invoice-number-generator",
    applicationCategory: "BusinessApplication",
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
              Invoice Number{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate professional invoice numbers in seconds. Choose from
              sequential, date-based, or random formats. Batch generate up to 50
              at a time.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Settings */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Format Type */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Format Type
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {(
                    [
                      {
                        value: "sequential" as FormatType,
                        label: "Sequential",
                        desc: "INV-0001, INV-0002, INV-0003...",
                      },
                      {
                        value: "date-based" as FormatType,
                        label: "Date-Based",
                        desc: "INV-20240315-001, INV-20240315-002...",
                      },
                      {
                        value: "random" as FormatType,
                        label: "Random",
                        desc: "INV-A7K2M9X4, INV-B3N8P1Q6...",
                      },
                    ] as const
                  ).map((option) => (
                    <button
                      key={option.value}
                      onClick={() => setFormatType(option.value)}
                      className={`rounded-xl border py-3 px-4 text-left transition-all ${
                        formatType === option.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10"
                          : "border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      <div
                        className={`text-sm font-semibold ${
                          formatType === option.value
                            ? "text-[#9d90f5]"
                            : "text-[#8888a0]"
                        }`}
                      >
                        {option.label}
                      </div>
                      <div className="text-xs text-[#555566] mt-0.5">
                        {option.desc}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Prefix */}
              <div className="mb-5">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Prefix
                </label>
                <input
                  type="text"
                  value={prefix}
                  onChange={(e) => setPrefix(e.target.value)}
                  placeholder="INV-"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Sequential Settings */}
              {formatType === "sequential" && (
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Starting Number
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={startingNumber}
                      onChange={(e) =>
                        setStartingNumber(Math.max(0, parseInt(e.target.value) || 0))
                      }
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Digit Padding
                    </label>
                    <input
                      type="number"
                      min="1"
                      max="10"
                      value={digitCount}
                      onChange={(e) =>
                        setDigitCount(
                          Math.max(1, Math.min(10, parseInt(e.target.value) || 1))
                        )
                      }
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                    />
                  </div>
                </div>
              )}

              {/* Date-Based Settings */}
              {formatType === "date-based" && (
                <div className="grid grid-cols-2 gap-4 mb-5">
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Date Format
                    </label>
                    <select
                      value={dateFormat}
                      onChange={(e) => setDateFormat(e.target.value as DateFormat)}
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors appearance-none"
                    >
                      <option value="YYYYMMDD">YYYYMMDD</option>
                      <option value="YYMMDD">YYMMDD</option>
                      <option value="MMDDYYYY">MMDDYYYY</option>
                      <option value="DDMMYYYY">DDMMYYYY</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                      Separator
                    </label>
                    <select
                      value={separator}
                      onChange={(e) => setSeparator(e.target.value)}
                      className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors appearance-none"
                    >
                      <option value="-">Hyphen (-)</option>
                      <option value="/">Slash (/)</option>
                      <option value=".">Dot (.)</option>
                      <option value="_">Underscore (_)</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Random Settings */}
              {formatType === "random" && (
                <div className="mb-5">
                  <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                    Random ID Length
                  </label>
                  <input
                    type="number"
                    min="4"
                    max="16"
                    value={randomLength}
                    onChange={(e) =>
                      setRandomLength(
                        Math.max(4, Math.min(16, parseInt(e.target.value) || 4))
                      )
                    }
                    className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                </div>
              )}

              {/* Batch Size */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Batch Size ({batchSize})
                </label>
                <input
                  type="range"
                  min="1"
                  max="50"
                  value={batchSize}
                  onChange={(e) => setBatchSize(parseInt(e.target.value))}
                  className="w-full accent-[#7c6cf0]"
                />
                <div className="flex justify-between text-xs text-[#555566] mt-1">
                  <span>1</span>
                  <span>25</span>
                  <span>50</span>
                </div>
              </div>

              {/* Preview */}
              <div className="rounded-xl border border-[#7c6cf0]/20 bg-[#7c6cf0]/5 p-4 mb-6">
                <div className="text-xs text-[#8888a0] uppercase tracking-wide mb-1">
                  Preview
                </div>
                <div className="text-lg font-mono font-semibold text-white">
                  {getPreview()}
                </div>
              </div>

              {/* Generate Button */}
              <button
                onClick={generateNumbers}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-6 py-3.5 text-base font-semibold text-white transition-all shadow-lg shadow-[#7c6cf0]/20"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z"
                  />
                </svg>
                Generate {batchSize} Invoice Numbers
              </button>
            </div>

            {/* Generated Numbers */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-sm font-semibold text-[#c0c0d0]">
                  Generated Numbers
                </h2>
                {generated.length > 0 && (
                  <button
                    onClick={copyAll}
                    className={`inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
                      copiedAll
                        ? "bg-[#00e676]/20 text-[#00e676]"
                        : "bg-[#7c6cf0]/20 text-[#7c6cf0] hover:bg-[#7c6cf0]/30"
                    }`}
                  >
                    {copiedAll ? (
                      <>
                        <svg
                          className="w-3 h-3"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M4.5 12.75l6 6 9-13.5"
                          />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg
                          className="w-3 h-3"
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
                        Copy All
                      </>
                    )}
                  </button>
                )}
              </div>

              {generated.length > 0 ? (
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {generated.map((num, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] px-4 py-3 group hover:border-[#7c6cf0]/30 transition-all"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-[#555566] w-6 text-right">
                          {i + 1}
                        </span>
                        <span className="font-mono text-sm text-white">
                          {num}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(num, i)}
                        className={`opacity-0 group-hover:opacity-100 transition-all px-2 py-1 rounded-lg text-xs font-medium ${
                          copiedIndex === i
                            ? "text-[#00e676]"
                            : "text-[#7c6cf0] hover:bg-[#7c6cf0]/10"
                        }`}
                      >
                        {copiedIndex === i ? "Copied!" : "Copy"}
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#7c6cf0]/10 flex items-center justify-center mb-4">
                    <svg
                      className="w-8 h-8 text-[#7c6cf0]/50"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={1.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5"
                      />
                    </svg>
                  </div>
                  <p className="text-[#555566] text-sm">
                    Configure your format and click Generate
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="invoice-number-gen-pro" />

          {/* How It Works */}
          <div className="mb-16 mt-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose Your Format",
                  description:
                    "Pick from sequential, date-based, or random invoice number formats. Set your prefix, starting number, and other options.",
                },
                {
                  step: "2",
                  title: "Generate a Batch",
                  description:
                    "Select how many invoice numbers you need (1-50) and click Generate. Preview shows exactly how your numbers will look.",
                },
                {
                  step: "3",
                  title: "Copy & Use",
                  description:
                    "Copy individual numbers or the entire batch with one click. Paste them directly into your invoicing software or spreadsheet.",
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
                  title: "Invoice Generator",
                  description:
                    "Create professional invoices with line items, tax, and custom branding.",
                  href: "/tools/invoice-generator",
                },
                {
                  title: "Receipt Maker",
                  description:
                    "Generate receipts for payments, purchases, and transactions.",
                  href: "/tools/receipt-maker",
                },
                {
                  title: "Profit Margin Calculator",
                  description:
                    "Calculate profit margins, markups, and break-even points for your business.",
                  href: "/tools/profit-margin-calculator",
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
