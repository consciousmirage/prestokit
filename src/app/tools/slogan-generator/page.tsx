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
      <span className="text-[#f0f0f5]">Slogan Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Slogan Template Data                                               */
/* ------------------------------------------------------------------ */

const ADJECTIVES = [
  "Smarter", "Better", "Faster", "Bolder", "Simpler", "Premium", "Modern",
  "Trusted", "Reliable", "Ultimate", "Effortless", "Brilliant", "Fresh",
  "Innovative", "Powerful", "Authentic", "Unstoppable", "Exceptional",
  "Remarkable", "Legendary", "Superior", "Dynamic", "Inspired",
];

const ACTIONS = [
  "Succeed", "Grow", "Thrive", "Excel", "Lead", "Win", "Achieve",
  "Transform", "Discover", "Build", "Create", "Innovate", "Elevate",
  "Deliver", "Perform", "Prosper", "Conquer", "Shine", "Soar",
];

const NOUNS = [
  "Excellence", "Quality", "Innovation", "Success", "Results", "Performance",
  "Value", "Trust", "Vision", "Solutions", "Growth", "Power", "Passion",
  "Impact", "Future", "Progress", "Standards", "Experience", "Brilliance",
];

const VERBS_PRESENT = [
  "Delivers", "Drives", "Powers", "Builds", "Creates", "Inspires",
  "Defines", "Transforms", "Elevates", "Leads", "Fuels", "Sparks",
];

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function generateSlogans(
  businessName: string,
  industry: string,
  keywords: string[]
): string[] {
  const name = businessName.trim() || "Your Business";
  const ind = industry.trim() || "business";
  const kws = keywords.length > 0 ? keywords : ["quality", "service"];

  const templates: Array<() => string> = [
    // Name-focused templates
    () => `${name} — ${pick(NOUNS)} You Can ${pick(ACTIONS)}`,
    () => `${name}: Where ${pick(NOUNS)} Meets ${pick(NOUNS)}`,
    () => `${name} — ${pick(ADJECTIVES)}. ${pick(ADJECTIVES)}. ${capitalize(ind)}.`,
    () => `${name} ${pick(VERBS_PRESENT)} ${pick(NOUNS)}`,
    () => `Think ${pick(ADJECTIVES)}. Think ${name}.`,
    () => `${name} — The ${pick(ADJECTIVES)} Way to ${pick(ACTIONS)}`,
    () => `${name}: ${pick(ADJECTIVES)} ${capitalize(ind)} for Everyone`,
    () => `${name} — ${pick(ADJECTIVES)} ${pick(NOUNS)}, Every Time`,
    () => `Choose ${name}. Choose ${pick(NOUNS)}.`,
    () => `${name}: ${pick(ADJECTIVES)} Solutions, Real ${pick(NOUNS)}`,

    // Keyword-focused templates
    () => `${capitalize(pick(kws))} Made ${pick(ADJECTIVES)}`,
    () => `The ${pick(ADJECTIVES)} Side of ${capitalize(pick(kws))}`,
    () => `Redefining ${capitalize(pick(kws))} for the ${pick(ADJECTIVES)} World`,
    () => `${capitalize(pick(kws))} ${pick(VERBS_PRESENT)} Everything`,
    () => `Where ${capitalize(pick(kws))} Meets ${capitalize(pick(kws))}`,

    // Industry-focused templates
    () => `The Future of ${capitalize(ind)} Is Here`,
    () => `${capitalize(ind)} Done ${pick(ADJECTIVES)}ly`,
    () => `${pick(ADJECTIVES)} ${capitalize(ind)} Starts With ${name}`,
    () => `${name}: Your ${pick(ADJECTIVES)} ${capitalize(ind)} Partner`,
    () => `Elevating ${capitalize(ind)} to New Heights`,

    // Action-oriented templates
    () => `${pick(ACTIONS)} ${pick(ADJECTIVES)}er With ${name}`,
    () => `Don't Just ${pick(ACTIONS)} — ${pick(ACTIONS)} With ${name}`,
    () => `Ready to ${pick(ACTIONS)}? Start With ${name}.`,
    () => `${pick(ACTIONS)} More. Worry Less.`,
    () => `${name}: Helping You ${pick(ACTIONS)} Since Day One`,

    // Emotion-driven templates
    () => `Experience the ${name} Difference`,
    () => `${name} — Because ${pick(NOUNS)} Matters`,
    () => `Where ${pick(NOUNS)} Comes Standard`,
    () => `${pick(NOUNS)}. ${pick(NOUNS)}. ${name}.`,
    () => `Feel the Power of ${pick(ADJECTIVES)} ${capitalize(pick(kws))}`,

    // Catchy / rhythmic templates
    () => `${pick(ADJECTIVES)} ${capitalize(pick(kws))}, ${pick(ADJECTIVES)} ${pick(NOUNS)}`,
    () => `One Name. One ${pick(NOUNS)}. ${name}.`,
    () => `${name} — It's Not Just ${capitalize(ind)}. It's ${pick(ADJECTIVES)}.`,
    () => `Get ${pick(ADJECTIVES)}. Get ${name}.`,
    () => `${name}: ${capitalize(pick(kws))}, Simplified.`,
    () => `More Than ${capitalize(ind)} — It's ${name}`,
    () => `${name}: Built on ${pick(NOUNS)}, Driven by ${pick(NOUNS)}`,
    () => `Your ${pick(ADJECTIVES)} Journey Starts Here`,
    () => `${name} — ${pick(ADJECTIVES)} by Design`,
    () => `Life's Too Short for Bad ${capitalize(ind)}. Choose ${name}.`,
  ];

  const slogans = new Set<string>();
  const shuffled = shuffle(templates);
  for (const tpl of shuffled) {
    if (slogans.size >= 24) break;
    const slogan = tpl();
    slogans.add(slogan);
  }

  // If we still need more, run through again with different random picks
  for (const tpl of shuffle(templates)) {
    if (slogans.size >= 24) break;
    const slogan = tpl();
    slogans.add(slogan);
  }

  return Array.from(slogans);
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What makes a good business slogan?",
    answer:
      "A great business slogan is short (typically 3-8 words), memorable, and captures the essence of your brand. The best slogans are easy to say, evoke an emotion or benefit, and differentiate you from competitors. Think of Nike's 'Just Do It' or Apple's 'Think Different' — both are simple, powerful, and instantly recognizable. Your slogan should communicate your unique value proposition in a way that resonates with your target audience.",
  },
  {
    question: "How do I choose the right slogan for my business?",
    answer:
      "Start by generating several options and narrowing down your favorites. Test them against these criteria: Is it memorable? Does it reflect your brand values? Is it unique to your business? Does it resonate with your target audience? Try reading them aloud — the best slogans have a natural rhythm. Ask friends, colleagues, or potential customers for their honest feedback. Also check that your chosen slogan isn't already trademarked by another company.",
  },
  {
    question: "Should my slogan include my business name?",
    answer:
      "It depends on your brand strategy. Including your business name in the slogan (like 'Maybe she's born with it. Maybe it's Maybelline.') reinforces brand recognition, especially for newer businesses. However, some of the most iconic slogans stand alone without the brand name ('Just Do It', 'I'm Lovin' It'). If your business name is not yet well-known, including it can help build awareness. Our generator creates a mix of both styles for you to choose from.",
  },
  {
    question: "Can I use these slogans for my business?",
    answer:
      "Yes! The slogans generated by this tool are free to use for any purpose, including commercial use. However, before committing to a slogan, we strongly recommend searching the USPTO trademark database (tmsearch.uspto.gov) to make sure the slogan is not already registered by another company. You can also trademark your chosen slogan to protect it. The slogans are generated algorithmically, so there's a small chance a generated slogan could match an existing one.",
  },
  {
    question: "How long should a business slogan be?",
    answer:
      "The most effective slogans are typically 3 to 8 words long. Research shows that shorter slogans are more memorable and easier to use across marketing materials — from business cards to billboards. However, some successful slogans are longer (like Subway's 'Eat Fresh' at 2 words or De Beers' 'A Diamond Is Forever' at 4 words). The key is to be concise while still communicating your message clearly.",
  },
  {
    question: "What's the difference between a slogan and a tagline?",
    answer:
      "While often used interchangeably, slogans and taglines have subtle differences. A tagline is a permanent phrase that represents your brand identity (like Nike's 'Just Do It' — used for decades). A slogan can be temporary and used for specific campaigns or products (like Nike's 'Find Your Greatness' for the 2012 Olympics). This generator creates both types — some are great as permanent taglines, while others work well for campaigns.",
  },
  {
    question: "Is this slogan generator really free?",
    answer:
      "Yes, the PrestoKit Slogan Generator is 100% free with no limits, no account required, and no hidden fees. Generate as many slogans as you want, copy them individually, and regenerate new batches anytime. The generator runs entirely in your browser using template-based algorithms, so your business details stay private and are never sent to any server.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function SloganGeneratorPage() {
  const [businessName, setBusinessName] = useState("");
  const [industry, setIndustry] = useState("");
  const [keywordsRaw, setKeywordsRaw] = useState("");
  const [slogans, setSlogans] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = useCallback(() => {
    const kws = keywordsRaw
      .split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    const result = generateSlogans(businessName, industry, kws);
    setSlogans(result);
    setGenerated(true);
  }, [businessName, industry, keywordsRaw]);

  const handleCopy = (slogan: string, idx: number) => {
    navigator.clipboard.writeText(slogan);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(slogans.join("\n"));
    setCopiedIdx(-1);
    setTimeout(() => setCopiedIdx(null), 1500);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Slogan Generator",
    description:
      "Generate catchy business slogans and taglines instantly. Enter your business name, industry, and keywords to get 20+ slogan ideas.",
    url: "https://prestokit.com/tools/slogan-generator",
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
              Slogan{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate catchy slogans and taglines for your business. Enter your
              details and get 20+ unique slogan ideas instantly.
            </p>
          </div>

          {/* Input Section */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
              {/* Business Name */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Business Name
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => setBusinessName(e.target.value)}
                  placeholder="e.g. Acme Corp"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. technology, fitness, food"
                  className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
                />
              </div>
            </div>

            {/* Keywords */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                Keywords / Values{" "}
                <span className="text-[#555566] font-normal">
                  (comma-separated)
                </span>
              </label>
              <input
                type="text"
                value={keywordsRaw}
                onChange={(e) => setKeywordsRaw(e.target.value)}
                placeholder="e.g. innovation, speed, reliability, trust"
                className="w-full rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-sm text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors"
              />
            </div>

            {/* Industry Quick Picks */}
            <div className="mb-6">
              <label className="block text-xs text-[#8888a0] mb-2">
                Quick Pick Industry
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  "Technology",
                  "Fitness",
                  "Food & Beverage",
                  "Real Estate",
                  "Fashion",
                  "Finance",
                  "Healthcare",
                  "Education",
                  "Marketing",
                  "Retail",
                  "Automotive",
                  "Travel",
                ].map((ind) => (
                  <button
                    key={ind}
                    onClick={() => setIndustry(ind.toLowerCase())}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      industry.toLowerCase() === ind.toLowerCase()
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] bg-[#0a0a0f] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    {ind}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#7c6cf0] hover:bg-[#6b5ce0] px-8 py-3.5 text-sm font-semibold text-white transition-all shadow-lg shadow-[#7c6cf0]/20"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              {generated ? "Regenerate Slogans" : "Generate Slogans"}
            </button>
          </div>

          {/* Results */}
          {slogans.length > 0 && (
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-white">
                  Your Slogans ({slogans.length})
                </h2>
                <button
                  onClick={handleCopyAll}
                  className="inline-flex items-center gap-2 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40 px-4 py-2 text-sm text-[#8888a0] hover:text-white transition-all"
                >
                  {copiedIdx === -1 ? (
                    <>
                      <svg className="w-4 h-4 text-[#00e676]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      Copied All!
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy All
                    </>
                  )}
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {slogans.map((slogan, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between gap-3 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4 group hover:border-[#7c6cf0]/30 transition-all"
                  >
                    <p className="text-sm text-[#e0e0ea] leading-relaxed flex-1">
                      &ldquo;{slogan}&rdquo;
                    </p>
                    <button
                      onClick={() => handleCopy(slogan, idx)}
                      className="flex-shrink-0 p-2 rounded-lg text-[#555566] hover:text-[#7c6cf0] hover:bg-[#7c6cf0]/10 transition-all"
                      aria-label={`Copy slogan: ${slogan}`}
                    >
                      {copiedIdx === idx ? (
                        <svg className="w-4 h-4 text-[#00e676]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      )}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Promo Bars */}
          <div className="mb-6">
            <PromoBar type="pro" dismissKey="slogan-pro" />
          </div>

          {/* How It Works */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Enter Your Details",
                  description:
                    "Provide your business name, industry, and keywords or values that represent your brand.",
                },
                {
                  step: "2",
                  title: "Generate Slogans",
                  description:
                    "Click generate to get 20+ unique slogan ideas crafted using proven copywriting templates and patterns.",
                },
                {
                  step: "3",
                  title: "Copy Your Favorites",
                  description:
                    "Copy individual slogans or all of them at once. Regenerate anytime for fresh new ideas.",
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
                  title: "Business Name Generator",
                  description:
                    "Generate creative business name ideas with domain availability checks.",
                  href: "/tools/business-name-generator",
                },
                {
                  title: "Invoice Generator",
                  description:
                    "Create and download professional PDF invoices for free.",
                  href: "/tools/invoice-generator",
                },
                {
                  title: "Email Signature Creator",
                  description:
                    "Design professional HTML email signatures for Gmail and Outlook.",
                  href: "/tools/email-signature-creator",
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
