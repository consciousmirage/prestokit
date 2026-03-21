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
      <span className="text-[#f0f0f5]">Color Palette Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Color Utilities                                                    */
/* ------------------------------------------------------------------ */

interface ColorItem {
  h: number;
  s: number;
  l: number;
  locked: boolean;
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0");
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

function hslToRgb(h: number, s: number, l: number): { r: number; g: number; b: number } {
  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (ln - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)));
  };
  return { r: f(0), g: f(8), b: f(4) };
}

function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!result) return { h: 0, s: 70, l: 50 };
  const r = parseInt(result[1], 16) / 255;
  const g = parseInt(result[2], 16) / 255;
  const b = parseInt(result[3], 16) / 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  if (max === min) return { h: 0, s: 0, l: Math.round(l * 100) };
  const d = max - min;
  const s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
  let h = 0;
  if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
  else if (max === g) h = ((b - r) / d + 2) / 6;
  else h = ((r - g) / d + 4) / 6;
  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

type HarmonyMode = "random" | "complementary" | "analogous" | "triadic" | "monochromatic";

function generatePalette(
  mode: HarmonyMode,
  existing: ColorItem[],
  baseHue?: number
): ColorItem[] {
  const hue = baseHue !== undefined ? baseHue : randomInt(0, 359);
  const newColors: ColorItem[] = [];

  const saturations = [65, 70, 75, 60, 80];
  const lightnesses = [45, 55, 65, 35, 75];

  function makeColor(h: number, idx: number, locked: boolean): ColorItem {
    if (locked) return existing[idx];
    return {
      h: ((h % 360) + 360) % 360,
      s: saturations[idx] + randomInt(-5, 5),
      l: lightnesses[idx] + randomInt(-5, 5),
      locked: false,
    };
  }

  switch (mode) {
    case "complementary": {
      const hues = [hue, hue, hue + 180, hue + 180, hue];
      for (let i = 0; i < 5; i++) {
        newColors.push(makeColor(hues[i], i, existing[i]?.locked));
      }
      break;
    }
    case "analogous": {
      const offsets = [-30, -15, 0, 15, 30];
      for (let i = 0; i < 5; i++) {
        newColors.push(makeColor(hue + offsets[i], i, existing[i]?.locked));
      }
      break;
    }
    case "triadic": {
      const hues = [hue, hue, hue + 120, hue + 120, hue + 240];
      for (let i = 0; i < 5; i++) {
        newColors.push(makeColor(hues[i], i, existing[i]?.locked));
      }
      break;
    }
    case "monochromatic": {
      const ls = [30, 40, 50, 60, 70];
      for (let i = 0; i < 5; i++) {
        if (existing[i]?.locked) {
          newColors.push(existing[i]);
        } else {
          newColors.push({
            h: hue,
            s: 70 + randomInt(-10, 10),
            l: ls[i] + randomInt(-5, 5),
            locked: false,
          });
        }
      }
      break;
    }
    default: {
      // Random harmonious: pick a base hue with golden-ratio-spaced hues
      for (let i = 0; i < 5; i++) {
        if (existing[i]?.locked) {
          newColors.push(existing[i]);
        } else {
          const h = (hue + i * 72 + randomInt(-15, 15)) % 360;
          newColors.push({
            h: ((h % 360) + 360) % 360,
            s: randomInt(55, 85),
            l: randomInt(35, 70),
            locked: false,
          });
        }
      }
      break;
    }
  }

  return newColors;
}

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "How does the color palette generator work?",
    answer:
      "The generator uses the HSL (Hue, Saturation, Lightness) color space to create harmonious palettes. Different harmony modes calculate hues based on color theory: complementary colors are 180 degrees apart on the color wheel, triadic colors are 120 degrees apart, analogous colors are within 30 degrees, and monochromatic uses the same hue with different saturation and lightness.",
  },
  {
    question: "What are complementary colors?",
    answer:
      "Complementary colors sit directly opposite each other on the color wheel (180 degrees apart). They create high contrast and vibrant combinations. Examples include red/green, blue/orange, and yellow/purple. These palettes are great for bold, eye-catching designs.",
  },
  {
    question: "What does locking a color do?",
    answer:
      "When you lock a color by clicking the lock icon, that color stays in place while all unlocked colors regenerate when you click 'Generate'. This lets you keep colors you love and explore new combinations around them.",
  },
  {
    question: "How do I use the exported CSS variables?",
    answer:
      "Click 'Export CSS' to copy CSS custom properties to your clipboard. Paste them into your stylesheet's :root selector, then reference them anywhere in your CSS like: color: var(--color-1); or background-color: var(--color-3);",
  },
  {
    question: "Can I start from a specific brand color?",
    answer:
      "Yes! Use the color picker or type a hex code in the 'Base Color' input. The generator will build a harmonious palette around your chosen color using the selected harmony mode.",
  },
  {
    question: "Is this tool free to use?",
    answer:
      "Absolutely. The Color Palette Generator is 100% free, requires no sign-up, and all processing happens in your browser. Your color choices are never sent to any server.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function ColorPaletteGeneratorPage() {
  const [colors, setColors] = useState<ColorItem[]>(() =>
    generatePalette("random", [])
  );
  const [mode, setMode] = useState<HarmonyMode>("random");
  const [baseColor, setBaseColor] = useState("#7c6cf0");
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [copiedCss, setCopiedCss] = useState(false);

  const handleGenerate = useCallback(() => {
    const hsl = hexToHsl(baseColor);
    setColors(generatePalette(mode, colors, hsl.h));
  }, [mode, colors, baseColor]);

  const handleGenerateRandom = useCallback(() => {
    setColors(generatePalette(mode, colors));
  }, [mode, colors]);

  const toggleLock = (index: number) => {
    setColors((prev) =>
      prev.map((c, i) => (i === index ? { ...c, locked: !c.locked } : c))
    );
  };

  const copyHex = async (hex: string, index: number) => {
    try {
      await navigator.clipboard.writeText(hex);
      setCopiedIdx(index);
      setTimeout(() => setCopiedIdx(null), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const exportCss = async () => {
    const vars = colors
      .map((c, i) => `  --color-${i + 1}: ${hslToHex(c.h, c.s, c.l)};`)
      .join("\n");
    const css = `:root {\n${vars}\n}`;
    try {
      await navigator.clipboard.writeText(css);
      setCopiedCss(true);
      setTimeout(() => setCopiedCss(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const MODES: { value: HarmonyMode; label: string }[] = [
    { value: "random", label: "Random" },
    { value: "complementary", label: "Complementary" },
    { value: "analogous", label: "Analogous" },
    { value: "triadic", label: "Triadic" },
    { value: "monochromatic", label: "Monochromatic" },
  ];

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
              Color Palette{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Generate beautiful, harmonious color palettes for your designs.
              Choose harmony modes, lock colors, and export as CSS variables.
            </p>
          </div>

          {/* Controls */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <div className="flex flex-wrap items-end gap-4 mb-6">
              {/* Harmony Mode */}
              <div>
                <label className="block text-xs text-[#8888a0] mb-2 uppercase tracking-wide">
                  Harmony Mode
                </label>
                <div className="flex flex-wrap gap-2">
                  {MODES.map((m) => (
                    <button
                      key={m.value}
                      onClick={() => setMode(m.value)}
                      className={`text-xs rounded-lg px-3 py-2 border transition-all ${
                        mode === m.value
                          ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                          : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                      }`}
                    >
                      {m.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Base Color */}
              <div>
                <label className="block text-xs text-[#8888a0] mb-2 uppercase tracking-wide">
                  Base Color
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-10 h-10 rounded-lg border border-[#1e1e2e] bg-transparent cursor-pointer"
                  />
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-24 bg-[#0a0a0f] border border-[#1e1e2e] rounded-lg px-3 py-2 text-sm text-white font-mono focus:outline-none focus:border-[#7c6cf0]"
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-2 ml-auto">
                <button
                  onClick={handleGenerate}
                  className="bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white font-medium text-sm rounded-xl px-5 py-2.5 transition-colors"
                >
                  Generate from Base
                </button>
                <button
                  onClick={handleGenerateRandom}
                  className="border border-[#7c6cf0]/30 hover:border-[#7c6cf0] text-[#9d90f5] font-medium text-sm rounded-xl px-5 py-2.5 transition-colors"
                >
                  Random
                </button>
              </div>
            </div>

            {/* Color Bars */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6">
              {colors.map((color, i) => {
                const hex = hslToHex(color.h, color.s, color.l);
                const rgb = hslToRgb(color.h, color.s, color.l);
                return (
                  <div
                    key={i}
                    className="flex-1 rounded-2xl overflow-hidden border border-[#1e1e2e] group"
                  >
                    {/* Color block */}
                    <div
                      className="h-32 sm:h-40 cursor-pointer relative flex items-center justify-center"
                      style={{ backgroundColor: hex }}
                      onClick={() => copyHex(hex, i)}
                    >
                      <span
                        className={`text-sm font-bold opacity-0 group-hover:opacity-100 transition-opacity ${
                          color.l > 55 ? "text-black/70" : "text-white/80"
                        }`}
                      >
                        {copiedIdx === i ? "Copied!" : "Click to copy"}
                      </span>
                      {/* Lock button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLock(i);
                        }}
                        className={`absolute top-2 right-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                          color.locked
                            ? "bg-black/40 text-white"
                            : "bg-black/20 text-white/50 opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        {color.locked ? (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 0110 0v4" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                            <path d="M7 11V7a5 5 0 019.9-1" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {/* Color info */}
                    <div className="bg-[#12121a] p-3 text-center space-y-1">
                      <div className="text-sm font-mono font-bold text-white">
                        {hex.toUpperCase()}
                      </div>
                      <div className="text-xs text-[#8888a0] font-mono">
                        rgb({rgb.r}, {rgb.g}, {rgb.b})
                      </div>
                      <div className="text-xs text-[#8888a0] font-mono">
                        hsl({color.h}, {color.s}%, {color.l}%)
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Export */}
            <div className="flex justify-end">
              <button
                onClick={exportCss}
                className="text-xs text-[#7c6cf0] hover:text-[#9d90f5] border border-[#7c6cf0]/30 hover:border-[#7c6cf0] rounded-lg px-4 py-2 transition-all font-medium"
              >
                {copiedCss ? "CSS Copied!" : "Export CSS Variables"}
              </button>
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
                  title: "Choose a Mode",
                  description:
                    "Select a color harmony mode (Complementary, Analogous, Triadic, Monochromatic) or go Random. Optionally pick a base color to build around.",
                },
                {
                  step: "2",
                  title: "Generate & Lock",
                  description:
                    "Click Generate to create a 5-color palette. Love a color? Lock it. Then regenerate to explore new combinations while keeping your favorites.",
                },
                {
                  step: "3",
                  title: "Copy & Export",
                  description:
                    "Click any color swatch to copy its hex code. Use 'Export CSS Variables' to get ready-to-paste custom properties for your stylesheet.",
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
                  title: "QR Code Generator",
                  description:
                    "Generate customizable QR codes for URLs, text, and more.",
                  href: "/tools/qr-code-generator",
                },
                {
                  title: "Text Case Converter",
                  description:
                    "Convert text between UPPERCASE, camelCase, snake_case, and more.",
                  href: "/tools/text-case-converter",
                },
                {
                  title: "Password Generator",
                  description:
                    "Create strong, secure random passwords instantly.",
                  href: "/tools/password-generator",
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
