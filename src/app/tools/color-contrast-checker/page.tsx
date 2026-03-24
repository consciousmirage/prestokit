"use client";

import { useState, useMemo } from "react";
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
      <span className="text-[#f0f0f5]">Color Contrast Checker</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Color Utilities                                                    */
/* ------------------------------------------------------------------ */

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const clean = hex.replace("#", "");
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return { r, g, b };
  }
  if (clean.length === 6) {
    const r = parseInt(clean.substring(0, 2), 16);
    const g = parseInt(clean.substring(2, 4), 16);
    const b = parseInt(clean.substring(4, 6), 16);
    return { r, g, b };
  }
  return null;
}

function relativeLuminance(r: number, g: number, b: number): number {
  const [rs, gs, bs] = [r / 255, g / 255, b / 255].map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
  );
  return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
}

function contrastRatio(hex1: string, hex2: string): number {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  if (!rgb1 || !rgb2) return 0;
  const l1 = relativeLuminance(rgb1.r, rgb1.g, rgb1.b);
  const l2 = relativeLuminance(rgb2.r, rgb2.g, rgb2.b);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  return (lighter + 0.05) / (darker + 0.05);
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is a WCAG contrast ratio?",
    answer:
      "The WCAG (Web Content Accessibility Guidelines) contrast ratio is a measure of the difference in perceived brightness between two colors. It ranges from 1:1 (no contrast, identical colors) to 21:1 (maximum contrast, black on white). WCAG defines minimum contrast ratios to ensure text is readable for people with visual impairments, including color blindness and low vision. The ratio is calculated using the relative luminance of both colors.",
  },
  {
    question: "What is the difference between WCAG AA and AAA?",
    answer:
      "WCAG AA is the standard level of accessibility compliance that most websites aim for. It requires a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text (18px bold or 24px regular). WCAG AAA is the enhanced level with stricter requirements: 7:1 for normal text and 4.5:1 for large text. While AAA is ideal, it can be difficult to achieve with certain brand colors, so AA is the most commonly targeted standard.",
  },
  {
    question: "What counts as large text in WCAG?",
    answer:
      "According to WCAG 2.1, large text is defined as text that is at least 18 points (24px) in regular weight, or at least 14 points (approximately 18.66px) in bold weight. Large text has lower contrast requirements because larger characters are inherently easier to read. For normal-sized text (smaller than these thresholds), stricter contrast ratios apply.",
  },
  {
    question: "Is color contrast required by law?",
    answer:
      "In many jurisdictions, yes. In the United States, the ADA (Americans with Disabilities Act) and Section 508 of the Rehabilitation Act require digital accessibility for government websites and organizations that serve the public. The European Accessibility Act (EAA) requires accessibility compliance for businesses in the EU. WCAG 2.1 Level AA is the standard most commonly referenced in these laws. Non-compliance can result in lawsuits and fines.",
  },
  {
    question: "What are some tips for choosing accessible color combinations?",
    answer:
      "Start with high-contrast pairs like dark text on a light background. Avoid placing text on busy or gradient backgrounds. Never rely on color alone to convey information (use icons, patterns, or labels as well). Test your colors with this tool before implementing them. Consider using a dark mode option. When in doubt, black (#000000) on white (#FFFFFF) provides the maximum 21:1 contrast ratio. Navy blue on white and dark gray on light gray are also safe, accessible combinations.",
  },
  {
    question: "How do I fix low contrast on my website?",
    answer:
      "If your text fails WCAG contrast checks, you have several options: darken the text color, lighten the background color, increase the font size to qualify as large text (which has lower requirements), add a semi-transparent overlay behind text that sits on images, or choose entirely different colors. Use this tool to test different combinations until you find one that passes at your target WCAG level while still matching your brand.",
  },
  {
    question: "Does this tool work with any color format?",
    answer:
      "This tool accepts hex color codes (like #FF5733 or #F00). You can type the hex value directly or use the color picker to select any color visually. The tool then calculates the contrast ratio using the WCAG 2.1 algorithm based on relative luminance values. If you have colors in RGB, HSL, or other formats, convert them to hex first — there are many free converters available online.",
  },
];

/* ------------------------------------------------------------------ */
/*  Pass/Fail Badge                                                    */
/* ------------------------------------------------------------------ */

function Badge({ pass }: { pass: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-xs font-bold ${
        pass
          ? "bg-[#00e676]/15 text-[#00e676]"
          : "bg-[#ff5252]/15 text-[#ff5252]"
      }`}
    >
      {pass ? (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      ) : (
        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      )}
      {pass ? "Pass" : "Fail"}
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ColorContrastCheckerPage() {
  const [foreground, setForeground] = useState("#ffffff");
  const [background, setBackground] = useState("#7c6cf0");

  const results = useMemo(() => {
    const ratio = contrastRatio(foreground, background);
    return {
      ratio,
      aaNormal: ratio >= 4.5,
      aaLarge: ratio >= 3,
      aaaNormal: ratio >= 7,
      aaaLarge: ratio >= 4.5,
    };
  }, [foreground, background]);

  const swapColors = () => {
    setForeground(background);
    setBackground(foreground);
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Free Color Contrast Checker",
    description:
      "Check color contrast ratios for WCAG 2.1 compliance. Test foreground and background colors for AA and AAA accessibility levels.",
    url: "https://prestokit.com/tools/color-contrast-checker",
    applicationCategory: "DesignApplication",
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

  const getRatioColor = () => {
    if (results.ratio >= 7) return "text-[#00e676]";
    if (results.ratio >= 4.5) return "text-[#ffab40]";
    return "text-[#ff5252]";
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
              Color Contrast{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Checker
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Check WCAG 2.1 contrast ratios between foreground and background
              colors. See pass/fail results for AA and AAA accessibility levels.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Input Section */}
            <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
              {/* Foreground Color */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Foreground (Text) Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="w-14 h-14 rounded-xl border border-[#1e1e2e] cursor-pointer bg-transparent p-1"
                  />
                  <input
                    type="text"
                    value={foreground}
                    onChange={(e) => setForeground(e.target.value)}
                    className="flex-1 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg font-mono text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors uppercase"
                  />
                </div>
              </div>

              {/* Swap Button */}
              <div className="flex justify-center mb-6">
                <button
                  onClick={swapColors}
                  className="flex items-center gap-2 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40 px-4 py-2.5 text-sm text-[#8888a0] hover:text-white transition-all"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                  </svg>
                  Swap Colors
                </button>
              </div>

              {/* Background Color */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#c0c0d0] mb-2">
                  Background Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="w-14 h-14 rounded-xl border border-[#1e1e2e] cursor-pointer bg-transparent p-1"
                  />
                  <input
                    type="text"
                    value={background}
                    onChange={(e) => setBackground(e.target.value)}
                    className="flex-1 rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] py-3 px-4 text-lg font-mono text-white placeholder-[#555566] focus:outline-none focus:border-[#7c6cf0] transition-colors uppercase"
                  />
                </div>
              </div>

              {/* Quick Presets */}
              <div>
                <label className="block text-sm font-medium text-[#c0c0d0] mb-3">
                  Quick Presets
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { fg: "#000000", bg: "#ffffff", label: "Black / White" },
                    { fg: "#ffffff", bg: "#1a1a2e", label: "White / Dark" },
                    { fg: "#333333", bg: "#f5f5f5", label: "Gray / Light" },
                    { fg: "#ffffff", bg: "#2563eb", label: "White / Blue" },
                  ].map((preset) => (
                    <button
                      key={preset.label}
                      onClick={() => {
                        setForeground(preset.fg);
                        setBackground(preset.bg);
                      }}
                      className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] hover:border-[#7c6cf0]/40 p-3 text-left transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className="w-4 h-4 rounded-full border border-[#333]"
                          style={{ backgroundColor: preset.fg }}
                        />
                        <div
                          className="w-4 h-4 rounded-full border border-[#333]"
                          style={{ backgroundColor: preset.bg }}
                        />
                      </div>
                      <span className="text-xs text-[#8888a0]">{preset.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Results Section */}
            <div className="space-y-4">
              {/* Contrast Ratio */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Contrast Ratio
                </h2>
                <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-5 text-center mb-5">
                  <div className={`text-5xl font-bold ${getRatioColor()}`}>
                    {results.ratio.toFixed(2)}
                  </div>
                  <div className="text-sm text-[#8888a0] mt-1">: 1</div>
                </div>

                {/* WCAG Results Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#8888a0] uppercase tracking-wide">
                        AA Normal
                      </span>
                      <Badge pass={results.aaNormal} />
                    </div>
                    <div className="text-xs text-[#555566]">
                      Requires 4.5:1
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#8888a0] uppercase tracking-wide">
                        AA Large
                      </span>
                      <Badge pass={results.aaLarge} />
                    </div>
                    <div className="text-xs text-[#555566]">
                      Requires 3:1
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#8888a0] uppercase tracking-wide">
                        AAA Normal
                      </span>
                      <Badge pass={results.aaaNormal} />
                    </div>
                    <div className="text-xs text-[#555566]">
                      Requires 7:1
                    </div>
                  </div>
                  <div className="rounded-xl border border-[#1e1e2e] bg-[#0a0a0f] p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs text-[#8888a0] uppercase tracking-wide">
                        AAA Large
                      </span>
                      <Badge pass={results.aaaLarge} />
                    </div>
                    <div className="text-xs text-[#555566]">
                      Requires 4.5:1
                    </div>
                  </div>
                </div>
              </div>

              {/* Live Preview */}
              <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8">
                <h2 className="text-sm font-semibold text-[#c0c0d0] mb-5">
                  Live Preview
                </h2>
                <div
                  className="rounded-xl p-6 space-y-3"
                  style={{ backgroundColor: background }}
                >
                  <h3
                    className="text-2xl font-bold"
                    style={{ color: foreground }}
                  >
                    Heading Text Preview
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{ color: foreground }}
                  >
                    This is how normal body text will look with your selected
                    foreground color on this background. Make sure it is easy to
                    read.
                  </p>
                  <p
                    className="text-sm"
                    style={{ color: foreground }}
                  >
                    Small text like captions and footnotes is even harder to read
                    at low contrast ratios.
                  </p>
                  <button
                    className="rounded-lg px-4 py-2 text-sm font-semibold border-2"
                    style={{
                      color: foreground,
                      borderColor: foreground,
                    }}
                  >
                    Button Example
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Promo Bars */}
          <div className="mb-6">
            <PromoBar type="pro" dismissKey="contrast-pro" />
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
                  title: "Pick Your Colors",
                  description:
                    "Use the color pickers or enter hex codes for your foreground (text) and background colors.",
                },
                {
                  step: "2",
                  title: "Check the Ratio",
                  description:
                    "The tool instantly calculates the WCAG contrast ratio and shows pass/fail results for AA and AAA levels.",
                },
                {
                  step: "3",
                  title: "Preview & Adjust",
                  description:
                    "See a live preview of your text on the background. Adjust colors until you achieve the accessibility level you need.",
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
                  title: "Meta Tag Generator",
                  description:
                    "Generate SEO meta tags, Open Graph tags, and Twitter Card tags.",
                  href: "/tools/meta-tag-generator",
                },
                {
                  title: "QR Code Generator",
                  description:
                    "Create custom QR codes for URLs, WiFi, email, and more.",
                  href: "/tools/qr-code-generator",
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
