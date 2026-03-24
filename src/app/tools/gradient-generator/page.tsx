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
      <span className="text-[#f0f0f5]">CSS Gradient Generator</span>
    </nav>
  );
}

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type GradientType = "linear" | "radial";

interface ColorStop {
  color: string;
  position: number;
}

interface PresetGradient {
  name: string;
  type: GradientType;
  angle: number;
  stops: ColorStop[];
}

/* ------------------------------------------------------------------ */
/*  Preset Gradients                                                   */
/* ------------------------------------------------------------------ */

const PRESET_GRADIENTS: PresetGradient[] = [
  {
    name: "Sunset",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#f093fb", position: 0 },
      { color: "#f5576c", position: 100 },
    ],
  },
  {
    name: "Ocean",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#667eea", position: 0 },
      { color: "#764ba2", position: 100 },
    ],
  },
  {
    name: "Mint",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#11998e", position: 0 },
      { color: "#38ef7d", position: 100 },
    ],
  },
  {
    name: "Fire",
    type: "linear",
    angle: 45,
    stops: [
      { color: "#f12711", position: 0 },
      { color: "#f5af19", position: 100 },
    ],
  },
  {
    name: "Midnight",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#0f0c29", position: 0 },
      { color: "#302b63", position: 50 },
      { color: "#24243e", position: 100 },
    ],
  },
  {
    name: "Peach",
    type: "linear",
    angle: 90,
    stops: [
      { color: "#ffecd2", position: 0 },
      { color: "#fcb69f", position: 100 },
    ],
  },
  {
    name: "Northern Lights",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#43e97b", position: 0 },
      { color: "#38f9d7", position: 50 },
      { color: "#667eea", position: 100 },
    ],
  },
  {
    name: "Royal",
    type: "linear",
    angle: 135,
    stops: [
      { color: "#7c6cf0", position: 0 },
      { color: "#9d90f5", position: 100 },
    ],
  },
  {
    name: "Cosmic",
    type: "radial",
    angle: 0,
    stops: [
      { color: "#ff6a00", position: 0 },
      { color: "#ee0979", position: 100 },
    ],
  },
  {
    name: "Frost",
    type: "linear",
    angle: 180,
    stops: [
      { color: "#e0eafc", position: 0 },
      { color: "#cfdef3", position: 100 },
    ],
  },
];

/* ------------------------------------------------------------------ */
/*  Direction options                                                   */
/* ------------------------------------------------------------------ */

const ANGLE_PRESETS = [
  { label: "Right", value: 90 },
  { label: "Bottom", value: 180 },
  { label: "Left", value: 270 },
  { label: "Top", value: 0 },
  { label: "Bottom-Right", value: 135 },
  { label: "Bottom-Left", value: 225 },
  { label: "Top-Right", value: 45 },
  { label: "Top-Left", value: 315 },
];

/* ------------------------------------------------------------------ */
/*  FAQ Data                                                           */
/* ------------------------------------------------------------------ */

const FAQ_DATA = [
  {
    question: "What is a CSS gradient?",
    answer:
      "A CSS gradient is a smooth transition between two or more colors, used as a background image in CSS. CSS supports two main types: linear gradients (colors transition along a straight line) and radial gradients (colors radiate outward from a center point).",
  },
  {
    question: "What is the difference between linear and radial gradients?",
    answer:
      "Linear gradients transition colors along a straight line at a specified angle (e.g., left to right, top to bottom, or any angle). Radial gradients transition colors outward from a center point in a circular or elliptical shape.",
  },
  {
    question: "How do I add more color stops?",
    answer:
      "Click the 'Add Stop' button to add a third color stop to your gradient. You can then adjust each color and its position using the controls. More color stops allow you to create more complex, multi-color gradients.",
  },
  {
    question: "What is a gradient angle?",
    answer:
      "The angle determines the direction of a linear gradient. 0deg goes from bottom to top, 90deg goes from left to right, 180deg goes from top to bottom, and 270deg goes from right to left. You can set any angle between 0 and 360 degrees for precise control.",
  },
  {
    question: "Can I use these gradients in any web project?",
    answer:
      "Yes. The generated CSS code uses the standard background property with linear-gradient() or radial-gradient() functions, which are supported by all modern browsers including Chrome, Firefox, Safari, and Edge. Simply copy the CSS code and paste it into your stylesheet.",
  },
  {
    question: "Is my data stored or sent to a server?",
    answer:
      "No. All gradient generation happens entirely in your browser. No data is transmitted, stored, or logged anywhere. The CSS code is generated on the fly using JavaScript.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default function GradientGeneratorPage() {
  const [gradientType, setGradientType] = useState<GradientType>("linear");
  const [angle, setAngle] = useState(135);
  const [stops, setStops] = useState<ColorStop[]>([
    { color: "#7c6cf0", position: 0 },
    { color: "#00e676", position: 100 },
  ]);
  const [copied, setCopied] = useState(false);

  const cssValue = useMemo(() => {
    const stopsStr = stops
      .map((s) => `${s.color} ${s.position}%`)
      .join(", ");
    if (gradientType === "linear") {
      return `linear-gradient(${angle}deg, ${stopsStr})`;
    }
    return `radial-gradient(circle, ${stopsStr})`;
  }, [gradientType, angle, stops]);

  const cssCode = `background: ${cssValue};`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(cssCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard not available */
    }
  };

  const updateStop = (index: number, field: keyof ColorStop, value: string | number) => {
    setStops((prev) =>
      prev.map((s, i) => (i === index ? { ...s, [field]: value } : s))
    );
  };

  const addStop = () => {
    if (stops.length >= 5) return;
    const lastPos = stops[stops.length - 1]?.position ?? 100;
    const secondLastPos = stops[stops.length - 2]?.position ?? 0;
    const newPos = Math.min(100, Math.round((lastPos + secondLastPos) / 2));
    setStops((prev) => [
      ...prev,
      { color: "#ffffff", position: newPos },
    ]);
  };

  const removeStop = (index: number) => {
    if (stops.length <= 2) return;
    setStops((prev) => prev.filter((_, i) => i !== index));
  };

  const applyPreset = (preset: PresetGradient) => {
    setGradientType(preset.type);
    setAngle(preset.angle);
    setStops([...preset.stops]);
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
    name: "CSS Gradient Generator",
    url: "https://prestokit.com/tools/gradient-generator",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Create beautiful CSS gradients with a visual editor. Generate linear and radial gradients with custom colors and angles.",
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
              CSS Gradient{" "}
              <span className="bg-gradient-to-r from-[#7c6cf0] to-[#9d90f5] bg-clip-text text-transparent">
                Generator
              </span>
            </h1>
            <p className="text-[#8888a0] text-base sm:text-lg max-w-2xl">
              Create beautiful CSS gradients with a visual editor. Pick colors,
              set directions, and copy ready-to-use CSS code.
            </p>
          </div>

          {/* Main Editor */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            {/* Live Preview */}
            <div
              className="w-full h-48 sm:h-64 rounded-xl mb-6 border border-[#1e1e2e]"
              style={{ background: cssValue }}
            />

            {/* Type & Direction Controls */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <button
                onClick={() => setGradientType("linear")}
                className={`font-medium text-sm rounded-xl px-5 py-2.5 transition-colors ${
                  gradientType === "linear"
                    ? "bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white"
                    : "border border-[#7c6cf0]/30 hover:border-[#7c6cf0] text-[#9d90f5]"
                }`}
              >
                Linear
              </button>
              <button
                onClick={() => setGradientType("radial")}
                className={`font-medium text-sm rounded-xl px-5 py-2.5 transition-colors ${
                  gradientType === "radial"
                    ? "bg-[#7c6cf0] hover:bg-[#6b5ce0] text-white"
                    : "border border-[#7c6cf0]/30 hover:border-[#7c6cf0] text-[#9d90f5]"
                }`}
              >
                Radial
              </button>

              {gradientType === "linear" && (
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-xs text-[#8888a0]">Angle:</span>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => setAngle(Number(e.target.value))}
                    className="w-24 sm:w-32 accent-[#7c6cf0]"
                  />
                  <span className="text-xs font-mono text-[#9d90f5] w-10 text-right">
                    {angle}&deg;
                  </span>
                </div>
              )}
            </div>

            {/* Direction presets (linear only) */}
            {gradientType === "linear" && (
              <div className="flex flex-wrap gap-2 mb-6">
                {ANGLE_PRESETS.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => setAngle(preset.value)}
                    className={`text-xs rounded-lg px-3 py-1.5 border transition-all ${
                      angle === preset.value
                        ? "border-[#7c6cf0] bg-[#7c6cf0]/10 text-[#9d90f5]"
                        : "border-[#1e1e2e] text-[#8888a0] hover:border-[#7c6cf0]/40"
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            )}

            {/* Color Stops */}
            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-[#c0c0d0]">
                  Color Stops
                </h3>
                <button
                  onClick={addStop}
                  disabled={stops.length >= 5}
                  className="text-xs text-[#00e676] hover:text-[#38ef7d] border border-[#00e676]/30 hover:border-[#00e676] rounded-lg px-3 py-1.5 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  + Add Stop
                </button>
              </div>

              {stops.map((stop, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-4 py-3"
                >
                  <div className="relative">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateStop(index, "color", e.target.value)}
                      className="w-10 h-10 rounded-lg border border-[#1e1e2e] cursor-pointer bg-transparent [&::-webkit-color-swatch-wrapper]:p-0.5 [&::-webkit-color-swatch]:rounded-md [&::-webkit-color-swatch]:border-none"
                    />
                  </div>
                  <input
                    type="text"
                    value={stop.color}
                    onChange={(e) => updateStop(index, "color", e.target.value)}
                    className="w-24 bg-[#12121a] border border-[#1e1e2e] rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#7c6cf0] transition-colors"
                  />
                  <div className="flex items-center gap-2 flex-1">
                    <span className="text-xs text-[#8888a0]">Position:</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) =>
                        updateStop(index, "position", Number(e.target.value))
                      }
                      className="flex-1 accent-[#7c6cf0]"
                    />
                    <span className="text-xs font-mono text-[#9d90f5] w-10 text-right">
                      {stop.position}%
                    </span>
                  </div>
                  {stops.length > 2 && (
                    <button
                      onClick={() => removeStop(index)}
                      className="text-[#555566] hover:text-[#e06c75] transition-colors p-1"
                      aria-label="Remove color stop"
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
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Generated CSS */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-[#c0c0d0]">
                  CSS Code
                </label>
                <button
                  onClick={handleCopy}
                  className="text-xs text-[#7c6cf0] hover:text-[#9d90f5] border border-[#7c6cf0]/30 hover:border-[#7c6cf0] rounded-lg px-3 py-1.5 transition-all"
                >
                  {copied ? "Copied!" : "Copy CSS"}
                </button>
              </div>
              <div className="bg-[#0a0a0f] border border-[#1e1e2e] rounded-xl px-5 py-4 font-mono text-sm text-[#00e676] overflow-x-auto">
                {cssCode}
              </div>
            </div>
          </div>

          {/* Preset Gallery */}
          <div className="rounded-2xl border border-[#1e1e2e] bg-[#12121a]/60 backdrop-blur-sm p-6 sm:p-8 mb-6">
            <h2 className="text-lg font-semibold text-white mb-4">
              Preset Gradients
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
              {PRESET_GRADIENTS.map((preset) => {
                const previewStops = preset.stops
                  .map((s) => `${s.color} ${s.position}%`)
                  .join(", ");
                const previewCss =
                  preset.type === "linear"
                    ? `linear-gradient(${preset.angle}deg, ${previewStops})`
                    : `radial-gradient(circle, ${previewStops})`;
                return (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(preset)}
                    className="group flex flex-col items-center gap-2"
                  >
                    <div
                      className="w-full aspect-square rounded-xl border border-[#1e1e2e] group-hover:border-[#7c6cf0]/60 transition-all group-hover:scale-105"
                      style={{ background: previewCss }}
                    />
                    <span className="text-xs text-[#8888a0] group-hover:text-[#c0c0d0] transition-colors">
                      {preset.name}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* PromoBar */}
          <PromoBar type="pro" dismissKey="gradient-generator-pro" />

          {/* How It Works */}
          <div className="mt-16 mb-16">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              How It Works
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Choose Colors & Direction",
                  description:
                    "Pick your gradient colors with the color pickers, choose linear or radial, and set the direction or angle.",
                },
                {
                  step: "2",
                  title: "Preview in Real Time",
                  description:
                    "See your gradient update instantly as you adjust colors, positions, and angles. Try preset gradients for inspiration.",
                },
                {
                  step: "3",
                  title: "Copy the CSS",
                  description:
                    "Click Copy CSS to grab the generated code. Paste it directly into your stylesheet or inline styles.",
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
                  title: "Color Palette Generator",
                  description:
                    "Generate beautiful color palettes for your designs and projects.",
                  href: "/tools/color-palette-generator",
                },
                {
                  title: "Image Compressor",
                  description:
                    "Compress images without losing quality. Optimize for the web.",
                  href: "/tools/image-compressor",
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
